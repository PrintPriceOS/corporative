#!/usr/bin/env node
/**
 * scripts/leads_stats.mjs
 *
 * CLI summary and inspector for qualified commercial B2B leads captured via /api/leads.
 * Usage: npm run leads:stats
 */

import fs from 'node:fs';
import path from 'node:path';

const logsDir = path.join(process.cwd(), 'logs');
const leadsFile = path.join(logsDir, 'commercial-leads.jsonl');

console.log('==============================================================');
console.log(' PRINTPRICE PRO — B2B COMMERCIAL LEADS PIPELINE');
console.log('==============================================================');

if (!fs.existsSync(leadsFile)) {
  console.log('No leads recorded yet in logs/commercial-leads.jsonl');
  process.exit(0);
}

const lines = fs
  .readFileSync(leadsFile, 'utf8')
  .split(/\r?\n/)
  .filter((l) => l.trim().length > 0);

const leads = [];
for (const line of lines) {
  try {
    leads.push(JSON.parse(line));
  } catch {}
}

console.log(`Total Qualified Leads : ${leads.length}`);

const byProfile = {};
const byTier = {};

for (const l of leads) {
  byProfile[l.profile] = (byProfile[l.profile] || 0) + 1;
  byTier[l.qualificationTier] = (byTier[l.qualificationTier] || 0) + 1;
}

console.log('\n--- Breakdown by Profile ---');
for (const [prof, count] of Object.entries(byProfile)) {
  console.log(`  ${prof.padEnd(20)}: ${count}`);
}

console.log('\n--- Breakdown by Qualification Tier ---');
for (const [tier, count] of Object.entries(byTier)) {
  console.log(`  ${tier.padEnd(20)}: ${count}`);
}

console.log('\n--- Latest 5 Qualified Leads ---');
for (const l of leads.slice(-5).reverse()) {
  console.log(
    `  [${l.ts}] ${l.leadId} | ${l.profile.toUpperCase()} (${l.qualificationTier}) | ${l.companyName} <${l.email}> (${l.country}) -> ${l.assignedChannel}`
  );
}
console.log('==============================================================');
