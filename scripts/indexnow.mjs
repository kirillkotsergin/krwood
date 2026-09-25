/**
 * Tells IndexNow-enabled search engines (Bing, Yandex, Seznam, Naver) that
 * the site changed, so they recrawl within hours instead of weeks. Bing's
 * index also feeds ChatGPT search, so this is the fastest route for a new or
 * changed page to reach it.
 *
 * Submits every <loc> in the built sitemap. Run by scripts/deploy.sh after a
 * successful deploy; safe to run by hand:
 *   node scripts/indexnow.mjs            submit
 *   node scripts/indexnow.mjs --dry-run  list what would be submitted
 *
 * Ownership is proven by public/<KEY>.txt, which must contain exactly KEY.
 * The script checks the built copy before sending anything. To rotate the
 * key, replace both the constant and the file.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const KEY = 'bf08acb0ac05561ff2d7de82bade70f9';
const HOST = 'krwood.ee';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// Resolved from this file, not the working directory, so deploy.sh can call
// it from anywhere (it does not cd into the project on --no-build).
const DIST = fileURLToPath(new URL('../dist', import.meta.url));

const dryRun = process.argv.includes('--dry-run');
const tags = (xml, tag) =>
  [...xml.matchAll(new RegExp(`<${tag}>([^<]+)</${tag}>`, 'g'))].map((m) => m[1].trim());

const keyFile = `${DIST}/${KEY}.txt`;
if (!existsSync(keyFile) || readFileSync(keyFile, 'utf8').trim() !== KEY) {
  console.error(`IndexNow: ${keyFile} is missing or does not contain the key — not submitting.`);
  process.exit(1);
}

const index = readFileSync(`${DIST}/sitemap-index.xml`, 'utf8');
const urls = tags(index, 'loc').flatMap((child) =>
  tags(readFileSync(`${DIST}${new URL(child).pathname}`, 'utf8'), 'loc'),
);

if (urls.length === 0) {
  console.error('IndexNow: the sitemap lists no URLs — not submitting.');
  process.exit(1);
}

if (dryRun) {
  console.log(`IndexNow (dry run): would submit ${urls.length} URLs`);
  urls.forEach((url) => console.log(`  ${url}`));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 = accepted, 202 = accepted while the key is still being verified.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow: submitted ${urls.length} URLs (HTTP ${res.status})`);
} else {
  console.error(`IndexNow: HTTP ${res.status} ${await res.text().catch(() => '')}`.trim());
  process.exit(1);
}
