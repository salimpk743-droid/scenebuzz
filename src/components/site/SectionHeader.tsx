import { Link } from "@tanstack/react-router";

type Props = {
  kicker?: string;
  title: string;
  href?: string;
  action?: string;
};

export function SectionHeader({ kicker, title, href, action = "See all" }: Props) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {kicker ? <p className="sb-kicker mb-1">{kicker}</p> : null}
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-night-paper md:text-3xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          to={href}
          className="shrink-0 text-sm font-semibold text-signal hover:underline"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
