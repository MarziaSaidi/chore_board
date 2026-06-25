"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Multi-line text area. Auto-wires aria attributes when inside a <FormField>.
 *
 * @example
 * <FormField label="Description" hint="Optional">
 *   <Textarea name="description" rows={3} />
 * </FormField>
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, style, rows = 3, ...props },
  ref,
) {
  const field = useFormField();

  return (
    <textarea
      ref={ref}
      rows={rows}
      id={field?.id}
      aria-invalid={field?.hasError || undefined}
      aria-describedby={
        field?.hasError ? field.errorId : field?.hintId ?? undefined
      }
      className={cn(
        "w-full rounded-[var(--radius)] border-2 px-3 py-2 text-sm font-bold",
        "resize-none transition-all duration-150",
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
