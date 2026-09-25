/**
 * Verifies the built site's pricing, in both the places Google and a visitor
 * look at it:
 *
 *   1. Every Schema.org `Product` node, on every page, has an `offers` object
 *      carrying a numeric `price` and `priceCurrency: EUR`. These are the two
 *      fields Search Console reports as "Missing field" when they are absent.
 *   2. Every product page in every locale renders a visible price, with the
 *      unit, and the wholesale note wherever the price has a minimum order.
 *
 * Run after a build:
 *   npm run build && npm run check:pricing
 *
 * Any directory holding the same page tree works, so the deployed site can be
 * checked with the identical assertions after downloading it:
 *   npm run check:pricing -- path/to/downloaded-site
 */
import { readFileSync } from 'node:fs';

/** Tree to check. Defaults to the local build output. */
const BASE = (process.argv[2] ?? 'dist').replace(/[\\/]+$/, '');
const read = (page) => readFileSync(`${BASE}/${page}`, 'utf8');

const NBSP = ' ';

/** Pages that must carry a visible price, and how many. */
const PRICED_PAGES = {
  'index.html': 3,
  'en/index.html': 3,
  'pl/index.html': 3,
  'it/index.html': 3,
  'ligniin-pelletid/index.html': 1,
  'en/lignin-pellets/index.html': 1,
  'pl/pellet-ligninowy/index.html': 1,
  'it/pellet-di-lignina/index.html': 1,
};

/** Every page, including those that only carry the business's offer catalogue. */
const ALL_PAGES = [
  ...Object.keys(PRICED_PAGES),
  'privacy/index.html',
  'en/privacy/index.html',
  'pl/privacy/index.html',
  'it/privacy/index.html',
  '404.html',
];

const PRICE_LABELS = ['Hind', 'Price', 'Cena', 'Prezzo'];
const PRICE_UNITS = ['tonni kohta', 'per tonne', 'za tonę', 'a tonnellata'];

/**
 * Pages that also show the net price — NET_PRICE_LOCALES in
 * src/config/pricing.ts. The Estonian root has no prefix and shows none.
 */
const NET_PRICE_PREFIXES = ['en/', 'pl/', 'it/'];

/** Estonian VAT, as VAT_PERCENT in src/config/pricing.ts. */
const VAT_RATE = 24;

/** "24%" in any locale's phrasing, without pinning the wording. */
const VAT_PATTERN = /\b24\s*%/;

/** The 24-tonne minimum order, as distinct from the 24% VAT rate. */
const MIN_ORDER_PATTERN = /\b24\b(?!\s*%)/;

const problems = [];
const fail = (page, message) => problems.push(`${page}: ${message}`);

/* ------------------------------------------------------------------ */
/* 1. Structured data                                                 */
/* ------------------------------------------------------------------ */

/** Every `Product` node anywhere in a JSON-LD graph, however deeply nested. */
function collectProducts(node, out = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectProducts(child, out));
    return out;
  }
  if (node === null || typeof node !== 'object') return out;
  if (node['@type'] === 'Product') out.push(node);
  Object.values(node).forEach((value) => collectProducts(value, out));
  return out;
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
}

console.log('Structured data');

for (const page of ALL_PAGES) {
  const products = collectProducts(jsonLdBlocks(read(page)));

  if (products.length === 0) fail(page, 'no Product nodes at all');

  for (const product of products) {
    const offer = product.offers;

    if (!product['@id']) fail(page, `"${product.name}" has no @id`);
    if (!offer) {
      fail(page, `"${product.name}" has no offers`);
      continue;
    }
    if (typeof offer.price !== 'number') {
      fail(page, `"${product.name}" offer price is not a number: ${JSON.stringify(offer.price)}`);
    }
    if (offer.priceCurrency !== 'EUR') {
      fail(page, `"${product.name}" priceCurrency is ${JSON.stringify(offer.priceCurrency)}`);
    }

    // The nested priceSpecification must carry the currency too, and must
    // state the VAT position — a bare figure is ambiguous.
    const spec = offer.priceSpecification;
    if (!spec) {
      fail(page, `"${product.name}" offer has no priceSpecification`);
    } else {
      if (spec.priceCurrency !== 'EUR') {
        fail(page, `"${product.name}" priceSpecification.priceCurrency is ${JSON.stringify(spec.priceCurrency)}`);
      }
      if (typeof spec.valueAddedTaxIncluded !== 'boolean') {
        fail(page, `"${product.name}" priceSpecification does not state valueAddedTaxIncluded`);
      }
    }

    // Ratings are legitimate only when backed by reviews in the same node.
    // This catches an aggregateRating invented by hand as much as a bug.
    const rating = product.aggregateRating;
    if (rating) {
      const count = rating.reviewCount ?? rating.ratingCount;
      const reviews = Array.isArray(product.review) ? product.review : product.review ? [product.review] : [];

      if (typeof rating.ratingValue !== 'number') {
        fail(page, `"${product.name}" aggregateRating has no numeric ratingValue`);
      }
      if (typeof count !== 'number' || count < 1) {
        fail(page, `"${product.name}" aggregateRating has no usable reviewCount/ratingCount`);
      }
      if (reviews.length !== count) {
        fail(page, `"${product.name}" claims ${count} rating(s) but carries ${reviews.length} review(s)`);
      }
    }
  }

  const rated = products.filter((p) => p.aggregateRating).length;
  console.log(
    `  ${page} — ${products.length} Product node(s), all priced, VAT stated` +
      (rated > 0 ? `, ${rated} with a backed rating` : ''),
  );
}

/* ------------------------------------------------------------------ */
/* 2. Visible prices                                                  */
/* ------------------------------------------------------------------ */

/** Visible text of the page, as a list of non-empty text runs. */
function textRuns(html) {
  // Script and style bodies are collapsed to an empty tag first, so their
  // source is never mistaken for visible copy. Splitting on the tag pattern
  // then needs no placeholder character.
  return html
    .replace(/<script[\s\S]*?<\/script>/g, '<>')
    .replace(/<style[\s\S]*?<\/style>/g, '<>')
    .split(/<[^>]*>/)
    .map((run) => run.replace(/[ \t\r\n\f\v]+/g, ' ').trim())
    .filter((run) => run !== '');
}

console.log('\nVisible prices');

for (const [page, expected] of Object.entries(PRICED_PAGES)) {
  const runs = textRuns(read(page));
  const found = [];

  runs.forEach((run, i) => {
    if (!PRICE_LABELS.includes(run)) return;

    // PriceTag renders: label, amount, unit, the net price on export pages,
    // the VAT note, then the wholesale note where the price has a minimum.
    const amount = runs[i + 1] ?? '';
    const unit = runs[i + 2] ?? '';
    const isExport = NET_PRICE_PREFIXES.some((prefix) => page.startsWith(prefix));
    const net = isExport ? (runs[i + 3] ?? '') : null;
    const offset = isExport ? 1 : 0;
    const vat = runs[i + 3 + offset] ?? '';
    const wholesale = runs[i + 4 + offset] ?? '';

    // The net price must be exactly gross / (1 + VAT), to the cent.
    if (net !== null) {
      const gross = Number(amount.replace(/[^\d]/g, ''));
      const shown = Number((net.match(/\d+[.,]\d{2}/)?.[0] ?? '').replace(',', '.'));
      const want = Math.round((gross / (1 + VAT_RATE / 100)) * 100) / 100;
      if (shown !== want) {
        fail(page, `net price ${JSON.stringify(net)} should be ${want.toFixed(2)} for a gross ${gross}`);
      }
    }

    // '€400' in English, '400 €' (non-breaking space) in every other locale.
    if (!new RegExp(`^(€\\d+|\\d+${NBSP}€)$`).test(amount)) {
      fail(page, `price label not followed by an amount: ${JSON.stringify(amount)}`);
    }
    if (!PRICE_UNITS.includes(unit)) {
      fail(page, `price not followed by a unit: ${JSON.stringify(unit)}`);
    }
    // Matched on the rate rather than the wording, which differs per locale.
    if (!VAT_PATTERN.test(vat)) {
      fail(page, `price not followed by a VAT statement: ${JSON.stringify(vat)}`);
    }

    found.push({
      amount,
      unit,
      net,
      vat,
      note: MIN_ORDER_PATTERN.test(wholesale) ? wholesale : null,
    });
  });

  if (found.length !== expected) {
    fail(page, `expected ${expected} visible price(s), found ${found.length}`);
  }

  console.log(`  ${page} — ${found.length}/${expected} price(s)`);
  for (const price of found) {
    const net = price.net ? ` (${price.net.replaceAll(NBSP, ' ')})` : '';
    console.log(`      ${price.amount.replaceAll(NBSP, ' ')} ${price.unit}${net} — ${price.vat}`);
    if (price.note) console.log(`      note: ${price.note}`);
  }
}

/* ------------------------------------------------------------------ */

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  problems.forEach((problem) => console.error(`  - ${problem}`));
  process.exit(1);
}

console.log('\nAll products priced in both the JSON-LD and the page, in every locale.');
