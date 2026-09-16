import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sports/football")({
  head: () =>
    pageHead({
      title: "Football",
      description:
        "SceneBuzz football desk: Premier League, Champions League, World Cup and international football — smaller than cricket for now.",
      path: "/sports/football",
      image: "/assets/images/hero-football.jpg",
    }),
  component: FootballPage,
});

const BLOCKS = [
  { title: "Premier League", body: "England’s top flight. Tables and fixtures will connect through a licensed data feed." },
  { title: "UEFA Champions League", body: "European club competition coverage. No invented scores or line-ups." },
  { title: "FIFA World Cup", body: "Tournament explainers and diaspora-facing coverage when the cycle is active." },
  { title: "International football", body: "National-team football of interest to South Asian audiences, including World Cup qualifiers." },
  { title: "Major clubs", body: "Club pages will be added after a data partner is in place." },
  { title: "Major players", body: "A smaller player directory than cricket. No fabricated statistics." },
];

function FootballPage() {
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Sports", href: "/sports" },
          { name: "Football" },
        ]}
      />
      <p className="sb-kicker">Sports</p>
      <h1 className="mt-2 font-display text-4xl">Football</h1>
      <p className="mt-3 max-w-2xl text-muted">
        A supporting desk. Cricket remains the centre of SceneBuzz sport. Live scores are not
        connected.
      </p>
      <img
        src="/assets/images/hero-football.jpg"
        alt="Editorial football still life"
        className="mt-6 h-64 w-full object-cover"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {BLOCKS.map((b) => (
          <article key={b.title} className="border border-line bg-card p-5 dark:border-night-line dark:bg-night-card">
            <h2 className="font-display text-2xl">{b.title}</h2>
            <p className="mt-2 text-sm text-muted">{b.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
