import { createFileRoute } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { articles } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/news/")({
  head: () =>
    pageHead({
      title: "Latest stories",
      description:
        "SceneBuzz features on Pakistan cricket, PSL, Pakistani dramas, Bollywood and Talk of the Town. Demo articles are labeled.",
      path: "/news",
    }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <main>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "News" }]} />
        <h1 className="font-display text-4xl">Latest stories</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Pakistan cricket, PSL, Pakistani dramas, Bollywood and South Asian culture. Prototype
          articles are marked Sample / Demo. They are evergreen explainers, not breaking news.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </main>
  );
}
