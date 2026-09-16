export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-signal/30 bg-signal-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-dark dark:border-signal/40 dark:bg-ink-3 dark:text-signal-soft ${className}`}
    >
      Sample / Demo
    </span>
  );
}
