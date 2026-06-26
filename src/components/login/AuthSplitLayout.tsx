type AuthSplitLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthSplitLayout({ title, subtitle, children }: AuthSplitLayoutProps) {
  return (
    <div
      className="flex min-h-[100dvh] w-full items-center justify-center px-4 py-12"
      style={{ background: "var(--background)" }}
    >
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
  );
}
