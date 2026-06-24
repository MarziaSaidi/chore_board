"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createBoard } from "@/app/dashboard/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-zinc-900"
    >
      {pending ? "Creating…" : "Create board"}
    </button>
  );
}

export function CreateBoardForm() {
  const [state, action] = useActionState(createBoard, null);

  return (
    <div className="space-y-3">
      <form action={action} className="flex gap-3">
        <input
          name="title"
          type="text"
          required
          maxLength={120}
          placeholder="New board name…"
          aria-label="Board name"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
        <SubmitButton />
      </form>
      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
