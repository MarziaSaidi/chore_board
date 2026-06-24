import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import type { Board, Task } from "@/lib/supabase/types";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  // Only delete-task errors arrive via URL (it's a redirect-based action).
  const { error: deleteError } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: board } = await supabase
    .from("boards")
    .select("id, user_id, title, created_at")
    .eq("id", id)
    .maybeSingle<Board>();

  if (!board) notFound();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, board_id, user_id, title, description, status, position, created_at")
    .eq("board_id", id)
    .order("position", { ascending: true })
    .returns<Task[]>();

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

        {deleteError ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          >
            {deleteError}
          </p>
        ) : null}

        <KanbanBoard boardId={board.id} initialTasks={tasks ?? []} />
      </main>
    </div>
  );
}
