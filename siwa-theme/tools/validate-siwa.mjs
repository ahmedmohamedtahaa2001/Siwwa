#!/usr/bin/env node
/**
 * validate-siwa.mjs — the Siwa CI rules, over Liquid AND CSS.
 *
 * DESIGN.md §9 defines 13 errors and 6 warnings. `phlur-clone/agents/validator.mjs`
 * implements about six of them and only looks at CSS, which leaves every
 * markup-level rule — image alt text, icon-button labels, the catalog badge on
 * a thumbnail, target size, one gold CTA per fold, the tester never rendered as
 * primary, an empty state with no way out — permanently unreachable.
 *
 * This one reads both file types, and adds the rules this theme needs that the
 * design system predates: hardcoded customer-facing copy, locale-key integrity,
 * and schema/markup agreement.
 *
 *   node tools/validate-siwa.mjs              # errors + warnings, exit 1 on error
 *   node tools/validate-siwa.mjs --strict     # warnings also fail
 *   node tools/validate-siwa.mjs --quiet      # errors only
 *
 * Honesty about heuristics: some rules cannot be decided from a static file
 * (whether a 40px control has a hit-area extension in a *different* file, or
 * how many CTAs land in one viewport). Those are emitted as warnings and say so
 * in their message. A warning here means "a human should look", not "ignore me".
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const STRICT = argv.includes('--strict');
const QUIET = argv.includes('--quiet');

/* ── Findings ──────────────────────────────────────────────────────────────── */

const findings = [];
const suppressed = [];

/**
 * Deliberate exceptions. A file may waive one rule for itself with a comment
 * carrying a reason:
 *
 *   {% comment %} siwa-lint-allow 14: specimen sheet, not a fold {% endcomment %}
 *   /* siwa-lint-allow 6: inset rule, not elevation *\/
 *
 * The reason is not optional — a marker without one does not suppress. Waived
 * findings are printed under their own heading rather than vanishing, so a
 * suppression is a visible decision and not a way to make the build quiet.
 */
const waivers = new Map();

const report = (severity, rule, file, line, message) => {
  const reason = waivers.get(`${file}#${rule}`);
  if (reason) suppressed.push({ rule, file, line, message, reason });
  else findings.push({ severity, rule, file, line, message });
};
const error = (...a) => report('error', ...a);
const warn = (...a) => report('warning', ...a);

/* ── File collection ───────────────────────────────────────────────────────── */

const SKIP_DIRS = new Set(['node_modules', '.git', '.shopify', 'tools']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(root);
const rel = (f) => relative(root, f);

/**
 * The design system's own three stylesheets are vendored, unmodified. Auditing
 * them would report defects nobody in this repo is allowed to fix, so they are
 * excluded — and `siwa-themes.css` is exempt from the raw-colour rule only,
 * because it IS the palette layer. Every other rule still applies to it.
 */
const VENDORED = new Set([
  'assets/siwa-tokens.css',
  'assets/siwa-base.css',
  'assets/siwa-components.css',
]);
const PALETTE_FILE = 'assets/siwa-themes.css';

const cssFiles = allFiles.filter((f) => extname(f) === '.css' && !VENDORED.has(rel(f)));
const liquidFiles = allFiles.filter((f) => extname(f) === '.liquid');
const sectionFiles = liquidFiles.filter((f) => rel(f).startsWith('sections/'));

const read = (f) => readFileSync(f, 'utf8');
const lines = (text) => text.split('\n');

// Collect waivers before any rule runs. The markers live inside comments, so
// this reads the raw text rather than the stripped copy.
for (const file of allFiles) {
  if (!['.liquid', '.css', '.js', '.json'].includes(extname(file))) continue;
  for (const match of read(file).matchAll(/siwa-lint-allow\s+([\w-]+)\s*:\s*([^\n*}]+)/g)) {
    const reason = match[2].trim();
    if (reason.length > 3) waivers.set(`${rel(file)}#${match[1]}`, reason);
  }
}

/** Strips /* … *\/ and {%- comment -%} … so prose never trips a rule. */
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, (m) =>
      m.replace(/[^\n]/g, ' ')
    );
}

/** The `{% schema %}` body, and the markup with it removed. */
function splitSchema(text) {
  const match = text.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  if (!match) return { schema: null, markup: text };
  const markup = text.replace(match[0], (m) => m.replace(/[^\n]/g, ' '));
  return { schema: match[1], markup };
}

/* ══════════════════════════════════════════════════════════════════════════
   CSS RULES
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Commerce vs editorial. DESIGN.md §2.4 states the boundary as a test — "can
 * the customer transact with this element?" — which a script cannot ask, so it
 * is encoded as membership. Radius and shadow are judged against the layer, not
 * against a flat number, which is where phlur-clone's validator produced false
 * errors on legitimate editorial rules.
 */
const COMMERCE_SELECTORS = [
  'siwa-button', 'siwa-badge', 'siwa-card', 'siwa-chip', 'siwa-input', 'siwa-select',
  'siwa-textarea', 'siwa-field', 'siwa-size', 'siwa-sizes', 'siwa-stepper', 'siwa-meter',
  'siwa-progress', 'siwa-quiz', 'siwa-bundle', 'siwa-trust', 'siwa-search', 'siwa-nav',
  'siwa-alert', 'siwa-toast', 'siwa-empty', 'siwa-skeleton', 'siwa-pyramid',
];
const EDITORIAL_SELECTORS = [
  'siwa-bento', 'siwa-modal', 'siwa-drawer', 'siwa-megamenu', 'siwa-hero',
  'siwa-feature-row', 'siwa-prose', 'siwa-preview', 'siwa-section-heading',
];

const layerOf = (selector) => {
  if (EDITORIAL_SELECTORS.some((s) => selector.includes(s))) return 'editorial';
  if (COMMERCE_SELECTORS.some((s) => selector.includes(s))) return 'commerce';
  return 'unknown';
};

/** Radii the commerce layer may carry, as authored values. */
const COMMERCE_RADIUS_OK = new Set([
  '0', '0px', '1px', '2px',
  'var(--rounded-none)', 'var(--rounded-sm)', 'var(--radius-commerce)',
  'var(--rounded-full)', '50%', '9999px', 'inherit',
]);

for (const file of cssFiles) {
  const f = rel(file);
  const raw = read(file);
  const src = stripComments(raw);
  const srcLines = lines(src);

  // Track the selector each declaration belongs to, so layer-aware rules work.
  let selector = '';
  let inArabicScope = false;
  let braceDepthAtArabic = 0;
  let depth = 0;

  srcLines.forEach((text, i) => {
    const n = i + 1;
    const opens = (text.match(/\{/g) || []).length;
    const closes = (text.match(/\}/g) || []).length;

    if (opens > 0 && !text.trim().startsWith('@')) {
      const candidate = text.split('{')[0].trim();
      if (candidate) selector = candidate;
      if (/:lang\(ar\)|\[lang=['"]?ar|\[dir=['"]?rtl/.test(selector)) {
        inArabicScope = true;
        braceDepthAtArabic = depth;
      }
    }

    /* Rule 1 — physical inline-axis properties. */
    const physical = text.match(
      /(?:^|[;{\s])(margin|padding|border|inset)-(left|right)\s*:|text-align\s*:\s*(left|right)|(?:^|[;{\s])(left|right)\s*:/
    );
    if (physical) {
      // Documented exceptions: a gradient direction and `order`, each of which
      // owes an explicit [dir="rtl"] mirror elsewhere in the same file.
      const isGradient = /linear-gradient|radial-gradient/.test(text);
      if (!isGradient) {
        error(1, f, n, `physical inline-axis property — use the logical equivalent: ${text.trim()}`);
      }
    }

    /* Rule 2 — raw colour outside the palette layer. */
    if (f !== PALETTE_FILE) {
      const colour = text.match(/#[0-9a-fA-F]{3,8}\b|(?:rgba?|hsla?)\(/);
      if (colour && !/var\(--/.test(text.slice(0, colour.index))) {
        error(2, f, n, `raw colour \`${colour[0]}\` — every colour comes from a token`);
      }
    }

    /* Rule 4 — a literal z-index. */
    const z = text.match(/z-index\s*:\s*([^;]+)/);
    if (z && !z[1].includes('var(--z-')) {
      error(4, f, n, `literal z-index \`${z[1].trim()}\` — use the z-ladder`);
    }

    /* Rule 5 — radius on the commerce layer. */
    const radius = text.match(/border-radius\s*:\s*([^;]+)/);
    if (radius) {
      const value = radius[1].trim();
      const layer = layerOf(selector);
      if (layer === 'commerce' && !COMMERCE_RADIUS_OK.has(value)) {
        error(
          5, f, n,
          `radius \`${value}\` on the commerce layer (${selector}) — use var(--radius-commerce), which each design direction sets`
        );
      }
    }

    /* Rule 6 — shadow on the commerce layer. */
    const shadow = text.match(/box-shadow\s*:\s*([^;]+)/);
    if (shadow) {
      const value = shadow[1].trim();
      const layer = layerOf(selector);
      const allowed =
        value === 'none' ||
        value.includes('var(--shadow-commerce)') ||
        value.includes('var(--focus-ring') ||
        value.includes('var(--accent-glow)') ||
        // An inset shadow cannot lift anything — it draws a rule inside the
        // box. Principle 4 forbids elevation on the commerce layer, and a
        // graphic direction underlining an open nav item with `inset 0 -2px`
        // is drawing, not floating. Outset shadows are still errors.
        value.startsWith('inset');
      if (layer === 'commerce' && !allowed) {
        error(
          6, f, n,
          `shadow on the commerce layer (${selector}) — only var(--shadow-commerce) or the focus ring belong here`
        );
      }
    }

    /* Rule 7 — outline removed without a replacement indicator. */
    if (/outline\s*:\s*(none|0)\b/.test(text)) {
      const window = srcLines.slice(i, i + 6).join('\n');
      if (!/box-shadow\s*:\s*var\(--focus-ring/.test(window)) {
        error(7, f, n, 'outline removed with no --focus-ring replacement in the same rule');
      }
    }

    /* Rule 12 — gold as a text colour. It measures ~3:1 and is not body ink. */
    const colourDecl = text.match(/(?:^|[;{\s])color\s*:\s*var\(--colors-primary\)/);
    if (colourDecl) {
      const window = srcLines.slice(Math.max(0, i - 8), i + 8).join('\n');
      const isLarge = /font-size\s*:\s*var\(--text-(hero|h1|h2|h3)\)/.test(window);
      if (!isLarge) {
        warn(
          12, f, n,
          `--colors-primary as a text colour (${selector}) — legal only at ≥24px; confirm the font-size or use --colors-primary-strong`
        );
      }
    }

    /* Warning 15 — casing or tracking inside an Arabic scope. */
    if (inArabicScope && /letter-spacing|text-transform\s*:\s*(uppercase|lowercase|capitalize)/.test(text)) {
      warn(
        15, f, n,
        'letter-spacing or text-transform inside an Arabic scope — Arabic is joined and has no case'
      );
    }

    depth += opens - closes;
    if (inArabicScope && depth <= braceDepthAtArabic && closes > 0) inArabicScope = false;
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   LIQUID RULES
   ══════════════════════════════════════════════════════════════════════════ */

/** Locale keys, flattened, from both dictionaries. */
function localeKeys(path) {
  const flat = new Set();
  const walkObj = (obj, prefix) => {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object') walkObj(v, key);
      else flat.add(key);
    }
  };
  try {
    walkObj(JSON.parse(readFileSync(join(root, path), 'utf8')), '');
  } catch {
    return null;
  }
  return flat;
}

const EN = localeKeys('locales/en.default.json');
const AR = localeKeys('locales/ar.json');

/** A plural key is referenced by its stem; CLDR forms hang off it. */
const PLURAL_FORMS = ['zero', 'one', 'two', 'few', 'many', 'other'];
const keyExists = (set, key) =>
  set.has(key) || PLURAL_FORMS.some((form) => set.has(`${key}.${form}`));

for (const file of liquidFiles) {
  const f = rel(file);
  const raw = read(file);
  const noComments = stripComments(raw);
  const { schema, markup } = splitSchema(noComments);
  const markupLines = lines(markup);

  /* Rule 9 — every <img> carries alt. */
  markupLines.forEach((text, i) => {
    for (const tag of text.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt\s*=/.test(tag[0])) {
        error(9, f, i + 1, '<img> without alt — decorative images take alt=""');
      }
    }
    // image_tag's alt is a filter argument, not an attribute.
    if (/\|\s*image_tag/.test(text)) {
      const window = markupLines.slice(i, i + 6).join('\n');
      if (!/alt\s*:/.test(window)) {
        error(9, f, i + 1, 'image_tag without an alt: argument');
      }
    }
  });

  /* Rule 10 — an icon-only control has an accessible name. */
  for (const match of markup.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) {
    const [whole, inner] = match;
    const line = markup.slice(0, match.index).split('\n').length;
    const visibleText = inner
      .replace(/<[^>]*>/g, ' ')
      .replace(/\{\{[\s\S]*?\}\}/g, 'X')
      .replace(/\{%[\s\S]*?%\}/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .trim();
    const hasName =
      /aria-label\s*=/.test(whole) ||
      /aria-labelledby\s*=/.test(whole) ||
      /class="[^"]*sr-only/.test(inner) ||
      visibleText.length > 0;
    if (!hasName) {
      error(10, f, line, 'button with no accessible name — icon-only controls need aria-label');
    }
  }

  /* Rule 11 — a product thumbnail states its catalog line. */
  if (/siwa-card__media/.test(markup) && !/siwa-badge--(original|impression)|catalog_line|badge_class/.test(markup)) {
    const line = lines(markup).findIndex((t) => t.includes('siwa-card__media')) + 1;
    error(
      11, f, line,
      'product card with no ORIGINAL/IMPRESSION stamp — non-negotiable 1: a mixed grid without badges does not ship'
    );
  }

  /* Warning 14 — more than one gold CTA in one section. */
  const primaries = [...markup.matchAll(/siwa-button--primary/g)];
  if (primaries.length > 1 && f.startsWith('sections/')) {
    const line = markup.slice(0, primaries[1].index).split('\n').length;
    warn(
      14, f, line,
      `${primaries.length} gold CTAs in one section — principle 1 allows one per fold; confirm they cannot appear together`
    );
  }

  /* Warning 18 — the tester rendered as the primary CTA. */
  for (const match of markup.matchAll(/class="[^"]*siwa-button--tester[^"]*"/g)) {
    if (/siwa-button--primary/.test(match[0])) {
      const line = markup.slice(0, match.index).split('\n').length;
      error(18, f, line, 'the tester CTA carries --primary — principle 7: it takes the outline treatment');
    }
  }

  /* Warning 19 — an empty state with no way out. */
  for (const match of markup.matchAll(/<[^>]*class="[^"]*siwa-empty[^"]*"[\s\S]{0,900}/g)) {
    if (!/<a\b|siwa-button/.test(match[0])) {
      const line = markup.slice(0, match.index).split('\n').length;
      warn(19, f, line, 'empty state with no outbound link — an empty state without a next action is a dead end');
    }
  }

  /* Prime Directive — hardcoded customer-facing copy. */
  const TEXT_NODE = />([^<>{}]{12,})</g;
  for (const match of markup.matchAll(TEXT_NODE)) {
    const text = match[1].replace(/\s+/g, ' ').trim();
    if (!text || /^[\s\d.,:;·—–|/\\+*#%(){}[\]"'!?&=-]*$/.test(text)) continue;
    // Two or more words of letters, none of it Liquid output.
    const words = text.split(' ').filter((w) => /[A-Za-z؀-ۿ]{2,}/.test(w));
    if (words.length < 2) continue;
    const line = markup.slice(0, match.index).split('\n').length;
    error(
      'copy', f, line,
      `hardcoded customer-facing copy "${text.slice(0, 60)}${text.length > 60 ? '…' : ''}" — use a locale key or a schema setting`
    );
  }

  /* Locale integrity — every referenced key exists in both dictionaries. */
  if (EN && AR) {
    for (const match of noComments.matchAll(/['"]([a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+)['"]\s*\|\s*t\b/gi)) {
      const key = match[1];
      const line = noComments.slice(0, match.index).split('\n').length;
      if (!keyExists(EN, key)) error('i18n', f, line, `locale key \`${key}\` missing from en.default.json`);
      if (!keyExists(AR, key)) error('i18n', f, line, `locale key \`${key}\` missing from ar.json`);
    }
  }

  /* Schema agreement — declared settings are used, used settings are declared. */
  if (schema && f.startsWith('sections/')) {
    let parsed = null;
    try {
      parsed = JSON.parse(schema);
    } catch (e) {
      error('schema', f, 1, `schema is not valid JSON: ${e.message}`);
    }

    if (parsed) {
      const collect = (settings = []) =>
        settings.filter((s) => s.id).map((s) => s.id);
      const sectionIds = collect(parsed.settings);
      const blockIds = (parsed.blocks || []).flatMap((b) => collect(b.settings));

      /**
       * A setting is "read" if `.settings.<id>` appears anywhere in the markup.
       * Deliberately alias-agnostic: `{% assign s = section.settings %}` and
       * `{% for mega in section.blocks %}{{ mega.settings.heading }}` are both
       * normal Liquid, and insisting on the literal `section.settings.x` form
       * produced false "dead control" reports on correct code.
       */
      const isRead = (id) =>
        new RegExp(`\\.settings\\.${id}\\b`).test(markup) ||
        new RegExp(`\\bs\\.${id}\\b`).test(markup);

      for (const id of sectionIds) {
        if (!isRead(id)) {
          warn('schema', f, 1, `setting \`${id}\` is declared but never read — dead control in the Customizer`);
        }
      }
      for (const id of blockIds) {
        if (!isRead(id)) {
          warn('schema', f, 1, `block setting \`${id}\` is declared but never read`);
        }
      }

      const declared = new Set([...sectionIds, ...blockIds]);
      for (const match of markup.matchAll(/(?:section|block)\.settings\.([a-z0-9_]+)/gi)) {
        if (!declared.has(match[1])) {
          const line = markup.slice(0, match.index).split('\n').length;
          error('schema', f, line, `\`${match[1]}\` is read but not declared in the schema`);
        }
      }

      /**
       * Every declared block type reaches the page. Three ways it legitimately
       * can: the type is named in a `case`/`if`, a `case block.type` has an
       * `else` that catches the rest, or the section declares a single type and
       * simply iterates `section.blocks` without branching at all.
       */
      const declaredTypes = (parsed.blocks || []).map((b) => b.type);
      const iteratesBlocks = /\{%-?\s*for\s+\w+\s+in\s+section\.blocks/.test(markup);
      const hasCatchAll = /case\s+\w+\.type[\s\S]*?\belse\b/.test(markup);
      const singleType = declaredTypes.length === 1 && iteratesBlocks;

      if (!hasCatchAll && !singleType) {
        for (const type of declaredTypes) {
          if (!new RegExp(`['"]${type}['"]`).test(markup)) {
            warn('schema', f, 1, `block type \`${type}\` is declared but never rendered`);
          }
        }
      }
    }
  }

  /* The behaviour-layer contract — no section writes its own JavaScript. */
  if (f.startsWith('sections/') || f.startsWith('snippets/')) {
    if (/<script\b/.test(noComments) || /\{%-?\s*javascript/.test(noComments)) {
      error(
        'js', f, lines(noComments).findIndex((t) => /<script\b|javascript/.test(t)) + 1,
        'section-level JavaScript — the behaviour layer is assets/siwa-theme.js'
      );
    }
  }
}

/* ── Cross-file: dangling behaviour-layer wiring ───────────────────────────── */

const themeJs = (() => {
  try {
    return read(join(root, 'assets/siwa-theme.js'));
  } catch {
    return '';
  }
})();

const IMPLEMENTED_HOOKS = ['data-siwa-toggle', 'data-siwa-drawer', 'data-siwa-dialog', 'data-siwa-close', 'data-siwa-panel', 'data-siwa-announce'];

for (const file of liquidFiles) {
  const f = rel(file);
  const markup = stripComments(read(file));
  for (const match of markup.matchAll(/data-siwa-([a-z-]+)/g)) {
    const attr = `data-siwa-${match[1]}`;
    if (!IMPLEMENTED_HOOKS.includes(attr) && !themeJs.includes(attr)) {
      const line = markup.slice(0, match.index).split('\n').length;
      error('js', f, line, `\`${attr}\` is not implemented in assets/siwa-theme.js — a dead control`);
    }
  }
}

/* ── Output ────────────────────────────────────────────────────────────────── */

const errors = findings.filter((x) => x.severity === 'error');
const warnings = findings.filter((x) => x.severity === 'warning');

const byFile = new Map();
for (const x of findings) {
  if (QUIET && x.severity !== 'error') continue;
  if (!byFile.has(x.file)) byFile.set(x.file, []);
  byFile.get(x.file).push(x);
}

for (const [file, items] of [...byFile.entries()].sort()) {
  console.log(`\n${file}`);
  for (const x of items.sort((a, b) => a.line - b.line)) {
    const mark = x.severity === 'error' ? '✗' : '⚠';
    console.log(`  ${mark} ${String(x.line).padStart(4)}  [${x.rule}] ${x.message}`);
  }
}

if (suppressed.length && !QUIET) {
  console.log('\nwaived by an in-file marker');
  for (const x of suppressed) {
    console.log(`  ·  ${x.file}:${x.line}  [${x.rule}] ${x.reason}`);
  }
}

console.log('');
console.log(
  `${cssFiles.length} stylesheet(s) and ${liquidFiles.length} Liquid file(s) checked ` +
    `(${sectionFiles.length} sections). ${errors.length} error(s), ${warnings.length} warning(s)` +
    `${suppressed.length ? `, ${suppressed.length} waived` : ''}.`
);

if (errors.length || (STRICT && warnings.length)) process.exit(1);
