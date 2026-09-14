<?php
/**
 * krwood.ee — contact form handler
 *
 * The site itself is a static Astro build; this is the only dynamic endpoint.
 * It runs on the Radicenter cPanel host (PHP 8.3) straight out of the document
 * root, so no extra server configuration is needed.
 *
 * Returns JSON: {"ok":true} on success, {"ok":false,"error":"..."} otherwise.
 */

declare(strict_types=1);

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/** Where enquiries are delivered. */
const MAIL_TO = 'info@krwood.ee';

/**
 * Envelope sender. MUST be an address on your own domain, otherwise SPF/DMARC
 * will reject the message. Do not put the visitor's address here — their
 * address goes into Reply-To instead.
 */
const MAIL_FROM = 'noreply@krwood.ee';

const MAIL_FROM_NAME = 'KR Wood website';

/** Minimum seconds between two submissions from the same IP address. */
const THROTTLE_SECONDS = 30;

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/**
 * Emits a JSON response and terminates.
 */
function respond(bool $ok, int $status = 200, string $error = ''): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');

    $payload = ['ok' => $ok];
    if (!$ok && $error !== '') {
        $payload['error'] = $error;
    }

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Trims, normalises newlines and caps the length of a submitted field.
 */
function clean_field(string $key, int $maxLength): string
{
    $raw = $_POST[$key] ?? '';
    if (!is_string($raw)) {
        return '';
    }

    $value = str_replace(["\r\n", "\r"], "\n", trim($raw));

    // Strip control characters except newline and tab.
    $value = preg_replace('/[^\P{C}\n\t]+/u', '', $value) ?? '';

    return mb_substr($value, 0, $maxLength);
}

/**
 * Rejects values containing header-injection payloads.
 */
function has_header_injection(string $value): bool
{
    return preg_match('/[\r\n]|%0a|%0d|content-type:|bcc:|cc:|to:/i', $value) === 1;
}

/**
 * Very small file-based per-IP throttle. Prevents a bot from hammering the
 * form without needing a database or session.
 */
function throttled(string $ip): bool
{
    if ($ip === '') {
        return false;
    }

    $file = sys_get_temp_dir() . '/krwood_contact_' . sha1($ip) . '.lock';
    $now = time();

    if (is_file($file)) {
        $last = (int) @file_get_contents($file);
        if ($last > 0 && ($now - $last) < THROTTLE_SECONDS) {
            return true;
        }
    }

    @file_put_contents($file, (string) $now, LOCK_EX);

    return false;
}

// --------------------------------------------------------------------------
// Request handling
// --------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'method_not_allowed');
}

// Honeypot — hidden from real visitors, so any value means a bot.
// Answer 200/ok so the bot does not learn it was filtered.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(true);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
if (throttled($ip)) {
    respond(false, 429, 'too_many_requests');
}

$name    = clean_field('name', 120);
$email   = clean_field('email', 180);
$phone   = clean_field('phone', 40);
$message = clean_field('message', 4000);
$lang    = clean_field('lang', 5);
$consent = isset($_POST['consent']) && (string) $_POST['consent'] !== '';

if ($name === '' || $message === '' || !$consent) {
    respond(false, 422, 'missing_required_fields');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 422, 'invalid_email');
}

// Single-line fields must never contain newlines destined for mail headers.
if (has_header_injection($name) || has_header_injection($email) || has_header_injection($phone)) {
    respond(false, 400, 'invalid_input');
}

$allowedLangs = ['et', 'en', 'pl'];
if (!in_array($lang, $allowedLangs, true)) {
    $lang = 'et';
}

// --------------------------------------------------------------------------
// Compose and send
// --------------------------------------------------------------------------

$subject = sprintf('[krwood.ee] New enquiry from %s (%s)', $name, strtoupper($lang));

$body = implode("\n", [
    'New enquiry submitted via krwood.ee',
    str_repeat('-', 52),
    'Name:     ' . $name,
    'Email:    ' . $email,
    'Phone:    ' . ($phone !== '' ? $phone : '—'),
    'Language: ' . strtoupper($lang),
    str_repeat('-', 52),
    'Message:',
    $message,
    str_repeat('-', 52),
    'IP:        ' . ($ip !== '' ? $ip : 'unknown'),
    'Timestamp: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

// RFC 2047 encode the display name so non-ASCII subjects survive transport.
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . sprintf('=?UTF-8?B?%s?= <%s>', base64_encode(MAIL_FROM_NAME), MAIL_FROM),
    'Reply-To: ' . $email,
    'X-Mailer: krwood.ee',
];

$sent = @mail(
    MAIL_TO,
    $encodedSubject,
    $body,
    implode("\r\n", $headers),
    '-f' . MAIL_FROM
);

if (!$sent) {
    error_log('krwood.ee contact form: mail() failed for ' . $email);
    respond(false, 502, 'mail_failed');
}

respond(true);
