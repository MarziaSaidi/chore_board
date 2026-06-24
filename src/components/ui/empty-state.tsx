import { cn } from "@/lib/cn";

type EmptyStateProps = {
  /** Short headline. */
  title: string;
  /** Supporting description shown below the title. */
  description?: string;
  /** Optional illustration or icon rendered above the title. */
  icon?: React.ReactNode;
  /** Optional CTA button or link rendered below the description. */
  action?: React.ReactNode;
  className?: string;
};

/**
 * Reusable empty state — boards list, task columns, search results, etc.
 *
 * @example
 * <EmptyState
 *   title="No boards yet"
 *   description="Use the field above to create your first board."
 * />
 *
 * <EmptyState
 *   icon={<InboxIcon className="h-10 w-10" />}
 *   title="No tasks"
 *   description="Add a task to get started."
 *   action={<Button size="sm">Add task</Button>}
 * />
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed",
        "border-zinc-300 bg-white/50 px-6 py-12 text-center",
        "dark:border-zinc-700 dark:bg-zinc-900/30",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 text-zinc-400 dark:text-zinc-600" aria-hidden="true">
          {icon}
        </div>
      ) : null}

      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{title}</p>

      {description ? (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{description}</p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
