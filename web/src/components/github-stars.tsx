'use client';

import { useEffect, useState } from 'react';
import { Loader2, Star } from 'lucide-react';

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/alphajoop/open-ussd-sn',
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des étoiles GitHub:',
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span>{stars?.toLocaleString() || '--'}</span>
      <Star className="h-3 w-3 fill-current" />
    </div>
  );
}
