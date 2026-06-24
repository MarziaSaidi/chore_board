"use client";

import { useRef, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTask } from "@/app/boards/[id]/actions";
import type { TaskStatus } from "@/lib/supabase/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
    >
      {pending ? "Adding…" : "+ Add a task"}
    </button>
  );
}

export function AddTaskForm({
  boardId,
  status,
}: {
  boardId: string;
  status: TaskStatus;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(createTask, null);

  // Reset the form only after a successful submission (null state = success).
  // On error, the title stays so the user can correct and resubmit.
  const prevStateRef = useRef(state);
  useEffect(() => {
    if (prevStateRef.current !== null && state === null) {
      formRef.current?.reset();
    }
    prevStateRef.current = state;
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="status" value={status} />
      <input
        name="title"
        type="text"
        required
        maxLength={200}
        placeholder="Task title…"
        aria-label="Task title"
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <SubmitButton />
      {state?.error ? (
        <p
          role="alert"
          className="text-xs text-red-600 dark:text-red-400"
        >
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
