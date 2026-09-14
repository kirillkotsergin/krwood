/**
 * Single source of truth for company + contact details.
 *
 * ⚠️  PLACEHOLDER DATA — REPLACE BEFORE GOING LIVE
 * The phone number, street address, registry code and social profile URLs
 * below are placeholders. Every one of them is referenced from this file
 * only, so editing them here updates the header, contact section, footer
 * and the structured-data (JSON-LD) block in one go.
 */

export const siteConfig = {
  name: 'KR Wood',
  domain: 'krwood.ee',
  url: 'https://krwood.ee',

  /** Used by the PHP mail handler and shown in the contact section. */
  email: 'info@krwood.ee',

  /** Human-readable phone number. */
  phone: '+372 5123 4567',
  /** Same number, digits only — for tel: links. */
  phoneHref: '+37251234567',

  address: {
    street: 'Tööstuse tee 5',
    postalCode: '76401',
    city: 'Tallinn',
    region: 'Harjumaa',
    country: 'Eesti',
    countryCode: 'EE',
  },

  /** Estonian company registry code (äriregistri kood). */
  regCode: '12345678',

  /** Founding year, used for the footer copyright range. */
  foundedYear: 2019,

  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
} as const;

/** Formatted one-line address used in the contact card and JSON-LD. */
export const formattedAddress =
  `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, ${siteConfig.address.country}`;

export type SiteConfig = typeof siteConfig;
