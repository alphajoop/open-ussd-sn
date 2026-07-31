import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/parseCsv.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = resolve(__dirname, '../../data/ussd_codes_senegal.csv');

const EXPECTED_HEADERS = [
  'Opérateur',
  'Pays',
  'Service',
  'Code USSD',
  'Syntaxe',
  'Description',
  'Statut',
  'Dernière mise à jour',
];

const VALID_STATUTS = new Set(['Actif', 'Obsolète', 'À confirmer']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const USSD_RE = /^[*#][\d*#A-Za-z_-]+#$/;

function validate() {
  const errors = [];
  const warnings = [];

  if (!existsSync(CSV_PATH)) {
    console.error(`✖ Fichier introuvable: ${CSV_PATH}`);
    process.exit(1);
  }

  const text = readFileSync(CSV_PATH, 'utf8');
  const rows = parseCsv(text);

  if (rows.length < 2) {
    errors.push(
      'Le CSV doit contenir un en-tête et au moins une ligne de données.',
    );
  }

  const [headers, ...dataRows] = rows;

  if (headers.length !== EXPECTED_HEADERS.length) {
    errors.push(
      `En-tête: ${headers.length} colonnes trouvées, ${EXPECTED_HEADERS.length} attendues.`,
    );
  }

  EXPECTED_HEADERS.forEach((expected, index) => {
    if (headers[index] !== expected) {
      errors.push(
        `Colonne ${index + 1}: attendu "${expected}", trouvé "${headers[index] ?? ''}".`,
      );
    }
  });

  const seen = new Map();

  dataRows.forEach((values, index) => {
    const line = index + 2;

    if (values.length !== EXPECTED_HEADERS.length) {
      errors.push(
        `Ligne ${line}: ${values.length} champs, ${EXPECTED_HEADERS.length} attendus. ` +
          `Astuce: encapsule les descriptions avec virgules entre guillemets ("...").`,
      );
      return;
    }

    const [operateur, pays, service, codeUssd, , description, statut, date] =
      values;

    if (!operateur) errors.push(`Ligne ${line}: Opérateur vide.`);
    if (!service) errors.push(`Ligne ${line}: Service vide.`);
    if (!codeUssd) errors.push(`Ligne ${line}: Code USSD vide.`);
    if (!description) errors.push(`Ligne ${line}: Description vide.`);

    if (!VALID_STATUTS.has(statut)) {
      errors.push(
        `Ligne ${line}: Statut invalide "${statut}" (Actif | Obsolète | À confirmer).`,
      );
    }

    if (date && !DATE_RE.test(date)) {
      errors.push(
        `Ligne ${line}: Date invalide "${date}" (format attendu: YYYY-MM-DD).`,
      );
    }

    if (pays && pays !== 'Sénégal') {
      warnings.push(`Ligne ${line}: Pays="${pays}" (attendu: Sénégal).`);
    }

    if (codeUssd && !USSD_RE.test(codeUssd)) {
      warnings.push(
        `Ligne ${line}: Code USSD atypique "${codeUssd}" (attendu: *...# ou #...#).`,
      );
    }

    const key = `${operateur}::${codeUssd}::${service}`;
    if (seen.has(key)) {
      errors.push(
        `Ligne ${line}: doublon de (${operateur}, ${codeUssd}, ${service}) aussi à la ligne ${seen.get(key)}.`,
      );
    } else {
      seen.set(key, line);
    }
  });

  if (warnings.length > 0) {
    console.warn('⚠ Avertissements:');
    warnings.forEach((w) => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error('✖ Validation CSV échouée:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✔ CSV valide — ${dataRows.length} codes USSD (${CSV_PATH})`);
}

validate();
