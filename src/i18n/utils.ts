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

/**
 * Builds a locale-aware absolute path, preserving the page you are on.
 *   localizePath('/', 'et')        -> '/'
 *   localizePath('/', 'pl')        -> '/pl/'
 *   localizePath('/privacy', 'en') -> '/en/privacy/'
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = stripLocale(path).replace(/^\/+|\/+$/g, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  if (clean === '') return prefix === '' ? '/' : `${prefix}/`;
  return `${prefix}/${clean}/`;
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

export { defaultLang, languages, languageTags };
export type { Lang, TranslationKey };
