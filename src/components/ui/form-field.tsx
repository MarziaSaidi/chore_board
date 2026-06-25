"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/cn";

type FormFieldContextValue = {
  id: string;
  errorId: string;
  hintId: string;
  hasError: boolean;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  return useContext(FormFieldContext);
}

type FormFieldProps = {
  label: string;
  error?: string | null;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FormField({ label, error, hint, required, className, children }: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasError = Boolean(error);

  return (
    <FormFieldContext.Provider value={{ id, errorId, hintId, hasError }}>
      <div className={cn("space-y-1.5", className)}>
        <label
          htmlFor={id}
          className="block text-sm font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: "var(--destructive)", marginLeft: 2 }}>*</span>
          )}
        </label>

        {children}

        {hasError && error ? (
          <p id={errorId} role="alert" className="text-xs font-bold" style={{ color: "var(--destructive)" }}>
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {hint}
          </p>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
}
