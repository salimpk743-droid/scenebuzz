import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { searchAll } from "@/lib/data";
import { pageHead } from "@/lib/seo";

type Search = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () =>
    pageHead({
      title: "Search",
      description: "Search SceneBuzz across cricket, dramas, movies, actors and personalities.",
      path: "/search",
    }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const results = useMemo(() => searchAll(q), [q]);

  return (
    <main className="sb-container py-10">
      <h1 className="font-display text-4xl">Search SceneBuzz</h1>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        role="search"
      >
        <label className="sr-only" htmlFor="search-q">
          Query
        </label>
        <input
          id="search-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try Wasim Akram, Fawad Khan, Yamini Malhotra"
          className="h-14 w-full rounded-md border border-line bg-card px-4 text-lg dark:border-night-line dark:bg-night-card"
        />
      </form>
      <p className="mt-4 text-sm text-muted">
        {q.trim() ? `${results.length} results` : "Type to search the prototype index."}
      </p>
      <ul className="mt-6 divide-y divide-line dark:divide-night-line">
        {results.map((r) => (
          <li key={r.href} className="py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">{r.type}</p>
            <a href={r.href} className="font-display text-2xl hover:text-signal">
              {r.title}
            </a>
            <p className="text-sm text-muted">{r.meta}</p>
            <p className="mt-1 text-sm">{r.blurb}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
