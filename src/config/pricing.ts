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

import type { Lang, TranslationKey } from '../i18n/ui';
import { siteConfig } from './site';

/** ISO 4217. Emitted as `priceCurrency` in every Offer. */
export const PRICE_CURRENCY = 'EUR';

/**
 * UN/CEFACT Common Code for the unit a price applies to.
 * `TNE` is the metric tonne — the unit Schema.org consumers expect here.
 */
export const PRICE_UNIT_CODE = 'TNE';

/**
 * Estonian standard VAT (käibemaks), as a percentage. 24% since 1 July 2025.
 *
 * Every amount in `pricing` below is **VAT-inclusive**, which is stated to
 * the visitor next to the price and to consumers of the structured data as
 * `priceSpecification.valueAddedTaxIncluded`. Leaving that unsaid on a
 * published price is what makes it ambiguous, so both must always agree.
 */
export const VAT_PERCENT = 24;
export const PRICES_INCLUDE_VAT = true;

export interface ProductPricing {
  /** Price in whole euros, per `PRICE_UNIT_CODE`, including VAT. */
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

/**
 * The VAT position as a sentence for running text, e.g. an FAQ answer:
 * "Includes 24% Estonian VAT." Empty when prices exclude VAT, so a caller
 * never states an inclusion that is not true.
 */
export function vatSentence(t: (key: TranslationKey) => string): string {
  return PRICES_INCLUDE_VAT ? `${t('price.vatIncluded').replace('{vat}', String(VAT_PERCENT))}.` : '';
}

/**
 * Locales that show the price excluding VAT beneath the gross price: the
 * export markets, whose business buyers compare prices net. Estonian keeps
 * the gross price alone.
 */
export const NET_PRICE_LOCALES: readonly Lang[] = ['en', 'pl', 'it'];

/** Whether this locale shows a net price at all. Never, if prices exclude VAT already. */
export function showsNetPrice(lang: Lang): boolean {
  return PRICES_INCLUDE_VAT && NET_PRICE_LOCALES.includes(lang);
}

/**
 * The amount excluding VAT, rounded to the cent: gross / (1 + VAT).
 *
 *   netAmount(400) -> 322.58
 *   netAmount(390) -> 314.52   (314.516…, rounded half up)
 */
export function netAmount(gross: number): number {
  return Math.round((gross / (1 + VAT_PERCENT / 100)) * 100) / 100;
}

/**
 * Like formatPrice, with cents and the locale's decimal separator.
 *
 *   formatPriceWithCents(322.58, 'en') -> '€322.58'
 *   formatPriceWithCents(322.58, 'pl') -> '322,58 €'   (non-breaking space)
 */
export function formatPriceWithCents(amount: number, lang: Lang): string {
  const fixed = amount.toFixed(2);
  return lang === 'en' ? `€${fixed}` : `${fixed.replace('.', ',')} €`;
}
