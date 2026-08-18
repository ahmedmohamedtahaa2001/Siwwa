import { validate } from './validator.mjs';
import fs from 'node:fs/promises';
const GEN = new URL('../generated/', import.meta.url).pathname;
const r = await validate(GEN);
await fs.writeFile(new URL('../reports/validation.json', import.meta.url).pathname, JSON.stringify(r,null,2));
console.log('=== CONTRAST (WCAG 2.2 AA) ===');
r.contrast.forEach(c=>console.log(' ', (c.pass?'PASS':'FAIL').padEnd(5), String(c.ratio).padStart(6)+':1  min '+c.min, ' ', c.label));
const errs=r.findings.filter(f=>f.severity==='error'), warns=r.findings.filter(f=>f.severity==='warn');
console.log(`\n=== SIWA CI RULES: ${errs.length} errors, ${warns.length} warnings ===`);
const byRule={}; r.findings.forEach(f=>{(byRule[f.rule] ||= []).push(f)});
for(const [rule,list] of Object.entries(byRule)){
  console.log(`\n[${list[0].severity}] ${rule} — ${list.length}`);
  list.slice(0,6).forEach(f=>console.log('   ', (f.file+':'+(f.line||'')).padEnd(34), f.detail));
  if(list.length>6) console.log(`    …${list.length-6} more`);
}
