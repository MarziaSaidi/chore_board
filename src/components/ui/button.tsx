"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    borderColor: "var(--primary-border)",
    boxShadow: "0 2px 0 0 var(--primary-border)",
  },
  secondary: {
    background: "var(--secondary)",
    color: "var(--secondary-foreground)",
    borderColor: "var(--border)",
    boxShadow: "0 2px 0 0 var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--foreground)",
    borderColor: "transparent",
    boxShadow: "none",
  },
  danger: {
    background: "var(--destructive)",
    color: "var(--destructive-foreground)",
    borderColor: "var(--destructive-border)",
    boxShadow: "0 2px 0 0 var(--destructive-border)",
  },
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

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
    style,
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
        "inline-flex items-center justify-center rounded-[var(--radius)] border-2 font-bold",
        "transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "hover:opacity-90 active:translate-y-0.5 active:shadow-none",
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      style={{ ...variantStyles[variant], ...style }}
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
