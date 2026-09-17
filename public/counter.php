<?php
/**
 * krwood.ee — visit counter
 *
 * Stores two numbers ("total visits" and "visits today") in a small JSON file
 * and serves them to the footer. The second dynamic endpoint on the site,
 * alongside contact.php, and like it runs on the host's PHP 8.3 straight out
 * of the document root.
 *
 *   GET  /counter.php   read the counts, change nothing
 *   POST /counter.php   count this visit if it is new, then read the counts
 *
 * Returns JSON: {"ok":true,"total":1234,"today":56}
 *
 * ## Why not a third-party counter service
 *
 * public/.htaccess sets `default-src 'self'` and does not override
 * `connect-src`, so a fetch to any other origin is blocked by the Content
 * Security Policy — silently, with no visible error. A same-origin endpoint
 * needs no CSP change, no third-party account, and keeps the data here.
 *
 * ## Why the data file lives outside the document root
 *
 * scripts/deploy.sh syncs dist/ over public_html with `rsync --delete`,
 * excluding only .well-known/. Anything else inside the document root is
 * deleted on the next deploy — a counter file there would reset to zero every
 * time the site is published. So the file is kept one level up, beside the
 * home directory's other state, where deploys never reach it.
 *
 * ## Privacy
 *
 * The stored file holds two integers and a date. No IP address, user agent,
 * page, referrer or identifier of any kind is written to it, and no cookie is
 * set. Repeat visits within DEDUP_SECONDS are recognised through a temporary
 * zero-byte marker whose *filename* is a salted hash — the salt rotates
 * daily, the file expires, and the address itself is never stored. Nothing
 * here is personal data, so the counter needs no consent banner.
 */

declare(strict_types=1);

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/**
 * Where the counts are kept. MUST be outside the document root — see the note
 * above. Resolved from DOCUMENT_ROOT (/home/<user>/public_html) so there is no
 * username hardcoded here, and overridable for a different layout.
 */
function data_dir(): string
{
    $override = getenv('KRWOOD_COUNTER_DIR');
    if (is_string($override) && $override !== '') {
        return rtrim($override, '/');
    }

    $docroot = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($docroot !== '') {
        return dirname($docroot) . '/var/krwood';
    }

    // Last resort. Counts may not survive here, so make the reason findable.
    error_log('krwood.ee counter: DOCUMENT_ROOT empty, falling back to temp dir');

    return sys_get_temp_dir() . '/krwood-counter';
}

/** Business timezone, so "today" rolls over at local midnight. */
const TIMEZONE = 'Europe/Tallinn';

/**
 * How long one visitor counts as the same visit. A reload or a second page
 * within this window is not counted again.
 */
const DEDUP_SECONDS = 1800;

/** Substrings that mark a request as automated. Crawlers are never counted. */
const BOT_MARKERS = [
    'bot', 'crawl', 'spider', 'slurp', 'curl', 'wget', 'python', 'java/',
    'headless', 'phantom', 'lighthouse', 'pagespeed', 'preview', 'monitor',
    'uptime', 'scanner', 'fetch', 'probe', 'archiver', 'facebookexternalhit',
];

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Emits a JSON response and terminates. */
function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    // The counts change constantly and the page holding them is cached, so
    // this response must never be stored by a browser or proxy.
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function is_bot(string $userAgent): bool
{
    if ($userAgent === '') {
        return true;
    }

    $needle = strtolower($userAgent);
    foreach (BOT_MARKERS as $marker) {
        if (str_contains($needle, $marker)) {
            return true;
        }
    }

    return false;
}

/** Today's date in the business timezone, as YYYY-MM-DD. */
function today(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone(TIMEZONE)))->format('Y-m-d');
}

/**
 * True the first time a given visitor is seen within DEDUP_SECONDS.
 *
 * The address is only ever hashed, together with a salt that changes every
 * day, and used as a filename. Neither the address nor the hash is written
 * into the stored counts.
 */
function is_new_visit(string $ip, string $userAgent): bool
{
    if ($ip === '') {
        return true;
    }

    $dir = data_dir() . '/seen';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        // Cannot deduplicate; counting once per browser session client-side
        // is still in force, so accept the visit rather than lose it.
        return true;
    }

    $marker = $dir . '/' . hash('sha256', today() . '|' . $ip . '|' . $userAgent);
    $now = time();

    if (is_file($marker) && ($now - (int) @filemtime($marker)) < DEDUP_SECONDS) {
        return false;
    }

    @touch($marker);
    prune_markers($dir, $now);

    return true;
}

/**
 * Deletes expired markers. Runs rarely — otherwise every visit would stat the
 * whole directory — and keeps the dedup directory from growing without bound.
 */
function prune_markers(string $dir, int $now): void
{
    if (random_int(1, 50) !== 1) {
        return;
    }

    foreach ((array) @scandir($dir) as $entry) {
        if ($entry === '.' || $entry === '..' || !is_string($entry)) {
            continue;
        }
        $path = $dir . '/' . $entry;
        if (is_file($path) && ($now - (int) @filemtime($path)) > DEDUP_SECONDS) {
            @unlink($path);
        }
    }
}

/**
 * Reads the counts, optionally counting one visit, under an exclusive lock.
 *
 * The lock matters: two visitors arriving at the same moment would otherwise
 * both read the old total and both write the same new one, losing a visit.
 * Opened with 'c+' so the file is created if absent but not truncated.
 */
function read_counts(bool $increment): array
{
    $dir = data_dir();
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        error_log('krwood.ee counter: cannot create ' . $dir);

        return ['ok' => false, 'error' => 'storage_unavailable'];
    }

    $file = $dir . '/visits.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        error_log('krwood.ee counter: cannot open ' . $file);

        return ['ok' => false, 'error' => 'storage_unavailable'];
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return ['ok' => false, 'error' => 'storage_busy'];
        }

        $raw = stream_get_contents($handle);
        $data = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
        if (!is_array($data)) {
            $data = [];
        }

        $total = max(0, (int) ($data['total'] ?? 0));
        $today = max(0, (int) ($data['today'] ?? 0));
        $date = (string) ($data['date'] ?? '');
        $now = today();

        // A new day resets the daily figure, never the total.
        if ($date !== $now) {
            $date = $now;
            $today = 0;
        }

        if ($increment) {
            $total++;
            $today++;
        }

        if ($increment || $date !== (string) ($data['date'] ?? '')) {
            $encoded = json_encode(
                ['total' => $total, 'today' => $today, 'date' => $date],
                JSON_UNESCAPED_SLASHES,
            );

            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, (string) $encoded);
            fflush($handle);
        }

        return ['ok' => true, 'total' => $total, 'today' => $today];
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

// --------------------------------------------------------------------------
// Request handling
// --------------------------------------------------------------------------

$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');

if ($method !== 'GET' && $method !== 'POST' && $method !== 'HEAD') {
    header('Allow: GET, POST');
    respond(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$userAgent = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

// Only POST counts, so a crawler or a prefetch issuing GET cannot inflate the
// figures, and neither can a cached GET.
$shouldCount = $method === 'POST' && !is_bot($userAgent) && is_new_visit($ip, $userAgent);

respond(read_counts($shouldCount));
