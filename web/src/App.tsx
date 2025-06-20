import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { UssdAccordionList } from '@/components/ussd-accordion-list';
import { AboutPage } from '@/components/about-page';
import { GitHubStars } from '@/components/github-stars';
import { ArrowLeft, Github, Info } from 'lucide-react';

function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="mb-8 flex w-full max-w-3xl items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">Codes USSD Sénégal</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAbout(!showAbout)}
          >
            {showAbout ? (
              <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Info className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">
              {showAbout ? 'Retour à la liste' : 'À propos'}
            </span>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div className="w-full max-w-3xl">
        {showAbout ? <AboutPage /> : <UssdAccordionList />}
      </div>

      <footer className="mt-12 text-center text-sm">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <p>© 2025 USSD Senegal - Tous droits réservés</p>
          <div className="flex items-center gap-2">
            <a
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
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
