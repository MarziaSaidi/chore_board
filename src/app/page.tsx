import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-200 px-4 py-16 dark:from-zinc-950 dark:to-zinc-900">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white">
            T
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Task Manager
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Stay organized. Built with Next.js, Tailwind, and Supabase.
          </p>
        </div>

        {user ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Signed in as{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                {user.email}
              </span>
            </p>
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Go to dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-offset-zinc-900"
            >
              Create an account
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
