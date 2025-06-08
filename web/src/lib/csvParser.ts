import type { UssdCode } from '@/types/ussd';

export async function fetchAndParseCSV(): Promise<UssdCode[]> {
  const response = await fetch('/data/ussd_codes_senegal.csv');
  const csvText = await response.text();
  return parseCSV(csvText);
}

function parseCSV(csvText: string): UssdCode[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  // Debug: Log the normalized headers
  const normalizedHeaders = headers.map(normalizeKey);
  console.log('Normalized headers:', normalizedHeaders);

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const entry: Partial<UssdCode> = {};

    headers.forEach((header, i) => {
      const key = normalizeKey(header);
      const value = values[i];

      if (key === 'statut') {
        if (['Actif', 'Obsolète', 'À confirmer'].includes(value)) {
          entry[key] = value as UssdCode['statut'];
        } else {
          entry[key] = undefined;
        }
      } else {
        entry[key] = value;
      }
    });

    return entry as UssdCode;
  });
}

// Optionnel : adapter les noms de colonnes CSV aux noms du type UssdCode
function normalizeKey(key: string): keyof UssdCode {
  // Convert to lowercase and handle special cases
  const normalized = key.toLowerCase().replace(/code ussd/i, 'codeussd');

  // Handle specific mappings
  if (normalized === 'dernière mise à jour') {
    return 'dernièremiseàjour' as keyof UssdCode;
  }

  // Remove spaces for other keys
  return normalized
    .replace(/ /g, '')
    .replace('codeussd', 'codeUSSD') as keyof UssdCode;
}
