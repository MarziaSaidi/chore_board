type FamilySceneProps = {
  compact?: boolean;
};

export function FamilyScene({ compact = false }: FamilySceneProps) {
  const animClass = compact ? "family-scene--compact" : "family-scene--full";

  return (
    <div
      className={`family-scene ${animClass} relative h-full w-full`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 560"
        className="h-full w-full max-h-[560px]"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--muted)" />
          </linearGradient>
        </defs>

        {/* Room backdrop */}
        <rect x="0" y="0" width="800" height="560" fill="var(--card)" />
        <rect x="0" y="320" width="800" height="240" fill="url(#floorGrad)" />
        <line
          x1="0"
          y1="320"
          x2="800"
          y2="320"
          stroke="var(--border)"
          strokeWidth="3"
        />

        {/* Kitchen wall */}
        <rect x="0" y="60" width="280" height="260" fill="var(--accent)" rx="8" />
        <rect
          x="20"
          y="180"
          width="100"
          height="120"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="2"
          rx="6"
        />
        {/* Stove */}
        <rect
          x="30"
          y="240"
          width="80"
          height="50"
          fill="var(--muted-foreground)"
          opacity="0.25"
          rx="4"
        />
        <circle cx="50" cy="258" r="8" fill="var(--foreground)" opacity="0.4" />
        <circle cx="90" cy="258" r="8" fill="var(--foreground)" opacity="0.4" />
        {/* Pot */}
        <ellipse cx="70" cy="228" rx="22" ry="10" fill="var(--foreground)" opacity="0.5" />
        <rect
          x="48"
          y="218"
          width="44"
          height="18"
          fill="var(--foreground)"
          opacity="0.45"
          rx="4"
        />

        {/* Living area shelf */}
        <rect
          x="480"
          y="100"
          width="200"
          height="12"
          fill="var(--border)"
          rx="2"
        />
        <rect
          x="500"
          y="88"
          width="40"
          height="24"
          fill="var(--primary)"
          opacity="0.6"
          rx="3"
        />
        <rect
          x="560"
          y="92"
          width="30"
          height="20"
          fill="var(--secondary-foreground)"
          opacity="0.35"
          rx="2"
        />

        {/* Daughter desk */}
        <rect
          x="580"
          y="260"
          width="140"
          height="70"
          fill="var(--accent)"
          stroke="var(--border)"
          strokeWidth="2"
          rx="6"
        />
        <rect
          x="620"
          y="230"
          width="60"
          height="40"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="2"
          rx="4"
        />

        {/* Toy bin */}
        <rect
          x="340"
          y="380"
          width="70"
          height="50"
          fill="var(--primary)"
          opacity="0.5"
          stroke="var(--primary-border)"
          strokeWidth="2"
          rx="6"
        />

        {/* ── Mom (cooking) ── */}
        <g className="family-bob" style={{ animationDelay: "0s" }}>
          <ellipse cx="115" cy="195" rx="18" ry="20" fill="var(--foreground)" opacity="0.85" />
          <path
            d="M97 215 Q115 250 133 215"
            fill="var(--primary)"
            opacity="0.75"
          />
          <rect x="100" y="210" width="30" height="35" fill="var(--primary)" opacity="0.7" rx="6" />
          {/* Arm stirring */}
          <g className="family-stir">
            <line
              x1="130"
              y1="225"
              x2="155"
              y2="210"
              stroke="var(--foreground)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line
              x1="155"
              y1="210"
              x2="160"
              y2="225"
              stroke="var(--border)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Steam wisps */}
        <g className="family-steam family-steam-1">
          <ellipse cx="68" cy="195" rx="6" ry="10" fill="var(--muted-foreground)" opacity="0.25" />
        </g>
        <g className="family-steam family-steam-2">
          <ellipse cx="78" cy="188" rx="5" ry="8" fill="var(--muted-foreground)" opacity="0.2" />
        </g>
        <g className="family-steam family-steam-3">
          <ellipse cx="58" cy="190" rx="4" ry="7" fill="var(--muted-foreground)" opacity="0.18" />
        </g>

        {/* ── Dad (fixing) ── */}
        <g className="family-bob" style={{ animationDelay: "0.8s" }}>
          <ellipse cx="420" cy="130" rx="20" ry="22" fill="var(--foreground)" opacity="0.85" />
          <rect x="400" y="150" width="40" height="55" fill="var(--secondary-foreground)" opacity="0.45" rx="8" />
          {/* Tool arm */}
          <g className="family-tool-swing">
            <line
              x1="440"
              y1="170"
              x2="475"
              y2="155"
              stroke="var(--foreground)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />
            <rect
              x="468"
              y="148"
              width="18"
              height="8"
              fill="var(--border)"
              rx="2"
              transform="rotate(-20 477 152)"
            />
          </g>
          <line
            x1="400"
            y1="175"
            x2="385"
            y2="195"
            stroke="var(--foreground)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* ── Daughter (reading) ── */}
        <g className="family-bob" style={{ animationDelay: "1.2s" }}>
          <circle cx="655" cy="248" r="16" fill="var(--foreground)" opacity="0.8" />
          <rect x="640" y="262" width="30" height="32" fill="var(--destructive)" opacity="0.35" rx="6" />
          {/* Book */}
          <rect
            x="648"
            y="275"
            width="22"
            height="16"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="2"
            rx="2"
          />
          <line x1="659" y1="277" x2="659" y2="289" stroke="var(--border)" strokeWidth="1.5" />
        </g>

        {/* Floating page */}
        <g className="family-float">
          <rect
            x="690"
            y="220"
            width="14"
            height="18"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
            rx="2"
            opacity="0.7"
          />
        </g>

        {/* ── Son (tidying) ── */}
        <g className="family-bob" style={{ animationDelay: "0.4s" }}>
          <circle cx="395" cy="318" r="17" fill="var(--foreground)" opacity="0.8" />
          <rect x="380" y="333" width="30" height="38" fill="var(--primary)" opacity="0.55" rx="6" />
          {/* Arm placing toy */}
          <g className="family-tidy-arm">
            <line
              x1="405"
              y1="345"
              x2="430"
              y2="360"
              stroke="var(--foreground)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.65"
            />
            <circle cx="438" cy="365" r="8" fill="var(--destructive)" opacity="0.4" />
          </g>
        </g>

        {/* Scattered toy */}
        <circle cx="310" cy="410" r="10" fill="var(--primary)" opacity="0.45" />

        {/* ── Pet (dog with sock) ── */}
        <g className="family-bob" style={{ animationDelay: "1.6s" }}>
          <ellipse cx="520" cy="430" rx="38" ry="22" fill="var(--secondary-foreground)" opacity="0.4" />
          <circle cx="548" cy="418" r="14" fill="var(--secondary-foreground)" opacity="0.45" />
          <ellipse cx="555" cy="422" rx="5" ry="4" fill="var(--foreground)" opacity="0.5" />
          {/* Tail */}
          <path
            className="family-tail-wag"
            d="M482 425 Q460 400 475 385"
            fill="none"
            stroke="var(--secondary-foreground)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* Sock in mouth */}
          <rect
            x="558"
            y="418"
            width="16"
            height="10"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
            rx="3"
            transform="rotate(15 566 423)"
          />
        </g>

        {/* Decorative plants */}
        <ellipse cx="750" cy="340" rx="20" ry="30" fill="var(--primary)" opacity="0.35" />
        <rect x="745" y="340" width="10" height="40" fill="var(--border)" opacity="0.5" rx="2" />

        {/* Cozy caption */}
        {!compact && (
          <text
            x="400"
            y="520"
            textAnchor="middle"
            fill="var(--muted-foreground)"
            fontSize="18"
            fontFamily="var(--font-serif)"
            fontWeight="700"
          >
            Everyone&apos;s pitching in ✦
          </text>
        )}
      </svg>
    </div>
  );
}
