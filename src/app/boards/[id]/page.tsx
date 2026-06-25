import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBoardById } from "@/lib/db/boards";
import { getBoardTasks } from "@/lib/db/tasks";
import { getBoardMembers } from "@/lib/db/members";
import { AppHeader } from "@/components/AppHeader";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { MembersPanel } from "@/components/board/MembersPanel";
import { Avatar } from "@/components/ui";

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
    <div className="flex flex-1 flex-col" style={{ background: "var(--background)" }}>
      <AppHeader email={user.email} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm font-bold underline" style={{ color: "var(--foreground)" }}
        >
          ← Back to boards
        </Link>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-serif)", color: "var(--foreground)" }}>
            {board.title}
          </h1>

          {/* Member avatars — compact preview in header */}
          <div className="flex -space-x-2">
            {members.slice(0, 5).map((m) => {
              const display = m.profile.full_name ?? m.profile.email;
              return (
                <Avatar
                  key={m.user_id}
                  seed={m.profile.email}
                  size={32}
                  title={display}
                />
              );
            })}
            {members.length > 5 && (
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold" style={{ background: "var(--muted)", color: "var(--muted-foreground)", borderColor: "var(--border)" }}>
                +{members.length - 5}
              </span>
            )}
          </div>
        </div>

        {deleteError ? (
          <p
            role="alert"
            className="mt-4 rounded-[var(--radius)] border-2 px-4 py-2.5 text-sm font-bold" style={{ background: "oklch(0.95 0.04 29)", color: "var(--destructive)", borderColor: "var(--destructive-border)" }}
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
