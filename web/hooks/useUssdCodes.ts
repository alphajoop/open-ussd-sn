import { useEffect, useState } from 'react';
import type { UssdCode } from '@/types/ussd';
import { fetchAndParseCSV } from '@/lib/csvParser';

export function useUssdCodes() {
  const [data, setData] = useState<UssdCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const codes = await fetchAndParseCSV();
        setData(codes);
      } catch (err) {
        setError('Erreur lors du chargement des codes USSD.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
