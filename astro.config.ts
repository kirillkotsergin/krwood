import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { routes, findRouteKey, type RouteKey } from './src/i18n/routes';
import { languages, languageTags, defaultLang, xDefaultLang, type Lang } from './src/i18n/ui';

const SITE = 'https://krwood.ee';
const LOCALES = Object.keys(languages) as Lang[];
const BUILD_TIME = new Date().toISOString();

/*
 * ---- Sitemap <lastmod>: when the page last changed, not when it was built --
 *
 * Stamping every URL with the build time told Google that all sixteen pages
 * changed on every deploy, and Google stops trusting a lastmod that is always
 * "now". Instead each built page is hashed, and lastmod moves only when the
 * hash does. sitemap-lastmod.json records hash and date per URL; it is
 * rewritten by the build whenever a page changes and must be COMMITTED, or
 * the next build on another machine treats every page as new.
 *
 * The hash ignores what changes without the page changing: the fingerprinted
 * /_astro/ asset names (a CSS tweak renames them all) and the generator tag.
 */
const DIST = new URL('./dist/', import.meta.url);
const LASTMOD_FILE = new URL('./sitemap-lastmod.json', import.meta.url);

type LastmodEntry = { hash: string; lastmod: string };
const lastmods: Record<string, LastmodEntry> = existsSync(LASTMOD_FILE)
  ? JSON.parse(readFileSync(LASTMOD_FILE, 'utf8'))
  : {};

function lastmodFor(pathname: string): string {
  const file = new URL(`.${pathname}index.html`, DIST);
  if (!existsSync(file)) return BUILD_TIME;

  const html = readFileSync(file, 'utf8')
    .replace(/\/_astro\/[^"'\s)]+/g, '/_astro/')
    .replace(/<meta name="generator"[^>]*>/, '');
  const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);

  const known = lastmods[pathname];
  if (known?.hash === hash) return known.lastmod;

  lastmods[pathname] = { hash, lastmod: BUILD_TIME };
  const sorted = Object.fromEntries(Object.entries(lastmods).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(LASTMOD_FILE, JSON.stringify(sorted, null, 2) + '\n');
  return BUILD_TIME;
}

/** Mirrors `routePath()` in src/i18n/utils.ts. */
function pathFor(key: RouteKey, lang: Lang): string {
  const slug = routes[key][lang];
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  if (slug === '') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}/${slug}/`;
}

/** Strips a leading locale segment: '/pl/pellet-ligninowy/' -> '/pellet-ligninowy'. */
function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first !== undefined && (LOCALES as string[]).includes(first)) segments.shift();
  return '/' + segments.join('/');
}

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // Matches `build.format: 'directory'` below and Apache's canonical trailing
  // slash, so the dev server 404s on a slashless link instead of silently
  // accepting one that production answers with a 301. Parity only -- a static
  // build emits no redirects from this setting, so it is not what fixes a
  // Search Console redirect report.
  trailingSlash: 'always',

  // Estonian is the default locale and is served from the root (no /et/ prefix).
  // English -> /en/, Polish -> /pl/, Italian -> /it/
  // Both values come from src/i18n/ui.ts, so adding a language there is the
  // whole change — the routing and the sitemap below follow it.
  i18n: {
    defaultLocale: defaultLang,
    locales: LOCALES,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Emits /en/index.html style output, which Apache on Radicenter serves
  // directly from the document root without any rewrite rules.
  build: {
    format: 'directory',
  },

  integrations: [
    sitemap({
      /*
       * The integration's built-in `i18n` option is deliberately NOT used.
       * It pairs locale variants by matching the path after the locale
       * prefix, which silently breaks the moment a slug is translated
       * (/ligniin-pelletid/ vs /en/lignin-pellets/): the Estonian page was
       * emitted with no alternates at all and the others lost their `et`
       * link, contradicting the correct hreflang in the HTML.
       *
       * Instead the alternates are built here from the same `routes` table
       * the pages use, so the sitemap and the markup cannot disagree.
       */
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const key = findRouteKey(stripLocale(pathname));

        if (key === undefined) {
          // Loud rather than silent: an unmapped page would otherwise ship
          // with no hreflang and nobody would notice.
          console.warn(
            `[sitemap] ${pathname} is not in src/i18n/routes.ts — emitted without hreflang alternates.`,
          );
          return { ...item, lastmod: lastmodFor(pathname) };
        }

        // Widened to string: the list also carries the `x-default` pseudo-tag,
        // which is not one of our locale codes.
        const links: Array<{ lang: string; url: string }> = LOCALES.map((lang) => ({
          lang: languageTags[lang],
          url: new URL(pathFor(key, lang), SITE).href,
        }));

        // x-default points at English (`xDefaultLang`), matching the HTML.
        links.push({ lang: 'x-default', url: new URL(pathFor(key, xDefaultLang), SITE).href });

        return { ...item, lastmod: lastmodFor(pathname), links };
      },
    }),
  ],

  vite: {
    /*
     * Astro bundles its own copy of Vite, so the Plugin type exported by
     * @tailwindcss/vite resolves against a different Vite installation than
     * the one Astro's config expects. The two are structurally identical at
     * runtime; the cast only silences the duplicate-declaration error that
     * `astro check` now surfaces since this config became TypeScript.
     */
    plugins: [tailwindcss() as never],
  },
});
