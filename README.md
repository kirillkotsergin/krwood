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

`check:pricing` takes an optional directory, so the deployed site can be held
to the same assertions after downloading it:
`npm run check:pricing -- ./downloaded-site`

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

**Prices include 24% Estonian VAT** (käibemaks, the standard rate since
1 July 2025). That is stated next to every price and mirrored in the
structured data as `priceSpecification.valueAddedTaxIncluded`, so the page
and the markup cannot say different things. Both come from `VAT_PERCENT` and
`PRICES_INCLUDE_VAT` in `src/config/pricing.ts`.

`priceValidUntil` is deliberately absent from the JSON-LD: Google lists it as
recommended, but a stale date is worse than none.

### Reviews and ratings

Search Console also reports *Missing field `review`* and *Missing field
`aggregateRating`*. **These are warnings, not errors** — a `Product` needs
`offers` OR `review` OR `aggregateRating`, and `offers` is present, so the
pages are processed and indexed regardless.

They must not be cleared by inventing reviews. Google requires review
snippets to come from genuine, independently collected reviews; fabricated
ones are structured-data spam, and the penalty is a manual action that
removes *all* rich results for the site. Publishing fake consumer reviews is
also an unfair commercial practice under the EU Omnibus Directive as
implemented in Estonian law.

`src/config/reviews.ts` therefore holds the wiring and **no data**. It emits
nothing while the list is empty; add a real review and both `review` and
`aggregateRating` (averaged from the real entries) appear automatically.
`npm run check:pricing` fails if an `aggregateRating` ever claims more
ratings than there are reviews to back it.

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
| hreflang | `et` / `en` / `pl` / `it` + `x-default`, language-only (no region subtags, which would exclude speakers outside that country). Identical in the HTML and the sitemap |
| Canonicals | Self-referencing on all 12 indexable pages |
| Titles | ≤60 chars, keyword-first, unique |
| Descriptions | ≤158 chars, unique |
| Headings | Exactly one H1 per page, no skipped levels |
| `404.html` | `noindex, follow`, no canonical, no hreflang, excluded from the sitemap |
| Sitemap | `/sitemap-index.xml`, `lastmod` on every URL, `/sitemap.xml` 301s to it |
| Social | `og:image` is a **1200×630 PNG** — SVG is not rendered by Facebook, LinkedIn or X |
| Search engine verification | `google-site-verification` and Bing's `msvalidate.01` meta tags in `src/layouts/Layout.astro` |
| FAQ | Wood pellets on the landing page, lignin on its own page, each with `FAQPage` JSON-LD mirroring the visible text. Shared `src/components/Faq.astro`; prices and specs are filled in from config |
| `/llms.txt` | Plain-text summary for AI assistants, generated at build time by `src/pages/llms.txt.ts` from the same translations and config as the pages |
| IndexNow | `scripts/indexnow.mjs` submits every sitemap URL after each successful deploy (Bing, which also feeds ChatGPT search). The key file `public/<key>.txt` must stay in place |

### The host's AI-crawler block, and the override for it

Radicenter applies a **server-level Apache authorisation rule** that returns
403 to a curated list of AI crawlers: case-insensitive substring matches on
`gptbot`, `claudebot`, `ccbot`, `meta-externalagent` and `bytespider`, on
every path — `robots.txt` and the sitemap included. That last part is what
made it harmful: a crawler that cannot read `robots.txt` generally treats the
whole site as disallowed, so those agents were not crawling the site at all.

**It is not ModSecurity.** Disabling ModSecurity in cPanel left the 403s
completely unchanged. The rule is an authorisation directive, which is how it
was identified — a directory-level `Require` overrides it, and a ModSecurity
block could not be. `public/.htaccess` therefore opens the top of the
document root with:

```apache
<RequireAny>
  Require all granted
</RequireAny>
```

The two `Require all denied` blocks at the foot of that file are in
`<FilesMatch>` context, which is more specific, so dotfiles and source maps
stay protected. **Re-test both after touching the authorisation rules:**

```bash
# All of these must be 200
for ua in GPTBot ClaudeBot CCBot meta-externalagent Bytespider Googlebot; do
  printf '%-22s %s\n' "$ua" \
    "$(curl -sS -o /dev/null -w '%{http_code}' -A "$ua" https://krwood.ee/)"
done

# All of these must stay 403
for p in .htaccess .gitignore images/ _astro/nonexistent.css.map; do
  printf '%-34s %s\n' "/$p" \
    "$(curl -sS -o /dev/null -w '%{http_code}' "https://krwood.ee/$p")"
done
```

### Analytics

**Cloudflare Web Analytics**, wired up but **not yet switched on** — it needs
a site token. Cookieless and aggregate-only, so no consent banner is legally
required, which is why it was chosen over GA4.

#### Switching it on

1. Cloudflare dashboard → *Analytics & Logs* → *Web Analytics* → *Add a site*
   → `krwood.ee`. The snippet it shows contains
   `data-cf-beacon='{"token": "..."}'` — copy that 32-character token. The
   site does **not** need its DNS moved to Cloudflare.
2. Paste it into `cloudflareToken` in **`src/config/analytics.ts`**.
3. `npm run deploy`.

That is the whole change. The CSP already names the two Cloudflare hosts, so
there is nothing else to widen.

#### The CSP trap this avoids

`public/.htaccess` sets `default-src 'self'`. A beacon from another origin is
blocked **silently — no console error, no data, no clue why**. Any analytics
vendor needs *two* directives widened, and the second is the one people miss:

| | |
| --- | --- |
| `script-src` | the vendor's **script** host — `static.cloudflareinsights.com` |
| `connect-src` | the vendor's **beacon** host — `cloudflareinsights.com` |

They are usually different hostnames. Both are already in the policy.

Note that `connect-src` must list `'self'` explicitly now that it is
declared — it no longer inherits from `default-src`, and dropping `'self'`
would break the footer visit counter's fetch to `/counter.php`.

For the same CSP reason, **the gtag.js verification method for Search Console
will not work** — use the meta tag already in place, a DNS TXT record, or the
HTML file method.

#### The privacy policy follows the switch automatically

`privacy.s5` has two variants, and `PrivacyContent.astro` picks between them
on `analyticsEnabled`:

| Token | Section shown |
| --- | --- |
| empty | *Cookies* — "uses no tracking cookies or third-party analytics" |
| set | *Cookies and analytics* — names Cloudflare, Inc. as the processor |

This is deliberate. Stating that the site uses no third-party analytics while
a beacon loads would be a false statement in a legal notice, and stating the
opposite while the token is empty would over-disclose. Both the beacon and
the policy read the same flag, so neither can happen.

**Have the wording reviewed before relying on it** — it is accurate as to what
the site does, but it is not legal advice.

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
| Italian (`it`) | `/it/` · `/it/pellet-di-lignina/` · `/it/privacy/` |

Routing is configured by the `i18n` block in `astro.config.ts`
(`prefixDefaultLocale: false`), whose locale list is read from `languages` in
`src/i18n/ui.ts`.

### Translated slugs

Slugs differ per locale. `src/i18n/routes.ts` is the single declaration of
that mapping:

```ts
ligninPellets: { et: 'ligniin-pelletid', en: 'lignin-pellets', pl: 'pellet-ligninowy', it: 'pellet-di-lignina' }
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
const it: Dictionary = { /* must implement every key */ };
```

Miss a key in `en`, `pl` or `it` and `npm run check` fails — which also fails
CI, so an untranslated string can never reach production.

### Adding a string

1. Add the key to `et` in `src/i18n/ui.ts`.
2. `npm run check` — TypeScript now reports it missing from `en`, `pl` and `it`.
3. Fill them in.
4. Use it: `const t = useTranslations(getLangFromUrl(Astro.url)); t('your.key')`

### Adding a language

The switcher, hreflang, the sitemap, the Astro routing and the JSON-LD all
follow `src/i18n/ui.ts`, and TypeScript enforces the dictionary and the slugs.
What it cannot see is the handful of lists outside the build:

1. `src/i18n/ui.ts` — the code in `languages`, `languageLabels`,
   `languageTags` and `ogLocales`, a full dictionary, and the `ui` export.
2. `src/i18n/routes.ts` — a slug for every route (the type check insists).
3. `src/pages/<code>/` — `index.astro`, `privacy.astro` and the lignin page,
   named after its slug. Copy the Italian ones; they are three-line wrappers.
4. `public/contact.php` — `$allowedLangs`, or enquiries are labelled `ET`.
5. `scripts/deploy.sh` — `REQUIRED` and `SMOKE_PATHS`.
6. `scripts/check-pricing.mjs` — `PRICED_PAGES`, `ALL_PAGES`, and the new
   words for "Price" and "per tonne" in `PRICE_LABELS` / `PRICE_UNITS`.
7. `src/pages/404.astro` — the "page not found" line is written out by hand.
8. Check the header at 360px and 1024px. Each language adds a pill to the
   switcher, and both widths had almost no room left at four.

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
│   ├── LanguagePicker.astro  EE | EN | PL | IT, highlights the active locale
│   ├── LandingPage.astro     Composes the five landing sections
│   ├── PrivacyContent.astro  Shared privacy-policy body
│   └── Logo.astro
├── config/
│   ├── site.ts               Company, contact and legal details
│   └── schema.ts             Schema.org LocalBusiness JSON-LD builder
├── i18n/{ui.ts,utils.ts}     Dictionary and helpers
├── layouts/Layout.astro      <head>, SEO, JSON-LD, scroll reveal, back-to-top
├── pages/                    index · en/ · pl/ · it/ · privacy · 404
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

## Visit counter

The footer shows total visits and visits today, served by
**`public/counter.php`** — the second dynamic endpoint alongside the contact
form. `src/components/VisitCounter.astro` renders it.

### Why not a third-party counter service

`public/.htaccess` sets `default-src 'self'` and does not override
`connect-src`, so a `fetch` to CountAPI, Firebase, a Cloudflare Worker on
another domain or any other origin is **blocked by the CSP — silently, with no
visible error**, exactly as described under Analytics above. A same-origin
endpoint needs no CSP change, no third-party account that can lapse, and keeps
the data on your own server.

### ⚠️ The data file must stay outside the document root

Counts live in **`/home/r319522/var/krwood/visits.json`**, one level above
`public_html`. That is not a style choice: `scripts/deploy.sh` syncs `dist/`
over the document root with `rsync --delete`, excluding only `.well-known/`.
A counter file inside `public_html` would be **deleted on every deploy**,
resetting the counts each time the site is published.

The path is derived from `DOCUMENT_ROOT`, so no username is hardcoded.
Override it with `KRWOOD_COUNTER_DIR` if the layout changes.

| | |
| --- | --- |
| `GET /counter.php` | Read the counts, change nothing |
| `POST /counter.php` | Count this visit if it is new, then read the counts |

Only `POST` increments, so a crawler or a prefetch issuing `GET` cannot
inflate the figures. Known bot user agents are never counted, and
`robots.txt` disallows the endpoint.

### What counts as a visit

One visit per browser session, not per page view. The client `POST`s once and
then records a `sessionStorage` flag — not a cookie, so nothing persists after
the tab closes. `counter.php` applies its own 30-minute per-visitor window as
well, so clearing storage mid-visit does not double-count.

Concurrent writes are serialised with `flock`. Verified: 40 simultaneous
visits produce a total of exactly 40, with no lost updates. A new day resets
the daily figure and never the total; "today" rolls over at midnight
`Europe/Tallinn`.

### Privacy

`visits.json` holds **two integers and a date** — no IP address, user agent,
page, referrer or identifier of any kind, and no cookie is set. Repeat visits
are recognised through a temporary marker file whose *filename* is a salted
SHA-256 hash; the salt rotates daily, markers expire after 30 minutes, and the
address itself is never written anywhere. Nothing stored is personal data, so
the counter needs no consent banner and no privacy-policy change.

### Resetting or seeding the counts

```bash
ssh krwood-server 'cat /home/r319522/var/krwood/visits.json'
ssh krwood-server 'echo "{\"total\":0,\"today\":0,\"date\":\"\"}" > /home/r319522/var/krwood/visits.json'
```

If the counter stops appearing, the element stays hidden by design rather than
showing a visitor an error. Check `~/public_html/error_log` for
`krwood.ee counter:` lines.

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
   └─ verify dist/ has index.html, en/, pl/, it/, .htaccess, contact.php
        └─ tar → scp → ~/.deploy/staging/
             └─ guard: refuse to sync if staging has no index.html
                  └─ back up current site → ~/.deploy/backups/<timestamp>.tar.gz
                       └─ rsync -rlt --delete --chmod=D755,F644 staging/ → public_html/
                            └─ prune to the last 5 backups, clean staging
                                 └─ curl every locale's home and lignin page, /privacy/ — non-200 fails the run
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
