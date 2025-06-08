export type UssdCode = {
  opérateur: string;
  pays: string;
  service: string;
  codeUSSD: string;
  syntaxe: string;
  description: string;
  statut: 'Actif' | 'Obsolète' | 'À confirmer';
  dernièremiseàjour?: string;
  dernièreMiseÀJour?: string;
  'dernière mise à jour'?: string;
};
