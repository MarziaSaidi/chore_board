import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { AddTaskForm } from "@/components/kanban/AddTaskForm";
import { TaskCard } from "@/components/kanban/TaskCard";
import type { Board, Task, TaskStatus } from "@/lib/supabase/types";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "done", label: "Done" },
];

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: board } = await supabase
    .from("boards")
    .select("id, user_id, title, created_at")
    .eq("id", id)
    .maybeSingle<Board>();

  if (!board) {
    notFound();
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, board_id, user_id, title, description, status, position, created_at")
    .eq("board_id", id)
    .order("position", { ascending: true })
    .returns<Task[]>();

  const taskList = tasks ?? [];
  const tasksByStatus = (status: TaskStatus) =>
    taskList.filter((t) => t.status === status);

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      <AppHeader email={user.email} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          ← Back to boards
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {board.title}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {taskList.length} {taskList.length === 1 ? "task" : "tasks"}
        </p>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {COLUMNS.map((column) => {
            const columnTasks = tasksByStatus(column.status);
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
                    <TaskCard key={task.id} task={task} boardId={board.id} />
                  ))}
                </div>

                <div className="mt-3">
                  <AddTaskForm boardId={board.id} status={column.status} />
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
