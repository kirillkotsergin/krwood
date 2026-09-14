/**
 * Single source of truth for company, contact and legal details.
 *
 * Everything user-facing — header, contact section, footer, and the
 * Schema.org JSON-LD in <head> — reads from this file. Change a value here
 * and it updates everywhere, in all three locales.
 */

export interface PostalAddressConfig {
  /** Street and house number, e.g. "Saha tee 18d". */
  street: string;
  /** Town / village, e.g. "Loo". */
  locality: string;
  postalCode: string;
  /** County. Used in structured data; not shown in the UI. */
  region: string;
  /** ISO 3166-1 alpha-2. */
  countryCode: string;
}

export interface OpeningHoursConfig {
  /** Schema.org day names. */
  days: readonly string[];
  /** 24-hour "HH:MM". */
  opens: string;
  closes: string;
}

export interface SiteConfig {
  /** Brand name as shown in the UI. */
  name: string;
  /** Registered legal entity, used in the footer and structured data. */
  legalName: string;
  domain: string;
  url: string;
  email: string;
  /** Formatted for display. */
  phone: string;
  /** E.164, digits only — used for tel: links and structured data. */
  phoneHref: string;
  /**
   * WhatsApp number in the format wa.me requires: international digits with
   * no leading +, spaces or dashes. Defaults to the same line as `phone`.
   * Set a different number if WhatsApp Business runs on its own line, or an
   * empty string to hide every WhatsApp link on the site.
   */
  whatsapp: string;
  address: PostalAddressConfig;
  /** Estonian commercial register code (äriregistri kood). */
  registryCode: string;
  /** EU VAT identifier (KMKR number). */
  vatNumber: string;
  /**
   * Decimal coordinates of the yard. Recommended by Google for LocalBusiness
   * results. Left null until the real values are known — a pin on the wrong
   * building is worse than no pin.
   */
  geo: { latitude: number; longitude: number } | null;
  /**
   * Google's LocalBusiness guidance lists `priceRange` as recommended.
   * Free text: '€€', 'Quote on request', etc. Empty string omits it.
   */
  priceRange: string;
  /** Year the company was founded, or null to show only the current year. */
  foundedYear: number | null;
  openingHours: OpeningHoursConfig;
  /** Leave a value empty to hide that profile everywhere. */
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'KR Wood',
  legalName: 'KR-Wood OÜ',
  domain: 'krwood.ee',
  url: 'https://krwood.ee',

  email: 'krwood@krwood.ee',

  phone: '+372 5020 078',
  phoneHref: '+3725020078',
  whatsapp: '3725020078',

  address: {
    street: 'Saha tee 18d',
    locality: 'Loo',
    postalCode: '74201',
    region: 'Harjumaa',
    countryCode: 'EE',
  },

  registryCode: '14459624',
  vatNumber: 'EE102060728',

  // TODO: fill in from Google Maps (right-click the yard -> copy coordinates).
  geo: null,
  priceRange: '',

  // Set this once you know it and the footer shows "2018–2026" instead of
  // just the current year.
  foundedYear: null,

  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },

  // TODO: add the real profile URLs. Empty values are filtered out, so no
  // dead links appear in the footer and no junk reaches `sameAs` in JSON-LD.
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },
};

/**
 * Formats the postal address on one line, with a localised country name.
 *
 *   formatAddress('Eesti')   -> 'Saha tee 18d, Loo, 74201, Eesti'
 *   formatAddress('Estonia') -> 'Saha tee 18d, Loo, 74201, Estonia'
 */
export function formatAddress(countryName: string): string {
  const { street, locality, postalCode } = siteConfig.address;
  return `${street}, ${locality}, ${postalCode}, ${countryName}`;
}

/**
 * Builds a wa.me deep link, optionally pre-filling the visitor's first
 * message. Returns an empty string when no WhatsApp number is configured.
 */
export function whatsappUrl(message?: string): string {
  if (siteConfig.whatsapp.trim() === '') return '';
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps deep link for the "Address" row and `hasMap` in JSON-LD. */
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.postalCode}, Estonia`,
)}`;

export interface SocialLink {
  key: keyof SiteConfig['social'];
  name: string;
  url: string;
}

const SOCIAL_NAMES: Record<keyof SiteConfig['social'], string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
};

/** Only the profiles that actually have a URL configured. */
export const socialLinks: SocialLink[] = (
  Object.keys(siteConfig.social) as Array<keyof SiteConfig['social']>
)
  .filter((key) => siteConfig.social[key].trim() !== '')
  .map((key) => ({ key, name: SOCIAL_NAMES[key], url: siteConfig.social[key] }));
