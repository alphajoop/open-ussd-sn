/**
 * Shared USSD CSV helpers for Node scripts and the Next app.
 */

export const USSD_STATUTS = ['Actif', 'Obsolète', 'À confirmer'];

export const EXPECTED_HEADERS = [
  'Opérateur',
  'Pays',
  'Service',
  'Code USSD',
  'Syntaxe',
  'Description',
  'Statut',
  'Dernière mise à jour',
];

const HEADER_MAP = {
  opérateur: 'opérateur',
  pays: 'pays',
  service: 'service',
  'code ussd': 'codeUSSD',
  codeussd: 'codeUSSD',
  syntaxe: 'syntaxe',
  description: 'description',
  statut: 'statut',
  'dernière mise à jour': 'derniereMiseAJour',
  dernièremiseàjour: 'derniereMiseAJour',
  derniermiseajour: 'derniereMiseAJour',
};

/**
 * Parse CSV text (RFC 4180) — handles quoted fields, escaped quotes, and commas.
 */
export function parseCsv(text) {
  const input = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  const pushField = () => {
    row.push(field.trim());
    field = '';
  };

  const pushRow = () => {
    pushField();
    if (row.some((cell) => cell !== '')) {
      rows.push(row);
    }
    row = [];
  };

  while (i < input.length) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (char === ',') {
      pushField();
      i += 1;
      continue;
    }

    if (char === '\n') {
      pushRow();
      i += 1;
      continue;
    }

    if (char === '\r') {
      i += 1;
      continue;
    }

    field += char;
    i += 1;
  }

  if (field.length > 0 || row.length > 0) {
    pushRow();
  }

  return rows;
}

function normalizeHeader(header) {
  return HEADER_MAP[header.trim().toLowerCase()];
}

function isValidStatut(value) {
  return USSD_STATUTS.includes(value);
}

/**
 * Parse USSD CSV text into code objects.
 */
export function parseUssdCsv(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const keys = headerRow.map(normalizeHeader);

  return dataRows.map((values) => {
    const entry = {};

    keys.forEach((key, index) => {
      if (!key) return;
      const value = values[index] ?? '';

      if (key === 'statut') {
        entry.statut = isValidStatut(value) ? value : undefined;
      } else {
        entry[key] = value;
      }
    });

    return {
      opérateur: entry.opérateur ?? '',
      pays: entry.pays ?? '',
      service: entry.service ?? '',
      codeUSSD: entry.codeUSSD ?? '',
      syntaxe: entry.syntaxe ?? '',
      description: entry.description ?? '',
      statut: entry.statut ?? 'À confirmer',
      derniereMiseAJour: entry.derniereMiseAJour ?? '',
    };
  });
}
