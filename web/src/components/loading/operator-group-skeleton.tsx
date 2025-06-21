import { Skeleton } from '@/components/ui/skeleton';
import { UssdCardSkeleton } from './ussd-card-skeleton';

export function OperatorGroupSkeleton() {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center">
        <Skeleton className="mr-2 h-8 w-8 rounded-full" />
        <Skeleton className="mr-2 h-6 w-32" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      <div className="grid gap-4">
        <UssdCardSkeleton />
        <UssdCardSkeleton />
      </div>
    </div>
  );
}
