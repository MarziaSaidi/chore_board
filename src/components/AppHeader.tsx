import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export function AppHeader({ email }: { email?: string }) {
  return (
    <header
      className="flex items-center justify-between border-b-2 px-6 py-3"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "0 2px 0 0 var(--border)",
      }}
    >
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--foreground)",
          }}
        >
          Chore Board
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {email ? (
          <span className="hidden text-sm sm:inline" style={{ color: "var(--muted-foreground)" }}>
            {email}
          </span>
        ) : null}
        <LogoutButton />
      </div>
    </header>
  );
}
