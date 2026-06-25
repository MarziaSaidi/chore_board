"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-1 items-center justify-center px-4 py-16"
      style={{ background: "var(--background)" }}
    >
      <div className="text-center">
        <p
          className="text-4xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--muted-foreground)" }}
          aria-hidden="true"
        >
          500
        </p>
        <h2
          className="mt-2 text-lg font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
        >
          Something went wrong
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
