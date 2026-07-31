export const USSD_STATUTS: readonly string[];
export const EXPECTED_HEADERS: readonly string[];

export function parseCsv(text: string): string[][];

export function parseUssdCsv(csvText: string): Array<{
  opérateur: string;
  pays: string;
  service: string;
  codeUSSD: string;
  syntaxe: string;
  description: string;
  statut: string;
  derniereMiseAJour: string;
}>;
