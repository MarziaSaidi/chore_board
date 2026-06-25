import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div
      className="flex flex-1 items-center justify-center px-4 py-16"
      style={{ background: "var(--background)" }}
    >
      <main
        className="w-full max-w-sm rounded-[var(--radius)] border-2 p-8 shadow-matsu"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mb-8 text-center">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            Welcome back
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Sign in to your Chore Board
          </p>
        </div>
        <LoginForm urlError={error} />
      </main>
    </div>
  );
}
