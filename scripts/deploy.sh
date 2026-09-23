#!/usr/bin/env bash
#
# krwood.ee — build and deploy over SSH in one step.
#
#   ./scripts/deploy.sh                 build, then deploy
#   ./scripts/deploy.sh --dry-run       show exactly what would change, write nothing
#   ./scripts/deploy.sh --no-build      deploy the existing dist/ as-is
#   ./scripts/deploy.sh --rollback      restore the previous deploy
#   ./scripts/deploy.sh --list-backups  show what can be rolled back to
#   ./scripts/deploy.sh --checks-only   run the production checks, deploy nothing
#
# What is checked, and why it is checked here rather than noticed in Search
# Console six weeks later:
#
#   before upload   the sitemap is compared against the pages actually built,
#                   in both directions, so a page can neither go missing from
#                   the sitemap nor linger in it after being renamed
#   after upload    every route returns 200; every known redirect resolves
#                   inside its hop budget and lands on the expected URL; an
#                   unknown path 404s instead of redirecting; and the sitemap
#                   still matches the canonicals the server is serving
#
# The hop budgets are the part worth understanding — see REDIRECT_CHECKS.
#
# How it works
#   The local machine (Git Bash on Windows) has no rsync, but the server has
#   rsync 3.1.3. So we tar dist/, upload it to a staging directory, and let the
#   *server* rsync staging -> public_html. That gives real --delete semantics
#   and swaps the site in one pass, instead of leaving the document root empty
#   between a wipe and an extract.
#
#   .well-known/ is never touched — it holds the ACME/AutoSSL challenge files,
#   and deleting it breaks HTTPS certificate renewal.
#
# Overridable via environment:
#   KRWOOD_SSH_HOST  KRWOOD_DOCROOT  KRWOOD_REMOTE_BASE  KRWOOD_KEEP_BACKUPS

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Host alias from ~/.ssh/config, or user@host.
SSH_HOST="${KRWOOD_SSH_HOST:-krwood-server}"

# Apache document root on the server.
DOCROOT="${KRWOOD_DOCROOT:-/home/r319522/public_html}"

# Working area for staging and backups (outside the web root).
REMOTE_BASE="${KRWOOD_REMOTE_BASE:-/home/r319522/.deploy}"

# How many previous deploys to retain for rollback.
KEEP_BACKUPS="${KRWOOD_KEEP_BACKUPS:-5}"

# Paths that must survive a deploy. Server-managed, not build output.
PROTECTED=('.well-known')

# Files that must exist in dist/ or the deploy aborts.
REQUIRED=('index.html' 'en/index.html' 'pl/index.html' '.htaccess' 'contact.php' 'counter.php')

SITE_URL='https://krwood.ee'

# Public URLs that must return 200 after deploying.
SMOKE_PATHS=(
  '/' '/en/' '/pl/'
  '/ligniin-pelletid/' '/en/lignin-pellets/' '/pl/pellet-ligninowy/'
  '/privacy/'
)

# Redirects that must resolve in a known number of hops, to a known URL.
# Each entry is <request URL>|<max hops>|<expected final URL>.
#
# The hop budget is the whole point of this table. Google follows about five
# redirects before giving up and reporting a "Redirect error", and every extra
# hop is another chance to time out -- but a chain only ever grows by accident,
# and nothing in a build log or a 200-only smoke test will tell you it did.
# Search Console will, six weeks later.
#
# All of these were measured on 2026-09-23, right after the .htaccess rewrite
# that collapsed them. A rule added above them that inserts one more hop is a
# regression even though every URL still ends at 200, so it fails the deploy.
REDIRECT_CHECKS=(
  "$SITE_URL/ligniin-pelletid|1|$SITE_URL/ligniin-pelletid/"
  "$SITE_URL/index.html|1|$SITE_URL/"
  "$SITE_URL/lignin-pellets|1|$SITE_URL/ligniin-pelletid/"
  "$SITE_URL/pl/lignin-pellets|1|$SITE_URL/pl/pellet-ligninowy/"
  "$SITE_URL/en/lignin-pellets|1|$SITE_URL/en/lignin-pellets/"
  "$SITE_URL/sitemap.xml|1|$SITE_URL/sitemap-index.xml"

  # Crossing both scheme and host costs exactly two: one hop to https + apex,
  # one for the trailing slash. Three means the HTTPS force and the www strip
  # have come apart into sequential rules again, which is how this started.
  "http://www.krwood.ee/ligniin-pelletid|2|$SITE_URL/ligniin-pelletid/"
  "http://www.krwood.ee/lignin-pellets|2|$SITE_URL/ligniin-pelletid/"
)

# A path that does not exist must 404, not redirect. If the trailing-slash
# rule ever loses its `-d` guard it will send every unknown URL into a loop,
# and the checks above would all still pass.
NOT_FOUND_PATH='/this-page-does-not-exist'

# ---------------------------------------------------------------------------
# Plumbing
# ---------------------------------------------------------------------------

# LogLevel=ERROR hides the client's informational banners (e.g. the OpenSSH
# post-quantum notice) while still surfacing real connection errors.
SSH_OPTS=(-o BatchMode=yes -o LogLevel=ERROR)
SCP_OPTS=(-q -o BatchMode=yes -o LogLevel=ERROR)

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$PROJECT_ROOT/dist"
STAGING="$REMOTE_BASE/staging"
BACKUPS="$REMOTE_BASE/backups"
STAMP="$(date +%Y%m%d-%H%M%S)"

if [ -t 1 ]; then
  C_OK=$'\033[32m'; C_WARN=$'\033[33m'; C_ERR=$'\033[31m'; C_DIM=$'\033[2m'; C_OFF=$'\033[0m'
else
  C_OK=''; C_WARN=''; C_ERR=''; C_DIM=''; C_OFF=''
fi

step() { printf '\n%s==>%s %s\n' "$C_OK" "$C_OFF" "$*"; }
info() { printf '    %s\n' "$*"; }
warn() { printf '%s[warn]%s %s\n' "$C_WARN" "$C_OFF" "$*" >&2; }
die()  { printf '%s[error]%s %s\n' "$C_ERR" "$C_OFF" "$*" >&2; exit 1; }

DO_BUILD=1
DRY_RUN=0
DO_SMOKE=1
MODE='deploy'

while [ $# -gt 0 ]; do
  case "$1" in
    --no-build)     DO_BUILD=0 ;;
    --dry-run)      DRY_RUN=1 ;;
    --skip-smoke)   DO_SMOKE=0 ;;
    --rollback)     MODE='rollback' ;;
    --list-backups) MODE='list' ;;
    --checks-only)  MODE='checks' ;;
    -h|--help)      sed -n '2,30p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *)              die "Unknown option: $1 (try --help)" ;;
  esac
  shift
done

# Build the rsync --exclude list and a find-based guard from PROTECTED.
RSYNC_EXCLUDES=''
for p in "${PROTECTED[@]}"; do
  RSYNC_EXCLUDES+=" --exclude='${p}/' --exclude='${p}'"
done

# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Production checks
#
# A function rather than a straight-line block at the foot of the script, so
# --checks-only can run exactly the same assertions against the live site
# without building or uploading anything. Returns 1 if any check failed; the
# caller decides what to say about it.
# ---------------------------------------------------------------------------

post_deploy_checks() {
  local failed=0 path code out hops final label entry url max_hops want

  step "Smoke-testing $SITE_URL"
  for path in "${SMOKE_PATHS[@]}"; do
    code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 25 "${SITE_URL}${path}" || echo 000)
    if [ "$code" = '200' ]; then
      printf '    %-26s %s%s%s\n' "$path" "$C_OK" "$code" "$C_OFF"
    else
      printf '    %-26s %s%s%s\n' "$path" "$C_ERR" "$code" "$C_OFF"
      failed=1
    fi
  done

  # --- redirect chains -----------------------------------------------------
  # --max-redirs 8 is deliberately above every budget in the table: a loop
  # exhausts it and curl exits non-zero, which lands in the != 200 branch
  # below rather than hanging the deploy.
  step "Checking redirect chains"
  for entry in "${REDIRECT_CHECKS[@]}"; do
    IFS='|' read -r url max_hops want <<<"$entry"

    out=$(curl -sS -o /dev/null -L --max-redirs 8 --max-time 25 \
            -w '%{num_redirects} %{http_code} %{url_effective}' "$url" 2>/dev/null) \
      || out='0 000 -'
    read -r hops code final <<<"$out"

    label="${url#http://}"; label="${label#https://}"

    if [ "$code" != '200' ]; then
      printf '    %-42s %s%s%s\n' "$label" "$C_ERR" "$code (or a redirect loop)" "$C_OFF"
      failed=1
    elif [ "$hops" -gt "$max_hops" ]; then
      printf '    %-42s %s%s hops, budget %s%s\n' "$label" "$C_ERR" "$hops" "$max_hops" "$C_OFF"
      warn "A chain grew. Check the rule order in public/.htaccess."
      failed=1
    elif [ "$final" != "$want" ]; then
      printf '    %-42s %slands on %s%s\n' "$label" "$C_ERR" "$final" "$C_OFF"
      failed=1
    else
      printf '    %-42s %s%s hop -> 200%s\n' "$label" "$C_OK" "$hops" "$C_OFF"
    fi
  done

  # An unknown path must 404 outright, with no redirect in front of it.
  out=$(curl -sS -o /dev/null -L --max-redirs 8 --max-time 25 \
          -w '%{num_redirects} %{http_code}' "${SITE_URL}${NOT_FOUND_PATH}" 2>/dev/null) \
    || out='0 000'
  read -r hops code <<<"$out"
  if [ "$code" = '404' ] && [ "$hops" -eq 0 ]; then
    printf '    %-42s %s404, no redirect%s\n' "unknown path" "$C_OK" "$C_OFF"
  else
    printf '    %-42s %s%s after %s hop(s)%s\n' "unknown path" "$C_ERR" "$code" "$hops" "$C_OFF"
    warn "Unknown paths must 404. Has the trailing-slash rule lost its -d guard?"
    failed=1
  fi

  # --- sitemap, as the server actually serves it ---------------------------
  # The dist/ run before upload proved the sitemap matches the build. This
  # proves the server serves it, and that every <loc> still agrees with the
  # canonical in the HTML now sitting on disk there.
  step "Re-checking the sitemap on $SITE_URL"
  node "$PROJECT_ROOT/scripts/check-sitemap.mjs" "$SITE_URL" 2>&1 | sed 's/^/    /' || failed=1

  return "$failed"
}

# --checks-only: the production assertions and nothing else. No SSH, no build,
# no upload -- so it is safe to run at any time, and is how you confirm a
# Search Console complaint is actually fixed.
if [ "$MODE" = 'checks' ]; then
  if post_deploy_checks; then
    printf '\n%sAll checks passed.%s\n' "$C_OK" "$C_OFF"
    exit 0
  fi
  printf '\n%sChecks failed.%s\n' "$C_ERR" "$C_OFF"
  exit 1
fi

step "Preflight"

for cmd in ssh scp tar node curl; do
  command -v "$cmd" >/dev/null 2>&1 || die "'$cmd' not found in PATH"
done

if ! ssh "${SSH_OPTS[@]}" -o ConnectTimeout=15 "$SSH_HOST" 'exit 0' 2>/dev/null; then
  die "Cannot reach '$SSH_HOST' over SSH with key auth.
    Check your ~/.ssh/config entry and that your key is in the server's authorized_keys."
fi
info "SSH to $SSH_HOST ......... ok"

ssh "${SSH_OPTS[@]}" "$SSH_HOST" 'command -v rsync >/dev/null' \
  || die "The server has no rsync; this script relies on it for the staging swap."
info "remote rsync ............ ok"
info "document root ........... $DOCROOT"

# ---------------------------------------------------------------------------
# Mode: list backups
# ---------------------------------------------------------------------------

if [ "$MODE" = 'list' ]; then
  step "Available backups on $SSH_HOST"
  ssh "${SSH_OPTS[@]}" "$SSH_HOST" "ls -1sh '$BACKUPS'/*.tar.gz 2>/dev/null || echo '(none yet)'"
  exit 0
fi

# ---------------------------------------------------------------------------
# Mode: rollback
# ---------------------------------------------------------------------------

if [ "$MODE" = 'rollback' ]; then
  step "Rolling back to the previous deploy"

  ssh "${SSH_OPTS[@]}" "$SSH_HOST" "bash -s" <<REMOTE
set -eu
BACKUPS='$BACKUPS'
DOCROOT='$DOCROOT'

LATEST=\$(ls -1t "\$BACKUPS"/*.tar.gz 2>/dev/null | head -1 || true)
[ -n "\$LATEST" ] || { echo "No backups found in \$BACKUPS"; exit 1; }

gzip -t "\$LATEST"
echo "restoring: \$(basename "\$LATEST")"

cd "\$DOCROOT"
find . -mindepth 1 -maxdepth 1 $(printf "! -name '%s' " "${PROTECTED[@]}") -exec rm -rf {} +
tar -xzf "\$LATEST" -C "\$DOCROOT"

find "\$DOCROOT" -type d -exec chmod 755 {} +
find "\$DOCROOT" -type f -exec chmod 644 {} +

echo "rollback complete"
REMOTE

  step "Verifying"
  for path in "${SMOKE_PATHS[@]}"; do
    code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 25 "${SITE_URL}${path}" || echo 000)
    printf '    %-16s %s\n' "$path" "$code"
  done
  exit 0
fi

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

if [ "$DO_BUILD" -eq 1 ]; then
  step "Building"
  cd "$PROJECT_ROOT"
  npm run check
  rm -rf "$DIST"
  npm run build
else
  step "Skipping build (--no-build)"
  [ -d "$DIST" ] || die "dist/ does not exist — run without --no-build first."
fi

# ---------------------------------------------------------------------------
# Verify the artifact before it goes anywhere near the server
# ---------------------------------------------------------------------------

step "Verifying dist/"

for f in "${REQUIRED[@]}"; do
  [ -f "$DIST/$f" ] || die "dist/$f is missing — refusing to deploy an incomplete build."
done
info "required files .......... ok (${#REQUIRED[@]} checked)"
info "size .................... $(du -sh "$DIST" | cut -f1)"
info "pages ................... $(find "$DIST" -name '*.html' | wc -l | tr -d ' ')"

# Cross-checks the sitemap against the pages actually built, in both
# directions. This runs here, before anything is uploaded, because a page
# missing from the sitemap is a page Google may never discover -- and unlike a
# broken build it produces no error, no warning and no visible symptom.
step "Verifying the sitemap"
node "$PROJECT_ROOT/scripts/check-sitemap.mjs" "$DIST" 2>&1 | sed 's/^/    /' \
  || die "The sitemap does not match the build — refusing to deploy."

# ---------------------------------------------------------------------------
# Package and upload
# ---------------------------------------------------------------------------

step "Packaging and uploading"

TMPDIR_LOCAL="$(mktemp -d)"
LOCAL_TAR="$TMPDIR_LOCAL/dist.tar.gz"
trap 'rm -rf "$TMPDIR_LOCAL"' EXIT

tar -czf "$LOCAL_TAR" -C "$DIST" .
info "archive ................. $(du -h "$LOCAL_TAR" | cut -f1)"

ssh "${SSH_OPTS[@]}" "$SSH_HOST" "mkdir -p '$STAGING' '$BACKUPS'"
scp "${SCP_OPTS[@]}" "$LOCAL_TAR" "$SSH_HOST:$REMOTE_BASE/upload.tar.gz"
info "uploaded to ............. $REMOTE_BASE/upload.tar.gz"

# ---------------------------------------------------------------------------
# Swap on the server
# ---------------------------------------------------------------------------

if [ "$DRY_RUN" -eq 1 ]; then
  step "Dry run — showing what would change (nothing is written)"
else
  step "Deploying"
fi

ssh "${SSH_OPTS[@]}" "$SSH_HOST" "bash -s" <<REMOTE
set -eu

BASE='$REMOTE_BASE'
STAGING='$STAGING'
BACKUPS='$BACKUPS'
DOCROOT='$DOCROOT'
STAMP='$STAMP'
KEEP='$KEEP_BACKUPS'
DRY='$DRY_RUN'
UPLOAD="\$BASE/upload.tar.gz"

# --- unpack into staging (never directly into the live directory) ---
gzip -t "\$UPLOAD"
rm -rf "\$STAGING"
mkdir -p "\$STAGING"
# --warning=no-timestamp silences the harmless "time stamp in the future"
# notices caused by clock skew between this PC and the server.
tar -xzf "\$UPLOAD" -C "\$STAGING" --warning=no-timestamp
rm -f "\$UPLOAD"

# Guard: never sync an empty staging directory over a live site.
[ -f "\$STAGING/index.html" ] || { echo "ABORT: staging has no index.html"; exit 1; }
echo "    staging ................. \$(find "\$STAGING" -type f | wc -l | tr -d ' ') files"

if [ "\$DRY" = '1' ]; then
  echo
  echo "    changes rsync would make:"
  rsync -rlt --delete --itemize-changes --dry-run $RSYNC_EXCLUDES \
    "\$STAGING/" "\$DOCROOT/" | sed 's/^/      /'
  rm -rf "\$STAGING"
  exit 0
fi

# --- back up the current site so --rollback has something to restore ---
if [ -n "\$(find "\$DOCROOT" -mindepth 1 -maxdepth 1 ! -name '.well-known' -print -quit)" ]; then
  tar -czf "\$BACKUPS/\$STAMP.tar.gz" -C "\$DOCROOT" --exclude='./.well-known' . 2>/dev/null
  echo "    backup .................. \$(basename "\$BACKUPS/\$STAMP.tar.gz") (\$(du -h "\$BACKUPS/\$STAMP.tar.gz" | cut -f1))"
fi

# --- the actual swap: one rsync pass, .well-known untouched ---
rsync -rlt --delete --chmod=D755,F644 $RSYNC_EXCLUDES "\$STAGING/" "\$DOCROOT/"
echo "    synced .................. \$(find "\$DOCROOT" -type f | wc -l | tr -d ' ') files in docroot"

# --- prune old backups ---
ls -1t "\$BACKUPS"/*.tar.gz 2>/dev/null | tail -n +\$((KEEP + 1)) | while read -r old; do
  rm -f "\$old"
  echo "    pruned .................. \$(basename "\$old")"
done

rm -rf "\$STAGING"
REMOTE

if [ "$DRY_RUN" -eq 1 ]; then
  printf '\n%sDry run complete — nothing was changed.%s\n' "$C_DIM" "$C_OFF"
  exit 0
fi

# ---------------------------------------------------------------------------
# Smoke test
# ---------------------------------------------------------------------------

if [ "$DO_SMOKE" -eq 1 ]; then
  if ! post_deploy_checks; then
    warn "Post-deploy checks failed."
    warn "Roll back with: ./scripts/deploy.sh --rollback"
    exit 1
  fi
fi

printf '\n%sDeployed.%s %s is live.\n' "$C_OK" "$C_OFF" "$SITE_URL"
