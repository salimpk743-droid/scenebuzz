import { hashHue } from "@/lib/format";

export function TitleBanner({
  title,
  eyebrow,
  meta,
}: {
  title: string;
  eyebrow: string;
  meta?: string;
}) {
  const hue = hashHue(title);
  const hue2 = (hue + 42) % 360;
  return (
    <div
      role="img"
      aria-label={`${title} ${eyebrow.toLowerCase()} banner`}
      className="relative h-full min-h-64 overflow-hidden md:min-h-96"
      style={{
        background: `radial-gradient(circle at 18% 20%, hsl(${hue} 70% 42% / .5), transparent 38%), radial-gradient(circle at 82% 78%, hsl(${hue2} 65% 34% / .55), transparent 42%), linear-gradient(135deg, #08152b 0%, #102a50 48%, #071225 100%)`,
      }}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.08)_48%,transparent_50%)]" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-soft">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl font-display text-4xl leading-tight md:text-6xl">{title}</h1>
        {meta ? <p className="mt-3 text-sm text-paper/80">{meta}</p> : null}
      </div>
    </div>
  );
}
