import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { DemoBadge } from "@/components/site/DemoBadge";
import { getPslDesk, PSL_DESKS, PSL_TEAMS } from "@/data/psl";
import { articles, cricketers } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/psl/$desk")({
  loader: ({ params }) => {
    const desk = getPslDesk(params.desk);
    if (!desk) throw notFound();
    return desk;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData ? `${loaderData.title} — PSL` : "PSL",
      description: loaderData
        ? `${loaderData.title} on SceneBuzz. ${loaderData.body}`
        : "Pakistan Super League desk on SceneBuzz.",
      path: `/psl/${loaderData?.slug ?? ""}`,
      image: "/assets/images/hero-cricket.jpg",
      jsonLd: loaderData
        ? breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "PSL", path: "/psl" },
            { name: loaderData.title, path: `/psl/${loaderData.slug}` },
          ])
        : undefined,
    }),
  component: PslDeskPage,
});

function PslDeskPage() {
  const desk = Route.useLoaderData();
  const news = articles.filter((a) => a.tags.includes("PSL") || a.title.includes("PSL"));
  const pak = cricketers.filter((p) => p.country === "Pakistan").slice(0, 8);
  const liveSlots = desk.slug === "fixtures" || desk.slug === "results" || desk.slug === "points-table";

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-12">
          <p className="sb-kicker text-signal-soft">Pakistan Super League</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{desk.title}</h1>
          <p className="mt-4 max-w-2xl text-paper/75">{desk.body}</p>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "PSL", href: "/psl" },
            { name: desk.title },
          ]}
        />
        <div className="mb-8 flex flex-wrap gap-2">
          {PSL_DESKS.map((d) => (
            <Link
              key={d.slug}
              to="/psl/$desk"
              params={{ desk: d.slug }}
              className={`inline-flex h-10 items-center border px-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] ${
                d.slug === desk.slug
                  ? "border-signal bg-signal text-paper"
                  : "border-line hover:border-signal hover:text-signal dark:border-night-line"
              }`}
            >
              {d.title}
            </Link>
          ))}
        </div>

        {desk.slug === "news" ? (
          <section>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(news.length ? news : articles.filter((a) => a.category === "Cricket")).slice(0, 6).map((a) => (
                <StoryCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        ) : null}

        {desk.slug === "teams" ? (
          <section>
            <p className="mb-4 max-w-2xl text-sm text-muted">
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
                  <h2 className="mt-1 font-display text-2xl">{t.name}</h2>
                  <p className="mt-2 text-xs text-muted">
                    Current XI, points and net run rate: TBA — no invented table.
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {desk.slug === "players" ? (
          <section>
            <p className="mb-4 max-w-2xl text-sm text-muted">
              Directory profiles — not a current PSL squad. Players change by draft and retention.{" "}
              {SITE.statsDisclaimer}
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
        ) : null}

        {liveSlots || desk.slug === "records" || desk.slug === "draft" || desk.slug === "match-reports" || desk.slug === "seasons" ? (
          <section className="border border-dashed border-line p-8 dark:border-night-line">
            <p className="sb-kicker">{desk.title}</p>
            <p className="mt-2 font-display text-4xl">TBA</p>
            <p className="mt-3 max-w-xl text-sm text-muted">{desk.body}</p>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Empty slots are not postponed matches, unpublished results or a hidden table. Live
              data is not connected yet.
            </p>
            <div className="mt-4">
              <DemoBadge />
            </div>
          </section>
        ) : null}

        <p className="mt-10">
          <Link to="/psl" className="text-sm font-semibold text-signal hover:underline">
            ← Back to PSL
          </Link>
        </p>
      </div>
    </main>
  );
}
