"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, style, ...props },
  ref,
) {
  const field = useFormField();

  return (
    <input
      ref={ref}
      id={field?.id}
      aria-invalid={field?.hasError || undefined}
      aria-describedby={
        field?.hasError ? field.errorId : field?.hintId ?? undefined
      }
      className={cn(
        "w-full rounded-[var(--radius)] border-2 px-3 py-2 text-sm font-bold",
        "transition-all duration-150",
        "placeholder:font-normal",
        "focus:outline-none focus:ring-2 focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      style={{
        background: "var(--card)",
        color: "var(--foreground)",
        borderColor: field?.hasError ? "var(--destructive)" : "var(--input)",
        boxShadow: field?.hasError
          ? "0 2px 0 0 var(--destructive-border)"
          : "0 2px 0 0 var(--border)",
        "--tw-ring-color": "var(--ring)",
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  );
});
