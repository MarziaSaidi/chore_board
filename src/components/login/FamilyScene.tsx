type FamilySceneProps = {
  compact?: boolean;
};

export function FamilyScene({ compact = false }: FamilySceneProps) {
  const animClass = compact ? "family-scene--compact" : "family-scene--full";

  return (
    <div
      className={`family-scene ${animClass} relative mx-auto aspect-[800/560] w-full max-w-3xl`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 560"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.055 83.6)" />
            <stop offset="100%" stopColor="oklch(0.86 0.064 83.7)" />
          </linearGradient>
        </defs>

        {/* Room backdrop */}
        <rect x="0" y="0" width="800" height="560" fill="oklch(0.92 0.042 83.6)" rx={compact ? 0 : 12} />
        <rect x="0" y="320" width="800" height="240" fill="url(#floorGrad)" />
        <line x1="0" y1="320" x2="800" y2="320" stroke="oklch(0.74 0.063 80.8)" strokeWidth="3" />

        {/* Kitchen wall */}
        <rect x="0" y="60" width="280" height="260" fill="oklch(0.86 0.055 83.6)" rx="8" />
        <rect
          x="20"
          y="180"
          width="100"
          height="120"
          fill="oklch(0.92 0.042 83.6)"
          stroke="oklch(0.74 0.063 80.8)"
          strokeWidth="2"
          rx="6"
        />
        <rect x="30" y="240" width="80" height="50" fill="oklch(0.51 0.077 74.3)" opacity="0.2" rx="4" />
        <circle cx="50" cy="258" r="8" fill="oklch(0.41 0.077 78.9)" opacity="0.5" />
        <circle cx="90" cy="258" r="8" fill="oklch(0.41 0.077 78.9)" opacity="0.5" />
        <ellipse cx="70" cy="228" rx="22" ry="10" fill="oklch(0.41 0.077 78.9)" opacity="0.65" />
        <rect x="48" y="218" width="44" height="18" fill="oklch(0.41 0.077 78.9)" opacity="0.6" rx="4" />

        {/* Living area shelf */}
        <rect x="480" y="100" width="200" height="12" fill="oklch(0.74 0.063 80.8)" rx="2" />
        <rect x="500" y="88" width="40" height="24" fill="oklch(0.71 0.097 111.7)" rx="3" />
        <rect x="560" y="92" width="30" height="20" fill="oklch(0.51 0.077 78.9)" opacity="0.45" rx="2" />

        {/* Daughter desk */}
        <rect
          x="580"
          y="260"
          width="140"
          height="70"
          fill="oklch(0.86 0.055 83.6)"
          stroke="oklch(0.74 0.063 80.8)"
          strokeWidth="2"
          rx="6"
        />
        <rect
          x="620"
          y="230"
          width="60"
          height="40"
          fill="oklch(0.92 0.042 83.6)"
          stroke="oklch(0.74 0.063 80.8)"
          strokeWidth="2"
          rx="4"
        />

        {/* Toy bin */}
        <rect
          x="340"
          y="380"
          width="70"
          height="50"
          fill="oklch(0.71 0.097 111.7)"
          stroke="oklch(0.59 0.096 111.8)"
          strokeWidth="2"
          opacity="0.85"
          rx="6"
        />

        {/* Mom (cooking) */}
        <g className="family-bob" style={{ animationDelay: "0s" }}>
          <ellipse cx="115" cy="195" rx="20" ry="22" fill="oklch(0.41 0.077 78.9)" />
          <rect x="98" y="212" width="34" height="38" fill="oklch(0.71 0.097 111.7)" stroke="oklch(0.59 0.096 111.8)" strokeWidth="1.5" rx="6" />
          <g className="family-stir">
            <line x1="132" y1="228" x2="158" y2="212" stroke="oklch(0.41 0.077 78.9)" strokeWidth="5" strokeLinecap="round" />
            <line x1="158" y1="212" x2="163" y2="228" stroke="oklch(0.74 0.063 80.8)" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>

        <g className="family-steam family-steam-1">
          <ellipse cx="68" cy="195" rx="7" ry="11" fill="oklch(0.51 0.077 74.3)" opacity="0.45" />
        </g>
        <g className="family-steam family-steam-2">
          <ellipse cx="78" cy="188" rx="6" ry="9" fill="oklch(0.51 0.077 74.3)" opacity="0.4" />
        </g>
        <g className="family-steam family-steam-3">
          <ellipse cx="58" cy="190" rx="5" ry="8" fill="oklch(0.51 0.077 74.3)" opacity="0.35" />
        </g>

        {/* Dad (fixing) */}
        <g className="family-bob" style={{ animationDelay: "0.8s" }}>
          <ellipse cx="420" cy="128" rx="22" ry="24" fill="oklch(0.41 0.077 78.9)" />
          <rect x="398" y="150" width="44" height="58" fill="oklch(0.51 0.077 78.9)" opacity="0.55" stroke="oklch(0.74 0.063 80.8)" strokeWidth="1.5" rx="8" />
          <g className="family-tool-swing">
            <line x1="442" y1="172" x2="478" y2="156" stroke="oklch(0.41 0.077 78.9)" strokeWidth="5" strokeLinecap="round" />
            <rect x="470" y="148" width="20" height="10" fill="oklch(0.74 0.063 80.8)" rx="2" transform="rotate(-20 480 153)" />
          </g>
          <line x1="398" y1="178" x2="382" y2="200" stroke="oklch(0.41 0.077 78.9)" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Daughter (reading) */}
        <g className="family-bob" style={{ animationDelay: "1.2s" }}>
          <circle cx="655" cy="246" r="18" fill="oklch(0.41 0.077 78.9)" />
          <rect x="638" y="262" width="34" height="36" fill="oklch(0.63 0.24 29.2)" opacity="0.65" stroke="oklch(0.43 0.24 29.2)" strokeWidth="1.5" rx="6" />
          <rect x="646" y="276" width="24" height="18" fill="oklch(0.92 0.042 83.6)" stroke="oklch(0.74 0.063 80.8)" strokeWidth="2" rx="2" />
          <line x1="658" y1="278" x2="658" y2="292" stroke="oklch(0.74 0.063 80.8)" strokeWidth="2" />
        </g>

        <g className="family-float">
          <rect x="690" y="218" width="16" height="20" fill="oklch(0.92 0.042 83.6)" stroke="oklch(0.74 0.063 80.8)" strokeWidth="2" rx="2" />
        </g>

        {/* Son (tidying) */}
        <g className="family-bob" style={{ animationDelay: "0.4s" }}>
          <circle cx="395" cy="316" r="19" fill="oklch(0.41 0.077 78.9)" />
          <rect x="378" y="333" width="34" height="40" fill="oklch(0.71 0.097 111.7)" stroke="oklch(0.59 0.096 111.8)" strokeWidth="1.5" rx="6" />
          <g className="family-tidy-arm">
            <line x1="408" y1="348" x2="434" y2="362" stroke="oklch(0.41 0.077 78.9)" strokeWidth="5" strokeLinecap="round" />
            <circle cx="442" cy="366" r="10" fill="oklch(0.63 0.24 29.2)" opacity="0.65" />
          </g>
        </g>

        <circle cx="310" cy="410" r="11" fill="oklch(0.63 0.24 29.2)" opacity="0.55" />

        {/* Pet */}
        <g className="family-bob" style={{ animationDelay: "1.6s" }}>
          <ellipse cx="520" cy="432" rx="42" ry="24" fill="oklch(0.51 0.077 78.9)" opacity="0.55" />
          <circle cx="552" cy="418" r="16" fill="oklch(0.51 0.077 78.9)" opacity="0.6" />
          <ellipse cx="560" cy="422" rx="6" ry="5" fill="oklch(0.41 0.077 78.9)" />
          <path
            className="family-tail-wag"
            d="M478 428 Q452 398 468 380"
            fill="none"
            stroke="oklch(0.51 0.077 78.9)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.65"
          />
          <rect
            x="562"
            y="418"
            width="18"
            height="12"
            fill="oklch(0.92 0.042 83.6)"
            stroke="oklch(0.74 0.063 80.8)"
            strokeWidth="2"
            rx="3"
            transform="rotate(15 571 424)"
          />
        </g>

        <ellipse cx="750" cy="340" rx="22" ry="32" fill="oklch(0.71 0.097 111.7)" opacity="0.6" />
        <rect x="744" y="340" width="12" height="42" fill="oklch(0.74 0.063 80.8)" rx="2" />

        {!compact && (
          <text
            x="400"
            y="520"
            textAnchor="middle"
            fill="oklch(0.41 0.077 78.9)"
            fontSize="20"
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
