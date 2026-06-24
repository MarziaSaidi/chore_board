import { cn } from "@/lib/cn";
import type { TaskStatus } from "@/lib/supabase/types";

// ── Generic badge ──────────────────────────────────────────────────

type Variant = "default" | "primary" | "success" | "warning" | "danger";

const variantClasses: Record<Variant, string> = {
  default: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  primary: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  danger:  "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300",
};

type BadgeProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

/**
 * Compact status chip. Use for counts, labels, and short state indicators.
 *
 * @example
 * <Badge variant="success">Done</Badge>
 * <Badge>{count}</Badge>
 */
export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

// ── Task-status badge ──────────────────────────────────────────────

const statusConfig: Record<TaskStatus, { label: string; variant: Variant }> = {
  todo:        { label: "To Do",       variant: "default"  },
  in_progress: { label: "In Progress", variant: "warning"  },
  done:        { label: "Done",        variant: "success"  },
};

type StatusBadgeProps = {
  status: TaskStatus;
  className?: string;
};

/**
 * Semantic badge for task status — maps value to label + colour automatically.
 *
 * @example
 * <StatusBadge status="in_progress" />
 * // renders: "In Progress" badge in amber
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, variant } = statusConfig[status];
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
