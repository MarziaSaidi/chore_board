"use client";

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
  return (
    <form action={createBoard} className="flex gap-3">
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
  );
}
