import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #7ab5cc 0%, #9ec8b8 28%, #b8d4a0 52%, #cfc098 72%, #e4d8b4 88%, #f0e8cc 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Drifting clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift absolute top-[6%]" style={{ animationDelay: "0s" }}>
          <GhibliCloud width={160} opacity={0.9} />
        </div>
        <div className="animate-drift-slow absolute top-[14%]" style={{ animationDelay: "-22s" }}>
          <GhibliCloud width={100} opacity={0.75} />
        </div>
        <div className="animate-drift absolute top-[3%]" style={{ animationDelay: "-38s" }}>
          <GhibliCloud width={120} opacity={0.82} />
        </div>
        <div className="animate-drift-slow absolute top-[20%]" style={{ animationDelay: "-8s" }}>
          <GhibliCloud width={80} opacity={0.6} />
        </div>
      </div>

      {/* Layered rolling hills */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 280" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,210 C200,130 400,170 600,145 C800,120 1000,75 1200,115 C1360,145 1420,130 1440,140 L1440,280 L0,280 Z" fill="#6fa86a" fillOpacity="0.45" />
        </svg>
        <svg viewBox="0 0 1440 240" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,175 C130,105 300,148 480,118 C660,88 820,138 1000,108 C1160,82 1320,125 1440,115 L1440,240 L0,240 Z" fill="#508c56" fillOpacity="0.7" />
        </svg>
        <svg viewBox="0 0 1440 190" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,140 C180,70 380,108 560,78 C740,48 940,98 1120,72 C1280,50 1390,85 1440,78 L1440,190 L0,190 Z" fill="#3a7040" />
        </svg>
        <div className="absolute bottom-0 h-14 w-full" style={{ background: "#3a7040" }} />
      </div>

      {/* Trees */}
      <div className="pointer-events-none absolute bottom-10 left-0 right-0 flex items-end justify-between px-6">
        <GhibliTree height={128} delay="0s"   />
        <GhibliTree height={96}  delay="0.4s" />
        <div className="flex-1" />
        <GhibliTree height={108} delay="0.7s" />
        <GhibliTree height={140} delay="0.2s" />
      </div>

      {/* Main card */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-16 pb-52">
        <main className="matsu-card animate-float-up w-full max-w-md p-9">

          {/* Sprout icon */}
          <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center animate-bob" style={{ width: 72, height: 72 }}>
            <SproutIcon />
          </div>

          <div className="mb-8 text-center">
            <h1
              style={{
                fontFamily: "var(--font-kalam), cursive",
                fontSize: "2.6rem",
                fontWeight: 700,
                color: "#2d3a20",
                lineHeight: 1.15,
                letterSpacing: "0.01em",
              }}
            >
              Chore Board
            </h1>
            <p
              style={{
                fontFamily: "var(--font-quicksand), sans-serif",
                fontSize: "0.95rem",
                color: "#7a6a56",
                marginTop: "0.4rem",
              }}
            >
              A cozy place to stay organized ✦
            </p>
          </div>

          {user ? (
            <div className="space-y-4 text-center">
              <p style={{ fontSize: "0.875rem", color: "#7a6a56" }}>
                Welcome back,{" "}
                <span style={{ fontWeight: 600, color: "#2d2416" }}>{user.email}</span>
              </p>
              <Link href="/dashboard" className="matsu-btn-primary">
                Go to your board →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" className="matsu-btn-primary">
                Sign in
              </Link>
              <Link href="/signup" className="matsu-btn-secondary">
                Create an account
              </Link>
            </div>
          )}

          <p className="mt-6 text-center" style={{ fontSize: "0.7rem", color: "#b0a090" }}>
            Built with care · Next.js · Supabase
          </p>
        </main>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function GhibliCloud({ width, opacity }: { width: number; opacity: number }) {
  return (
    <svg width={width} viewBox="0 0 130 65" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <ellipse cx="65" cy="44" rx="54" ry="19" fill="white" />
      <ellipse cx="48" cy="35" rx="30" ry="22" fill="white" />
      <ellipse cx="80" cy="30" rx="24" ry="18" fill="white" />
      <ellipse cx="62" cy="28" rx="22" ry="18" fill="white" />
      <ellipse cx="55" cy="22" rx="16" ry="14" fill="white" />
    </svg>
  );
}

function GhibliTree({ height, delay }: { height: number; delay: string }) {
  const cx = height * 0.4;
  const trunkH = height * 0.33;
  const r1 = cx * 0.95;
  const r2 = cx * 0.76;
  const r3 = cx * 0.54;
  const base = height - trunkH;

  return (
    <svg
      width={cx * 2}
      height={height}
      viewBox={`0 0 ${cx * 2} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="animate-sway"
      style={{ animationDelay: delay }}
    >
      <rect x={cx - 6} y={base} width={12} height={trunkH} rx={4} fill="#6b3f1e" />
      <ellipse cx={cx} cy={base - r1 * 0.38} rx={r1}      ry={r1 * 0.82} fill="#2a6032" />
      <ellipse cx={cx} cy={base - r1 * 0.62} rx={r2}      ry={r2 * 0.72} fill="#3a7440" />
      <ellipse cx={cx} cy={base - r1 * 0.88} rx={r3}      ry={r3 * 0.72} fill="#4a8850" />
      <ellipse cx={cx - r1 * 0.22} cy={base - r1 * 0.84} rx={r3 * 0.22} ry={r3 * 0.16} fill="rgba(255,255,255,0.13)" />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" width={72} height={72}>
      <circle cx="36" cy="36" r="34" fill="#4a7c59" />
      <circle cx="36" cy="36" r="34" fill="url(#sprout-grad)" />
      <defs>
        <radialGradient id="sprout-grad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#5e9e6e" />
          <stop offset="100%" stopColor="#3a6147" />
        </radialGradient>
      </defs>
      {/* stem */}
      <path d="M36 54 C36 54 36 34 36 29" stroke="#d4edda" strokeWidth="3" strokeLinecap="round" />
      {/* left leaf */}
      <path d="M36 33 C36 33 26 24 19 26 C19 26 21 38 36 40" fill="#78c87e" />
      {/* right leaf */}
      <path d="M36 29 C36 29 46 20 53 22 C53 22 51 34 36 36" fill="#9edd94" />
      {/* leaf vein hints */}
      <path d="M36 33 C30 30 24 28 19 26" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
      <path d="M36 29 C42 26 48 24 53 22" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
    </svg>
  );
}
