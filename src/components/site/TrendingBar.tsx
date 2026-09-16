import { Link } from "@tanstack/react-router";
import { TRENDING } from "@/lib/site";

export function TrendingBar() {
  return (
    <div className="border-b border-line bg-ink text-paper dark:border-night-line">
      <div className="sb-container-wide flex items-center gap-4 overflow-x-auto py-2">
        <span className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-signal-soft">
          Trending
        </span>
        <ul className="flex items-center gap-4">
          {TRENDING.map((item) => (
            <li key={item.label} className="shrink-0">
              <Link
                to={item.href}
                className="text-sm text-paper/80 hover:text-paper hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
