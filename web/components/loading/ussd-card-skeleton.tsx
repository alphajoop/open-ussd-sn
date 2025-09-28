import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function UssdCardSkeleton() {
  return (
    <Card className="bg-muted overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="mr-2 h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-2 h-3 w-36" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="mr-2 h-4 w-4 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="mb-2 h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
