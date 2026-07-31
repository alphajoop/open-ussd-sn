import type { UssdCode, UssdStatut } from '@/types/ussd';
import { USSD_STATUTS } from '@/types/ussd';
import { parseCsv } from '@/lib/parseCsv';

const HEADER_MAP: Record<string, keyof UssdCode> = {
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

function normalizeHeader(header: string): keyof UssdCode | undefined {
  const key = header.trim().toLowerCase();
  return HEADER_MAP[key];
}

function isValidStatut(value: string): value is UssdStatut {
  return (USSD_STATUTS as readonly string[]).includes(value);
}

export function parseCSV(csvText: string): UssdCode[] {
  const rows = parseCsv(csvText);
  if (rows.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const keys = headerRow.map(normalizeHeader);

  return dataRows.map((values) => {
    const entry: Partial<UssdCode> = {};

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
