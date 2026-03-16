/**
 * CatIcons – Custom SVG icons for katzenbett.de
 * Replaces all emoji usage with consistent, styled SVGs.
 */

import { cn } from "@/lib/utils";

interface IconProps {
  size?: number;
  className?: string;
}

/** 😺 → Katzengesicht (allgemein / default) */
export function CatFaceIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ears */}
      <path d="M5 8 L3 2 L8 6 Z" fill="currentColor" opacity="0.9" />
      <path d="M19 8 L21 2 L16 6 Z" fill="currentColor" opacity="0.9" />
      {/* Head */}
      <circle cx="12" cy="13" r="8" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Eyes */}
      <ellipse cx="9.5" cy="12" rx="1.2" ry="1.4" fill="currentColor" />
      <ellipse cx="14.5" cy="12" rx="1.2" ry="1.4" fill="currentColor" />
      {/* Nose */}
      <path d="M11.5 14.5 L12 15.2 L12.5 14.5 Z" fill="currentColor" />
      {/* Whiskers */}
      <line x1="4" y1="14" x2="9" y2="14.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="4" y1="15.5" x2="9" y2="15.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="14.5" x2="20" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="15.5" x2="20" y2="15.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/** 🐾 → Pfote */
export function PawIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Main pad */}
      <ellipse cx="12" cy="15" rx="5" ry="4.5" fill="currentColor" opacity="0.9" />
      {/* Toe pads */}
      <ellipse cx="7" cy="9.5" rx="2" ry="2.5" fill="currentColor" opacity="0.85" />
      <ellipse cx="11" cy="8" rx="2" ry="2.5" fill="currentColor" opacity="0.85" />
      <ellipse cx="15" cy="8" rx="2" ry="2.5" fill="currentColor" opacity="0.85" />
      <ellipse cx="19" cy="9.5" rx="2" ry="2.5" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/** 🍩 → Donut-Bett */
export function DonutBedIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer ring */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.9" />
      {/* Inner hole */}
      <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1" />
      {/* Curled cat hint */}
      <path d="M9 12 Q12 10 15 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** 🏠 → Katzenhöhle / Iglu */
export function CaveIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Dome */}
      <path d="M3 17 Q3 7 12 7 Q21 7 21 17" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Base */}
      <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Entrance */}
      <path d="M9 17 Q9 13 12 13 Q15 13 15 17" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** 💙 → Orthopädisch / Memory Foam */
export function OrthoIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Mattress layers */}
      <rect x="2" y="14" width="20" height="4" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="2" y="10" width="20" height="4" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="2" y="7" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
      {/* Pressure relief curve */}
      <path d="M7 14 Q12 11 17 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none" />
    </svg>
  );
}

/** 🪟 → Fensterliege */
export function WindowBedIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Window frame */}
      <rect x="3" y="3" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
      <line x1="12" y1="3" x2="12" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Suction cup */}
      <rect x="5" y="17" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.9" />
      {/* Sun rays hint */}
      <circle cx="18" cy="6.5" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/** 🛋️ → Katzensofa */
export function SofaIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Seat */}
      <rect x="3" y="12" width="18" height="6" rx="2" fill="currentColor" opacity="0.9" />
      {/* Back */}
      <rect x="3" y="7" width="18" height="6" rx="2" fill="currentColor" opacity="0.65" />
      {/* Armrests */}
      <rect x="1" y="10" width="4" height="8" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="19" y="10" width="4" height="8" rx="2" fill="currentColor" opacity="0.9" />
      {/* Legs */}
      <rect x="4" y="18" width="2.5" height="3" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="17.5" y="18" width="2.5" height="3" rx="1" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** 🔥 → Beheiztes Bett */
export function HeatedIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bed base */}
      <rect x="2" y="15" width="20" height="5" rx="2" fill="currentColor" opacity="0.9" />
      {/* Heat waves */}
      <path d="M8 12 Q10 9 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M12 12 Q14 9 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M16 12 Q18 9 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* Heating coil */}
      <path d="M4 14 Q8 12.5 12 14 Q16 15.5 20 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

/** 🪢 → Hängematte */
export function HammockIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ropes */}
      <line x1="3" y1="4" x2="8" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="21" y1="4" x2="16" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Hammock */}
      <path d="M8 11 Q12 19 16 11" fill="currentColor" opacity="0.9" stroke="currentColor" strokeWidth="1" />
      {/* Radiator */}
      <rect x="1" y="2" width="4" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="19" y="2" width="4" height="8" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** ✨ → Premium / Highlight */
export function SparkleIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z" fill="currentColor" opacity="0.9" />
      <path d="M5 3 L5.8 6.2 L9 7 L5.8 7.8 L5 11 L4.2 7.8 L1 7 L4.2 6.2 Z" fill="currentColor" opacity="0.55" />
      <path d="M19 15 L19.6 17.4 L22 18 L19.6 18.6 L19 21 L18.4 18.6 L16 18 L18.4 17.4 Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/** ⭐ → Stern / Bestseller */
export function StarFilledIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2 L14.4 9.2 L22 9.2 L16 13.8 L18.4 21 L12 16.4 L5.6 21 L8 13.8 L2 9.2 L9.6 9.2 Z" fill="currentColor" />
    </svg>
  );
}

/** 💡 → Tipp / Redaktionstipp */
export function TipIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bulb */}
      <path d="M9 21 L15 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 19 L14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3 C8.7 3 6 5.7 6 9 C6 11.2 7.2 13.1 9 14.2 L9 17 L15 17 L15 14.2 C16.8 13.1 18 11.2 18 9 C18 5.7 15.3 3 12 3 Z" fill="currentColor" opacity="0.9" />
      {/* Glow lines */}
      <line x1="12" y1="0.5" x2="12" y2="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="19.5" y1="4" x2="18.4" y2="5.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="4.5" y1="4" x2="5.6" y2="5.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="22" y1="9" x2="20.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <line x1="2" y1="9" x2="3.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** ✅ → Checkmark / Feature */
export function CheckIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 12 L10.5 15 L16.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 📐 → Maße / Größe */
export function RulerIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="9" width="20" height="6" rx="1.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="9" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9" y1="9" x2="9" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="9" x2="15" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="9" x2="18" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** 🧵 → Material / Stoff */
export function MaterialIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Fabric weave */}
      <path d="M3 5 Q6 7 9 5 Q12 3 15 5 Q18 7 21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M3 9 Q6 11 9 9 Q12 7 15 9 Q18 11 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M3 13 Q6 15 9 13 Q12 11 15 13 Q18 15 21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M3 17 Q6 19 9 17 Q12 15 15 17 Q18 19 21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  );
}

/** 🫧 → Pflege / Waschen */
export function WashIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Tub */}
      <rect x="3" y="11" width="18" height="9" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Water waves */}
      <path d="M5 15 Q7.5 13.5 10 15 Q12.5 16.5 15 15 Q17.5 13.5 19 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Bubbles */}
      <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.2" opacity="0.8" fill="none" />
      <circle cx="14" cy="7" r="1.2" stroke="currentColor" strokeWidth="1.2" opacity="0.65" fill="none" />
      <circle cx="18" cy="9" r="1" stroke="currentColor" strokeWidth="1" opacity="0.55" fill="none" />
      {/* Faucet */}
      <path d="M11 5 L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 5 L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** 🎨 → Farben */
export function ColorsIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="9" cy="9" r="4.5" fill="currentColor" opacity="0.85" />
      <circle cx="15" cy="9" r="4.5" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="14.5" r="4.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/** 📦 → Versand */
export function BoxIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Box body */}
      <path d="M3 10 L3 19 Q3 21 5 21 L19 21 Q21 21 21 19 L21 10 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Lid */}
      <path d="M2 7 L2 10 L22 10 L22 7 Q22 5 20 5 L4 5 Q2 5 2 7 Z" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Tape stripe */}
      <line x1="12" y1="5" x2="12" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="12" y1="10" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** ↩️ → Rückgabe */
export function ReturnIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 14 L4 9 L9 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 9 L15 9 Q20 9 20 14 Q20 19 15 19 L10 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** 🏪 → Shop / Partnershop */
export function ShopIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Roof */}
      <path d="M2 10 L12 3 L22 10" fill="currentColor" opacity="0.9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Body */}
      <rect x="4" y="10" width="16" height="11" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Door */}
      <rect x="9.5" y="15" width="5" height="6" rx="1" fill="currentColor" opacity="0.7" />
      {/* Windows */}
      <rect x="5" y="12" width="4" height="3.5" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="15" y="12" width="4" height="3.5" rx="0.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** 💤 → Schlafend / Schlafstil */
export function SleepIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Crescent moon */}
      <path d="M21 12.8 A9 9 0 1 1 11.2 3 A7 7 0 0 0 21 12.8 Z" fill="currentColor" opacity="0.9" />
      {/* Stars */}
      <circle cx="19" cy="5" r="1" fill="currentColor" opacity="0.7" />
      <circle cx="16" cy="3" r="0.7" fill="currentColor" opacity="0.55" />
      <circle cx="21" cy="8" r="0.7" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

/** ❓ → Fragen / FAQ */
export function FaqIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" fontFamily="system-ui">?</text>
    </svg>
  );
}

/** 😰 → Ängstlich */
export function AnxiousCatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ears flat/back */}
      <path d="M5 9 L4 4 L8 7 Z" fill="currentColor" opacity="0.7" />
      <path d="M19 9 L20 4 L16 7 Z" fill="currentColor" opacity="0.7" />
      {/* Head */}
      <circle cx="12" cy="13" r="7.5" fill="currentColor" opacity="0.13" stroke="currentColor" strokeWidth="1.5" />
      {/* Wide worried eyes */}
      <circle cx="9.5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="14.5" cy="12" r="1.8" fill="currentColor" />
      {/* Sweat drop */}
      <path d="M19 8 Q20 6 21 8 Q21 10 19.5 10 Q18 10 19 8 Z" fill="currentColor" opacity="0.6" />
      {/* Mouth - worried */}
      <path d="M10 15.5 Q12 14.5 14 15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** 🌞 → Sonnenanbeter */
export function SunCatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sun */}
      <circle cx="12" cy="10" r="4" fill="currentColor" opacity="0.9" />
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="4" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="18" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="6.3" y1="4.3" x2="7.7" y2="5.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="16.3" y1="14.3" x2="17.7" y2="15.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="17.7" y1="4.3" x2="16.3" y2="5.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="7.7" y1="14.3" x2="6.3" y2="15.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      {/* Cat lying */}
      <path d="M4 21 Q12 17 20 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

/** 👑 → Diva / Premium */
export function CrownIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 17 L3 9 L8 13 L12 5 L16 13 L21 9 L21 17 Z" fill="currentColor" opacity="0.9" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <rect x="3" y="17" width="18" height="3" rx="1" fill="currentColor" opacity="0.75" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="3" cy="9" r="1.5" fill="currentColor" />
      <circle cx="21" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** 🦁 → Große Rasse */
export function BigCatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Mane */}
      <circle cx="12" cy="13" r="9" fill="currentColor" opacity="0.2" />
      {/* Head */}
      <circle cx="12" cy="13" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Ears */}
      <path d="M7 9 L5.5 5 L9 7.5 Z" fill="currentColor" opacity="0.85" />
      <path d="M17 9 L18.5 5 L15 7.5 Z" fill="currentColor" opacity="0.85" />
      {/* Eyes */}
      <ellipse cx="9.5" cy="12.5" rx="1.2" ry="1.4" fill="currentColor" />
      <ellipse cx="14.5" cy="12.5" rx="1.2" ry="1.4" fill="currentColor" />
      {/* Nose */}
      <path d="M11 14.5 L12 15.5 L13 14.5 Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/** 🧓 → Senior / Alte Katze */
export function SeniorCatIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ears */}
      <path d="M6 9 L4.5 4 L8.5 7 Z" fill="currentColor" opacity="0.8" />
      <path d="M18 9 L19.5 4 L15.5 7 Z" fill="currentColor" opacity="0.8" />
      {/* Head */}
      <circle cx="12" cy="13" r="7.5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      {/* Sleepy half-closed eyes */}
      <path d="M8.5 11.5 Q9.5 10.5 10.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M13.5 11.5 Q14.5 10.5 15.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Whiskers with age spots */}
      <line x1="4" y1="14" x2="9" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="4" y1="15.5" x2="9" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      {/* Zzz */}
      <text x="14" y="9" fontSize="5.5" fontWeight="700" fill="currentColor" opacity="0.65" fontFamily="system-ui">z z</text>
    </svg>
  );
}

/** 🛒 → Kaufratgeber */
export function CartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 3 L5 3 L7.5 14 L18 14 L20.5 6 L6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="9" cy="18" r="2" fill="currentColor" opacity="0.9" />
      <circle cx="16" cy="18" r="2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** 🧶 → Material / Wolle (Kaufberatung step) */
export function YarnIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 9 Q8 14 12 12 Q16 10 19.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M5 14 Q9 10 12 12 Q15 14 19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Thread end */}
      <path d="M19.5 15 Q21 16 22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
    </svg>
  );
}

/** 🧺 → Waschbarkeit */
export function LaundryIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Basket */}
      <path d="M4 9 Q4 21 12 21 Q20 21 20 9 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      {/* Rim */}
      <ellipse cx="12" cy="9" rx="8" ry="2.5" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Weave lines */}
      <line x1="8" y1="11" x2="7" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="11.5" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="16" y1="11" x2="17" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Handle */}
      <path d="M9 9 Q9 5 12 5 Q15 5 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

/** ⚠️ → Warnung/Nachteil */
export function WarningIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 3 L22 20 L2 20 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
    </svg>
  );
}

/** Type-Icon lookup helper */
export function getBedTypeIcon(typ: string, size = 24, className?: string) {
  const props = { size, className };
  if (typ.includes("Donut") || typ.includes("Anti-Angst")) return <DonutBedIcon {...props} />;
  if (typ.includes("Höhle") || typ.includes("Iglu") || typ.includes("Höhle")) return <CaveIcon {...props} />;
  if (typ.includes("Fenster")) return <WindowBedIcon {...props} />;
  if (typ.includes("Sofa")) return <SofaIcon {...props} />;
  if (typ.includes("Ortho") || typ.includes("Memory")) return <OrthoIcon {...props} />;
  if (typ.includes("Beheizt")) return <HeatedIcon {...props} />;
  if (typ.includes("Hänge") || typ.includes("Radiator")) return <HammockIcon {...props} />;
  if (typ.includes("Premium") || typ.includes("Daybed")) return <SparkleIcon {...props} />;
  return <CatFaceIcon {...props} />;
}
