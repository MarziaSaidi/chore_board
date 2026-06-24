import { Skeleton, TaskCardSkeleton } from "@/components/ui";

export default function BoardLoading() {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header skeleton */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-white/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/70">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-24" />
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Skeleton className="mb-3 h-4 w-28" />
        <Skeleton className="mb-6 h-8 w-56" />

        {/* Three Kanban columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-busy="true" aria-label="Loading board…">
          {Array.from({ length: 3 }).map((_, col) => (
            <div
              key={col}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-7 rounded-full" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: col + 1 }).map((_, card) => (
                  <TaskCardSkeleton key={card} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
