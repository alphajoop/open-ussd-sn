import { Github } from 'lucide-react';
import { GitHubStars } from '@/components/github-stars';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 w-full text-center text-sm">
      <div className="text-muted-foreground flex flex-col items-center gap-2">
        <p>© {currentYear} USSD Senegal - Tous droits réservés</p>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/alphajoop/open-ussd-sn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary flex items-center gap-1 transition-colors"
          >
            <Github className="bg-muted h-6 w-6 rounded-full p-1" />
            <span>Étoilez-nous sur GitHub</span>
            <span className="bg-muted inline-flex items-center rounded px-2 py-0.5 text-xs font-medium">
              <GitHubStars />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
