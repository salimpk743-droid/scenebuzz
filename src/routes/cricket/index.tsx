import { createFileRoute, Link } from "@tanstack/react-router";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AdSlot } from "@/components/site/AdSlot";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articles, cricketers } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/cricket/")({
  head: () =>
    pageHead({
      title: "Cricket",
      description:
        "SceneBuzz cricket desk: Pakistan, India and international cricket, PSL, ICC events, players and legends. Sample editorial until live reporting is commissioned.",
      path: "/cricket",
      image: "/assets/images/hero-cricket.jpg",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Cricket", path: "/cricket" },
      ]),
    }),
  component: CricketHome,
});

const DESKS = [
  { title: "Pakistan cricket", href: "/cricket/players", body: "National side, PSL and Pakistan players in the featured directory." },
  { title: "India cricket", href: "/cricket/players", body: "Featured Indian players and legends with published career records." },
  { title: "International cricket", href: "/cricket/players", body: "Australia, England, South Africa, Sri Lanka, New Zealand and West Indies." },
  { title: "PSL", href: "/news", body: "Pakistan Super League coverage will live here. No invented results." },
  { title: "ICC competitions", href: "/news", body: "World Cup, Champions Trophy and World Test Championship explainers." },
  { title: "Test · ODI · T20", href: "/cricket/players", body: "Format primers and player records split by Test, ODI and T20I." },
];

function CricketHome() {
  const news = articles.filter((a) => a.category === "Cricket" || a.section === "Cricket");
  const legends = cricketers.filter((p) => p.status === "Retired").slice(0, 10);
  const active = cricketers.filter((p) => p.status === "Active").slice(0, 8);

  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Cricket" }]} />
      <p className="sb-kicker">Sports</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Cricket</h1>
      <p className="mt-3 max-w-3xl text-muted">
        The primary sports desk on SceneBuzz. Live scores, fixtures and official tables are not
        connected yet — placeholders are labeled. {SITE.statsDisclaimer}
      </p>
      <div className="mt-6">
        <AdSlot />
      </div>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DESKS.map((d) => (
          <Link key={d.title} to={d.href} className="border border-line bg-card p-5 dark:border-night-line dark:bg-night-card">
            <h2 className="font-display text-2xl">{d.title}</h2>
            <p className="mt-2 text-sm text-muted">{d.body}</p>
          </Link>
        ))}
      </section>
      <section className="mt-12">
        <SectionHeader title="Latest cricket features" href="/news" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 6).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Active featured players" href="/cricket/players" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {active.map((p) => (
            <ProfileCard key={p.slug} name={p.name} href={`/cricket/${p.slug}`} country={p.country} meta={`${p.country} · ${p.role}`} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Featured cricketers & legends" href="/cricket/players" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {legends.map((p) => (
            <ProfileCard key={p.slug} name={p.name} href={`/cricket/${p.slug}`} country={p.country} meta={`${p.country} · ${p.status}`} />
          ))}
        </div>
      </section>
      <section className="mt-12 border border-line p-6 dark:border-night-line">
        <h2 className="font-display text-2xl">Upcoming matches & recent results</h2>
        <p className="mt-2 text-sm text-muted">
          No live cricket API is connected. Fixtures and results will appear here from an official
          data partner. Do not treat empty slots as postponed matches.
        </p>
        <p className="mt-4 text-xs text-muted">Future env: CRICKET_API_KEY — never commit secrets.</p>
      </section>
    </main>
  );
}
