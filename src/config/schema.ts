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

/** A stable, locale-independent node id so all pages reference one entity. */
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

export interface SchemaProduct {
  name: string;
  description: string;
}

export interface SchemaOptions {
  /** Localised page description. */
  description: string;
  /** Absolute canonical URL of the current page. */
  pageUrl: string;
  /** Absolute URL of the social preview image. */
  imageUrl: string;
  /** Absolute URL of the logo. */
  logoUrl: string;
  /** BCP 47 tag of the current page, e.g. "et-EE". */
  locale: string;
  /** Localised product entries for the offer catalogue. */
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
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: options.description,
    url: siteConfig.url,
    mainEntityOfPage: options.pageUrl,
    inLanguage: options.locale,

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
        availableLanguage: ['et', 'en', 'pl'],
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

    areaServed: [
      { '@type': 'Country', name: 'Estonia' },
      { '@type': 'Country', name: 'Latvia' },
      { '@type': 'Country', name: 'Lithuania' },
      { '@type': 'Place', name: 'European Union' },
    ],

    // --- Products ---------------------------------------------------------
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: options.offerCatalogName,
      itemListElement: options.products.map((product) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          material: 'Softwood (pine, spruce)',
          brand: { '@id': ORGANIZATION_ID },
        },
      })),
    },

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
    ...(siteConfig.priceRange !== '' ? { priceRange: siteConfig.priceRange } : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((link) => link.url) } : {}),
  };
}
