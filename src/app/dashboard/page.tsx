import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white/70 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            T
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Task Manager
          </span>
        </div>
        <LogoutButton />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            You&apos;re signed in
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Logged in as{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {user.email}
            </span>
          </p>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
            Your tasks will live here soon.
          </p>
        </div>
      </main>
    </div>
  );
}
