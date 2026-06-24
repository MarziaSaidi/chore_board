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
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="text-4xl font-bold text-zinc-300 dark:text-zinc-700" aria-hidden="true">
          ✕
        </p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Failed to load board
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Something went wrong loading this board.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Back to boards
          </Link>
        </div>
      </div>
    </div>
  );
}
