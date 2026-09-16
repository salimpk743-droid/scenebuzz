import { hashHue, initials } from "@/lib/format";

const COUNTRY_TONES: Record<string, [string, string]> = {
  Pakistan: ["#0f3d2e", "#c41e3a"],
  India: ["#1a3358", "#c45c26"],
  Australia: ["#163a2a", "#c4a35a"],
  "West Indies": ["#3b1d4a", "#c45c26"],
  "South Africa": ["#1d3d22", "#c4a35a"],
  "Sri Lanka": ["#1b3a58", "#8b1e2d"],
  "New Zealand": ["#10233d", "#7a1f2b"],
  England: ["#1c2433", "#c41e3a"],
};

function tones(seed: string, country?: string): [string, string] {
  if (country && COUNTRY_TONES[country]) return COUNTRY_TONES[country];
  const h = hashHue(seed);
  const a = 200 + (h % 40);
  return [`hsl(${a} 28% 16%)`, `hsl(${(a + 18) % 360} 42% 38%)`];
}

type Props = {
  name: string;
  country?: string;
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
};

const SIZES = {
  sm: "h-14 w-14 text-base",
  md: "h-24 w-24 text-2xl",
  lg: "h-40 w-40 text-4xl",
  hero: "h-full w-full min-h-56 text-6xl",
};

export function Portrait({ name, country, size = "md", className = "" }: Props) {
  const [c1, c2] = tones(name, country);
  const h = hashHue(name);
  const offset = (h % 40) - 20;
  return (
    <div
      className={`relative overflow-hidden ${SIZES[size]} ${className}`}
      style={{
        background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${40 + offset}% 30%, rgba(244,241,234,0.22), transparent 46%)`,
        }}
      />
      <div
        className="absolute -right-6 -bottom-8 h-28 w-28 rotate-12 opacity-20"
        style={{ border: "12px solid #f4f1ea", borderRadius: "40%" }}
      />
      <span className="relative z-10 flex h-full w-full items-center justify-center font-display font-medium tracking-tight text-paper">
        {initials(name)}
      </span>
    </div>
  );
}
