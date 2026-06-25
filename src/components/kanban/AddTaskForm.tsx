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
      className="flex w-full items-center gap-1.5 rounded-[var(--radius)] border-2 border-dashed px-3 py-2 text-left text-sm font-bold transition-colors focus:outline-none disabled:opacity-60"
      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
    >
      {pending ? <Spinner size="xs" /> : <span aria-hidden="true">+</span>}
      {pending ? "Adding…" : "Add a task"}
    </button>
  );
}

export function AddTaskForm({ boardId, status, members }: {
  boardId: string; status: TaskStatus; members: BoardMember[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(createTask, null);

  const prevStateRef = useRef(state);
  useEffect(() => {
    if (prevStateRef.current !== null && state === null) formRef.current?.reset();
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
          className="w-full rounded-[var(--radius)] border-2 px-3 py-1.5 text-xs font-bold focus:outline-none"
          style={{ background: "var(--card)", color: "var(--foreground)", borderColor: "var(--input)", boxShadow: "0 2px 0 0 var(--border)" }}
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
      {state?.error ? <Alert variant="error" className="py-2 text-xs">{state.error}</Alert> : null}
    </form>
  );
}
