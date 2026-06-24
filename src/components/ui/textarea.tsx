"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const baseClasses = [
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900",
  "placeholder:text-zinc-400",
  "resize-none transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "dark:bg-zinc-800 dark:text-zinc-100",
].join(" ");

const normalBorder = "border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-zinc-700";
const errorBorder  = "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600";

/**
 * Multi-line text area. Auto-wires aria attributes when inside a <FormField>.
 *
 * @example
 * <FormField label="Description" hint="Optional">
 *   <Textarea name="description" rows={3} />
 * </FormField>
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 3, ...props },
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
        baseClasses,
        field?.hasError ? errorBorder : normalBorder,
        className,
      )}
      {...props}
    />
  );
});
