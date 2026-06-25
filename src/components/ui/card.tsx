import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn("rounded-[var(--radius)] border-2", className)}
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "0 2px 0 0 var(--border)",
      }}
    >
      {children}
    </Tag>
  );
}
