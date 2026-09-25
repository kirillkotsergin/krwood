/**
 * Product specification rows — shared by the visible spec tables and the
 * Schema.org `additionalProperty` list in the JSON-LD.
 *
 * Both are built from these functions, so the figures a visitor reads and the
 * figures a search engine or AI crawler parses cannot drift apart. Values come
 * from `src/i18n/ui.ts`, localised per page.
 */

import type { TranslationKey } from '../i18n/ui';

type Translate = (key: TranslationKey) => string;

export interface SpecRow {
  label: string;
  value: string;
}

/**
 * The quality class the wood pellets are certified to. Emitted as
 * `hasCertification` on the Product; the certification body runs the scheme
 * at https://enplus-pellets.eu.
 */
export const PELLET_CERTIFICATION = {
  name: 'ENplus A1',
  issuedBy: 'European Pellet Council',
  issuedByUrl: 'https://enplus-pellets.eu',
} as const;

/** Rows shared by both wood pellet diameters, after the diameter itself. */
export function pelletSpecRows(t: Translate): SpecRow[] {
  return [
    { label: t('specs.row.length'), value: t('specs.value.length') },
    { label: t('specs.row.calorific'), value: t('specs.value.calorific') },
    { label: t('specs.row.ash'), value: t('specs.value.ash') },
    { label: t('specs.row.moisture'), value: t('specs.value.moisture') },
    { label: t('specs.row.density'), value: t('specs.value.density') },
    { label: t('specs.row.fines'), value: t('specs.value.fines') },
    { label: t('specs.row.material'), value: t('specs.value.material') },
  ];
}

/**
 * Both formats the wood pellets ship in, as shown in the packaging section.
 * Structured data only — the product cards leave packaging to that section.
 */
export function pelletPackagingRow(t: Translate): SpecRow {
  return {
    label: t('lignin.row.packaging'),
    // e.g. "65 kotti × 15 kg (975 kg alusel), Big Bag 1000 kg"
    value: `${t('packaging.bags.spec1')} (${t('packaging.bags.spec2')}), ${t('packaging.bigbag.title')}`,
  };
}

/** Lignin pellet rows after the diameter, in the order the tables show them. */
export function ligninSpecRows(t: Translate): SpecRow[] {
  return [
    { label: t('lignin.row.packaging'), value: t('lignin.value.packaging') },
    { label: t('specs.row.length'), value: t('lignin.value.length') },
    { label: t('specs.row.calorific'), value: t('lignin.value.calorific') },
    { label: t('specs.row.moisture'), value: t('lignin.value.moisture') },
    { label: t('specs.row.ash'), value: t('lignin.value.ash') },
    { label: t('specs.row.density'), value: t('lignin.value.density') },
    { label: t('lignin.row.origin'), value: t('lignin.value.origin') },
  ];
}
