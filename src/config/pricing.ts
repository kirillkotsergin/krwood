/**
 * Product prices — the single source of truth.
 *
 * Both the visible price on the page and the Schema.org `Offer` in the
 * JSON-LD are built from this file, so the two cannot drift apart. Editing an
 * amount here updates the product cards, the lignin pellets page and the
 * structured data together, in all three locales.
 *
 * Prices are **per metric tonne**, quoted in euros. `24 t` is a full truck
 * load (see `packaging.delivery.spec3` in src/i18n/ui.ts), which is what the
 * wholesale threshold on the 6 mm pellet refers to.
 */

import type { Lang } from '../i18n/ui';
import { siteConfig } from './site';

/** ISO 4217. Emitted as `priceCurrency` in every Offer. */
export const PRICE_CURRENCY = 'EUR';

/**
 * UN/CEFACT Common Code for the unit a price applies to.
 * `TNE` is the metric tonne — the unit Schema.org consumers expect here.
 */
export const PRICE_UNIT_CODE = 'TNE';

export interface ProductPricing {
  /** Price in whole euros, per `PRICE_UNIT_CODE`. */
  amount: number;
  /**
   * Smallest order, in tonnes, this price is valid for — emitted as
   * `eligibleQuantity` on the Offer and shown as a note on the price.
   * `null` means the price carries no minimum.
   */
  minOrderTons: number | null;
}

/** Every product that has a published price. */
export type ProductKey = 'pellet6mm' | 'pellet8mm' | 'ligninPellets';

export const pricing: Record<ProductKey, ProductPricing> = {
  pellet6mm: { amount: 400, minOrderTons: 24 },
  pellet8mm: { amount: 400, minOrderTons: null },
  ligninPellets: { amount: 390, minOrderTons: null },
};

/**
 * Stable, locale-independent Schema.org node ids, so the product listed in
 * the business's `hasOfferCatalog` and the product described on its own page
 * are recognised as one entity rather than two.
 */
export const PRODUCT_IDS: Record<ProductKey, string> = {
  pellet6mm: `${siteConfig.url}/#product-pellet-6mm`,
  pellet8mm: `${siteConfig.url}/#product-pellet-8mm`,
  ligninPellets: `${siteConfig.url}/#product-lignin-pellets`,
};

/**
 * Formats an amount for display, with the euro sign where that locale puts it.
 *
 *   formatPrice(400, 'en') -> '€400'
 *   formatPrice(400, 'et') -> '400 €'   (non-breaking space)
 *
 * Written out rather than delegated to `Intl.NumberFormat` so the output is
 * identical regardless of the ICU data available to the build.
 */
export function formatPrice(amount: number, lang: Lang): string {
  return lang === 'en' ? `€${amount}` : `${amount} €`;
}
