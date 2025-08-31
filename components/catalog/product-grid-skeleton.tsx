import { Skeleton } from '@/components/ui/skeleton'

export function ProductGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
