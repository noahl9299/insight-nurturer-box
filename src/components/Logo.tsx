interface LogoProps {
  variant?: "dark" | "light";
  showClaim?: boolean;
  className?: string;
}

export function Logo({ variant = "dark", showClaim = true, className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#FFFBF5" : "#2B2B2B";
  const accentColor = "#F4A261";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Sleeping cat silhouette */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Body - curled cat */}
        <ellipse cx="18" cy="22" rx="13" ry="9" fill={accentColor} />
        {/* Head */}
        <circle cx="27" cy="16" r="7" fill={accentColor} />
        {/* Left ear */}
        <polygon points="21,10 23,5 26,10" fill={accentColor} />
        {/* Right ear */}
        <polygon points="26,9 29,4 31,9" fill={accentColor} />
        {/* Ear inner */}
        <polygon points="22,10 23.5,7 25.5,10" fill="#E76F51" opacity="0.6" />
        <polygon points="27,9 28.5,6.5 30,9" fill="#E76F51" opacity="0.6" />
        {/* Closed eyes - sleeping */}
        <path d="M24.5 16 Q25.5 15.2 26.5 16" stroke={variant === "light" ? "#FFFBF5" : "#2B2B2B"} strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Tail */}
        <path d="M5 25 Q3 28 7 29 Q11 30 10 26" stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* ZZZ - sleeping */}
        <text x="8" y="13" fontSize="6" fill={accentColor} opacity="0.7" fontFamily="serif" fontWeight="bold">z</text>
        <text x="11" y="10" fontSize="5" fill={accentColor} opacity="0.5" fontFamily="serif" fontWeight="bold">z</text>
      </svg>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0.5">
          <span
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: textColor, fontSize: "20px", fontWeight: 700 }}
          >
            katzenbett
          </span>
          <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: accentColor, fontSize: "20px", fontWeight: 700 }}>
            .de
          </span>
        </div>
        {showClaim && (
          <span
            style={{ fontFamily: "'Inter', sans-serif", color: variant === "light" ? "rgba(255,251,245,0.7)" : "#6B7280", fontSize: "10px", marginTop: "1px", letterSpacing: "0.01em" }}
          >
            Die schönsten Schlafplätze für deine Katze
          </span>
        )}
      </div>
    </div>
  );
}
