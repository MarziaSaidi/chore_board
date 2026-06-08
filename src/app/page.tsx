export default function Home() {
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

        <ul className="space-y-3">
          <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
            <span className="h-5 w-5 rounded-full border-2 border-indigo-500" />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Set up your Supabase project
            </span>
          </li>
          <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
              ✓
            </span>
            <span className="text-sm text-zinc-500 line-through dark:text-zinc-500">
              Scaffold the app
            </span>
          </li>
        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Add a task
        </button>
      </main>
    </div>
  );
}
