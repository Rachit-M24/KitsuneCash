import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-36 w-full rounded-2xl bg-white/10" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-32 rounded-2xl bg-white/10"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32 bg-white/10" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-28 rounded-2xl bg-white/10"
            />
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32 bg-white/10" />
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-36 rounded-2xl bg-white/10"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40 bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 rounded-2xl bg-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
