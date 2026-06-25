import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserBoards } from "@/lib/db/boards";
import { AppHeader } from "@/components/AppHeader";
import { CreateBoardForm } from "@/components/CreateBoardForm";
import { deleteBoard } from "./actions";
import { Alert, Card, EmptyState } from "@/components/ui";

function BoardsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
    </svg>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: deleteError } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const boards = await getUserBoards(user.id);

  return (
    <div className="flex flex-1 flex-col" style={{ background: "var(--background)" }}>
      <AppHeader email={user.email} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 700, color: "var(--foreground)" }}>
            Your boards
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Create a board to start organizing tasks.
          </p>
        </div>

        <div className="mb-8 space-y-3">
          <CreateBoardForm />
          {deleteError ? (
            <Alert variant="error">{deleteError}</Alert>
          ) : null}
        </div>

        {boards.length === 0 ? (
          <EmptyState
            icon={<BoardsIcon />}
            title="No boards yet"
            description="Use the field above to create your first board."
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boards.map((board) => (
              <Card
                key={board.id}
                as="li"
                className="group relative flex flex-col justify-between p-5 transition-shadow hover:shadow-md"
              >
                <Link href={`/boards/${board.id}`} className="block">
                  <h2 className="pr-8 text-base font-bold" style={{ color: "var(--foreground)" }}>
                    {board.title}
                  </h2>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
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
                    aria-label={`Delete board "${board.title}"`}
                    title="Delete board"
                    className="rounded-[var(--radius)] p-1.5 opacity-0 transition hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <TrashIcon />
                  </button>
                </form>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
