/**
 * Tells IndexNow-enabled search engines (Bing, Yandex, Seznam, Naver) that
 * pages changed, so they recrawl within hours instead of weeks. Bing's index
 * also feeds ChatGPT search, so this is the fastest route for a new or
 * changed page to reach it.
 *
 * Only what changed is submitted. Bing asks for exactly that, and announcing
 * all sixteen URLs on every deploy says "everything changed" when it did not.
 * scripts/deploy.sh does it in two steps:
 *
 *   node scripts/indexnow.mjs --snapshot FILE   before the upload: saves the
 *                                               live sitemap's <lastmod>s
 *   node scripts/indexnow.mjs --since FILE      after the deploy: submits
 *                                               every URL that is new, whose
 *                                               lastmod moved, or that was
 *                                               removed (engines drop it)
 *
 * The built sitemap's lastmod moves only when a page's content does — see
 * `lastmodFor()` in astro.config.ts — so the comparison is meaningful.
 *
 * By hand:
 *   node scripts/indexnow.mjs            submit every URL in the built sitemap
 *   node scripts/indexnow.mjs --dry-run  list what would be submitted (any mode)
 *
 * Ownership is proven by public/<KEY>.txt, which must contain exactly KEY.
 * The script checks the built copy before sending anything. To rotate the
 * key, replace both the constant and the file.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const KEY = 'bf08acb0ac05561ff2d7de82bade70f9';
const HOST = 'krwood.ee';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// Resolved from this file, not the working directory, so deploy.sh can call
// it from anywhere (it does not cd into the project on --no-build).
const DIST = fileURLToPath(new URL('../dist', import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const tags = (xml, tag) =>
  [...xml.matchAll(new RegExp(`<${tag}>([^<]+)</${tag}>`, 'g'))].map((m) => m[1].trim());

/** loc -> lastmod for every <url> in one sitemap file. */
const entries = (xml) =>
  Object.fromEntries(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => [
      tags(m[1], 'loc')[0],
      tags(m[1], 'lastmod')[0] ?? '',
    ]),
  );

/** loc -> lastmod across a sitemap index and every sitemap it lists. */
async function readSitemap(load) {
  const index = await load('/sitemap-index.xml');
  const out = {};
  for (const child of tags(index, 'loc')) {
    Object.assign(out, entries(await load(new URL(child).pathname)));
  }
  return out;
}

const fromDist = async (path) => readFileSync(`${DIST}${path}`, 'utf8');
const fromLive = async (path) => {
  const res = await fetch(new URL(path, SITE), { headers: { 'user-agent': 'krwood-deploy/indexnow' } });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.text();
};

/*
 * Exit codes are set through process.exitCode and the script is left to end
 * on its own. Calling process.exit() while a fetch() connection is still
 * closing crashes Node on Windows (libuv 'Assertion failed ... async.c')
 * with exit code 127, so a successful run looked like a failed one.
 */

/* ---- --snapshot FILE: record what the search engines can see right now -- */

async function snapshot(file) {
  try {
    const live = await readSitemap(fromLive);
    writeFileSync(file, JSON.stringify(live, null, 2));
    console.log(`IndexNow: snapshot of the live sitemap, ${Object.keys(live).length} URLs`);
    return 0;
  } catch (err) {
    console.error(`IndexNow: could not read the live sitemap (${err.message}) — every URL will be submitted.`);
    return 1;
  }
}

/* ---- submit --------------------------------------------------------- */

async function submit() {
  const keyFile = `${DIST}/${KEY}.txt`;
  if (!existsSync(keyFile) || readFileSync(keyFile, 'utf8').trim() !== KEY) {
    console.error(`IndexNow: ${keyFile} is missing or does not contain the key — not submitting.`);
    return 1;
  }

  const built = await readSitemap(fromDist);
  if (Object.keys(built).length === 0) {
    console.error('IndexNow: the sitemap lists no URLs — not submitting.');
    return 1;
  }

  let urls = Object.keys(built);
  const sinceFile = option('--since');

  if (sinceFile !== undefined) {
    if (existsSync(sinceFile)) {
      const before = JSON.parse(readFileSync(sinceFile, 'utf8'));
      const changed = urls.filter((url) => before[url] !== built[url]);
      const removed = Object.keys(before).filter((url) => !(url in built));
      urls = [...changed, ...removed];
      console.log(
        `IndexNow: ${changed.length} new or changed, ${removed.length} removed, ` +
          `${Object.keys(built).length - changed.length} unchanged`,
      );
      if (urls.length === 0) {
        console.log('IndexNow: nothing changed — not submitting.');
        return 0;
      }
    } else {
      console.log('IndexNow: no snapshot of the live sitemap — submitting every URL.');
    }
  }

  if (dryRun) {
    console.log(`IndexNow (dry run): would submit ${urls.length} URLs`);
    urls.forEach((url) => console.log(`  ${url}`));
    return 0;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = accepted while the key is still being verified.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urls.length} URLs (HTTP ${res.status})`);
    urls.forEach((url) => console.log(`  ${url}`));
    return 0;
  }
  console.error(`IndexNow: HTTP ${res.status} ${await res.text().catch(() => '')}`.trim());
  return 1;
}

const snapshotFile = option('--snapshot');
process.exitCode = snapshotFile !== undefined ? await snapshot(snapshotFile) : await submit();
