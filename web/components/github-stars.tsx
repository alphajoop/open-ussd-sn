import { Star } from 'lucide-react';

async function fetchStarCount(): Promise<number | null> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/alphajoop/open-ussd-sn',
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number'
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

export async function GitHubStars() {
  const stars = await fetchStarCount();

  return (
    <div className="flex items-center gap-1">
      <span>{stars?.toLocaleString('fr-FR') ?? '--'}</span>
      <Star className="h-3 w-3 fill-current" />
    </div>
  );
}
