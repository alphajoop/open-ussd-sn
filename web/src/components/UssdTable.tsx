import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UssdData } from '@/types/UssdData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface UssdTableProps {
  data: UssdData[];
  currentPage: number;
  itemsPerPage: number;
}

const UssdTable: React.FC<UssdTableProps> = ({
  data,
  currentPage,
  itemsPerPage,
}) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { t } = useTranslation();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const getOperateurColor = (operateur: string) => {
    switch (operateur.toLowerCase()) {
      case 'orange':
        return 'bg-orange-500';
      case 'free':
        return 'bg-purple-500';
      case 'wave':
        return 'bg-blue-500';
      case 'expresso':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-md border shadow">
      <Table>
        <TableCaption>
          {t('common.title')} - {new Date().toLocaleDateString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t('common.operator')}</TableHead>
            <TableHead className="w-[100px]">{t('common.country')}</TableHead>
            <TableHead>{t('common.service')}</TableHead>
            <TableHead className="w-[100px]">{t('common.code')}</TableHead>
            <TableHead className="hidden md:table-cell">
              {t('common.description')}
            </TableHead>
            <TableHead className="hidden w-[100px] md:table-cell">
              {t('common.status')}
            </TableHead>
            <TableHead className="hidden w-[150px] md:table-cell">
              {t('common.lastUpdate')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center">
                {t('common.noResults')}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className={cn(
                  'cursor-pointer transition-colors hover:bg-muted',
                  selectedRow === `${item.operateur}-${item.codeUssd}` &&
                    'highlight-row',
                )}
                onClick={() =>
                  setSelectedRow(`${item.operateur}-${item.codeUssd}`)
                }
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${getOperateurColor(item.operateur)}`}
                    ></span>
                    {item.operateur}
                  </div>
                </TableCell>
                <TableCell>{item.pays}</TableCell>
                <TableCell className="font-medium">{item.service}</TableCell>
                <TableCell className="font-mono font-bold">
                  {item.codeUssd}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.description}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={
                      item.statut === 'Actif' ? 'default' : 'destructive'
                    }
                  >
                    {item.statut}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.derniereMiseAJour}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UssdTable;
