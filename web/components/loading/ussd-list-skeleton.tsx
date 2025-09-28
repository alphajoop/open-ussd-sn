import { Skeleton } from '@/components/ui/skeleton';
import { OperatorGroupSkeleton } from './operator-group-skeleton';

export function UssdListSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Groupes d'opérateurs */}
      <div className="space-y-6">
        <OperatorGroupSkeleton />
        <OperatorGroupSkeleton />
        <OperatorGroupSkeleton />
      </div>
    </div>
  );
}
