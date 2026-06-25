"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, style, ...props },
  ref,
) {
  const field = useFormField();

  return (
    <select
      ref={ref}
      id={field?.id}
      aria-invalid={field?.hasError || undefined}
      aria-describedby={
        field?.hasError ? field.errorId : field?.hintId ?? undefined
      }
      className={cn(
        "w-full appearance-none rounded-[var(--radius)] border-2 py-2 pl-3 pr-9 text-sm font-bold",
        "transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: "var(--card)",
        // Themed chevron caret (color derived from --muted-foreground)
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a7a52' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.65rem center",
        backgroundSize: "1rem",
        color: "var(--foreground)",
        borderColor: field?.hasError ? "var(--destructive)" : "var(--input)",
        boxShadow: field?.hasError
          ? "0 2px 0 0 var(--destructive-border)"
          : "0 2px 0 0 var(--border)",
        "--tw-ring-color": "var(--ring)",
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </select>
  );
});
