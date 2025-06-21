import { useState } from 'react';
import { useUssdCodes } from '@/hooks/useUssdCodes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Search, Phone, Info, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { UssdListSkeleton } from './loading/ussd-list-skeleton';

// Types pour les opérateurs
const OPERATOR_NAMES = ['Orange', 'Free', 'Expresso', 'Wave'] as const;
type OperatorName = (typeof OPERATOR_NAMES)[number];

// Map des logos d'opérateurs
const operatorLogos: Record<OperatorName, string> = {
  Orange: '/images/operators/orange-logo.png',
  Free: '/images/operators/yas-logo.jpg',
  Expresso: '/images/operators/expresso-logo.jpg',
  Wave: '/images/operators/wave-logo.png',
};

export function UssdAccordionList() {
  const { data, loading, error } = useUssdCodes();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Group USSD codes by operator
  const groupedByOperator = data.reduce(
    (acc, code) => {
      const operator = code.opérateur;
      if (!acc[operator]) {
        acc[operator] = [];
      }
      acc[operator].push(code);
      return acc;
    },
    {} as Record<string, typeof data>,
  );

  // Filter data based on search term
  const filteredData = Object.entries(groupedByOperator)
    .map(([operator, codes]) => {
      const filteredCodes = codes.filter(
        (code) =>
          code.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          code.codeUSSD.toLowerCase().includes(searchTerm.toLowerCase()) ||
          code.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return { operator, codes: filteredCodes };
    })
    .filter((group) => group.codes.length > 0);

  // Function to copy USSD code to clipboard
  const copyToClipboard = (code: string, service: string) => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopiedCode(code);
        toast.success('Code copié !', {
          description: `Le code ${code} pour ${service} a été copié dans le presse-papiers.`,
          duration: 2000,
        });

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopiedCode(null);
        }, 2000);
      },
      (err) => {
        console.error('Impossible de copier le texte: ', err);
        toast.error('Erreur', {
          description: 'Impossible de copier le code. Veuillez réessayer.',
        });
      },
    );
  };

  // Render placeholder operator logo when actual logo is not available
  const renderOperatorLogo = (operator: string) => {
    // Vérifier si l'opérateur est une clé valide
    const validOperator = OPERATOR_NAMES.includes(operator as OperatorName);

    if (validOperator && operatorLogos[operator as OperatorName]) {
      return (
        <img
          src={operatorLogos[operator as OperatorName]}
          alt={`Logo ${operator}`}
          className="mr-2 h-8 w-8 rounded-full object-cover"
        />
      );
    } else {
      // Fallback avec les initiales de l'opérateur dans un cercle
      const initials = operator.charAt(0).toUpperCase();
      return (
        <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-full">
          <span className="text-xs font-bold">{initials}</span>
        </div>
      );
    }
  };

  if (loading) {
    return <UssdListSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive rounded-md p-4">
        <p className="font-semibold">Erreur</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative mb-6">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Rechercher un service, code ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
          {loading && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <Info className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
          <p className="text-muted-foreground">
            Aucun code USSD ne correspond à votre recherche.
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredData.map(({ operator, codes }) => (
            <AccordionItem key={operator} value={operator}>
              <AccordionTrigger className="font-medium">
                <div className="flex items-center">
                  {renderOperatorLogo(operator)}
                  <span>{operator}</span>
                  <Badge variant="outline" className="ml-2">
                    {codes.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  {codes.map((code) => (
                    <Card
                      key={code.codeUSSD}
                      className="bg-muted text-foreground overflow-hidden"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {renderOperatorLogo(operator)}
                            <CardTitle className="font-medium">
                              {code.service}
                            </CardTitle>
                          </div>
                          <Badge
                            variant={
                              code.statut === 'Actif' ? 'default' : 'outline'
                            }
                            className={
                              code.statut === 'Actif'
                                ? 'bg-primary'
                                : 'text-accent'
                            }
                          >
                            {code.statut}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1 text-xs">
                          Dernière mise à jour:{' '}
                          {code.dernièremiseàjour ||
                            code['dernière mise à jour'] ||
                            'Non spécifiée'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <Phone className="text-primary mr-2 h-4 w-4" />
                            <span className="font-mono font-semibold">
                              {code.codeUSSD}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 transition-all"
                            onClick={() =>
                              copyToClipboard(code.codeUSSD, code.service)
                            }
                            aria-label={`Copier le code ${code.codeUSSD}`}
                          >
                            {copiedCode === code.codeUSSD ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            <span className="ml-2 hidden sm:inline">
                              {copiedCode === code.codeUSSD
                                ? 'Copié !'
                                : 'Copier'}
                            </span>
                          </Button>
                        </div>
                        {code.syntaxe !== 'N/A' && (
                          <div className="text-muted-foreground mb-2">
                            <span className="font-medium">Syntaxe:</span>{' '}
                            {code.syntaxe}
                          </div>
                        )}
                        <p className="text-sm">{code.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
