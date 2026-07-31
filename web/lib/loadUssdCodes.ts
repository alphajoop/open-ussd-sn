import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UssdCode } from '@/types/ussd';
import { parseCSV } from '@/lib/csvParser';

const CSV_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../data/ussd_codes_senegal.csv',
);

export function loadUssdCodes(): UssdCode[] {
  const csvText = readFileSync(CSV_PATH, 'utf8');
  return parseCSV(csvText);
}
