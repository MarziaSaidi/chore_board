import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-4 py-16 gap-10"
      style={{ background: "var(--background)" }}
    >
      {/* Masked hero image from Matsu demo */}
      <div className="mask-shape6 overflow-hidden animate-fade-in-up" style={{ width: 260, height: 260, animationDelay: "0s" }}>
        <Image
          src="https://matsu-theme.vercel.app/house.png"
          alt="A cozy Ghibli house"
          width={260}
          height={260}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Card */}
      <main
        className="animate-fade-in-up w-full max-w-sm rounded-[var(--radius)] border-2 p-8 shadow-matsu"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          animationDelay: "0.15s",
        }}
      >
        <div className="mb-7 text-center">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            Chore Board
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--muted-foreground)", fontWeight: 700 }}
          >
            A cozy place to stay organized ✦
          </p>
        </div>

        {user ? (
          <div className="space-y-4 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Welcome back,{" "}
              <span style={{ color: "var(--foreground)" }}>{user.email}</span>
            </p>
            <Link
              href="/dashboard"
              className="block w-full rounded-[var(--radius)] border-2 px-4 py-2.5 text-center text-sm shadow-primary transition-all hover:opacity-90 active:translate-y-0.5 active:shadow-none"
              style={{
                background: "var(--primary)",
                borderColor: "var(--primary-border)",
                color: "var(--primary-foreground)",
                fontWeight: 700,
              }}
            >
              Go to your board →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-[var(--radius)] border-2 px-4 py-2.5 text-center text-sm shadow-primary transition-all hover:opacity-90 active:translate-y-0.5 active:shadow-none"
              style={{
                background: "var(--primary)",
                borderColor: "var(--primary-border)",
                color: "var(--primary-foreground)",
                fontWeight: 700,
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="block w-full rounded-[var(--radius)] border-2 px-4 py-2.5 text-center text-sm shadow-matsu transition-all hover:opacity-90 active:translate-y-0.5 active:shadow-none"
              style={{
                background: "var(--secondary)",
                borderColor: "var(--border)",
                color: "var(--secondary-foreground)",
                fontWeight: 700,
              }}
            >
              Create an account
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
