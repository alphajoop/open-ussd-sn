'use client';

import { useMemo, useState } from 'react';
import type { UssdCode, UssdStatut } from '@/types/ussd';
import { USSD_STATUTS } from '@/types/ussd';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Phone, Info, Copy, Check, Download } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

const OPERATOR_NAMES = [
  'Orange',
  'Free',
  'Expresso',
  'Wave',
  'Promobile',
] as const;
type OperatorName = (typeof OPERATOR_NAMES)[number];

const operatorLogos: Record<OperatorName, string> = {
  Orange: '/images/operators/orange-logo.png',
  Free: '/images/operators/yas-logo.jpg',
  Expresso: '/images/operators/expresso-logo.jpg',
  Wave: '/images/operators/wave-logo.png',
  Promobile: '/images/operators/promobile-logo.png',
};

type StatutFilter = 'Tous' | UssdStatut;

type UssdAccordionListProps = {
  codes: UssdCode[];
};

function operatorSortIndex(operator: string): number {
  const index = OPERATOR_NAMES.indexOf(operator as OperatorName);
  return index === -1 ? OPERATOR_NAMES.length : index;
}

export function UssdAccordionList({ codes }: UssdAccordionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState<StatutFilter>('Tous');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const query = searchTerm.toLowerCase();

    const groupedByOperator = codes.reduce(
      (acc, code) => {
        if (statutFilter !== 'Tous' && code.statut !== statutFilter) {
          return acc;
        }

        const matchesSearch =
          !query ||
          code.service.toLowerCase().includes(query) ||
          code.codeUSSD.toLowerCase().includes(query) ||
          code.description.toLowerCase().includes(query);

        if (!matchesSearch) {
          return acc;
        }

        const operator = code.opérateur;
        if (!acc[operator]) {
          acc[operator] = [];
        }
        acc[operator].push(code);
        return acc;
      },
      {} as Record<string, UssdCode[]>,
    );

    return Object.entries(groupedByOperator)
      .map(([operator, operatorCodes]) => ({
        operator,
        codes: operatorCodes,
      }))
      .filter((group) => group.codes.length > 0)
      .sort(
        (a, b) => operatorSortIndex(a.operator) - operatorSortIndex(b.operator),
      );
  }, [codes, searchTerm, statutFilter]);

  const copyToClipboard = (code: string, service: string) => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopiedCode(code);
        toast.success('Code copié !', {
          description: `Le code ${code} pour ${service} a été copié dans le presse-papiers.`,
          duration: 2000,
        });
        setTimeout(() => setCopiedCode(null), 2000);
      },
      (err) => {
        console.error('Impossible de copier le texte: ', err);
        toast.error('Erreur', {
          description: 'Impossible de copier le code. Veuillez réessayer.',
        });
      },
    );
  };

  const renderOperatorLogo = (operator: string) => {
    const validOperator = OPERATOR_NAMES.includes(operator as OperatorName);

    if (validOperator && operatorLogos[operator as OperatorName]) {
      return (
        <div className="relative mr-2 h-8 w-8">
          <Image
            src={operatorLogos[operator as OperatorName]}
            alt={`Logo ${operator}`}
            className="rounded-full object-cover"
            fill
          />
        </div>
      );
    }

    const initials = operator.charAt(0).toUpperCase();
    return (
      <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-full">
        <span className="text-xs font-bold">{initials}</span>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Rechercher un service, code ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statutFilter}
          onValueChange={(value) => setStatutFilter(value as StatutFilter)}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            aria-label="Filtrer par statut"
          >
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tous">Tous les statuts</SelectItem>
            {USSD_STATUTS.map((statut) => (
              <SelectItem key={statut} value={statut}>
                {statut}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <a href="/data/ussd_codes_senegal.csv" download>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </a>
        </Button>
      </div>

      <p className="text-muted-foreground mb-4 text-xs">
        Données aussi dispo en{' '}
        <Link
          href="/data/ussd_codes_senegal.json"
          className="hover:text-primary underline underline-offset-2"
        >
          JSON
        </Link>
        .
      </p>

      {filteredData.length === 0 ? (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <Info className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
          <p className="text-muted-foreground">
            Aucun code USSD ne correspond à votre recherche.
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredData.map(({ operator, codes: operatorCodes }) => (
            <AccordionItem key={operator} value={operator}>
              <AccordionTrigger className="font-medium hover:no-underline">
                <div className="flex items-center">
                  {renderOperatorLogo(operator)}
                  <span>{operator}</span>
                  <Badge variant="outline" className="ml-2">
                    {operatorCodes.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  {operatorCodes.map((code) => (
                    <Card
                      key={`${operator}-${code.codeUSSD}-${code.service}`}
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
                          {code.derniereMiseAJour || 'Non spécifiée'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="flex items-center">
                            <Phone className="text-primary mr-2 h-4 w-4" />
                            <span className="font-mono font-semibold">
                              {code.codeUSSD}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 sm:hidden"
                              asChild
                            >
                              <a
                                href={`tel:${encodeURIComponent(code.codeUSSD)}`}
                                aria-label={`Composer le code ${code.codeUSSD}`}
                              >
                                <Phone className="h-4 w-4" />
                                <span className="ml-2">Composer</span>
                              </a>
                            </Button>
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
