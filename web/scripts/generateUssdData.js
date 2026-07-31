import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { parseUssdCsv } from './lib/ussdCsv.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function generateUssdData() {
  const sourcePath = resolve(__dirname, '../../data/ussd_codes_senegal.csv');
  const targetDir = resolve(__dirname, '../public/data');
  const targetCsv = join(targetDir, 'ussd_codes_senegal.csv');
  const targetJson = join(targetDir, 'ussd_codes_senegal.json');

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  copyFileSync(sourcePath, targetCsv);
  console.log(`✔ CSV copié vers "${targetCsv}"`);

  const csvText = readFileSync(sourcePath, 'utf8');
  const codes = parseUssdCsv(csvText);
  writeFileSync(targetJson, `${JSON.stringify(codes, null, 2)}\n`, 'utf8');
  console.log(`✔ JSON généré (${codes.length} codes) → "${targetJson}"`);
}

generateUssdData();
