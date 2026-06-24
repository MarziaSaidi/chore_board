import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBoardById } from "@/lib/db/boards";
import { getBoardTasks } from "@/lib/db/tasks";
import { getBoardMembers } from "@/lib/db/members";
import { AppHeader } from "@/components/AppHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error: deleteError } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [board, tasks, members] = await Promise.all([
    getBoardById(id),
    getBoardTasks(id),
    getBoardMembers(id),
  ]);

  if (!board) notFound();

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

        <KanbanBoard boardId={board.id} initialTasks={tasks} members={members} />
      </main>
    </div>
  );
}
