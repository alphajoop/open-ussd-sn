import type { UssdCode } from '@/types/ussd';
import { parseUssdCsv } from '../scripts/lib/ussdCsv.mjs';

export function parseCSV(csvText: string): UssdCode[] {
  return parseUssdCsv(csvText) as UssdCode[];
}
