type Props = { label?: string; size?: "banner" | "inline" | "sidebar" };

export function AdSlot({ label = "Advertisement", size = "banner" }: Props) {
  const minH = size === "sidebar" ? "min-h-48" : size === "inline" ? "min-h-24" : "min-h-20";
  return (
    <aside
      className={`flex ${minH} items-center justify-center border border-dashed border-line bg-paper-2/60 px-4 py-3 text-center dark:border-night-line dark:bg-ink-2`}
      aria-label="Advertisement placeholder"
    >
      <div>
        <p className="sb-kicker text-muted">{label}</p>
        <p className="mt-1 text-xs text-muted">
          Placeholder for a future display unit. No third-party ad script is loaded.
        </p>
      </div>
    </aside>
  );
}
