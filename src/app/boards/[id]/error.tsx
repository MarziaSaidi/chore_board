"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function BoardError({
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
          ✕
        </p>
        <h2
          className="mt-2 text-lg font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}
        >
          Failed to load board
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Something went wrong loading this board.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border-2 px-4 text-sm font-bold transition-all hover:opacity-90 active:translate-y-0.5 active:shadow-none"
            style={{
              background: "var(--secondary)",
              borderColor: "var(--border)",
              color: "var(--secondary-foreground)",
              boxShadow: "0 2px 0 0 var(--border)",
            }}
          >
            Back to boards
          </Link>
        </div>
      </div>
    </div>
  );
}
