/**
 * Analytics configuration.
 *
 * Cloudflare Web Analytics was chosen over GA4 because it sets no cookies and
 * collects only aggregate page data. That means no consent banner is legally
 * required before it may load, which GA4 would need in the EU — and a banner
 * both suppresses a large share of the data and has to be built and
 * maintained.
 *
 * ## Enabling it takes two steps, and BOTH are required
 *
 * 1. Paste the site token below.
 * 2. Make sure `script-src` and `connect-src` in `public/.htaccess` still list
 *    the Cloudflare hosts (they do today — see the CSP note in that file).
 *
 * Step 2 is not optional. The site's Content Security Policy is
 * `default-src 'self'`, so a beacon from another origin is blocked
 * **silently, with no console error and no data** if the policy does not name
 * it. That is the single most likely reason for "analytics is installed but
 * reports nothing".
 *
 * ## Where the token comes from
 *
 * Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site →
 * enter krwood.ee. Cloudflare shows a snippet containing
 * `data-cf-beacon='{"token": "..."}'`; the token is that value, a 32-character
 * hex string. The site does NOT need its DNS moved to Cloudflare.
 *
 * Leaving this empty disables analytics completely: no script is emitted, and
 * the privacy policy automatically reverts to stating that the site uses no
 * third-party analytics. See `analyticsEnabled` below.
 */

export interface AnalyticsConfig {
  /**
   * Cloudflare Web Analytics site token. An empty string disables analytics
   * entirely — nothing is loaded and nothing is disclosed.
   */
  cloudflareToken: string;
}

export const analytics: AnalyticsConfig = {
  cloudflareToken: '21a6945b1bab48718737c823eff90a10',
};

/**
 * Whether any third-party analytics is actually active.
 *
 * Read by `src/components/Analytics.astro` to decide whether to emit the
 * beacon, and by `src/components/PrivacyContent.astro` to decide which
 * version of the cookies-and-analytics section to show. Both read the same
 * flag on purpose: the privacy policy cannot drift out of step with what the
 * site actually loads.
 */
export const analyticsEnabled: boolean = analytics.cloudflareToken.trim() !== '';

/** Hosts the CSP in public/.htaccess must allow when analytics is enabled. */
export const ANALYTICS_CSP_HOSTS = {
  /** Serves beacon.min.js. */
  script: 'https://static.cloudflareinsights.com',
  /** Receives the beacon POST at /cdn-cgi/rum. */
  connect: 'https://cloudflareinsights.com',
} as const;
