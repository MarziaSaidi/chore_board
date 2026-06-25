"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { useFormField } from "./form-field";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const baseClasses = [
  "w-full rounded-xl border-2 bg-[#faf4e8] px-3 py-2 text-sm text-[#2c1f14]",
  "placeholder:text-[#9e8870]",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

const normalBorder = "border-[#ede0c4] focus:border-[#4a7a52] focus:ring-[#4a7a52]/20";
const errorBorder  = "border-red-400 focus:border-red-500 focus:ring-red-500/30";

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
