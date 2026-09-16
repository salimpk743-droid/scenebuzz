import { Link } from "@tanstack/react-router";
import { DESTINATIONS } from "@/lib/site";

type Item = { label: string; href: string };

export function CategoryStrip({
  items = DESTINATIONS as unknown as Item[],
  label = "Major destinations",
}: {
  items?: readonly Item[] | Item[];
  label?: string;
}) {
  return (
    <nav aria-label={label} className="border-y border-ink bg-ink text-paper dark:border-night-line">
      <div className="sb-container-wide flex gap-2 overflow-x-auto py-3">
        {items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            to={item.href as "/"}
            className="inline-flex h-11 shrink-0 items-center border border-paper/25 px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-paper hover:border-signal hover:bg-signal"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
