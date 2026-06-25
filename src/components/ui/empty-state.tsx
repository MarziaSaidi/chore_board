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
        "flex flex-col items-center justify-center rounded-[var(--radius)] border-2 border-dashed px-6 py-12 text-center",
        className,
      )}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {icon ? (
        <div className="mb-4" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
          {icon}
        </div>
      ) : null}

      <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{title}</p>

      {description ? (
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
      ) : null}

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
