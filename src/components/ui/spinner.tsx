import { cn } from "@/lib/cn";

type Size = "xs" | "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[3px]",
};

type SpinnerProps = {
  size?: Size;
  label?: string;
  className?: string;
};

/**
 * Accessible loading spinner.
 * Uses border-trick animation — zero SVG overhead.
 *
 * @example
 * <Spinner size="sm" label="Saving task…" />
 */
export function Spinner({ size = "sm", label = "Loading…", className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex items-center justify-center", className)}>
      <span
        className={cn(
          "block animate-spin rounded-full border-current border-t-transparent opacity-75",
          sizeClasses[size],
        )}
      />
    </span>
  );
}
