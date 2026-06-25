import { Skeleton, TaskCardSkeleton } from "@/components/ui";

export default function BoardLoading() {
  return (
    <div className="flex flex-1 flex-col" style={{ background: "var(--background)" }}>
      {/* Header skeleton */}
      <div
        className="flex items-center justify-between border-b-2 px-6 py-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
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
              className="flex flex-col rounded-[var(--radius)] border-2 p-3"
              style={{ background: "var(--secondary)", borderColor: "var(--border)" }}
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
