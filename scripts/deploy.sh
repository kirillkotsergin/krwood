#!/usr/bin/env bash
#
# krwood.ee — build and deploy over SSH in one step.
#
#   ./scripts/deploy.sh                 build, then deploy
#   ./scripts/deploy.sh --dry-run       show exactly what would change, write nothing
#   ./scripts/deploy.sh --no-build      deploy the existing dist/ as-is
#   ./scripts/deploy.sh --rollback      restore the previous deploy
#   ./scripts/deploy.sh --list-backups  show what can be rolled back to
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
REQUIRED=('index.html' 'en/index.html' 'pl/index.html' '.htaccess' 'contact.php')

# Public URLs checked after deploying.
SMOKE_PATHS=('/' '/en/' '/pl/' '/privacy/')
SITE_URL='https://krwood.ee'

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

step "Preflight"

for cmd in ssh scp tar; do
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
  step "Smoke-testing $SITE_URL"
  failed=0
  for path in "${SMOKE_PATHS[@]}"; do
    code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 25 "${SITE_URL}${path}" || echo 000)
    if [ "$code" = '200' ]; then
      printf '    %-16s %s%s%s\n' "$path" "$C_OK" "$code" "$C_OFF"
    else
      printf '    %-16s %s%s%s\n' "$path" "$C_ERR" "$code" "$C_OFF"
      failed=1
    fi
  done

  if [ "$failed" -eq 1 ]; then
    warn "Some routes did not return 200."
    warn "Roll back with: ./scripts/deploy.sh --rollback"
    exit 1
  fi
fi

printf '\n%sDeployed.%s %s is live.\n' "$C_OK" "$C_OFF" "$SITE_URL"
