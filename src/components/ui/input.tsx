"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const baseClasses = [
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900",
  "placeholder:text-zinc-400",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "dark:bg-zinc-800 dark:text-zinc-100",
].join(" ");

const normalBorder = "border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-zinc-700";
const errorBorder  = "border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-600";

/**
 * Single-line text input. Automatically wires id, aria-invalid, and
 * aria-describedby when rendered inside a <FormField>.
 *
 * @example
 * // Standalone
 * <Input name="search" placeholder="Search…" />
 *
 * // Inside FormField (id + aria auto-wired)
 * <FormField label="Email" error={err}>
 *   <Input name="email" type="email" />
 * </FormField>
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
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
        baseClasses,
        field?.hasError ? errorBorder : normalBorder,
        className,
      )}
      {...props}
    />
  );
});
