import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { parseCsv } from './lib/parseCsv.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const VALID_STATUTS = new Set(['Actif', 'Obsolète', 'À confirmer']);

function rowsToJson(rows) {
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((h) => h.trim().toLowerCase());

  return dataRows.map((values) => {
    const raw = Object.fromEntries(
      headers.map((header, i) => [header, values[i] ?? '']),
    );
    const statut = VALID_STATUTS.has(raw['statut'])
      ? raw['statut']
      : 'À confirmer';

    return {
      opérateur: raw['opérateur'] ?? '',
      pays: raw['pays'] ?? '',
      service: raw['service'] ?? '',
      codeUSSD: raw['code ussd'] ?? '',
      syntaxe: raw['syntaxe'] ?? '',
      description: raw['description'] ?? '',
      statut,
      derniereMiseAJour: raw['dernière mise à jour'] ?? '',
    };
  });
}

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
  const codes = rowsToJson(parseCsv(csvText));
  writeFileSync(targetJson, `${JSON.stringify(codes, null, 2)}\n`, 'utf8');
  console.log(`✔ JSON généré (${codes.length} codes) → "${targetJson}"`);
}

generateUssdData();
