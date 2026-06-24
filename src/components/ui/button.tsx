"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

// ── Variant & size maps ────────────────────────────────────────────

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-indigo-600 text-white",
    "hover:bg-indigo-500",
    "focus-visible:ring-indigo-500",
  ].join(" "),
  secondary: [
    "border border-zinc-300 bg-white text-zinc-700",
    "hover:bg-zinc-50",
    "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
    "focus-visible:ring-zinc-400",
  ].join(" "),
  ghost: [
    "text-zinc-600",
    "hover:bg-zinc-100 hover:text-zinc-900",
    "dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    "focus-visible:ring-zinc-400",
  ].join(" "),
  danger: [
    "bg-red-600 text-white",
    "hover:bg-red-500",
    "focus-visible:ring-red-500",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
};

// ── Props ──────────────────────────────────────────────────────────

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner and sets aria-busy. Automatically disables the button. */
  loading?: boolean;
  /** Stretches to full container width. */
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

/**
 * Unified button with four variants, three sizes, and a built-in loading state.
 *
 * @example
 * // Primary submit button
 * <Button type="submit" loading={pending}>Save</Button>
 *
 * // Danger with leading icon
 * <Button variant="danger" size="sm" leadingIcon={<TrashIcon />}>Delete</Button>
 *
 * // Ghost full-width
 * <Button variant="ghost" fullWidth>Cancel</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    disabled,
    children,
    className,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "dark:focus-visible:ring-offset-zinc-900",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={size === "lg" ? "md" : "xs"} className="shrink-0" />
      ) : leadingIcon ? (
        <span className="shrink-0" aria-hidden="true">{leadingIcon}</span>
      ) : null}

      {children}

      {!loading && trailingIcon ? (
        <span className="shrink-0" aria-hidden="true">{trailingIcon}</span>
      ) : null}
    </button>
  );
});
