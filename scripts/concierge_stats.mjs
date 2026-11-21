#!/usr/bin/env node
/**
 * scripts/concierge_stats.mjs
 *
 * Lightweight CLI analyzer for Dotty (/api/concierge) GDPR audit logs.
 * Usage: npm run concierge:stats [YYYY-MM-DD]
 */

import fs from 'node:fs';
import path from 'node:path';

const argDate = process.argv[2];
const todayUtc = new Date().toISOString().slice(0, 10);
const targetDate = argDate || todayUtc;

const logsDir = path.join(process.cwd(), 'logs');
const dailyLogPath = path.join(logsDir, `concierge-audit-${targetDate}.jsonl`);
const genericLogPath = path.join(logsDir, 'concierge-audit.jsonl');

const fileToRead = fs.existsSync(dailyLogPath)
  ? dailyLogPath
  : fs.existsSync(genericLogPath)
  ? genericLogPath
  : null;

console.log('==============================================================');
console.log(` DOTTY CONCIERGE SECURITY & AUDIT STATS (${targetDate})`);
console.log('==============================================================');

if (!fileToRead) {
  console.log(`No audit log found at ${dailyLogPath}`);
  console.log(' Total requests: 0');
  process.exit(0);
}

const rawLines = fs
  .readFileSync(fileToRead, 'utf8')
  .split(/\r?\n/)
  .filter((line) => line.trim().length > 0);

const entries = [];
for (const line of rawLines) {
  try {
    entries.push(JSON.parse(line));
  } catch {
    // skip malformed line
  }
}

const total = entries.length;
if (total === 0) {
  console.log(`Log file ${path.basename(fileToRead)} is empty.`);
  process.exit(0);
}

const statusCounts = {};
const countryCounts = {};
const ipHashCounts = {};
let totalLatency = 0;
let blockedCount = 0;

for (const e of entries) {
  const st = e.status || 'unknown';
  statusCounts[st] = (statusCounts[st] || 0) + 1;

  if (
    st === 'rate_limited' ||
    st === 'origin_blocked' ||
    st === 'turnstile_blocked' ||
    st === 'payload_too_large'
  ) {
    blockedCount += 1;
  }

  const c = e.country || 'XX';
  countryCounts[c] = (countryCounts[c] || 0) + 1;

  const ip = e.ipHash || 'unknown';
  ipHashCounts[ip] = (ipHashCounts[ip] || 0) + 1;

  if (typeof e.latencyMs === 'number') {
    totalLatency += e.latencyMs;
  }
}

const avgLatency = Math.round(totalLatency / total);
const blockRatePct = ((blockedCount / total) * 100).toFixed(1);

console.log(`Log Source     : ${path.basename(fileToRead)}`);
console.log(`Total Queries  : ${total}`);
console.log(`Blocked (429/403): ${blockedCount} (${blockRatePct}%)`);
console.log(`Avg Latency    : ${avgLatency} ms`);
console.log('\n--- Status Breakdown ---');
for (const [st, count] of Object.entries(statusCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${st.padEnd(26)}: ${count}`);
}

console.log('\n--- Top Countries ---');
for (const [country, count] of Object.entries(countryCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)) {
  console.log(`  ${country.padEnd(6)}: ${count}`);
}

console.log('\n--- Top Active ipHash (GDPR Anonymized) ---');
for (const [hash, count] of Object.entries(ipHashCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)) {
  console.log(`  ${hash.padEnd(18)}: ${count} reqs`);
}
console.log('==============================================================');
