#!/usr/bin/env node
/**
 * AGENT 6: ORCHESTRATOR
 * Runs the full pipeline and writes reports/final-report.json.
 *
 *   node agents/orchestrator.mjs            # analyse → map → build → validate → verify
 *   xvfb-run -a node agents/orchestrator.mjs --inspect   # also re-crawl phlur.com
 *
 * --inspect requires xvfb-run + real Chrome: phlur.com is behind a Cloudflare
 * bot challenge that headless Chromium does not clear.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { inspect } from './inspector.mjs';
import { analyze } from './analyzer.mjs';
import { measure, loadSiwaTokens, reconcile } from './mapper.mjs';
import { build } from './builder.mjs';
import { buildLiquid } from './builder-liquid.mjs';
import { validate } from './validator.mjs';
import { makeHarness, verify } from './verifier.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const D = {
  inspection: path.join(ROOT, 'inspection'),
  analysis: path.join(ROOT, 'analysis'),
  mapping: path.join(ROOT, 'mapping'),
  generated: path.join(ROOT, 'generated'),
  reports: path.join(ROOT, 'reports'),
  preview: path.join(ROOT, 'reports', 'preview'),
};
const SIWA_TOKENS = '/ahmed-taha-dev/Siwa/siwa-design-system/tokens/siwa-tokens.css';

const PAGES = ['home', 'product', 'collection'];
const TARGETS = [
  { name: 'home', url: 'https://phlur.com/' },
  { name: 'product', url: 'https://phlur.com/products/missing-person-100ml' },
  { name: 'collection', url: 'https://phlur.com/collections/perfumes' },
];

const log = (s) => console.log(s);
const write = (p, o) => fs.writeFile(p, JSON.stringify(o, null, 2));

async function main() {
  const doInspect = process.argv.includes('--inspect');
  for (const d of Object.values(D)) await fs.mkdir(d, { recursive: true });
  const report = { startedAt: new Date().toISOString(), phases: {} };

  /* ── PHASE 1 ─────────────────────────────────────────────────────── */
  if (doInspect) {
    log('\n🔍 Phase 1: Deep Inspection');
    const s = [];
    for (const t of TARGETS) {
      log(`  ▶ ${t.name}`);
      const r = await inspect(t, D.inspection);
      s.push({ name: t.name, nodes: r.nodeCount, sheets: r.stylesheets.length });
    }
    report.phases.inspection = s;
  } else {
    log('\n🔍 Phase 1: Deep Inspection — SKIPPED (reusing inspection/)');
    report.phases.inspection = 'reused';
  }

  /* ── PHASE 2 ─────────────────────────────────────────────────────── */
  log('🧠 Phase 2: Analysis');
  const analyses = {};
  for (const p of PAGES) {
    analyses[p] = await analyze(p, D.inspection);
    await write(path.join(D.analysis, `${p}.analysis.json`), analyses[p]);
  }
  report.phases.analysis = Object.fromEntries(PAGES.map((p) => [p, {
    sections: analyses[p].sections.length,
    components: analyses[p].components.length,
    typeStyles: analyses[p].designSystem.typography.length,
    warmth: analyses[p].designSystem.warmth.verdict,
    radii: analyses[p].designSystem.shape.radii.slice(0, 3),
  }]));
  log(`  ✓ ${PAGES.length} pages analysed`);

  /* ── PHASE 3 ─────────────────────────────────────────────────────── */
  log('🗺️  Phase 3: Mapping to siwa-design-system');
  const measurements = {};
  for (const p of PAGES) measurements[p] = await measure(p, D.inspection);
  const tokens = await loadSiwaTokens(SIWA_TOKENS);
  const rec = reconcile(measurements.home, tokens);
  await write(path.join(D.mapping, 'measurements.json'), measurements);
  await write(path.join(D.mapping, 'siwa-tokens.json'), tokens);
  await write(path.join(D.mapping, 'overrides.json'), rec);
  report.phases.mapping = { siwaTokens: Object.keys(tokens).length, overrides: rec.overrides.length, compatible: rec.compat.length };
  log(`  ✓ ${rec.overrides.length} overrides, ${rec.compat.length} already compatible`);

  /* ── PHASE 4 ─────────────────────────────────────────────────────── */
  log('🔨 Phase 4: Build');
  const { files: cssFiles, spec } = await build(measurements, tokens, D.generated);
  const all = { ...cssFiles, ...buildLiquid(spec) };
  for (const [rel, content] of Object.entries(all)) {
    const fp = path.join(D.generated, rel);
    await fs.mkdir(path.dirname(fp), { recursive: true });
    await fs.writeFile(fp, content);
  }
  report.phases.build = { files: Object.keys(all).length, list: Object.keys(all).sort() };
  log(`  ✓ ${Object.keys(all).length} files`);

  /* ── PHASE 5a ────────────────────────────────────────────────────── */
  log('🧪 Phase 5a: Design-system validation');
  const v = await validate(D.generated);
  await write(path.join(D.reports, 'validation.json'), v);
  const errs = v.findings.filter((f) => f.severity === 'error');
  report.phases.validation = {
    errors: errs.length,
    warnings: v.findings.length - errs.length,
    contrast: v.contrast,
    findings: v.findings,
  };
  log(`  ${errs.length === 0 ? '✓' : '✗'} ${errs.length} errors, ${v.findings.length - errs.length} warnings`);

  /* ── PHASE 5b ────────────────────────────────────────────────────── */
  log('📐 Phase 5b: Geometry verification vs phlur.com');
  const harness = await makeHarness(D.generated, path.join(D.preview, 'harness.html'));
  const ver = await verify(harness, measurements, D.preview);
  await write(path.join(D.reports, 'verification.json'), ver);
  report.phases.verification = {
    score: ver.score, passed: ver.passed, total: ver.total,
    failures: [...ver.results, ...ver.categorical].filter((r) => r.pass === false),
  };
  log(`  ✓ ${(ver.score * 100).toFixed(1)}% (${ver.passed}/${ver.total})`);

  /* ── PHASE 6 ─────────────────────────────────────────────────────── */
  report.finishedAt = new Date().toISOString();
  report.summary = {
    geometryScore: +(ver.score * 100).toFixed(1),
    designSystemErrors: errs.length,
    filesGenerated: Object.keys(all).length,
    documentedOverrides: rec.overrides.length,
  };
  await write(path.join(D.reports, 'final-report.json'), report);
  log('\n📊 final-report.json written');
  log(`   geometry ${report.summary.geometryScore}% · ds-errors ${errs.length} · files ${report.summary.filesGenerated}`);
}

main().catch((e) => { console.error('PIPELINE FAILED:', e); process.exit(1); });
