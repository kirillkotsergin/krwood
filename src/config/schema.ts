/**
 * Schema.org structured data for krwood.ee.
 *
 * Emitted as JSON-LD in <head> by `src/layouts/Layout.astro`.
 *
 * `LocalBusiness` is used rather than plain `Organization` because the
 * company has a verifiable street address and opening hours — it is a
 * subtype of Organization, so it satisfies both readings.
 *
 * Validate changes with:
 *   https://validator.schema.org/
 *   https://search.google.com/test/rich-results
 */

import { siteConfig, mapUrl, socialLinks } from './site';
import {
  pricing,
  PRICE_CURRENCY,
  PRICE_UNIT_CODE,
  PRICES_INCLUDE_VAT,
  PRODUCT_IDS,
  type ProductKey,
} from './pricing';
import {
  averageRating,
  reviewsFor,
  REVIEW_BEST_RATING,
  REVIEW_WORST_RATING,
} from './reviews';
import { PELLET_CERTIFICATION, type SpecRow } from './specs';
import { languageTags } from '../i18n/ui';

/** A stable, locale-independent node id so all pages reference one entity. */
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

export interface SchemaProduct {
  /** Which entry in `src/config/pricing.ts` prices this product. */
  key: ProductKey;
  name: string;
  description: string;
  /** Absolute URL where this product can be enquired about. */
  url: string;
  /** Raw material, localised. Omitted from the node when not given. */
  material?: string;
  /**
   * Localised spec rows — the same ones the visible tables render, from
   * src/config/specs.ts — emitted as `additionalProperty`.
   */
  properties?: SpecRow[];
  /** Set for products certified ENplus A1; emitted as `hasCertification`. */
  enplusCertified?: boolean;
  /**
   * Absolute URL of a photo of the product itself. Omitted rather than
   * filled with a banner: Google wants the product, not a graphic about it.
   */
  image?: string;
}

/** Spec rows as Schema.org `PropertyValue` nodes. */
export function buildAdditionalProperties(rows: SpecRow[]): Record<string, unknown>[] {
  return rows.map((row) => ({
    '@type': 'PropertyValue',
    name: row.label,
    value: row.value,
  }));
}

/**
 * The ENplus A1 certification as a Schema.org `Certification`, the type
 * Google reads from `Product.hasCertification`.
 */
export function buildPelletCertification(): Record<string, unknown> {
  return {
    '@type': 'Certification',
    name: PELLET_CERTIFICATION.name,
    issuedBy: {
      '@type': 'Organization',
      name: PELLET_CERTIFICATION.issuedBy,
      url: PELLET_CERTIFICATION.issuedByUrl,
    },
  };
}

/**
 * Builds a priced `Offer`.
 *
 * Google Search Console reports "Missing field 'offers'" for a Product with
 * no offer and "Missing field 'price'" for an offer with no amount, so both
 * `price` and `priceCurrency` are always emitted. `price` is a bare number —
 * a currency symbol inside the value is itself an error.
 *
 * The price is per tonne, which `priceSpecification.referenceQuantity`
 * states explicitly; `eligibleQuantity` carries the minimum order the price
 * is valid for, where there is one.
 */
export function buildOffer(key: ProductKey, url: string): Record<string, unknown> {
  const { amount, minOrderTons } = pricing[key];

  return {
    '@type': 'Offer',
    price: amount,
    priceCurrency: PRICE_CURRENCY,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    businessFunction: 'https://purl.org/goodrelations/v1#Sell',
    seller: { '@id': ORGANIZATION_ID },
    url,

    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: amount,
      priceCurrency: PRICE_CURRENCY,
      // The published amounts include Estonian VAT; saying so removes the
      // ambiguity a bare figure leaves.
      valueAddedTaxIncluded: PRICES_INCLUDE_VAT,
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitCode: PRICE_UNIT_CODE,
      },
    },

    ...(minOrderTons !== null
      ? {
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: minOrderTons,
            unitCode: PRICE_UNIT_CODE,
          },
        }
      : {}),
  };
}

/**
 * `review` and `aggregateRating` for a product — or nothing at all.
 *
 * Search Console lists both as missing, but they are warnings: `offers` alone
 * satisfies `Product`. They are emitted only from real reviews in
 * `src/config/reviews.ts`, which is empty by design — an `aggregateRating`
 * with nothing behind it is invalid markup and a policy violation. See the
 * note at the top of that file.
 */
export function buildReviewNodes(key: ProductKey): Record<string, unknown> {
  const own = reviewsFor(key);
  const average = averageRating(key);

  if (own.length === 0 || average === null) return {};

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average,
      reviewCount: own.length,
      ratingCount: own.length,
      bestRating: REVIEW_BEST_RATING,
      worstRating: REVIEW_WORST_RATING,
    },

    review: own.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      datePublished: review.datePublished,
      reviewBody: review.body,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: REVIEW_BEST_RATING,
        worstRating: REVIEW_WORST_RATING,
      },
    })),
  };
}

/** A `Product` node carrying its own priced offer. */
export function buildProduct(product: SchemaProduct): Record<string, unknown> {
  return {
    '@type': 'Product',
    '@id': PRODUCT_IDS[product.key],
    name: product.name,
    description: product.description,
    url: product.url,
    ...(product.image !== undefined ? { image: product.image } : {}),
    brand: { '@id': ORGANIZATION_ID },
    offers: buildOffer(product.key, product.url),
    ...(product.material !== undefined ? { material: product.material } : {}),
    ...(product.properties !== undefined
      ? { additionalProperty: buildAdditionalProperties(product.properties) }
      : {}),
    ...(product.enplusCertified ? { hasCertification: buildPelletCertification() } : {}),
    ...buildReviewNodes(product.key),
  };
}

/** The one `WebSite` node, referenced by every page's `WebPage`. */
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * `priceRange` for the business: the cheapest to the dearest product, per
 * tonne, from src/config/pricing.ts — so it follows a price change by itself.
 * `siteConfig.priceRange`, when set, overrides it.
 */
export function buildPriceRange(): string {
  if (siteConfig.priceRange !== '') return siteConfig.priceRange;
  const amounts = Object.values(pricing).map((entry) => entry.amount);
  const low = Math.min(...amounts);
  const high = Math.max(...amounts);
  const span = low === high ? `${low}` : `${low}–${high}`;
  return `${span} ${PRICE_CURRENCY}/t`;
}

export interface SchemaOptions {
  /**
   * Description of the business. The same on every page of a locale: this
   * node is one entity site-wide, and what a single page is about belongs
   * on that page's `WebPage` node instead.
   */
  description: string;
  /** Absolute URL of the social preview image. */
  imageUrl: string;
  /** Absolute URL of the logo. */
  logoUrl: string;
  /**
   * Localised product entries for the offer catalogue. Pass them only on
   * the landing page, which shows all four products and their prices; any
   * other page gets no catalogue, because Google requires marked-up products
   * to be visible on the page that carries them.
   */
  products: SchemaProduct[];
  /** Localised heading for the offer catalogue, e.g. "Tooted". */
  offerCatalogName: string;
}

export function buildLocalBusinessSchema(options: SchemaOptions): Record<string, unknown> {
  const { address, openingHours } = siteConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORGANIZATION_ID,

    // --- Identity ---------------------------------------------------------
    // No mainEntityOfPage and no inLanguage: the first would claim the
    // business is what every page is about, product pages included, and the
    // second is not a property of Organization at all.
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: options.description,
    url: siteConfig.url,

    logo: {
      '@type': 'ImageObject',
      url: options.logoUrl,
    },
    image: options.imageUrl,

    // --- Contact ----------------------------------------------------------
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,

    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: siteConfig.phoneHref,
        email: siteConfig.email,
        // Every language the site is published in — see src/i18n/ui.ts.
        availableLanguage: Object.values(languageTags),
      },
    ],

    // --- Legal registration ----------------------------------------------
    vatID: siteConfig.vatNumber,
    taxID: siteConfig.registryCode,
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'Estonian commercial register code',
        propertyID: 'EE-registrikood',
        value: siteConfig.registryCode,
      },
      {
        '@type': 'PropertyValue',
        name: 'VAT identification number',
        propertyID: 'VAT',
        value: siteConfig.vatNumber,
      },
    ],

    // --- Location ---------------------------------------------------------
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    hasMap: mapUrl,

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...openingHours.days],
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],

    // Countries the site explicitly promises delivery to, plus the EU as a
    // whole. Poland and Italy each have a localised page that says so.
    areaServed: [
      { '@type': 'Country', name: 'Estonia' },
      { '@type': 'Country', name: 'Latvia' },
      { '@type': 'Country', name: 'Lithuania' },
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Place', name: 'European Union' },
    ],

    // --- Products ---------------------------------------------------------
    // Every catalogue entry is a priced Offer wrapping a Product that carries
    // its own priced Offer, so neither node is ever missing `offers` or
    // `price` however a consumer walks the graph. Landing page only — see
    // `products` in SchemaOptions.
    ...(options.products.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: options.offerCatalogName,
            itemListElement: options.products.map((product) => ({
              ...buildOffer(product.key, product.url),
              itemOffered: buildProduct(product),
            })),
          },
        }
      : {}),

    priceRange: buildPriceRange(),

    // Recommended fields are emitted only when the data is actually known —
    // an empty or invented value is worse than an absent one.
    ...(siteConfig.geo !== null
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.geo.latitude,
            longitude: siteConfig.geo.longitude,
          },
        }
      : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((link) => link.url) } : {}),
  };
}

/**
 * The site itself. Google reads `name` and `alternateName` from this node
 * for the site name shown above a result.
 */
export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: Object.values(languageTags),
  };
}

export interface WebPageOptions {
  /** Absolute canonical URL. */
  url: string;
  /** The page's <title>. */
  name: string;
  /** The page's meta description. */
  description: string;
  /** BCP 47 tag of the page. */
  locale: string;
  /** Absolute URL of the page's preview image. */
  imageUrl: string;
  /** `@id` of what the page is about — the product, on a product page. */
  mainEntityId?: string;
  /** `@id` of the page's BreadcrumbList, where it has one. */
  breadcrumbId?: string;
}

/**
 * The page as a page: what it is called, what it says, which language it is
 * in and what it is about. This is where the per-page facts live, so the
 * business node can stay the same everywhere.
 */
export function buildWebPageSchema(options: WebPageOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    inLanguage: options.locale,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: options.imageUrl },
    ...(options.mainEntityId !== undefined
      ? { mainEntity: { '@id': options.mainEntityId } }
      : { about: { '@id': ORGANIZATION_ID } }),
    ...(options.breadcrumbId !== undefined ? { breadcrumb: { '@id': options.breadcrumbId } } : {}),
  };
}
