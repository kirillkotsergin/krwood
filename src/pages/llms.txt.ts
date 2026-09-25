/**
 * /llms.txt — a plain-text summary of the company, products, specifications
 * and prices for AI assistants and crawlers (format: https://llmstxt.org).
 *
 * Built from the same translations and config as the pages, never written by
 * hand, so it cannot state a price or a spec the site does not. English is
 * used because it is what these tools read most reliably; the other language
 * versions are linked at the end.
 */
import type { APIRoute } from 'astro';

import { useTranslations, routePath, anchorLink } from '../i18n/utils';
import { languages, defaultLang, type Lang } from '../i18n/ui';
import { siteConfig, formatAddress } from '../config/site';
import {
  pricing,
  formatPrice,
  formatPriceWithCents,
  netAmount,
  showsNetPrice,
  PRICES_INCLUDE_VAT,
  VAT_PERCENT,
  type ProductKey,
} from '../config/pricing';
import {
  pelletSpecRows,
  pelletPackagingRow,
  ligninSpecRows,
  PELLET_CERTIFICATION,
  type SpecRow,
} from '../config/specs';

const t = useTranslations('en');

const abs = (path: string) => new URL(path, siteConfig.url).href;
const list = (rows: SpecRow[]) => rows.map((row) => `- ${row.label}: ${row.value}`).join('\n');

function priceLine(key: ProductKey): string {
  const { amount, minOrderTons } = pricing[key];
  const vat = PRICES_INCLUDE_VAT ? `, including ${VAT_PERCENT}% Estonian VAT` : ', excluding VAT';
  const min = minOrderTons === null ? '' : ` (wholesale price, for orders from ${minOrderTons} tonnes)`;
  const net = showsNetPrice('en') ? `; ${formatPriceWithCents(netAmount(amount), 'en')} per tonne excluding VAT` : '';
  return `- Price: ${formatPrice(amount, 'en')} per tonne${vat}${min}${net}`;
}

const diameter = (value: string): SpecRow => ({ label: t('specs.row.diameter'), value });

const { days, opens, closes } = siteConfig.openingHours;
// The days are contiguous (Monday to Friday), so the first and last suffice.
const hours = `${days[0]}–${days[days.length - 1]} ${opens}–${closes}`;

const otherLanguages = (Object.keys(languages) as Lang[])
  .filter((lang) => lang !== 'en')
  .map(
    (lang) =>
      `- ${languages[lang]}${lang === defaultLang ? ' (default)' : ''}: ${abs(routePath('home', lang))} · ${abs(routePath('ligninPellets', lang))}`,
  )
  .join('\n');

const body = `# ${siteConfig.name} — ${PELLET_CERTIFICATION.name} wood pellets and lignin pellets from Estonia

> ${siteConfig.legalName}: ${t('meta.description')} ${t('lignin.meta.description')}

Generated from the same data as ${siteConfig.domain}, so every figure below matches the website.

## Company

- Legal name: ${siteConfig.legalName}
- Estonian commercial register code: ${siteConfig.registryCode}
- VAT number: ${siteConfig.vatNumber}
- Address: ${formatAddress('Estonia')}
- Phone: ${siteConfig.phone}
- Email: ${siteConfig.email}
- Opening hours: ${hours}
- Website languages: ${Object.values(languages).join(', ')}

## Products

### ${t('specs.d6.title')} — ${PELLET_CERTIFICATION.name}

${t('specs.d6.desc')}

${list([diameter('6 mm'), pelletPackagingRow(t), ...pelletSpecRows(t)])}
${priceLine('pellet6mm')}
- Details: ${abs(anchorLink('pellet-6mm', 'en'))}

### ${t('specs.d8.title')} — ${PELLET_CERTIFICATION.name}

${t('specs.d8.desc')}

${list([diameter('8 mm'), pelletPackagingRow(t), ...pelletSpecRows(t)])}
${priceLine('pellet8mm')}
- Details: ${abs(anchorLink('pellet-8mm', 'en'))}

### ${t('specs.lignin.title')}

${t('specs.lignin.desc')}

${list([diameter(t('lignin.value.diameter')), ...ligninSpecRows(t)])}
${priceLine('ligninPellets')}
- Not ENplus certified. ${t('lignin.specs.note')}
- Details: ${abs(routePath('ligninPellets', 'en'))}

## Packaging and delivery

- ${t('packaging.bags.title')}: ${t('packaging.bags.desc')}
- ${t('packaging.bigbag.title')}: ${t('packaging.bigbag.desc')}
- ${t('packaging.delivery.title')}: ${t('packaging.delivery.desc')}

## Pages

- [Wood pellets](${abs(routePath('home', 'en'))}): products, prices, packaging, FAQ and the enquiry form
- [Lignin pellets](${abs(routePath('ligninPellets', 'en'))}): specifications, industrial applications and FAQ
- [Privacy policy](${abs(routePath('privacy', 'en'))})

## Other languages

${otherLanguages}
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
