import { cn } from "@/lib/cn";

type Variant = "error" | "success" | "warning" | "info";

const variantStyles: Record<Variant, React.CSSProperties> = {
  error:   { background: "oklch(0.95 0.04 29)",  color: "var(--destructive)",          border: "2px solid var(--destructive-border)" },
  success: { background: "oklch(0.93 0.04 145)", color: "oklch(0.32 0.1 145)",         border: "2px solid oklch(0.65 0.1 145)" },
  warning: { background: "oklch(0.94 0.06 80)",  color: "oklch(0.38 0.1 75)",          border: "2px solid oklch(0.72 0.1 75)" },
  info:    { background: "var(--muted)",          color: "var(--muted-foreground)",     border: "2px solid var(--border)" },
};

const icons: Record<Variant, React.ReactNode> = {
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
};

type AlertProps = { variant?: Variant; children: React.ReactNode; className?: string };

export function Alert({ variant = "error", children, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-2.5 rounded-[var(--radius)] px-4 py-3 text-sm font-bold", className)}
      style={variantStyles[variant]}
    >
      {icons[variant]}
      <span>{children}</span>
    </div>
  );
}
