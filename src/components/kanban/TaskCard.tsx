"use client";

import { useState } from "react";
import { deleteTask, updateTask } from "@/app/boards/[id]/actions";
import type { Task, TaskStatus } from "@/lib/supabase/types";

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export function TaskCard({ task, boardId }: { task: Task; boardId: string }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateTask(formData);
          setEditing(false);
        }}
        className="rounded-lg border border-indigo-300 bg-white p-3 shadow-sm dark:border-indigo-700 dark:bg-zinc-800"
      >
        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="boardId" value={boardId} />
        <input
          name="title"
          defaultValue={task.title}
          required
          maxLength={200}
          aria-label="Task title"
          className="mb-2 w-full rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <textarea
          name="description"
          defaultValue={task.description ?? ""}
          rows={2}
          placeholder="Description (optional)"
          aria-label="Task description"
          className="mb-2 w-full resize-none rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-800">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {task.title}
        </p>
        <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            title="Edit"
            className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
          </button>
          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="boardId" value={boardId} />
            <button
              type="submit"
              aria-label="Delete task"
              title="Delete"
              className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {task.description ? (
        <p className="mt-1 whitespace-pre-wrap text-xs text-zinc-500 dark:text-zinc-400">
          {task.description}
        </p>
      ) : null}

      <form action={updateTask} className="mt-3">
        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="boardId" value={boardId} />
        <select
          name="status"
          defaultValue={task.status}
          aria-label="Move task"
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
