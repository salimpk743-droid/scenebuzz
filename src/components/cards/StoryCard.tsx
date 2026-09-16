import { Link } from "@tanstack/react-router";
import { DemoBadge } from "@/components/site/DemoBadge";
import type { Article } from "@/lib/types";

export function StoryCard({
  article,
  variant = "standard",
}: {
  article: Article;
  variant?: "standard" | "hero" | "compact";
}) {
  if (variant === "compact") {
    return (
      <article className="group border-b border-line py-3 last:border-b-0 dark:border-night-line">
        <div className="flex flex-wrap items-center gap-2">
          <p className="sb-kicker">{article.category}</p>
          {article.demo ? <DemoBadge /> : null}
        </div>
        <h3 className="mt-1 font-display text-lg leading-snug">
          <Link to="/news/$slug" params={{ slug: article.slug }} className="transition hover:text-signal">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{article.dek}</p>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="group relative min-h-80 overflow-hidden rounded-2xl border border-line bg-ink text-paper shadow-(--shadow-card) md:min-h-[30rem] dark:border-night-line">
        <Link to="/news/$slug" params={{ slug: article.slug }} className="absolute inset-0" aria-label={article.title}>
          <img
            src={article.hero}
            alt={article.caption || article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="eager"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
        </Link>
        <div className="relative z-10 flex min-h-80 flex-col justify-end gap-3 p-5 sm:p-6 md:min-h-[30rem] md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-signal px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
              {article.category}
            </span>
            {article.demo ? (
              <DemoBadge className="border-paper/30 bg-paper/15 text-paper dark:border-paper/30 dark:bg-paper/15 dark:text-paper" />
            ) : null}
          </div>
          <h2 className="max-w-3xl font-display text-3xl leading-[1.02] tracking-tight sm:text-4xl md:text-5xl">
            <Link to="/news/$slug" params={{ slug: article.slug }} className="hover:text-signal-soft">
              {article.title}
            </Link>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-paper/80 md:text-base">{article.dek}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-paper/55">{article.author}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="sb-card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-card) dark:border-night-line dark:bg-night-card">
      <Link to="/news/$slug" params={{ slug: article.slug }} className="relative block overflow-hidden" aria-label={article.title}>
        <img
          src={article.hero}
          alt={article.caption || article.title}
          className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
          {article.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-xl leading-snug">
          <Link to="/news/$slug" params={{ slug: article.slug }} className="transition hover:text-signal">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{article.dek}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {article.demo ? <DemoBadge /> : <span />}
          <span className="text-xs text-muted">{article.author}</span>
        </div>
      </div>
    </article>
  );
}
