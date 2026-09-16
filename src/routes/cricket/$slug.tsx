import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CareerChart } from "@/components/cricket/CareerChart";
import { StatsTable } from "@/components/cricket/StatsTable";
import { Portrait } from "@/components/portrait/Portrait";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { getCricketer, relatedCricketers } from "@/lib/data";
import { prettyDate } from "@/lib/format";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/cricket/$slug")({
  loader: ({ params }) => {
    const player = getCricketer(params.slug);
    if (!player) throw notFound();
    return player;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData ? `${loaderData.name} — cricket profile` : "Player",
      description: loaderData?.summary.slice(0, 160) ?? "SceneBuzz cricket profile",
      path: `/cricket/${loaderData?.slug ?? ""}`,
      type: "profile",
      jsonLd: loaderData
        ? [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Cricket", path: "/cricket" },
              { name: loaderData.name, path: `/cricket/${loaderData.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: loaderData.name,
              nationality: loaderData.country,
              jobTitle: "Cricketer",
              url: `https://scenebuzz.com/cricket/${loaderData.slug}`,
            },
          ]
        : undefined,
    }),
  component: PlayerPage,
});

function PlayerPage() {
  const p = Route.useLoaderData();
  const related = relatedCricketers(p.related, p.slug);

  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cricket", href: "/cricket" },
          { name: "Players", href: "/cricket/players" },
          { name: p.name },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Portrait name={p.name} country={p.country} size="hero" className="min-h-80 rounded-xl" />
          <p className="mt-2 text-xs text-muted">
            Editorial monogram portrait. Licensed photography will replace this placeholder.
          </p>
        </div>
        <div className="lg:col-span-8">
          <p className="sb-kicker">{p.country}</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-1 text-muted">{p.fullName}</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
            <div><dt className="text-muted">Role</dt><dd>{p.role}</dd></div>
            <div><dt className="text-muted">Status</dt><dd>{p.status}</dd></div>
            <div><dt className="text-muted">Batting</dt><dd>{p.battingStyle}</dd></div>
            <div><dt className="text-muted">Bowling</dt><dd>{p.bowlingStyle || "N/A"}</dd></div>
            <div><dt className="text-muted">Date of birth</dt><dd>{prettyDate(p.dob)}</dd></div>
            <div><dt className="text-muted">Birthplace</dt><dd>{p.birthplace}</dd></div>
          </dl>
        </div>
      </div>
      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl">Career summary</h2>
        <p className="mt-3 sb-prose">{p.summary}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl">Career highlights</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Teams</h3>
          <p className="mt-2 text-sm">{p.teams.join(", ")}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Captaincy</h3>
          <p className="mt-2 text-sm">{p.captaincy || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Awards</h3>
          <p className="mt-2 text-sm">{p.awards.length ? p.awards.join("; ") : "Verify before publication."}</p>
        </div>
      </section>
      <section className="mt-8 text-sm">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Debut</h3>
        <p className="mt-2">Test: {p.debut.test || "N/A"}</p>
        <p>ODI: {p.debut.odi || "N/A"}</p>
        <p>T20I: {p.debut.t20i || "N/A"}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl">Statistics</h2>
        <p className="mt-2 text-xs text-muted">Statistics last updated: {p.statsUpdated}</p>
        <p className="mt-1 text-xs text-muted">{p.statsNote}</p>
        <div className="mt-4">
          <StatsTable tests={p.tests} odis={p.odis} t20is={p.t20is} />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl">Career charts</h2>
        <p className="mt-2 text-xs text-muted">
          Charts use the same published career totals as the table. No yearly series is invented.
        </p>
        <div className="mt-4">
          <CareerChart player={p} />
        </div>
      </section>
      <section className="mt-10">
        <ShareBar title={p.name} path={`/cricket/${p.slug}`} />
      </section>
      {related.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Related</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to="/cricket/$slug" params={{ slug: r.slug }} className="text-signal hover:underline">
                  {r.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cricket" className="hover:underline">
                Pakistan & international cricket
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:underline">
                Latest cricket features
              </Link>
            </li>
          </ul>
        </section>
      ) : null}
      <p className="mt-10 text-xs text-muted">{SITE.statsDisclaimer}</p>
    </main>
  );
}
