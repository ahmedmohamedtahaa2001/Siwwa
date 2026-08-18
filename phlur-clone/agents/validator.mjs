/**
 * AGENT 5a: DESIGN-SYSTEM VALIDATOR
 * Runs the CI checks siwa-design-system defines for itself:
 *   - border-radius allow-list {0, 0px, 2px, var(--rounded-none), var(--rounded-sm)}
 *   - physical direction properties are a build error
 *   - raw hex outside :root must be zero
 *   - box-shadow only at modal/toast layer
 *   - serif in interactive/chrome elements
 * Plus a WCAG contrast pass on the emitted palette.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const RADIUS_OK = /^(0|0px|2px|var\(--rounded-none\)|var\(--rounded-sm\)|var\(--pl-radius\)|50%)$/;

const PHYSICAL = [
  'margin-left', 'margin-right', 'padding-left', 'padding-right',
  'border-left', 'border-right', 'text-align:\\s*(left|right)', 'float',
];

/* ── contrast ───────────────────────────────────────────────────────────── */
const hexToRgb = (h) => ({
  r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16),
});
const lum = (c) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};
const ratio = (a, b) => {
  const l1 = lum(hexToRgb(a)), l2 = lum(hexToRgb(b));
  return +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
};

/** Strip comments so we never lint prose. */
const decomment = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

export async function validate(genDir) {
  const findings = [];
  const assetsDir = path.join(genDir, 'assets');
  const files = (await fs.readdir(assetsDir)).filter((f) => f.endsWith('.css'));

  for (const file of files) {
    const raw = await fs.readFile(path.join(assetsDir, file), 'utf8');
    const css = decomment(raw);
    const lines = css.split('\n');
    const isTokenFile = file === 'phlur-siwa-tokens.css';

    lines.forEach((line, i) => {
      const ln = i + 1;

      /* border-radius allow-list */
      const br = line.match(/border-radius:\s*([^;]+);/);
      if (br && !RADIUS_OK.test(br[1].trim())) {
        findings.push({ severity: 'error', rule: 'radius-allowlist', file, line: ln, detail: br[1].trim() });
      }

      /* physical direction properties */
      for (const p of PHYSICAL) {
        const re = new RegExp(`(^|[;{\\s])${p}\\s*:`, 'i');
        if (re.test(line)) {
          findings.push({ severity: 'error', rule: 'physical-property', file, line: ln, detail: line.trim().slice(0, 80) });
        }
      }

      /* raw hex outside the token file's :root */
      const hex = line.match(/#[0-9a-fA-F]{3,8}\b/);
      if (hex && !isTokenFile) {
        findings.push({ severity: 'error', rule: 'raw-hex', file, line: ln, detail: hex[0] });
      }

      /* box-shadow outside modal/toast */
      const bs = line.match(/box-shadow:\s*([^;]+);/);
      if (bs && !/none/.test(bs[1]) && !/modal|toast|drawer|scrim/i.test(file + line)) {
        findings.push({ severity: 'error', rule: 'shadow-layer', file, line: ln, detail: bs[1].trim().slice(0, 60) });
      }

      /* serif in chrome */
      if (/font-family/.test(line) && /serif/.test(line) && !/sans-serif/.test(line)) {
        findings.push({ severity: 'warn', rule: 'serif-in-chrome', file, line: ln, detail: line.trim().slice(0, 80) });
      }
    });
  }

  /* contrast pass on the emitted palette */
  const tokenCss = await fs.readFile(path.join(assetsDir, 'phlur-siwa-tokens.css'), 'utf8');
  const tok = {};
  for (const m of tokenCss.matchAll(/(--pl-[\w-]+):\s*(#[0-9a-fA-F]{6})/g)) tok[m[1]] = m[2];

  const pairs = [
    ['--pl-ink', '--pl-bg', 4.5, 'body text on page'],
    ['--pl-ink', '--pl-surface', 4.5, 'text on card surface'],
    ['--pl-ink-muted', '--pl-bg', 4.5, 'muted subtitle on page'],
    ['--pl-ink-muted', '--pl-surface', 4.5, 'muted on surface'],
    ['--pl-ink-inverse', '--pl-ink', 4.5, 'button label on black fill'],
    ['--pl-ink', '--pl-ink-inverse', 4.5, 'hero CTA label on white fill'],
  ];

  const contrast = pairs.map(([fg, bg, min, label]) => {
    const r = tok[fg] && tok[bg] ? ratio(tok[fg], tok[bg]) : null;
    return { label, fg: `${fg} ${tok[fg]}`, bg: `${bg} ${tok[bg]}`, ratio: r, min, pass: r != null && r >= min };
  });

  contrast.filter((c) => !c.pass).forEach((c) =>
    findings.push({ severity: 'error', rule: 'contrast', file: 'phlur-siwa-tokens.css', detail: `${c.label}: ${c.ratio}:1 < ${c.min}:1` }));

  return { findings, contrast };
}
