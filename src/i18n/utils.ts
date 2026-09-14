/**
 * i18n helpers for krwood.ee
 *
 * Routing contract (mirrors `i18n` in astro.config.mjs):
 *   et -> /            (default locale, no prefix)
 *   en -> /en/
 *   pl -> /pl/
 */

import {
  ui,
  defaultLang,
  languages,
  languageTags,
  type Lang,
  type TranslationKey,
} from './ui';
import { routes, findRouteKey, type RouteKey } from './routes';

/** Type guard: is this URL segment one of our supported locales? */
export function isLang(value: string): value is Lang {
  return Object.prototype.hasOwnProperty.call(languages, value);
}

/**
 * Extracts the active locale from the request URL.
 * Falls back to the default locale (`et`) for unprefixed paths.
 *
 *   new URL('https://krwood.ee/')            -> 'et'
 *   new URL('https://krwood.ee/en/')         -> 'en'
 *   new URL('https://krwood.ee/pl/privacy/') -> 'pl'
 */
export function getLangFromUrl(url: URL): Lang {
  const segment = url.pathname.split('/').filter(Boolean)[0];
  if (segment !== undefined && isLang(segment)) return segment;
  return defaultLang;
}

/**
 * Returns a `t()` lookup function bound to the given locale.
 * Keys are checked at compile time against the Estonian dictionary.
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key];
  };
}

/**
 * Strips any locale prefix from a pathname.
 *   '/en/privacy/' -> '/privacy'
 *   '/'            -> '/'
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first !== undefined && isLang(first)) segments.shift();
  return '/' + segments.join('/');
}

/** Prefixes a bare slug with the locale segment. */
function withLocale(slug: string, lang: Lang): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  if (slug === '') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}/${slug}/`;
}

/**
 * Builds the path for a known route in a given locale, translating the slug.
 *   routePath('ligninPellets', 'et') -> '/ligniin-pelletid/'
 *   routePath('ligninPellets', 'en') -> '/en/lignin-pellets/'
 */
export function routePath(key: RouteKey, lang: Lang): string {
  return withLocale(routes[key][lang], lang);
}

/**
 * Builds a locale-aware path, preserving the page you are on and translating
 * the slug when the route has a per-locale one.
 *
 *   localizePath('/', 'pl')                  -> '/pl/'
 *   localizePath('/privacy', 'en')           -> '/en/privacy/'
 *   localizePath('/ligniin-pelletid', 'en')  -> '/en/lignin-pellets/'
 *   localizePath('/en/lignin-pellets', 'et') -> '/ligniin-pelletid/'
 *
 * Unknown paths keep their slug, so a stray URL still maps somewhere sane.
 */
export function localizePath(path: string, lang: Lang): string {
  const route = stripLocale(path);
  const key = findRouteKey(route);

  if (key !== undefined) return routePath(key, lang);
  return withLocale(route.replace(/^\/+|\/+$/g, ''), lang);
}

/**
 * Builds an in-page anchor link that stays on the correct locale even when
 * the visitor is on a sub-page.
 *   anchorLink('features', 'pl') -> '/pl/#features'
 */
export function anchorLink(id: string, lang: Lang): string {
  return `${localizePath('/', lang)}#${id}`;
}

/** One hreflang alternate per locale, plus x-default pointing at Estonian. */
export interface AlternateLink {
  lang: Lang;
  hreflang: string;
  href: string;
}

export function getAlternateLinks(url: URL, site: URL | undefined): AlternateLink[] {
  const origin = site?.origin ?? url.origin;
  const route = stripLocale(url.pathname);

  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    hreflang: languageTags[lang],
    href: new URL(localizePath(route, lang), origin).href,
  }));
}

export { defaultLang, languages, languageTags, routes, findRouteKey };
export type { Lang, TranslationKey, RouteKey };
