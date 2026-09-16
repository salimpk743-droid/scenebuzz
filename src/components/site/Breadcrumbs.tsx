import { Link } from "@tanstack/react-router";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href && i < items.length - 1 ? (
              <Link to={item.href as "/"} className="hover:text-signal hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-ink dark:text-night-paper">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
