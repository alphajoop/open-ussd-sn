import { ArrowLeft, Info } from 'lucide-react';
import { ModeToggle } from './components/mode-toggle';
import { Button } from './components/ui/button';
import { UssdAccordionList } from './components/ussd-accordion-list';
import { AboutPage } from './components/about-page';
import { useState } from 'react';

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

      <footer className="text-muted-foreground mt-12 text-center text-sm">
        <p>© 2025 USSD Senegal - Tous droits réservés</p>
      </footer>
    </main>
  );
}

export default App;
