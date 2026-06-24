import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserBoards } from "@/lib/db/boards";
import { AppHeader } from "@/components/AppHeader";
import { CreateBoardForm } from "@/components/CreateBoardForm";
import { deleteBoard } from "./actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: deleteError } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const boards = await getUserBoards(user.id);

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      <AppHeader email={user.email} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Your boards
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Create a board to start organizing tasks.
          </p>
        </div>

        <div className="mb-8">
          <CreateBoardForm />
          {deleteError ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
            >
              {deleteError}
            </p>
          ) : null}
        </div>

        {boards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              No boards yet
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              Use the field above to create your first board.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boards.map((board) => (
              <li
                key={board.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <Link href={`/boards/${board.id}`} className="block">
                  <h2 className="pr-8 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {board.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                    Created{" "}
                    {new Date(board.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Link>
                <form action={deleteBoard} className="absolute right-3 top-3">
                  <input type="hidden" name="id" value={board.id} />
                  <button
                    type="submit"
                    aria-label={`Delete board ${board.title}`}
                    title="Delete board"
                    className="rounded-md p-1.5 text-zinc-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-red-950/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
