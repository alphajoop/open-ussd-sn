'use client';

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des codes USSD...</span>
      </div>
    );
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
          />
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
                  <span>{operator}</span>
                  <Badge variant="outline" className="ml-2">
                    {codes.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  {codes.map((code) => (
                    <Card key={code.codeUSSD} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 py-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-medium">
                            {code.service}
                          </CardTitle>
                          <Badge
                            variant={
                              code.statut === 'Actif' ? 'default' : 'outline'
                            }
                            className={
                              code.statut === 'Actif'
                                ? 'bg-green-500'
                                : 'text-yellow-600'
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
