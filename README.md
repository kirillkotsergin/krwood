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

### Structured data

`src/config/schema.ts` builds a `LocalBusiness` node (a subtype of
`Organization`, so it satisfies both). It carries `legalName`, `vatID`,
`taxID`, a `PostalAddress`, `openingHoursSpecification`, a `ContactPoint`, an
`areaServed` list and a localised `hasOfferCatalog` for the 6 mm / 8 mm
products. The `@id` is a stable `https://krwood.ee/#organization` so every
page and locale references one entity.

Validate after changes:
[validator.schema.org](https://validator.schema.org/) ·
[Rich Results Test](https://search.google.com/test/rich-results)

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

### Social preview image

`public/images/og-image.svg` is referenced as the Open Graph image. **Facebook,
LinkedIn and X do not render SVG previews** — export a 1200×630 PNG or JPG and
point `ogImage` in `src/layouts/Layout.astro` at it before you rely on link
previews.

---

## Localisation

| Locale | Route | Notes |
| --- | --- | --- |
| Estonian (`et`) | `/`, `/privacy/` | Default — served at the root, no `/et/` prefix |
| English (`en`) | `/en/`, `/en/privacy/` | |
| Polish (`pl`) | `/pl/`, `/pl/privacy/` | |

Routing is configured by the `i18n` block in `astro.config.mjs`
(`prefixDefaultLocale: false`).

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

`.github/workflows/deploy.yml` runs on every push to `main`:

`checkout → npm ci → npm run check → npm run build → verify output → rsync → smoke-test`

The smoke test curls `/`, `/en/`, `/pl/` and `/privacy/` after deploying and
fails the run on any non-200.

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

Paste the contents of `~/.ssh/krwood_deploy` (the private half) into
`SSH_PRIVATE_KEY`.

### What rsync will not touch

The deploy runs `rsync --delete`, so the document root is made to match `dist/`
exactly — with these exclusions:

| Excluded | Why |
| --- | --- |
| `.well-known/` | ACME / AutoSSL validation. **Deleting it breaks HTTPS renewal.** |
| `.git/`, `cgi-bin/`, `error_log`, `.user.ini` | Server-managed, not build output |

Anything else you place in `public_html` by hand **will be deleted** on the next
deploy. Put it in `public/` in this repo instead.

### Manual / dry run

`Actions → Deploy to Radicenter → Run workflow` has a **dry run** toggle that
passes `--dry-run` to rsync, listing what would change without writing anything.
