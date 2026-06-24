"use client";

import { useActionState, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteTask, updateTask } from "@/app/boards/[id]/actions";
import type { BoardMember, Task, TaskStatus } from "@/lib/supabase/types";
import { Alert, Button, Input, Select, StatusBadge, Textarea } from "@/components/ui";

// ── Icons ──────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
    </svg>
  );
}

function DragHandle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
    </svg>
  );
}

// ── Status options ─────────────────────────────────────────────────

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo",        label: "To Do"       },
  { value: "in_progress", label: "In Progress" },
  { value: "done",        label: "Done"        },
];

// ── Edit form ──────────────────────────────────────────────────────

function EditForm({
  task,
  boardId,
  members,
  onClose,
}: {
  task: Task;
  boardId: string;
  members: BoardMember[];
  onClose: () => void;
}) {
  const [state, action] = useActionState(updateTask, null);

  return (
    <form
      action={async (formData) => {
        await action(formData);
        onClose();
      }}
      className="rounded-lg border border-indigo-300 bg-white p-3 shadow-sm dark:border-indigo-700 dark:bg-zinc-800"
    >
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="boardId" value={boardId} />

      {state?.error ? (
        <Alert variant="error" className="mb-3 py-2 text-xs">
          {state.error}
        </Alert>
      ) : null}

      <div className="mb-2">
        <Input
          name="title"
          defaultValue={task.title}
          required
          maxLength={200}
          aria-label="Task title"
          className="text-sm"
        />
      </div>

      <div className="mb-3">
        <Textarea
          name="description"
          defaultValue={task.description ?? ""}
          rows={2}
          placeholder="Description (optional)"
          aria-label="Task description"
          className="text-sm"
        />
      </div>

      {members.length > 0 && (
        <div className="mb-3">
          <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">Assignee</label>
          <select
            name="assignee_id"
            defaultValue={task.assignee_id ?? ""}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option key={m.user_id} value={m.user_id}>
                {m.profile.full_name ?? m.profile.email}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" size="sm">Save</Button>
        <Button type="button" variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

// ── Shared card content ────────────────────────────────────────────

function CardContent({ task, boardId, members, onEdit, dragHandleProps }: {
  task: Task;
  boardId: string;
  members?: BoardMember[];
  onEdit: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}) {
  const [statusState, statusAction] = useActionState(updateTask, null);

  return (
    <article
      className="group rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-800"
      aria-label={task.title}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            aria-label="Drag to reorder"
            className="shrink-0 cursor-grab touch-none text-zinc-300 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-400 active:cursor-grabbing"
            {...dragHandleProps}
          >
            <DragHandle />
          </button>
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {task.title}
          </p>
        </div>

        <div
          className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100"
          aria-label="Task actions"
        >
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit "${task.title}"`}
            title="Edit"
            className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
          >
            <EditIcon />
          </button>

          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="boardId" value={boardId} />
            <button
              type="submit"
              aria-label={`Delete "${task.title}"`}
              title="Delete"
              className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:hover:bg-red-950/50"
            >
              <TrashIcon />
            </button>
          </form>
        </div>
      </div>

      {task.description ? (
        <p className="mt-1 whitespace-pre-wrap text-xs text-zinc-500 dark:text-zinc-400">
          {task.description}
        </p>
      ) : null}

      {task.assignee_id && members && (() => {
        const assignee = members.find((m) => m.user_id === task.assignee_id)?.profile;
        if (!assignee) return null;
        const initials = (assignee.full_name ?? assignee.email)
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        return (
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
              title={assignee.full_name ?? assignee.email}
            >
              {initials}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {assignee.full_name ?? assignee.email}
            </span>
          </div>
        );
      })()}

      <div className="mt-3 space-y-1.5">
        <StatusBadge status={task.status} />

        <form action={statusAction}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="boardId" value={boardId} />
          <Select
            name="status"
            defaultValue={task.status}
            aria-label={`Move "${task.title}" to column`}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="py-1 text-xs"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          {statusState?.error ? (
            <Alert variant="error" className="mt-1 py-1.5 text-xs">
              {statusState.error}
            </Alert>
          ) : null}
        </form>
      </div>
    </article>
  );
}

// ── Sortable card (used inside columns) ───────────────────────────

export function TaskCard({ task, boardId, members }: { task: Task; boardId: string; members: BoardMember[] }) {
  const [editing, setEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (editing) {
    return (
      <div ref={setNodeRef} style={style}>
        <EditForm task={task} boardId={boardId} members={members} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style}>
      <CardContent
        task={task}
        boardId={boardId}
        members={members}
        onEdit={() => setEditing(true)}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

// ── Overlay card (follows cursor during drag) ─────────────────────

export function TaskCardDragOverlay({ task }: { task: Task }) {
  return (
    <div className="rotate-2 scale-105 opacity-95 shadow-xl">
      <CardContent
        task={task}
        boardId=""
        onEdit={() => {}}
      />
    </div>
  );
}
