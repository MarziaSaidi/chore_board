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
      style={{
        background: "linear-gradient(to bottom, #8bbfd4 0%, #a8cfc0 35%, #c8ddb0 65%, #e8dfc8 100%)",
      }}
    >
      <main className="matsu-card w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-14 w-14">
              <circle cx="32" cy="32" r="30" fill="#4a7a52" />
              <path d="M32 48 C32 48 32 30 32 26" stroke="#f5edd8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 30 C32 30 24 22 18 24 C18 24 20 34 32 36" fill="#6eba74" />
              <path d="M32 26 C32 26 40 18 46 20 C46 20 44 30 32 32" fill="#8fd494" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-kalam), cursive", fontSize: "2rem", fontWeight: 700, color: "#2d3a20" }}>
            Join the board
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#7a6a56", fontFamily: "var(--font-quicksand)" }}>
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

          <FormField
            label="Password"
            hint="At least 6 characters."
            required
          >
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

        <p className="mt-6 text-center text-sm" style={{ color: "#6b5744" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold underline"
            style={{ color: "#4a7a52" }}
          >
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
