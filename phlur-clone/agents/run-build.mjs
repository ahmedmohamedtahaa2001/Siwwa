import { build } from './builder.mjs';
import { buildLiquid } from './builder-liquid.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';

const M = JSON.parse(await fs.readFile(new URL('../mapping/measurements.json', import.meta.url).pathname,'utf8'));
const T = JSON.parse(await fs.readFile(new URL('../mapping/siwa-tokens.json', import.meta.url).pathname,'utf8'));
const OUT = new URL('../generated/', import.meta.url).pathname;

const { files: cssFiles, spec } = await build(M, T, OUT);
const liquidFiles = buildLiquid(spec);
const all = { ...cssFiles, ...liquidFiles };

for (const [rel, content] of Object.entries(all)) {
  const p = path.join(OUT, rel);
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, content);
}
console.log(`✓ wrote ${Object.keys(all).length} files`);
for (const k of Object.keys(all).sort()) console.log('   ', k, `(${all[k].length}b)`);
