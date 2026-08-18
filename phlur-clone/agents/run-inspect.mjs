import { inspect } from './inspector.mjs';
import fs from 'node:fs/promises';

const TARGETS = [
  { name: 'home', url: 'https://phlur.com/' },
  { name: 'product', url: 'https://phlur.com/products/missing-person-100ml' },
  { name: 'collection', url: 'https://phlur.com/collections/perfumes' },
];

const OUT = new URL('../inspection/', import.meta.url).pathname;

const summary = [];
for (const t of TARGETS) {
  console.log(`\n▶ ${t.name} — ${t.url}`);
  try {
    const r = await inspect(t, OUT);
    summary.push({
      name: t.name, url: t.url, ok: true,
      nodes: r.nodeCount,
      sections: r.shots.sections.length,
      images: r.assets.images.length,
      sheets: r.stylesheets.length,
      vars: Object.keys(r.variables).length,
      mediaQueries: r.mediaQueries.length,
    });
  } catch (e) {
    console.error(`  ✗ ${t.name} failed: ${e.message.split('\n')[0]}`);
    summary.push({ name: t.name, url: t.url, ok: false, error: e.message.split('\n')[0] });
  }
}

await fs.writeFile(new URL('../inspection/summary.json', import.meta.url).pathname,
  JSON.stringify(summary, null, 2));
console.log('\n=== INSPECTION SUMMARY ===');
console.table(summary);
