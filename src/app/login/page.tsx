import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Only URL-sourced errors come from auth/confirm redirects (server-controlled).
  // Login action errors are returned via useActionState and never touch the URL.
  const { error } = await searchParams;

  return (
    <div
      className="flex flex-1 items-center justify-center px-4 py-16"
      style={{
        background: "linear-gradient(to bottom, #8bbfd4 0%, #a8cfc0 35%, #c8ddb0 65%, #e8dfc8 100%)",
      }}
    >
      <main className="matsu-card w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-14 w-14">
              <circle cx="32" cy="32" r="30" fill="#4a7a52" />
              <path d="M32 48 C32 48 32 30 32 26" stroke="#f5edd8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 30 C32 30 24 22 18 24 C18 24 20 34 32 36" fill="#6eba74" />
              <path d="M32 26 C32 26 40 18 46 20 C46 20 44 30 32 32" fill="#8fd494" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-kalam), cursive", fontSize: "2rem", fontWeight: 700, color: "#2d3a20" }}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#7a6a56", fontFamily: "var(--font-quicksand)" }}>
            Sign in to your Chore Board
          </p>
        </div>
        <LoginForm urlError={error} />
      </main>
    </div>
  );
}
