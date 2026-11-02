/**
 * Composition of peat briquette ash — the manufacturer's laboratory analysis,
 * supplied by the owner on 2026-11-02 (a screenshot of the producer's table).
 *
 * Shown on the peat briquette page and summarised in llms.txt. The calcium
 * and pH figures also feed the running text there through placeholders, so
 * the table and the sentences quoting it cannot drift apart. Phosphorus is
 * reported as P₂O₅ and potassium as K₂O, as in the source. Values may vary
 * from batch to batch — the page says so under the table.
 *
 * The source called the ash a "natural organic fertiliser". The page does
 * not: at 80.5 % ash and pH 11.2 it is a strongly alkaline mineral residue
 * that works mainly like lime, and the copy describes it that way.
 */

import type { Lang, TranslationKey } from '../i18n/ui';

export interface AshRow {
  label: TranslationKey;
  value: number;
  unit: '%' | 'mg/kg' | '';
  /** Picked out in the table — the two figures the copy relies on. */
  highlight?: boolean;
}

export const peatAsh: AshRow[] = [
  { label: 'peat.ash.row.ash', value: 80.5, unit: '%' },
  { label: 'peat.ash.row.organic', value: 19.5, unit: '%' },
  { label: 'peat.ash.row.carbon', value: 3.28, unit: '%' },
  { label: 'peat.ash.row.nitrogen', value: 0.11, unit: '%' },
  { label: 'peat.ash.row.phosphorus', value: 0.97, unit: '%' },
  { label: 'peat.ash.row.potassium', value: 0.13, unit: '%' },
  { label: 'peat.ash.row.calcium', value: 17.6, unit: '%', highlight: true },
  { label: 'peat.ash.row.magnesium', value: 0.97, unit: '%' },
  { label: 'peat.ash.row.copper', value: 21.9, unit: 'mg/kg' },
  { label: 'peat.ash.row.zinc', value: 9.8, unit: 'mg/kg' },
  { label: 'peat.ash.row.cobalt', value: 8.72, unit: 'mg/kg' },
  { label: 'peat.ash.row.nickel', value: 66.1, unit: 'mg/kg' },
  { label: 'peat.ash.row.manganese', value: 707, unit: 'mg/kg' },
  { label: 'peat.ash.row.ph', value: 11.2, unit: '', highlight: true },
];

/**
 * A value with its unit in the locale's style, matching the spec tables:
 *
 *   formatAshValue(calcium, 'en') -> '17.6 %'
 *   formatAshValue(calcium, 'et') -> '17,6 %'   (non-breaking space)
 */
export function formatAshValue(row: AshRow, lang: Lang): string {
  const number = lang === 'en' ? String(row.value) : String(row.value).replace('.', ',');
  return row.unit === '' ? number : `${number} ${row.unit}`;
}

/** One row's formatted value, by its label key. */
export function ashValue(label: TranslationKey, lang: Lang): string {
  const row = peatAsh.find((entry) => entry.label === label);
  if (row === undefined) throw new Error(`No ash row labelled ${label}`);
  return formatAshValue(row, lang);
}
