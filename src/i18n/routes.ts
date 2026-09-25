/**
 * Per-locale URL slugs.
 *
 * Slugs are translated, not shared: the Estonian lignin page lives at
 * /ligniin-pelletid/ while English uses /en/lignin-pellets/. This table is the
 * single place that mapping is declared, so the language switcher, the
 * hreflang alternates and the navigation links all stay in agreement.
 *
 * Adding a translated slug is one edit here plus renaming the page file in
 * src/pages/ to match.
 *
 * An empty string means "the locale root".
 */

import type { Lang } from './ui';

export const routes = {
  home: {
    et: '',
    en: '',
    pl: '',
    it: '',
  },
  privacy: {
    et: 'privacy',
    en: 'privacy',
    pl: 'privacy',
    it: 'privacy',
  },
  ligninPellets: {
    et: 'ligniin-pelletid',
    en: 'lignin-pellets',
    pl: 'pellet-ligninowy',
    it: 'pellet-di-lignina',
  },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Normalises '/en/foo/' or 'foo' to the bare slug 'foo'. */
export function toSlug(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, '');
}

/**
 * Finds which route a slug belongs to, in any locale.
 *
 *   findRouteKey('/ligniin-pelletid') -> 'ligninPellets'
 *   findRouteKey('/lignin-pellets')   -> 'ligninPellets'
 *   findRouteKey('/')                 -> 'home'
 *   findRouteKey('/unknown')          -> undefined
 */
export function findRouteKey(pathname: string): RouteKey | undefined {
  const slug = toSlug(pathname);

  for (const key of Object.keys(routes) as RouteKey[]) {
    const slugs: readonly string[] = Object.values(routes[key]);
    if (slugs.includes(slug)) return key;
  }

  return undefined;
}
