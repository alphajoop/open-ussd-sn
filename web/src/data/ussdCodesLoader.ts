import Papa from 'papaparse';

export interface UssdCode {
  logo: string;
  operateur: string;
  pays: string;
  service: string;
  codeUssd: string;
  syntaxe: string;
  description: string;
  statut: string;
  derniereMiseAJour: string;
}

let ussdCodesCache: UssdCode[] | null = null;

export async function loadUssdCodes(): Promise<UssdCode[]> {
  if (ussdCodesCache) {
    return ussdCodesCache;
  }

  try {
    const response = await fetch('/data/ussd_codes_senegal.csv');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data.map((row: any) => ({
            logo: row['Logo'],
            operateur: row['Opérateur'],
            pays: row['Pays'],
            service: row['Service'],
            codeUssd: row['Code USSD'],
            syntaxe: row['Syntaxe'],
            description: row['Description'],
            statut: row['Statut'],
            derniereMiseAJour: row['Dernière mise à jour'],
          }));
          ussdCodesCache = data;
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error loading USSD codes:', error);
    return [];
  }
}
