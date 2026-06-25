"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/auth/actions";
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

      <p className="mt-6 text-center text-sm" style={{ color: "#6b5744" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold underline"
          style={{ color: "#4a7a52" }}
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
