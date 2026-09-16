import { createFileRoute, Link } from "@tanstack/react-router";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { DemoBadge } from "@/components/site/DemoBadge";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PSL_DESKS, PSL_TEAMS } from "@/data/psl";
import { articles, cricketers } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/psl/")({
  head: () =>
    pageHead({
      title: "PSL — Pakistan Super League",
      description:
        "SceneBuzz PSL desk: Pakistan Super League news, teams, players, fixtures, results and records. No invented scores. Pakistan-first cricket coverage.",
      path: "/psl",
      image: "/assets/images/hero-cricket.jpg",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "PSL", path: "/psl" },
      ]),
    }),
  component: PslHome,
});

function PslHome() {
  const news = articles.filter((a) => a.tags.includes("PSL") || a.title.includes("PSL"));
  const pak = cricketers.filter((p) => p.country === "Pakistan").slice(0, 8);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-12 md:py-16">
          <p className="sb-kicker text-signal-soft">Pakistan Super League</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">PSL</h1>
          <p className="mt-4 max-w-2xl text-paper/75">
            A major SceneBuzz destination for the Pakistan Super League — news, teams, players and
            season architecture. Live scores, fixtures and points are not connected. Empty slots are
            not postponed matches.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/psl/$desk"
              params={{ desk: "teams" }}
              className="inline-flex h-11 items-center bg-signal px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-paper hover:bg-signal-dark"
            >
              PSL Teams
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
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "PSL" }]} />
        <p className="mb-8 max-w-3xl text-sm text-muted">{SITE.statsDisclaimer}</p>

        <section>
          <SectionHeader title="PSL desk" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PSL_DESKS.map((d) => (
              <Link
                key={d.slug}
                to="/psl/$desk"
                params={{ desk: d.slug }}
                className="border border-line bg-card p-4 hover:border-signal dark:border-night-line dark:bg-night-card"
              >
                <h2 className="font-display text-xl">{d.title}</h2>
                <p className="mt-2 text-sm text-muted">{d.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="PSL teams" href="/psl/teams" />
          <p className="mb-4 text-sm text-muted">
            Publicly known franchises. Confirm the current season list against PCB announcements.
            Squads are not published here.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PSL_TEAMS.map((t) => (
              <article
                key={t.slug}
                className="border border-line bg-card p-5 dark:border-night-line dark:bg-night-card"
              >
                <p className="sb-kicker">{t.city}</p>
                <h3 className="mt-1 font-display text-2xl">{t.name}</h3>
                <p className="mt-2 text-xs text-muted">
                  Current XI, points and net run rate: TBA — no invented table.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="Fixtures, results & points" href="/psl/fixtures" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Fixtures", slug: "fixtures" },
              { label: "Results", slug: "results" },
              { label: "Points table", slug: "points-table" },
            ].map((item) => (
              <Link
                key={item.slug}
                to="/psl/$desk"
                params={{ desk: item.slug }}
                className="border border-dashed border-line p-6 dark:border-night-line"
              >
                <p className="sb-kicker">{item.label}</p>
                <p className="mt-2 font-display text-2xl">TBA</p>
                <p className="mt-2 text-sm text-muted">
                  Official feed not connected. SceneBuzz will not invent a schedule or standing.
                </p>
                <div className="mt-3">
                  <DemoBadge />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="PSL features" href="/psl/news" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(news.length ? news : articles.filter((a) => a.category === "Cricket")).slice(0, 3).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="Pakistani cricketers" href="/cricket/players" />
          <p className="mb-4 text-sm text-muted">
            Directory profiles — not a current PSL squad. Players change by draft and retention.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pak.map((p) => (
              <ProfileCard
                key={p.slug}
                name={p.name}
                href={`/cricket/${p.slug}`}
                country={p.country}
                meta={`${p.role} · ${p.status}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
