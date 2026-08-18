import { analyze } from './analyzer.mjs';
import fs from 'node:fs/promises';
const IN = new URL('../inspection/', import.meta.url).pathname;
const OUT = new URL('../analysis/', import.meta.url).pathname;
for (const p of ['home','product','collection']) {
  const r = await analyze(p, IN);
  await fs.writeFile(OUT + p + '.analysis.json', JSON.stringify(r, null, 2));
  console.log(`✓ ${p}: ${r.sections.length} sections, ${r.components.length} components, ${r.designSystem.typography.length} type styles`);
}
