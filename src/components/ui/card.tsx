import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

/**
 * Base surface card with consistent border, radius, shadow, and dark mode.
 * Use `as` to change the element (e.g. `as="li"`, `as="article"`).
 *
 * @example
 * <Card as="li" className="p-5">…</Card>
 */
export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white shadow-sm",
        "dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
