import { createFileRoute, Link } from "@tanstack/react-router";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { DemoBadge } from "@/components/site/DemoBadge";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articles, personalities } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/talk-of-the-town/")({
  head: () =>
    pageHead({
      title: "Talk of the Town",
      description:
        "Trending personalities and South Asian pop culture — Pakistan first, then India. Tasteful, advertiser-friendly, never gossip as fact.",
      path: "/talk-of-the-town",
      image: "/assets/images/hero-fashion.jpg",
    }),
  component: TalkHome,
});

function TalkHome() {
  const news = articles.filter(
    (a) => a.section.includes("Talk") || a.category.includes("Celebrity") || a.category.includes("Fashion"),
  );
  const pak = personalities.filter((p) => p.country === "Pakistan");
  const inn = personalities.filter((p) => p.country === "India");
  const rising = personalities.filter((p) => p.tags.includes("Rising Star")).slice(0, 6);

  return (
    <main>
      <section className="relative min-h-[22rem] overflow-hidden bg-ink text-paper">
        <img src="/assets/images/hero-fashion.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="relative sb-container-wide py-16">
          <p className="sb-kicker text-signal-soft">Pakistan · India · South Asia</p>
          <h1 className="mt-2 font-display text-5xl">Talk of the Town</h1>
          <p className="mt-3 max-w-xl text-paper/75">
            Public work, fashion appearances and rising careers. Rumours, measurements, relationships
            and income are never printed as fact.
          </p>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Talk of the Town" }]} />
        <section>
          <SectionHeader title="Pakistan" href="/talk-of-the-town/personalities" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pak.slice(0, 6).map((p) => (
              <ProfileCard key={p.slug} name={p.name} href={`/talk-of-the-town/${p.slug}`} country={p.country} meta={`${p.profession} · ${p.country}`} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="India" href="/talk-of-the-town/personalities" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inn.slice(0, 6).map((p) => (
              <ProfileCard key={p.slug} name={p.name} href={`/talk-of-the-town/${p.slug}`} country={p.country} meta={`${p.profession} · ${p.country}`} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Rising stars" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rising.map((p) => (
              <ProfileCard key={p.slug} name={p.name} href={`/talk-of-the-town/${p.slug}`} country={p.country} meta={p.profession} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Latest personality news" href="/news" />
          <div className="grid gap-5 md:grid-cols-3">
            {(news.length ? news : articles.slice(0, 3)).slice(0, 3).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="font-display text-2xl">Most viewed profiles</h2>
          <p className="mt-2 text-sm text-muted">
            SceneBuzz does not yet have analytics. This block is a <DemoBadge /> grouping, not a traffic ranking.
          </p>
        </section>
        <p className="mt-10">
          <Link to="/talk-of-the-town/personalities" className="font-semibold text-signal">
            Open the full personality directory
          </Link>
        </p>
      </div>
    </main>
  );
}
