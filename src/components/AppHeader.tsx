import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export function AppHeader({ email }: { email?: string }) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white/70 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <Link href="/dashboard" className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
          T
        </div>
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Task Manager
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {email ? (
          <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">
            {email}
          </span>
        ) : null}
        <LogoutButton />
      </div>
    </header>
  );
}
