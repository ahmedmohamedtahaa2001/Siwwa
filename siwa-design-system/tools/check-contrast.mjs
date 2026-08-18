#!/usr/bin/env node
/**
 * check-contrast.mjs — Siwa Design System v3.0.0
 *
 * Implements CI rule 8 (DESIGN.md §9): every colour pair in the system is
 * recomputed from tokens/tokens.json and checked against its floor.
 *
 *   node tools/check-contrast.mjs          # table + exit code
 *   node tools/check-contrast.mjs --md     # emit the §2.1 markdown table
 *
 * Exit 0 = every pair passes. Exit 1 = at least one failure.
 * Run this after ANY palette edit. The numbers in DESIGN.md §2.1 are this
 * script's output — if they drift, the document is wrong, not the script.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(readFileSync(join(here, '..', 'tokens', 'tokens.json'), 'utf8'));

const t = name => {
  const v = T[name];
  if (!v) throw new Error(`token ${name} not found in tokens.json`);
  return v;
};

/** WCAG 2.x relative luminance. */
const luminance = hex => {
  const c = [1, 3, 5]
    .map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

/** WCAG 2.x contrast ratio. Order-independent. */
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const BG = t('--colors-background');
const SF = t('--colors-surface');
const DK = t('--colors-surface-dark');

// kind: 'body' → 4.5:1 (SC 1.4.3) · 'nontext' → 3:1 (SC 1.4.11 / large text)
const PAIRS = [
  ['--colors-text',           BG, 'background',   'body'],
  ['--colors-text',           SF, 'surface',      'body'],
  ['--colors-text-secondary', BG, 'background',   'body'],
  ['--colors-text-secondary', SF, 'surface',      'body'],
  ['--colors-heading',        BG, 'background',   'body'],
  ['--colors-heading-alt',    BG, 'background',   'body'],
  ['--colors-link',           BG, 'background',   'body'],
  ['--colors-link',           SF, 'surface',      'body'],
  ['--colors-danger',         BG, 'background',   'body'],
  ['--colors-danger',         SF, 'surface',      'body'],
  ['--colors-success',        BG, 'background',   'body'],
  ['--colors-success',        SF, 'surface',      'body'],
  ['--colors-warning',        BG, 'background',   'body'],
  ['--colors-warning',        SF, 'surface',      'body'],
  ['--colors-tag',            BG, 'background',   'body'],
  ['--colors-tag',            SF, 'surface',      'body'],
  ['--colors-primary-strong', BG, 'background',   'nontext'],
  ['--colors-primary-strong', SF, 'surface',      'nontext'],
  ['--colors-border-strong',  BG, 'background',   'nontext'],
  ['--colors-border-strong',  SF, 'surface',      'nontext'],
  ['--colors-primary',        BG, 'background',   'nontext'],
  ['--colors-on-dark',        DK, 'surface-dark', 'body'],
  ['--colors-secondary',      DK, 'surface-dark', 'body'],
];

// Label-on-fill pairs: the label token sits ON the fill token.
const FILLS = [
  ['--colors-text',       '--colors-primary',      'ink label on gold CTA',        'body'],
  ['--colors-background', '--colors-text',         'background label on ink fill', 'body'],
  ['--colors-background', '--colors-original',     'ORIGINAL stamp label',         'body'],
  ['--colors-on-dark',    '--colors-impression',   'IMPRESSION stamp label',       'body'],
  ['--colors-background', '--colors-verified',     'VERIFIED stamp label',         'body'],
  ['--colors-background', '--colors-danger',       'SALE stamp label',             'body'],
];

const floorFor = kind => (kind === 'body' ? 4.5 : 3.0);
const verdict = (r, kind) =>
  r < floorFor(kind) ? 'FAIL' : kind === 'body' && r >= 7 ? 'AAA' : 'AA';

const rows = [];
for (const [token, ground, groundName, kind] of PAIRS) {
  const fg = t(token);
  rows.push({ label: `${token} \`${fg}\``, ground: groundName, r: ratio(fg, ground), kind });
}
for (const [labelTok, fillTok, desc, kind] of FILLS) {
  rows.push({
    label: desc,
    ground: `${fillTok} \`${t(fillTok)}\``,
    r: ratio(t(labelTok), t(fillTok)),
    kind,
  });
}

const failures = rows.filter(x => x.r < floorFor(x.kind));
const asMarkdown = process.argv.includes('--md');

if (asMarkdown) {
  console.log('| Token | Ground | Ratio | Floor | Verdict |');
  console.log('|---|---|---|---|---|');
  for (const x of rows) {
    console.log(
      `| ${x.label} | ${x.ground} | ${x.r.toFixed(2)}:1 | ${floorFor(x.kind).toFixed(1)}:1 | **${verdict(x.r, x.kind)}** |`
    );
  }
} else {
  for (const x of rows) {
    const v = verdict(x.r, x.kind);
    const mark = v === 'FAIL' ? '✗' : '✓';
    console.log(
      `${mark} ${x.r.toFixed(2).padStart(6)}:1  ${v.padEnd(4)} ${x.label} on ${x.ground}`
    );
  }
  console.log('');
}

// Two pairs sit within 0.05 of their floor by design. Warn so that an edit
// that quietly erodes them is visible before it becomes a failure.
const tight = rows.filter(x => {
  const margin = x.r - floorFor(x.kind);
  return margin >= 0 && margin < 0.05;
});
if (tight.length && !asMarkdown) {
  console.log(`⚠ ${tight.length} pair(s) within 0.05 of the floor — do not nudge by eye:`);
  for (const x of tight) console.log(`   ${x.label} on ${x.ground} — ${x.r.toFixed(2)}:1`);
  console.log('');
}

if (failures.length) {
  console.error(`✗ ${failures.length} contrast failure(s):`);
  for (const x of failures) {
    console.error(
      `   ${x.label} on ${x.ground} — ${x.r.toFixed(2)}:1, needs ${floorFor(x.kind).toFixed(1)}:1`
    );
  }
  process.exit(1);
}

if (!asMarkdown) console.log(`✓ ${rows.length} pairs checked, 0 failures.`);
