"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const baseClasses = [
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "dark:bg-zinc-800 dark:text-zinc-100",
].join(" ");

const normalBorder = "border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-zinc-700";
const errorBorder  = "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600";

/**
 * Styled select. Auto-wires aria attributes when inside a <FormField>.
 * Pass children as <option> elements.
 *
 * @example
 * <FormField label="Status">
 *   <Select name="status" defaultValue="todo">
 *     <option value="todo">To Do</option>
 *     <option value="in_progress">In Progress</option>
 *     <option value="done">Done</option>
 *   </Select>
 * </FormField>
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
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
        baseClasses,
        field?.hasError ? errorBorder : normalBorder,
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
