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
      <article className="border-b border-line py-3 last:border-b-0 dark:border-night-line">
        <div className="flex flex-wrap items-center gap-2">
          <p className="sb-kicker">{article.category}</p>
          {article.demo ? <DemoBadge /> : null}
        </div>
        <h3 className="mt-1 font-display text-lg leading-snug">
          <Link to="/news/$slug" params={{ slug: article.slug }} className="hover:text-signal">
            {article.title}
          </Link>
        </h3>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="group relative min-h-72 overflow-hidden border border-line bg-ink text-paper shadow-(--shadow-card) md:min-h-[28rem] dark:border-night-line">
        <Link to="/news/$slug" params={{ slug: article.slug }} className="absolute inset-0">
          <img
            src={article.hero}
            alt={article.caption || article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="eager"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        </Link>
        <div className="relative z-10 flex min-h-72 flex-col justify-end gap-3 p-5 md:min-h-[28rem] md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-signal px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
              {article.category}
            </span>
            {article.demo ? (
              <DemoBadge className="border-paper/30 bg-paper/15 text-paper dark:border-paper/30 dark:bg-paper/15 dark:text-paper" />
            ) : null}
          </div>
          <h2 className="max-w-3xl font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">
            <Link to="/news/$slug" params={{ slug: article.slug }} className="hover:text-signal-soft">
              {article.title}
            </Link>
          </h2>
          <p className="max-w-2xl text-sm text-paper/80 md:text-base">{article.dek}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-paper/55">{article.author}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-line bg-card shadow-(--shadow-card) dark:border-night-line dark:bg-night-card">
      <Link to="/news/$slug" params={{ slug: article.slug }} className="relative block overflow-hidden">
        <img
          src={article.hero}
          alt={article.caption || article.title}
          className="min-h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
          {article.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug">
          <Link to="/news/$slug" params={{ slug: article.slug }} className="hover:text-signal">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">{article.dek}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {article.demo ? <DemoBadge /> : <span />}
          <span className="text-xs text-muted">{article.author}</span>
        </div>
      </div>
    </article>
  );
}
