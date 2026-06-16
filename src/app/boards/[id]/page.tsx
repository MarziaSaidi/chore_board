import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import type { Board } from "@/lib/supabase/types";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      <AppHeader email={user.email} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          ← Back to boards
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {board.title}
        </h1>
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Tasks are coming next
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            The kanban board and task management arrive in Day 4.
          </p>
        </div>
      </main>
    </div>
  );
}
