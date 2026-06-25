"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from "@/app/auth/actions";
import { Alert, Button, FormField, Input } from "@/components/ui";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth loading={pending}>
      {pending ? "Creating account…" : "Sign up"}
    </Button>
  );
}

export default function SignupPage() {
  const [state, action] = useActionState(signup, null);

  return (
    <div
      className="flex flex-1 items-center justify-center px-4 py-16"
      style={{ background: "var(--background)" }}
    >
      <main
        className="w-full max-w-sm rounded-[var(--radius)] border-2 p-8 shadow-matsu"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mb-8 text-center">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            Create an account
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Start your cozy organizing journey ✦
          </p>
        </div>

        {state?.message ? (
          <Alert variant="success" className="mb-4">
            {state.message}
          </Alert>
        ) : null}
        {state?.error ? (
          <Alert variant="error" className="mb-4">
            {state.error}
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

          <FormField label="Password" hint="At least 6 characters." required>
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </FormField>

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <Link href="/login" className="underline" style={{ color: "var(--foreground)" }}>
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
