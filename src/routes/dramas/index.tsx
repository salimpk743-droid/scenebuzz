import { createFileRoute } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articles, dramas } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/dramas/")({
  head: () =>
    pageHead({
      title: "Pakistani dramas",
      description: "Current, popular and upcoming Pakistani dramas, with cast, OST and official viewing notes. SceneBuzz does not host episodes.",
      path: "/dramas",
      image: "/assets/images/hero-drama.jpg",
    }),
  component: DramasHome,
});

function DramasHome() {
  const current = dramas.filter((d) => !d.upcoming);
  const upcoming = dramas.filter((d) => d.upcoming);
  const news = articles.filter((a) => a.section.includes("Drama") || a.category.includes("Drama"));
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pakistani dramas" }]} />
      <h1 className="font-display text-4xl md:text-5xl">Pakistani dramas</h1>
      <p className="mt-3 max-w-3xl text-muted">
        A major SceneBuzz category. Episode files are not hosted here. Watch through official
        networks and authorized platforms only.
      </p>
      <section className="mt-10">
        <SectionHeader title="Latest drama features" href="/news" />
        <div className="grid gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Popular & catalogued dramas" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {current.map((d) => (
            <MediaCard
              key={d.slug}
              title={d.title}
              href={`/dramas/${d.slug}`}
              image="/assets/images/hero-drama.jpg"
              kicker={d.network}
              meta={`${d.genre.slice(0, 2).join(" · ")} · ${d.status}`}
            />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Upcoming dramas" href="/upcoming-dramas" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((d) => (
            <MediaCard
              key={d.slug}
              title={d.title}
              href={`/dramas/${d.slug}`}
              image="/assets/images/hero-drama.jpg"
              meta={`${d.release} · ${d.status}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
