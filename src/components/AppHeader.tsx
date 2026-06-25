import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export function AppHeader({ email }: { email?: string }) {
  return (
    <header
      className="flex items-center justify-between px-6 py-3 backdrop-blur"
      style={{
        background: "rgba(245,240,232,0.85)",
        borderBottom: "2px solid #d6c9b4",
      }}
    >
      <Link href="/dashboard" className="flex items-center gap-3">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
          <circle cx="20" cy="20" r="19" fill="#4a7c59" />
          <path d="M20 30 C20 30 20 19 20 16" stroke="#f5f0e8" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 19 C20 19 14 13 10 15 C10 15 11 22 20 23" fill="#78c87e" />
          <path d="M20 16 C20 16 26 10 30 12 C30 12 29 19 20 20" fill="#9edd94" />
        </svg>
        <span style={{ fontFamily: "var(--font-kalam), cursive", fontSize: "1.35rem", fontWeight: 700, color: "#2d3a20" }}>
          Chore Board
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {email ? (
          <span className="hidden text-sm sm:inline" style={{ color: "#7a6a56" }}>
            {email}
          </span>
        ) : null}
        <LogoutButton />
      </div>
    </header>
  );
}
