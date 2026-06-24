import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBoardById } from "@/lib/db/boards";
import { getBoardTasks } from "@/lib/db/tasks";
import { getBoardMembers } from "@/lib/db/members";
import { AppHeader } from "@/components/AppHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { MembersPanel } from "@/components/board/MembersPanel";

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

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {board.title}
          </h1>

          {/* Member avatars — compact preview in header */}
          <div className="flex -space-x-2">
            {members.slice(0, 5).map((m) => {
              const display = m.profile.full_name ?? m.profile.email;
              const initials = display
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <span
                  key={m.user_id}
                  title={display}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 ring-2 ring-white dark:bg-indigo-900 dark:text-indigo-300 dark:ring-zinc-900"
                >
                  {initials}
                </span>
              );
            })}
            {members.length > 5 && (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 ring-2 ring-white dark:bg-zinc-700 dark:text-zinc-300 dark:ring-zinc-900">
                +{members.length - 5}
              </span>
            )}
          </div>
        </div>

        {deleteError ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          >
            {deleteError}
          </p>
        ) : null}

        <MembersPanel
          boardId={board.id}
          members={members}
          ownerId={board.user_id}
          currentUserId={user.id}
        />

        <KanbanBoard boardId={board.id} initialTasks={tasks} members={members} />
      </main>
    </div>
  );
}
