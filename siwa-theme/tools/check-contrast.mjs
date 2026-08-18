#!/usr/bin/env node
/**
 * check-contrast.mjs — SIWA theme, five-preset edition.
 *
 * DESIGN.md §9 CI rule 8: every colour pair in the system is recomputed and
 * checked against its floor. The design system's own version of this script
 * checks one palette read from tokens.json. This one parses
 * `assets/siwa-themes.css` and checks **every preset**, plus the pairs v3.0.0
 * never had tokens for: the label inks on the catalog stamps and on the gold
 * CTA, the silver (Impression) accent, `info`, and the inverted band.
 *
 *   node tools/check-contrast.mjs            # table + exit code
 *   node tools/check-contrast.mjs --md       # markdown, for pasting into a doc
 *   node tools/check-contrast.mjs --theme=nocturne
 *
 * Exit 0 = every pair in every preset passes. Exit 1 = at least one failure.
 * Run after ANY palette edit. If this script and a document disagree, the
 * document is wrong.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const themesCss = readFileSync(join(here, '..', 'assets', 'siwa-themes.css'), 'utf8');
const tokensCss = readFileSync(join(here, '..', 'assets', 'siwa-tokens.css'), 'utf8');

const THEMES = ['archive', 'oasis', 'desert', 'nocturne', 'papyrus'];

/* ── Parsing ───────────────────────────────────────────────────────────────
   Custom properties are collected per preset by merging, in document order,
   every rule whose selector targets that preset and nothing narrower. Blocks
   qualified by `:lang(ar)` or `.on-dark` are deliberately excluded: the first
   changes only type, the second is checked separately through the --band-*
   tokens it consumes.
   ------------------------------------------------------------------------ */

/** Strips comments so a hex inside prose is never mistaken for a value. */
const decomment = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Every `--name: value;` inside one declaration body. */
function declarations(body) {
  const out = {};
  for (const match of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    out[match[1].trim()] = match[2].trim();
  }
  return out;
}

/** Splits a stylesheet into [selector, body] pairs, ignoring at-rules. */
function rules(css) {
  const out = [];
  for (const match of decomment(css).matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    out.push([match[1].trim().replace(/\s+/g, ' '), match[2]]);
  }
  return out;
}

const baseTokens = (() => {
  const acc = {};
  for (const [selector, body] of rules(tokensCss)) {
    if (selector === ':root') Object.assign(acc, declarations(body));
  }
  for (const [selector, body] of rules(themesCss)) {
    if (selector === ':root') Object.assign(acc, declarations(body));
  }
  return acc;
})();

function tokensFor(theme) {
  const acc = { ...baseTokens };
  for (const [selector, body] of rules(themesCss)) {
    if (!selector.includes(`[data-theme='${theme}']`)) continue;
    if (selector.includes(':lang(') || selector.includes('.on-dark')) continue;
    // Only whole-scope blocks, never a component override like
    // `[data-theme='x'] .siwa-button--primary`.
    if (selector.trim() !== `[data-theme='${theme}']`) continue;
    Object.assign(acc, declarations(body));
  }
  return acc;
}

/* ── Colour maths (WCAG 2.x) ─────────────────────────────────────────────── */

function toRgb(value) {
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  }
  const rgb = v.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
}

const luminance = (rgb) => {
  const c = rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* ── The pair matrix ──────────────────────────────────────────────────────
   kind 'body'    → 4.5:1  (SC 1.4.3 normal text)
   kind 'nontext' → 3.0:1  (SC 1.4.11 UI components, meaningful graphics,
                            and large text ≥24px)
   ------------------------------------------------------------------------ */

const PAIRS = [
  // Ink on the two everyday grounds. Everything a customer reads.
  ['--colors-text', '--colors-background', 'body'],
  ['--colors-text', '--colors-surface', 'body'],
  ['--colors-text', '--colors-surface-raised', 'body'],
  ['--colors-text-secondary', '--colors-background', 'body'],
  ['--colors-text-secondary', '--colors-surface', 'body'],
  ['--colors-heading', '--colors-background', 'body'],
  ['--colors-heading', '--colors-surface', 'body'],
  ['--colors-heading-alt', '--colors-background', 'body'],

  // Semantic ink. A form error is read, so it takes the body floor.
  ['--colors-link', '--colors-background', 'body'],
  ['--colors-link', '--colors-surface', 'body'],
  ['--colors-success', '--colors-background', 'body'],
  ['--colors-success', '--colors-surface', 'body'],
  ['--colors-warning', '--colors-background', 'body'],
  ['--colors-warning', '--colors-surface', 'body'],
  ['--colors-danger', '--colors-background', 'body'],
  ['--colors-danger', '--colors-surface', 'body'],
  ['--colors-info', '--colors-background', 'body'],
  ['--colors-info', '--colors-surface', 'body'],
  ['--colors-tag', '--colors-background', 'body'],
  ['--colors-tag', '--colors-surface', 'body'],

  // The Impression line's accent. `silver-strong` is text-safe, `silver` is a
  // stroke or an icon and takes the non-text floor.
  ['--colors-silver-strong', '--colors-background', 'body'],
  ['--colors-silver-strong', '--colors-surface', 'body'],
  ['--colors-silver', '--colors-background', 'nontext'],
  ['--colors-silver', '--colors-surface', 'nontext'],

  // Gold. Never a body-text colour in any preset — it is only ever checked at
  // the non-text floor, which is what "rationed gold" means mechanically.
  ['--colors-primary', '--colors-background', 'nontext'],
  ['--colors-primary-strong', '--colors-background', 'nontext'],
  ['--colors-primary-strong', '--colors-surface', 'nontext'],

  // Control boundaries. SC 1.4.11 applies to every input, select and tile.
  ['--colors-border-strong', '--colors-background', 'nontext'],
  ['--colors-border-strong', '--colors-surface', 'nontext'],

  // The inverted band, and a card sitting inside it.
  ['--colors-on-dark', '--colors-surface-dark', 'body'],
  ['--colors-on-dark', '--band-surface', 'body'],
  ['--colors-secondary', '--colors-surface-dark', 'body'],
  ['--band-text-secondary', '--colors-surface-dark', 'body'],
  ['--band-border-strong', '--colors-surface-dark', 'nontext'],
];

/** Label-on-fill pairs: the first token's ink sits on the second token's fill. */
const FILLS = [
  ['--colors-on-primary', '--colors-primary', 'ink label on the gold CTA', 'body'],
  ['--colors-background', '--colors-text', 'label on an ink fill (CTA hover)', 'body'],
  ['--colors-on-original', '--colors-original', 'ORIGINAL stamp label', 'body'],
  ['--colors-on-impression', '--colors-impression', 'IMPRESSION stamp label', 'body'],
  ['--colors-on-verified', '--colors-verified', 'VERIFIED stamp label', 'body'],
  ['--colors-background', '--colors-danger', 'SALE stamp label', 'body'],
];

const floorFor = (kind) => (kind === 'body' ? 4.5 : 3.0);
const verdict = (r, kind) =>
  r < floorFor(kind) ? 'FAIL' : kind === 'body' && r >= 7 ? 'AAA' : 'AA';

/* ── Run ──────────────────────────────────────────────────────────────────── */

const asMarkdown = process.argv.includes('--md');
const only = process.argv.find((a) => a.startsWith('--theme='))?.split('=')[1];
const themes = only ? [only] : THEMES;

let failures = 0;
let tight = 0;
let checked = 0;

for (const theme of themes) {
  const tokens = tokensFor(theme);
  const rows = [];
  const missing = [];

  const resolve = (name) => {
    const raw = tokens[name];
    if (!raw) {
      missing.push(name);
      return null;
    }
    const rgb = toRgb(raw);
    if (!rgb) {
      missing.push(`${name} (unparseable: ${raw})`);
      return null;
    }
    return { raw, rgb };
  };

  for (const [fg, bg, kind] of PAIRS) {
    const a = resolve(fg);
    const b = resolve(bg);
    if (!a || !b) continue;
    rows.push({ label: `${fg} ${a.raw}`, ground: `${bg} ${b.raw}`, r: ratio(a.rgb, b.rgb), kind });
  }

  for (const [inkTok, fillTok, desc, kind] of FILLS) {
    const a = resolve(inkTok);
    const b = resolve(fillTok);
    if (!a || !b) continue;
    rows.push({ label: desc, ground: `${fillTok} ${b.raw}`, r: ratio(a.rgb, b.rgb), kind });
  }

  checked += rows.length;
  const bad = rows.filter((x) => x.r < floorFor(x.kind));
  failures += bad.length;

  const near = rows.filter((x) => {
    const margin = x.r - floorFor(x.kind);
    return margin >= 0 && margin < 0.05;
  });
  tight += near.length;

  if (asMarkdown) {
    console.log(`\n### ${theme}\n`);
    console.log('| Pair | Ground | Ratio | Floor | Verdict |');
    console.log('|---|---|---|---|---|');
    for (const x of rows) {
      console.log(
        `| ${x.label} | ${x.ground} | ${x.r.toFixed(2)}:1 | ${floorFor(x.kind).toFixed(1)}:1 | **${verdict(x.r, x.kind)}** |`
      );
    }
    continue;
  }

  console.log(`\n── ${theme} ${'─'.repeat(Math.max(0, 60 - theme.length))}`);
  if (missing.length) {
    console.log(`  ⚠ ${missing.length} token(s) not resolvable in this preset:`);
    for (const m of [...new Set(missing)]) console.log(`     ${m}`);
  }
  for (const x of rows) {
    const v = verdict(x.r, x.kind);
    console.log(
      `  ${v === 'FAIL' ? '✗' : '✓'} ${x.r.toFixed(2).padStart(6)}:1  ${v.padEnd(4)} ${x.label} on ${x.ground}`
    );
  }
  if (near.length) {
    console.log(`  ⚠ within 0.05 of the floor — do not nudge by eye:`);
    for (const x of near) console.log(`     ${x.label} on ${x.ground} — ${x.r.toFixed(2)}:1`);
  }
}

if (!asMarkdown) {
  console.log('');
  if (failures) {
    console.error(`✗ ${failures} contrast failure(s) across ${themes.length} preset(s).`);
    process.exit(1);
  }
  console.log(`✓ ${checked} pairs checked across ${themes.length} preset(s), 0 failures.`);
  if (tight) console.log(`  (${tight} sit within 0.05 of their floor by construction.)`);
}
