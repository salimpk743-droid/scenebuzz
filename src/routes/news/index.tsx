import { createFileRoute } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { articles } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/news/")({
  head: () =>
    pageHead({
      title: "News & features",
      description: "SceneBuzz sample editorial features. Demo articles are labeled and are not live news reports.",
      path: "/news",
    }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "News" }]} />
      <h1 className="font-display text-4xl">News & features</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Prototype articles are clearly marked Sample / Demo. They are evergreen explainers, not
        breaking news.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <StoryCard key={a.slug} article={a} />
        ))}
      </div>
    </main>
  );
}
