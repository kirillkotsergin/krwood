/**
 * Verifies the sitemap against the pages that actually exist.
 *
 * Listing the sitemap's URLs is the easy half and proves almost nothing: a
 * sitemap that omits a page looks perfectly valid on its own. The useful check
 * is the comparison in both directions, so this script asserts:
 *
 *   1. Every built page is in the sitemap  — catches a page Google never hears
 *      about, which is how a URL ends up "Discovered - currently not indexed".
 *   2. Every sitemap URL is a built page   — catches a stale entry pointing at
 *      a page that was renamed or deleted.
 *   3. Every <loc> ends in a trailing slash and uses https://krwood.ee, so the
 *      sitemap cannot disagree with .htaccess and hand Google a 301.
 *   4. Every <loc> equals that page's own <link rel="canonical">. A sitemap
 *      that lists a non-canonical URL is exactly the "Duplicate, Google chose
 *      different canonical than user" report.
 *   5. Every hreflang alternate is itself a <loc> in the sitemap, so no
 *      alternate points at a page that is not being submitted.
 *
 * Run after a build:
 *   npm run build && npm run check:sitemap
 *
 * Or against the live site, which also proves the server serves it correctly:
 *   npm run check:sitemap -- https://krwood.ee
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const TARGET = (process.argv[2] ?? 'dist').replace(/[\\/]+$/, '');
const LIVE = /^https?:\/\//.test(TARGET);
const ORIGIN = 'https://krwood.ee';

/** Pages Astro builds but @astrojs/sitemap correctly leaves out. */
const NOT_IN_SITEMAP = new Set(['/404.html']);

const problems = [];
const fail = (msg) => problems.push(msg);

// ---------------------------------------------------------------------------
// Loading: a local directory and a live origin differ only here.
// ---------------------------------------------------------------------------

async function load(pathname) {
  if (LIVE) {
    const res = await fetch(new URL(pathname, TARGET));
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.text();
  }
  // '/ligniin-pelletid/' -> 'dist/ligniin-pelletid/index.html'
  const file = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  return readFileSync(join(TARGET, file), 'utf8');
}

/** Every .html file in the build, as a URL path ('/en/privacy/'). */
function builtPages(dir = TARGET, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) builtPages(full, out);
    else if (entry.name.endsWith('.html')) {
      const rel = '/' + relative(TARGET, full).split(sep).join('/');
      out.push(rel.replace(/\/index\.html$/, '/'));
    }
  }
  return out;
}

const tags = (xml, tag) =>
  [...xml.matchAll(new RegExp(`<${tag}>([^<]+)</${tag}>`, 'g'))].map((m) => m[1].trim());

// ---------------------------------------------------------------------------
// Read the sitemap index, then every sitemap it points at.
// ---------------------------------------------------------------------------

console.log(`Checking ${LIVE ? TARGET : `${TARGET}/`}\n`);

let index;
try {
  index = await load('/sitemap-index.xml');
} catch (err) {
  console.error(`Cannot read /sitemap-index.xml — ${err.message}`);
  console.error('Run `npm run build` first, or check the @astrojs/sitemap integration.');
  process.exit(1);
}

const children = tags(index, 'loc');
console.log(`sitemap-index.xml -> ${children.length} sitemap(s)`);

/** loc -> { hreflang: href } for every URL across every child sitemap. */
const sitemap = new Map();

for (const child of children) {
  const name = new URL(child).pathname;
  const xml = await load(name);

  // Split on <url> so alternates stay attached to the <loc> they belong to.
  for (const block of xml.split('<url>').slice(1)) {
    const loc = tags(block, 'loc')[0];
    if (!loc) continue;
    const alternates = Object.fromEntries(
      [...block.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)].map((m) => [m[1], m[2]])
    );
    if (sitemap.has(loc)) fail(`${loc} appears twice in the sitemap`);
    sitemap.set(loc, alternates);
  }
  console.log(`  ${name} -> ${tags(xml, 'loc').length} <loc> entries`);
}

// ---------------------------------------------------------------------------
// Report, then assert.
// ---------------------------------------------------------------------------

console.log(`\nURLs in sitemap (${sitemap.size}):\n`);
for (const [loc, alternates] of [...sitemap].sort()) {
  const langs = Object.keys(alternates);
  console.log(`  ${loc}${langs.length ? `   [${langs.join(' ')}]` : ''}`);
}

const locPaths = new Set([...sitemap.keys()].map((u) => new URL(u).pathname));

// 3. Shape of every <loc>.
for (const loc of sitemap.keys()) {
  if (!loc.startsWith(`${ORIGIN}/`)) fail(`${loc} is not on ${ORIGIN}`);
  if (!loc.endsWith('/')) fail(`${loc} has no trailing slash — the server will 301 it`);
}

// 1 + 2. The two-way comparison.
if (LIVE) {
  console.log('\n(live mode: skipping the built-pages comparison, nothing to read)');
} else {
  const built = builtPages().filter((p) => !NOT_IN_SITEMAP.has(p));
  for (const page of built) {
    if (!locPaths.has(page)) fail(`${page} is built but MISSING from the sitemap`);
  }
  for (const path of locPaths) {
    if (!built.includes(path)) fail(`${path} is in the sitemap but was not built`);
  }
  console.log(`\nBuilt pages: ${built.length} (+${NOT_IN_SITEMAP.size} excluded by design)`);
}

// 4. Sitemap URL must equal the page's own canonical.
for (const path of locPaths) {
  let html;
  try {
    html = await load(path);
  } catch (err) {
    fail(`${path} is in the sitemap but could not be read — ${err.message}`);
    continue;
  }
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expected = new URL(path, ORIGIN).href;
  if (!canonical) fail(`${path} has no <link rel="canonical">`);
  else if (canonical !== expected) fail(`${path} canonical is ${canonical}, sitemap says ${expected}`);
}

// 5. Alternates must themselves be submitted.
for (const [loc, alternates] of sitemap) {
  for (const [lang, href] of Object.entries(alternates)) {
    if (!sitemap.has(href)) fail(`${loc} lists hreflang="${lang}" -> ${href}, which is not a <loc>`);
  }
}

console.log('');
if (problems.length) {
  for (const p of problems) console.error(`  FAIL  ${p}`);
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`OK — ${sitemap.size} URLs, all canonical, slashed, and cross-linked.`);
