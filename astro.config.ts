import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { routes, findRouteKey, type RouteKey } from './src/i18n/routes';
import { languages, languageTags, defaultLang, type Lang } from './src/i18n/ui';

const SITE = 'https://krwood.ee';
const LOCALES = Object.keys(languages) as Lang[];
const BUILD_TIME = new Date().toISOString();

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
          return { ...item, lastmod: BUILD_TIME };
        }

        // Widened to string: the list also carries the `x-default` pseudo-tag,
        // which is not one of our locale codes.
        const links: Array<{ lang: string; url: string }> = LOCALES.map((lang) => ({
          lang: languageTags[lang],
          url: new URL(pathFor(key, lang), SITE).href,
        }));

        // x-default points at the default locale, matching the HTML.
        links.push({ lang: 'x-default', url: new URL(pathFor(key, defaultLang), SITE).href });

        return { ...item, lastmod: BUILD_TIME, links };
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
