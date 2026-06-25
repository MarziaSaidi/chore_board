"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from "@/app/auth/actions";
import { AuthSplitLayout } from "@/components/login/AuthSplitLayout";
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
    <AuthSplitLayout
      title="Create an account"
      subtitle="Start your cozy organizing journey ✦"
    >
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
    </AuthSplitLayout>
  );
}
