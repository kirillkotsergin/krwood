/**
 * Genuine, collected customer reviews.
 *
 * ## This list is empty on purpose
 *
 * Google Search Console reports *Missing field `review`* and *Missing field
 * `aggregateRating`* on the products. Both are **warnings, not errors** — a
 * `Product` needs `offers` OR `review` OR `aggregateRating`, and `offers` is
 * present, so the pages are processed and indexed either way.
 *
 * The warnings must not be silenced by inventing reviews or a rating:
 *
 *   - Google's structured data policy requires review snippets to come from
 *     genuine, independently collected reviews. Self-authored reviews of your
 *     own business are ineligible, and fabricated ones are structured-data
 *     spam — the penalty is a manual action that removes *all* rich results
 *     for the site, which costs more than the warning.
 *   - Publishing fake or unverifiable consumer reviews is an unfair
 *     commercial practice under the EU Omnibus Directive, as implemented in
 *     Estonian consumer law. That carries fines, not just a ranking risk.
 *
 * So the plumbing is here and wired up, and it emits nothing at all while the
 * list is empty. Add real reviews and both `review` and `aggregateRating`
 * appear in the JSON-LD automatically, and the warnings clear legitimately.
 *
 * ## Adding a real review
 *
 * Only add a review a customer actually gave you, and keep a record of it —
 * you have to be able to show it is real. `datePublished` is the date the
 * customer gave it, not the date you added it here.
 *
 *     export const reviews: ProductReview[] = [
 *       {
 *         product: 'pellet6mm',
 *         author: 'Marek Tamm',
 *         rating: 5,
 *         datePublished: '2026-03-14',
 *         body: 'Kolm koormat, iga kord ühtlane kvaliteet.',
 *       },
 *     ];
 *
 * A review platform (Google Business Profile, Trustpilot) is the sturdier
 * route: it collects and verifies reviews for you, and its own widget carries
 * the markup, so this file stays empty.
 */

import type { ProductKey } from './pricing';

export interface ProductReview {
  /** Which product the review is about. */
  product: ProductKey;
  /** The reviewer's name, as they gave it. */
  author: string;
  /** Whole stars, 1 to `REVIEW_BEST_RATING`. */
  rating: number;
  /** ISO 8601 date the customer gave the review, e.g. '2026-03-14'. */
  datePublished: string;
  /** What they wrote, in their own words. */
  body: string;
}

/** Top of the rating scale. Emitted as `bestRating`. */
export const REVIEW_BEST_RATING = 5;
export const REVIEW_WORST_RATING = 1;

/**
 * Real reviews only. Empty until there are some — see the note above.
 */
export const reviews: ProductReview[] = [];

/** The reviews for one product, in the order they were given. */
export function reviewsFor(product: ProductKey): ProductReview[] {
  return reviews.filter((review) => review.product === product);
}

/**
 * Mean rating for a product, rounded to one decimal, or `null` when there is
 * nothing to average. Never invent a value here: an `aggregateRating` with no
 * reviews behind it is both invalid markup and a policy violation.
 */
export function averageRating(product: ProductKey): number | null {
  const own = reviewsFor(product);
  if (own.length === 0) return null;

  const total = own.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / own.length) * 10) / 10;
}
