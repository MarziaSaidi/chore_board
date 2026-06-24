"use client";

import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";
import { AddTaskForm } from "./AddTaskForm";
import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "@/lib/supabase/types";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "done", label: "Done" },
];

export function KanbanBoard({
  boardId,
  initialTasks,
}: {
  boardId: string;
  initialTasks: Task[];
}) {
  // Live task state comes from your realtime hook. The board renders whatever
  // this returns — once you implement the subscription, changes from other
  // browsers will flow in here automatically.
  const tasks = useRealtimeTasks(boardId, initialTasks);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.status);
        return (
          <section
            key={column.status}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {column.label}
              </h2>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex-1 space-y-2">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} boardId={boardId} />
              ))}
            </div>

            <div className="mt-3">
              <AddTaskForm boardId={boardId} status={column.status} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
