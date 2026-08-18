import { makeHarness, verify } from './verifier.mjs';
import fs from 'node:fs/promises';
const GEN = new URL('../generated/', import.meta.url).pathname;
const REP = new URL('../reports/', import.meta.url).pathname;
const M = JSON.parse(await fs.readFile(new URL('../mapping/measurements.json', import.meta.url).pathname,'utf8'));
const h = await makeHarness(GEN, REP+'preview/harness.html');
const r = await verify(h, M, REP+'preview');
await fs.writeFile(REP+'verification.json', JSON.stringify(r,null,2));
console.log('=== GEOMETRY vs phlur.com (measured) ===');
for(const x of r.results) console.log(' ',(x.pass===null?'skip':x.pass?'PASS':'FAIL').padEnd(5),
  x.name.padEnd(26), String(x.actual).padStart(8),'vs',String(x.expected).padStart(8),
  (x.delta!==null?('d='+x.delta):'').padStart(10), x.tolerance);
console.log('=== CATEGORICAL ===');
for(const x of r.categorical) console.log(' ',(x.pass?'PASS':'FAIL').padEnd(5), x.name.padEnd(26), String(x.actual));
console.log(`\nSCORE: ${(r.score*100).toFixed(1)}%  (${r.passed}/${r.total})`);
