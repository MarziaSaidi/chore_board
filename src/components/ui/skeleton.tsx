import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

/**
 * Single skeleton block — pulse-animated grey rectangle.
 * Compose multiple to match the shape of real content.
 *
 * @example
 * // Text line
 * <Skeleton className="h-4 w-48" />
 *
 * // Card
 * <Skeleton className="h-28 w-full rounded-2xl" />
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
    />
  );
}

/** Row of skeleton lines that mimics a paragraph of text. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div aria-hidden="true" className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Skeleton that matches a board card on the dashboard. */
export function BoardCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

/** Skeleton that matches a Kanban task card. */
export function TaskCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-800"
    >
      <Skeleton className="mb-2 h-4 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="mt-3 h-7 w-full rounded-md" />
    </div>
  );
}
