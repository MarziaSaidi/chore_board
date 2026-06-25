import { FamilyScene } from "./FamilyScene";

type AuthSplitLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthSplitLayout({ title, subtitle, children }: AuthSplitLayoutProps) {
  return (
    <div
      className="flex min-h-[100dvh] w-full flex-1 flex-col md:min-h-0 md:flex-row"
      style={{ background: "var(--background)" }}
    >
      {/* Mobile: compact scene above form */}
      <div
        className="relative flex h-56 w-full shrink-0 items-center justify-center overflow-hidden border-b-2 md:hidden"
        style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
      >
        <FamilyScene compact />
      </div>

      {/* Form panel — ~40% on desktop */}
      <div className="flex w-full shrink-0 items-center justify-center px-4 py-8 md:w-[42%] md:shrink-0 md:py-16 lg:w-[40%]">
        <main
          className="animate-fade-in-up w-full max-w-sm rounded-[var(--radius)] border-2 p-8 shadow-matsu"
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
              {title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
              {subtitle}
            </p>
          </div>
          {children}
        </main>
      </div>

      {/* Scene panel — ~60% on desktop */}
      <div
        className="relative hidden min-h-[100dvh] flex-1 items-stretch overflow-hidden border-l-2 md:flex"
        style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
      >
        <div className="absolute inset-0 opacity-40">
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, var(--primary) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, var(--accent) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-6 py-10 lg:px-10">
          <FamilyScene />
        </div>
      </div>
    </div>
  );
}
