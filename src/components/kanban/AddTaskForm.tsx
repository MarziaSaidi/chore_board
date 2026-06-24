"use client";

import { useRef, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTask } from "@/app/boards/[id]/actions";
import type { BoardMember, TaskStatus } from "@/lib/supabase/types";
import { Alert, Input, Spinner } from "@/components/ui";

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
    >
      {pending ? <Spinner size="xs" /> : <span aria-hidden="true">+</span>}
      {pending ? "Adding…" : "Add a task"}
    </button>
  );
}

export function AddTaskForm({
  boardId,
  status,
  members,
}: {
  boardId: string;
  status: TaskStatus;
  members: BoardMember[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(createTask, null);

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
      <Input
        name="title"
        type="text"
        required
        maxLength={200}
        placeholder="Task title…"
        aria-label={`Add task to ${status.replace("_", " ")} column`}
      />
      {members.length > 0 && (
        <select
          name="assignee_id"
          aria-label="Assign to"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <option value="">Unassigned</option>
          {members.map((m) => (
            <option key={m.user_id} value={m.user_id}>
              {m.profile.full_name ?? m.profile.email}
            </option>
          ))}
        </select>
      )}
      <AddButton />
      {state?.error ? (
        <Alert variant="error" className="py-2 text-xs">
          {state.error}
        </Alert>
      ) : null}
    </form>
  );
}
