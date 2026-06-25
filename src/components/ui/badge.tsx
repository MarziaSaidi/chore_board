import { cn } from "@/lib/cn";
import type { TaskStatus } from "@/lib/supabase/types";

type Variant = "default" | "primary" | "success" | "warning" | "danger";

const variantStyles: Record<Variant, React.CSSProperties> = {
  default: { background: "var(--muted)",     color: "var(--muted-foreground)", border: "2px solid var(--border)" },
  primary: { background: "var(--primary)",   color: "var(--primary-foreground)", border: "2px solid var(--primary-border)" },
  success: { background: "oklch(0.78 0.09 145)", color: "oklch(0.25 0.07 145)", border: "2px solid oklch(0.62 0.1 145)" },
  warning: { background: "oklch(0.88 0.1 80)",  color: "oklch(0.35 0.09 75)",  border: "2px solid oklch(0.72 0.1 75)"  },
  danger:  { background: "var(--destructive)", color: "var(--destructive-foreground)", border: "2px solid var(--destructive-border)" },
};

type BadgeProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold", className)}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}

const statusConfig: Record<TaskStatus, { label: string; variant: Variant }> = {
  todo:        { label: "To Do",       variant: "default" },
  in_progress: { label: "In Progress", variant: "warning" },
  done:        { label: "Done",        variant: "success" },
};

type StatusBadgeProps = { status: TaskStatus; className?: string };

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, variant } = statusConfig[status];
  return <Badge variant={variant} className={className}>{label}</Badge>;
}
