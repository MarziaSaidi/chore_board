"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/cn";

// ── Context ────────────────────────────────────────────────────────
// Provides ids and error state to child Input / Textarea / Select
// so they can auto-wire aria-describedby and aria-invalid.

type FormFieldContextValue = {
  id: string;
  errorId: string;
  hintId: string;
  hasError: boolean;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/** Read FormField context from within a child control. */
export function useFormField() {
  return useContext(FormFieldContext);
}

// ── Component ──────────────────────────────────────────────────────

type FormFieldProps = {
  label: string;
  /** Validation error message — shown below the control in red. */
  error?: string | null;
  /** Supplemental hint — shown below the control in muted text. */
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Wraps a form control with a label, optional hint, and optional error.
 * Children (Input, Textarea, Select) auto-receive id and aria attributes
 * via context — no manual prop drilling needed.
 *
 * @example
 * <FormField label="Email" error={state?.error} required>
 *   <Input name="email" type="email" autoComplete="email" />
 * </FormField>
 */
export function FormField({
  label,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasError = Boolean(error);

  return (
    <FormFieldContext.Provider value={{ id, errorId, hintId, hasError }}>
      <div className={cn("space-y-1.5", className)}>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-500">
              *
            </span>
          )}
        </label>

        {children}

        {hasError && error ? (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-zinc-500 dark:text-zinc-400">
            {hint}
          </p>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
}
