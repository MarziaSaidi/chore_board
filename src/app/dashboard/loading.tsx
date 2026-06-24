import { BoardCardSkeleton, Skeleton } from "@/components/ui";

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header skeleton */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-white/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/70">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-24" />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <Skeleton className="mb-2 h-8 w-40" />
        <Skeleton className="mb-8 h-4 w-64" />

        {/* Form skeleton */}
        <div className="mb-8 flex gap-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Board card grid skeleton */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading boards…">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <BoardCardSkeleton />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
