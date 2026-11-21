/**
 * lib/concierge-audit.ts
 *
 * GDPR-compliant structured JSON Lines (JSONL) audit logger for /api/concierge.
 * Writes daily rotated logs to `logs/concierge-audit-YYYY-MM-DD.jsonl` and `logs/concierge-audit.jsonl`.
 * Never stores plaintext IP addresses (only daily-salted SHA-256 ipHash).
 */

import fs from 'node:fs';
import path from 'node:path';
import { getUtcDateKey } from './concierge-guard';

export type ConciergeAuditStatus =
  | 'ok'
  | 'rate_limited'
  | 'origin_blocked'
  | 'input_too_long'
  | 'fallback'
  | 'circuit_breaker_fallback'
  | 'payload_too_large'
  | 'turnstile_blocked'
  | 'bad_request';

export interface ConciergeAuditEntry {
  ts: string;
  ipHash: string;
  country: string;
  locale: string;
  status: ConciergeAuditStatus;
  inputLength: number;
  historyTurns: number;
  latencyMs: number;
  questionPreview: string;
}

/**
 * Sanitizes and truncates the user question preview to 120 characters for safe JSONL logging.
 */
export function sanitizeQuestionPreview(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, 120);
}

/**
 * Appends an audit event asynchronously to both the date-rotated JSONL file
 * (`logs/concierge-audit-YYYY-MM-DD.jsonl`) and the latest stream (`logs/concierge-audit.jsonl`).
 */
export async function recordConciergeAudit(entry: ConciergeAuditEntry): Promise<void> {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    await fs.promises.mkdir(logsDir, { recursive: true });

    const dateKey = getUtcDateKey(new Date(entry.ts));
    const dailyFile = path.join(logsDir, `concierge-audit-${dateKey}.jsonl`);
    const currentFile = path.join(logsDir, 'concierge-audit.jsonl');

    const line = JSON.stringify(entry) + '\n';

    await Promise.all([
      fs.promises.appendFile(dailyFile, line, 'utf8'),
      fs.promises.appendFile(currentFile, line, 'utf8'),
    ]);
  } catch (err) {
    console.warn('[CONCIERGE-AUDIT] Non-fatal error writing audit log:', (err as Error)?.message);
  }
}
