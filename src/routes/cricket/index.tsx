import { createFileRoute, Link } from "@tanstack/react-router";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AdSlot } from "@/components/site/AdSlot";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articles, cricketers } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/cricket/")({
  head: () =>
    pageHead({
      title: "Cricket — Pakistan, PSL and international",
      description:
        "SceneBuzz cricket desk: Pakistan cricket, PSL, Pakistani cricketers, international cricket, news and records. Sample editorial until live reporting is commissioned.",
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
  { title: "Pakistan cricket", href: "/cricket/players", body: "National side, Pakistani players and the centre of the SceneBuzz sports desk." },
  { title: "PSL", href: "/psl", body: "Pakistan Super League — its own destination for news, teams and season architecture." },
  { title: "Pakistan national team", href: "/cricket/players", body: "Featured Pakistan players with published career records or a verify note." },
  { title: "Pakistani cricketers", href: "/cricket/players", body: "Directory of featured Pakistan names. Not an objective ranking." },
  { title: "International cricket", href: "/cricket/players", body: "India and other international sides, written for a Pakistan-first audience." },
  { title: "Cricket news", href: "/news", body: "Sample features and explainers. Live match reports need a commissioned desk." },
  { title: "Records / profiles", href: "/cricket/players", body: "Evergreen player pages. Frozen totals for retired careers." },
];

function CricketHome() {
  const news = articles.filter((a) => a.category === "Cricket" || a.section === "Cricket");
  const pak = cricketers.filter((p) => p.country === "Pakistan");
  const legends = pak.filter((p) => p.status === "Retired").slice(0, 8);
  const active = pak.filter((p) => p.status === "Active").slice(0, 8);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-12">
          <p className="sb-kicker text-signal-soft">Pakistan first</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">Cricket</h1>
          <p className="mt-4 max-w-2xl text-paper/75">
            The largest sport desk on SceneBuzz. Pakistan cricket and the PSL sit in front.
            International coverage follows. Live scores are not connected.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/psl"
              className="inline-flex h-11 items-center bg-signal px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-paper hover:bg-signal-dark"
            >
              Explore PSL
            </Link>
            <Link
              to="/cricket/players"
              className="inline-flex h-11 items-center border border-paper/30 px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] hover:bg-paper hover:text-ink"
            >
              Pakistani Cricketers
            </Link>
          </div>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Cricket" }]} />
        <p className="max-w-3xl text-muted">{SITE.statsDisclaimer}</p>
        <div className="mt-6">
          <AdSlot />
        </div>
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESKS.map((d) => (
            <Link
              key={d.title}
              to={d.href as "/"}
              className="border border-line bg-card p-5 dark:border-night-line dark:bg-night-card"
            >
              <h2 className="font-display text-2xl">{d.title}</h2>
              <p className="mt-2 text-sm text-muted">{d.body}</p>
            </Link>
          ))}
        </section>
        <section className="mt-12">
          <SectionHeader title="Pakistan cricket features" href="/news" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Pakistan — active featured players" href="/cricket/players" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {active.map((p) => (
              <ProfileCard
                key={p.slug}
                name={p.name}
                href={`/cricket/${p.slug}`}
                country={p.country}
                meta={`${p.country} · ${p.role}`}
              />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Pakistan — featured cricketers & legends" href="/cricket/players" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {legends.map((p) => (
              <ProfileCard
                key={p.slug}
                name={p.name}
                href={`/cricket/${p.slug}`}
                country={p.country}
                meta={`${p.country} · ${p.status}`}
              />
            ))}
          </div>
        </section>
        <section className="mt-12 border border-line p-6 dark:border-night-line">
          <h2 className="font-display text-2xl">Upcoming matches & recent results</h2>
          <p className="mt-2 text-sm text-muted">
            No live cricket API is connected. Fixtures and results will appear here from an official
            data partner. Do not treat empty slots as postponed matches.
          </p>
        </section>
      </div>
    </main>
  );
}
