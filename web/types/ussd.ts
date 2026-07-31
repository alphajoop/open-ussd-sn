export const USSD_STATUTS = ['Actif', 'Obsolète', 'À confirmer'] as const;

export type UssdStatut = (typeof USSD_STATUTS)[number];

export type UssdCode = {
  opérateur: string;
  pays: string;
  service: string;
  codeUSSD: string;
  syntaxe: string;
  description: string;
  statut: UssdStatut;
  derniereMiseAJour: string;
};
