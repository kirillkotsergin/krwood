# KR Wood — krwood.ee

Single-page marketing site for KR Wood, a premium wood pellet supplier in Estonia.
Static build, three languages, deployed automatically to Radicenter shared hosting.

**Stack:** [Astro](https://astro.build) 5 (SSG) · [Tailwind CSS](https://tailwindcss.com) 4 · TypeScript

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` locally, exactly as it will be deployed |
| `npm run check` | Type-check `.astro` + `.ts`, **and verify no translation key is missing** |
| `npm run check:pricing` | Verify every built page prices every product, in the JSON-LD and on the page. Needs a build first |

---

## Company data

All company, contact and legal details live in **`src/config/site.ts`**, and
nothing else hard-codes them. Editing that one file updates the contact
section, the footer, the `tel:` / `mailto:` links and the Schema.org JSON-LD
in `<head>` together, across all three locales.

| Field | Value |
| --- | --- |
| `legalName` | KR-Wood OÜ |
| `phone` / `phoneHref` | `+372 5020 078` / `+3725020078` |
| `email` | krwood@krwood.ee |
| `address` | Saha tee 18d, Loo, 74201, Harjumaa |
| `registryCode` | 14459624 |
| `vatNumber` | EE102060728 |
| `openingHours` | Mon–Fri 09:00–17:00 |

Two fields are still unset and degrade gracefully:

- **`social.*`** — empty strings. The footer's social row is hidden entirely
  and `sameAs` is omitted from the JSON-LD, so no dead links ship. Fill in the
  real profile URLs and both reappear automatically.
- **`foundedYear`** — `null`, so the footer shows only the current year. Set it
  to a number and the copyright renders as a range (`2018–2026`).

`contact.php` delivers to `krwood@krwood.ee` and sends **from** the same
address, so SPF/DMARC pass. Confirm that mailbox exists in cPanel.

---

## Pricing

All prices live in **`src/config/pricing.ts`**. Both the price a visitor sees
and the Schema.org `Offer` in the JSON-LD are built from that one file, so the
visible price and the structured data cannot drift apart.

| Product | Price | Minimum order |
| --- | --- | --- |
| Graanulid 6 mm | €400 / t | 24 t — a full truck load |
| Graanulid 8 mm | €400 / t | — |
| Ligniini pelletid | €390 / t | — |

**Prices are per metric tonne.** That unit is emitted as
`priceSpecification.referenceQuantity` with `unitCode: TNE`, and the 6 mm
minimum as `eligibleQuantity.minValue`. Change an amount in
`src/config/pricing.ts` and the product cards, the lignin page and all the
structured data follow.

Two things are deliberately **not** stated: whether the price includes VAT
(no wording is safe to invent on a price — add a `price.vat*` key if you want
it shown), and `priceValidUntil` in the JSON-LD, which Google lists as
recommended but which is worse than absent once it goes stale.

### Adding a priced product

1. Add an entry to `pricing` and to `PRODUCT_IDS` in `src/config/pricing.ts`.
2. Add it to the `products` array in `src/layouts/Layout.astro`, so it joins
   the business's `hasOfferCatalog`.
3. Render `<PriceTag product="yourKey" />` wherever the product is shown.
4. `npm run build && npm run check:pricing`.

### `PriceTag.astro`

One component renders every price on the site, so they all look alike:

| Prop | |
| --- | --- |
| `product` | Which `pricing` entry to show. Type-checked against `ProductKey` |
| `tone` | `wood` (default) or `forest` — matched to the card it sits in |
| `size` | `md` (default) nests inside a card; `lg` stands alone as a section centrepiece |

It also forwards `data-animate`, `style` and other div attributes, so it
participates in the scroll-reveal like any other element.

---

## SEO

Verified in the build output and live:

| | |
| --- | --- |
| hreflang | `et` / `en` / `pl` + `x-default`, language-only (no region subtags, which would exclude speakers outside that country). Identical in the HTML and the sitemap |
| Canonicals | Self-referencing on all 9 indexable pages |
| Titles | ≤60 chars, keyword-first, unique |
| Descriptions | ≤158 chars, unique |
| Headings | Exactly one H1 per page, no skipped levels |
| `404.html` | `noindex, follow`, no canonical, no hreflang, excluded from the sitemap |
| Sitemap | `/sitemap-index.xml`, `lastmod` on every URL, `/sitemap.xml` 301s to it |
| Social | `og:image` is a **1200×630 PNG** — SVG is not rendered by Facebook, LinkedIn or X |
| Google verification | `google-site-verification` meta tag in `src/layouts/Layout.astro` |

### ⚠️ Analytics will be blocked by the CSP

`public/.htaccess` sets `script-src 'self' 'unsafe-inline'` and
`default-src 'self'`. Adding GA4, GTM or Plausible today would load **nothing
and report nothing, with no visible error**. To add analytics you must widen
both `script-src` (the vendor's script host) and `connect-src` (its beacon
endpoint).

For the same reason, **the gtag.js verification method for Search Console
will not work** — use the meta tag already in place, a DNS TXT record, or the
HTML file method.

### Structured data

`src/config/schema.ts` builds a `LocalBusiness` node (a subtype of
`Organization`, so it satisfies both). It carries `legalName`, `vatID`,
`taxID`, a `PostalAddress`, `openingHoursSpecification`, a `ContactPoint`, an
`areaServed` list and a localised `hasOfferCatalog` for all three products.
The `@id` is a stable `https://krwood.ee/#organization` so every page and
locale references one entity.

Validate after changes:
[validator.schema.org](https://validator.schema.org/) ·
[Rich Results Test](https://search.google.com/test/rich-results)

#### Products carry their own priced offer

Search Console reports two errors on a product with no price —
*Missing field `offers`* and *Missing field `price`*. Both are avoided by
construction:

- Every catalogue entry is a **priced `Offer`** whose `itemOffered` is a
  `Product` that **also** carries its own priced `Offer`. Neither node is
  missing `offers` or `price` however a consumer walks the graph.
- `price` is emitted as a bare number with a separate `priceCurrency: EUR`.
  A currency symbol inside the value is itself an error.
- Product `@id`s are stable and locale-independent
  (`https://krwood.ee/#product-pellet-6mm`, …). The lignin page's own
  `Product` node reuses the same `@id` as its catalogue entry, so the two
  describe **one** product rather than two competing ones.

`npm run check:pricing` walks every built page and fails if any `Product`
node anywhere in the graph is missing an offer, a numeric price or `EUR`.

Two optional properties are deliberately absent because the values aren't
known: **`geo`** (latitude/longitude — wrong coordinates are worse than none)
and **`priceRange`**. Google's Rich Results Test flags both as
*recommended*, not errors.

### Hero image

The hero currently uses a generated SVG forest illustration at
`public/images/hero-forest.svg`. To use a real photograph, drop a wide JPG at
`public/images/hero.jpg` and change one line in `src/components/Hero.astro`:

```diff
- style="background-image:url('/images/hero-forest.svg')"
+ style="background-image:url('/images/hero.jpg')"
```

The dark gradient overlay, text colours and contrast all keep working unchanged.

---

## Localisation

| Locale | Routes |
| --- | --- |
| Estonian (`et`) | `/` · `/ligniin-pelletid/` · `/privacy/` — default, no `/et/` prefix |
| English (`en`) | `/en/` · `/en/lignin-pellets/` · `/en/privacy/` |
| Polish (`pl`) | `/pl/` · `/pl/pellet-ligninowy/` · `/pl/privacy/` |

Routing is configured by the `i18n` block in `astro.config.ts`
(`prefixDefaultLocale: false`).

### Translated slugs

Slugs differ per locale. `src/i18n/routes.ts` is the single declaration of
that mapping:

```ts
ligninPellets: { et: 'ligniin-pelletid', en: 'lignin-pellets', pl: 'pellet-ligninowy' }
```

Three things read from it — `localizePath()` and `routePath()` for links and
hreflang in the HTML, and the sitemap `serialize()` hook in `astro.config.ts`.
Because all three share one source, the sitemap and the markup cannot
disagree.

**Adding a translated slug:** edit the table, rename the file in `src/pages/`
to match, and add a 301 from the old path in `public/.htaccess`. If you rename
a page file without updating the table, the build prints
`[sitemap] /path is not in src/i18n/routes.ts` rather than shipping a page
with no hreflang.

### How the dictionary is typed

`src/i18n/ui.ts` uses Estonian as the single source of truth:

```ts
const et = { 'nav.contact': 'Kontakt', /* … */ } as const;

export type TranslationKey = keyof typeof et;
type Dictionary = Record<TranslationKey, string>;

const en: Dictionary = { /* must implement every key */ };
const pl: Dictionary = { /* must implement every key */ };
```

Miss a key in `en` or `pl` and `npm run check` fails — which also fails CI,
so an untranslated string can never reach production.

### Adding a string

1. Add the key to `et` in `src/i18n/ui.ts`.
2. `npm run check` — TypeScript now reports it missing from `en` and `pl`.
3. Fill both in.
4. Use it: `const t = useTranslations(getLangFromUrl(Astro.url)); t('your.key')`

### Helpers (`src/i18n/utils.ts`)

| Function | Purpose |
| --- | --- |
| `getLangFromUrl(url)` | Active locale from the URL, defaulting to `et` |
| `useTranslations(lang)` | Returns a compile-time-checked `t()` |
| `localizePath(path, lang)` | `('/privacy', 'pl')` → `/pl/privacy/` |
| `anchorLink(id, lang)` | `('contact', 'en')` → `/en/#contact` |
| `stripLocale(pathname)` | `/en/privacy/` → `/privacy` |
| `getAlternateLinks(url, site)` | `hreflang` alternates for `<head>` |

The language switcher keeps the visitor on the same page: switching to Polish
from `/en/privacy/` lands on `/pl/privacy/`, not the homepage.

---

## Project structure

```
src/
├── components/
│   ├── Header.astro          Sticky backdrop-blur nav + mobile hamburger
│   ├── Hero.astro            Headline, CTAs, key figures
│   ├── Features.astro        4-up icon grid (inline SVG)
│   ├── Specs.astro           6 mm / 8 mm product cards with spec tables
│   ├── Packaging.astro       15 kg pallets · Big Bag · delivery
│   ├── Contact.astro         Validated form + contact details
│   ├── Footer.astro          Nav, contact, legal, social
│   ├── LanguagePicker.astro  EE | EN | PL, highlights the active locale
│   ├── LandingPage.astro     Composes the five landing sections
│   ├── PrivacyContent.astro  Shared privacy-policy body
│   └── Logo.astro
├── config/
│   ├── site.ts               Company, contact and legal details
│   └── schema.ts             Schema.org LocalBusiness JSON-LD builder
├── i18n/{ui.ts,utils.ts}     Dictionary and helpers
├── layouts/Layout.astro      <head>, SEO, JSON-LD, scroll reveal, back-to-top
├── pages/                    index · en/ · pl/ · privacy · 404
└── styles/global.css         Tailwind theme tokens + base styles

public/                       Copied verbatim into dist/
├── .htaccess                 Apache: HTTPS, caching, compression, CSP
├── contact.php               Form handler (the only dynamic endpoint)
├── favicon.svg
├── robots.txt
└── images/
```

### Design tokens

Defined as CSS variables in `src/styles/global.css` under `@theme`, which makes
them available as ordinary Tailwind utilities (`bg-wood-600`, `text-forest-800`,
`ring-wood-200`, …).

| Scale | Role |
| --- | --- |
| `wood-50…950` | Warm amber/orange — primary brand colour |
| `forest-50…950` | Deep coniferous green — accent |
| `stone-*` | Tailwind's built-in neutral — backgrounds and text |

### Scroll animations

Add `data-animate` to any element to fade-and-rise it into view; add
`data-animate-stagger` to a set of siblings to offset them. An
`IntersectionObserver` in `Layout.astro` reveals them once.

Two deliberate guards: the hiding CSS is scoped to `html.js` (set by an inline
script in `<head>`), so **content is never hidden from crawlers or no-JS
visitors**, and `prefers-reduced-motion` disables the effect entirely.

---

## Contact form

The site is static apart from `public/contact.php`, which runs on the host's
PHP 8.3 and posts to `MAIL_TO` via `mail()`. It returns JSON (`{"ok":true}`)
and the client submits it with `fetch`, so the page never reloads.

Protections in place:

- **Honeypot** field (`website`) — bots that fill it get a fake `200 OK`
- **Per-IP throttle**, 30 s between submissions
- **Header-injection filter** on all single-line fields
- Server-side validation of name, email, message and the consent checkbox
- `Reply-To` is the visitor; `From` stays on your own domain so SPF/DMARC pass

Change the recipient by editing `MAIL_TO` at the top of the file. If mail is not
arriving, check `~/public_html/error_log` on the server.

---

## Deployment

Deploys run **directly over SSH** from your machine. One command builds and
ships:

```bash
npm run deploy
```

| Command | Does |
| --- | --- |
| `npm run deploy` | Type-check, build, upload, swap, smoke-test |
| `npm run deploy:dry` | Show exactly what would change — writes nothing |
| `npm run deploy:rollback` | Restore the previous deploy |
| `npm run deploy:backups` | List restore points on the server |

Flags pass through the script directly:
`bash scripts/deploy.sh --no-build` deploys the existing `dist/` without
rebuilding; `--skip-smoke` skips the post-deploy HTTP checks.

### How it works

This machine has no `rsync` (Git Bash ships `ssh`, `scp` and `tar` only), but
the server has rsync 3.1.3. So the script tars `dist/`, uploads it to a
staging directory outside the web root, and has the **server** rsync staging →
`public_html`.

That matters: the naive approach — delete the document root, then extract —
leaves the site returning 404s for the duration. Syncing from staging swaps
the site in a single pass with no visible gap.

```
npm run check + build
   └─ verify dist/ has index.html, en/, pl/, .htaccess, contact.php
        └─ tar → scp → ~/.deploy/staging/
             └─ guard: refuse to sync if staging has no index.html
                  └─ back up current site → ~/.deploy/backups/<timestamp>.tar.gz
                       └─ rsync -rlt --delete --chmod=D755,F644 staging/ → public_html/
                            └─ prune to the last 5 backups, clean staging
                                 └─ curl /, /en/, /pl/, /privacy/ — non-200 fails the run
```

### What is never deleted

`--delete` makes the document root match `dist/` exactly, **except**
`.well-known/`, which is excluded. That directory holds the ACME/AutoSSL
challenge files — removing it breaks HTTPS certificate renewal.

Anything else you place in `public_html` by hand **will be deleted** on the
next deploy. Put it in `public/` in this repo instead.

### Rollback

Every deploy backs up the live site first, keeping the last five:

```bash
npm run deploy:backups    # 284K 20260914-101302.tar.gz
npm run deploy:rollback   # restores the most recent
```

Change the retention count with `KRWOOD_KEEP_BACKUPS=10 npm run deploy`.

### Configuration

Defaults are at the top of `scripts/deploy.sh`, each overridable by an
environment variable:

| Variable | Default |
| --- | --- |
| `KRWOOD_SSH_HOST` | `krwood-server` (alias in `~/.ssh/config`) |
| `KRWOOD_DOCROOT` | `/home/r319522/public_html` |
| `KRWOOD_REMOTE_BASE` | `/home/r319522/.deploy` |
| `KRWOOD_KEEP_BACKUPS` | `5` |

### GitHub Actions

`.github/workflows/deploy.yml` is now **manual-only** (`workflow_dispatch`).
It no longer runs on push, so it cannot mark a commit as failed. It remains as
a fallback for deploying away from your usual machine, and still needs the
secrets listed below. To restore automatic deploys, re-add the `push` trigger
documented in the file header.

### Required GitHub secrets

`Settings → Secrets and variables → Actions`

| Secret | Value | Required |
| --- | --- | --- |
| `SSH_PRIVATE_KEY` | Full private key, including the BEGIN/END lines | Yes |
| `SSH_HOST` | `krwood.ee` | Yes |
| `SSH_USER` | `r319522` | Yes |
| `DEPLOY_PATH` | `/home/r319522/public_html/` | Yes |
| `SSH_PORT` | `22` | No — defaults to `22` |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan krwood.ee` | Recommended |

Without `SSH_KNOWN_HOSTS` the workflow falls back to `ssh-keyscan` at runtime
(trust-on-first-use) and logs a warning. Pinning the key closes that gap:

```bash
ssh-keyscan krwood.ee
```

### Generating a deploy key

Use a dedicated key rather than your personal one:

```bash
ssh-keygen -t ed25519 -C "github-actions-krwood" -f ~/.ssh/krwood_deploy -N ""
ssh-copy-id -i ~/.ssh/krwood_deploy.pub r319522@krwood.ee
```

A dedicated deploy key already exists at `~/.ssh/krwood_deploy` and its public
half is installed in the server's `authorized_keys`. Paste the private half
into `SSH_PRIVATE_KEY` if you want the fallback workflow working:

```powershell
Get-Content ~/.ssh/krwood_deploy -Raw | Set-Clipboard
```

To run it: `Actions → Deploy to Radicenter (manual fallback) → Run workflow`.
It has a **dry run** toggle that lists what would change without writing.
Like the local script, its rsync excludes `.well-known/` — plus `.git/`,
`cgi-bin/`, `error_log` and `.user.ini`.
