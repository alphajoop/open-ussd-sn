import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getUniqueOperateurs, getUniquePays } from '@/data/ussdCodes';
import { useTranslation } from 'react-i18next';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOperateur: string;
  setSelectedOperateur: (operateur: string) => void;
  selectedPays: string;
  setSelectedPays: (pays: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedOperateur,
  setSelectedOperateur,
  selectedPays,
  setSelectedPays,
}) => {
  const operateurs = getUniqueOperateurs();
  const pays = getUniquePays();
  const { t } = useTranslation();

  return (
    <div className="mb-6 space-y-4 rounded-lg bg-card p-4 shadow dark:bg-card md:flex md:items-end md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Label htmlFor="search" className="mb-2 block">
          {t('common.search')}
        </Label>
        <Input
          id="search"
          placeholder={t('common.search') + '...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="w-full md:w-48">
        <Label htmlFor="operateur" className="mb-2 block">
          {t('common.operator')}
        </Label>
        <Select value={selectedOperateur} onValueChange={setSelectedOperateur}>
          <SelectTrigger id="operateur" className="w-full">
            <SelectValue placeholder={t('common.allOperators')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.allOperators')}</SelectItem>
            {operateurs.map((operateur) => (
              <SelectItem key={operateur} value={operateur}>
                {operateur}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-48">
        <Label htmlFor="pays" className="mb-2 block">
          {t('common.country')}
        </Label>
        <Select value={selectedPays} onValueChange={setSelectedPays}>
          <SelectTrigger id="pays" className="w-full">
            <SelectValue placeholder={t('common.allCountries')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.allCountries')}</SelectItem>
            {pays.map((pays) => (
              <SelectItem key={pays} value={pays}>
                {pays}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
