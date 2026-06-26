"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, loginAsDemo } from "@/app/auth/actions";
import { Alert, Button, FormField, Input } from "@/components/ui";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth loading={pending}>
      {pending ? "Signing in…" : "Log in"}
    </Button>
  );
}

export function LoginForm({ urlError }: { urlError?: string }) {
  const [state, action] = useActionState(login, null);
  const error = state?.error ?? urlError;

  return (
    <>
      {state?.message ? (
        <Alert variant="success" className="mb-4">
          {state.message}
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      ) : null}

      {/* Demo access */}
      <div
        className="mb-5 rounded-[var(--radius)] border-2 px-4 py-3"
        style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
          Just browsing?
        </p>
        <p className="mb-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="font-mono" style={{ color: "var(--foreground)" }}>demo@choreboard.app</span>
          {" · "}
          <span className="font-mono" style={{ color: "var(--foreground)" }}>demo1234</span>
        </p>
        <form action={loginAsDemo}>
          <Button type="submit" fullWidth variant="secondary">
            Log in as Demo
          </Button>
        </form>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <hr className="flex-1" style={{ borderColor: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>or sign in</span>
        <hr className="flex-1" style={{ borderColor: "var(--border)" }} />
      </div>

      <form action={action} className="space-y-4">
        <FormField label="Email" required>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        </FormField>

        <SubmitButton />
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="underline"
          style={{ color: "var(--foreground)" }}
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
