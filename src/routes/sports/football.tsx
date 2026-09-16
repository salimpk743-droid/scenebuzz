import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sports/football")({
  head: () =>
    pageHead({
      title: "Football",
      description:
        "A supporting SceneBuzz desk. Pakistan cricket and the PSL remain the centre of the sports coverage. No invented scores.",
      path: "/sports/football",
      image: "/assets/images/hero-football.jpg",
    }),
  component: FootballPage,
});

const BLOCKS = [
  { title: "Premier League", body: "England’s top flight. Tables and fixtures will connect through a licensed data feed." },
  { title: "UEFA Champions League", body: "European club competition coverage. No invented scores or line-ups." },
  { title: "FIFA World Cup", body: "Tournament explainers when the cycle is active." },
  { title: "International football", body: "National-team football of interest to Pakistani and South Asian audiences." },
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
      <p className="sb-kicker">Supporting desk</p>
      <h1 className="mt-2 font-display text-4xl">Football</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Football is not a homepage pillar. Pakistan cricket and the PSL stay in front. Live scores
        are not connected.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {BLOCKS.map((b) => (
          <article key={b.title} className="border border-line p-5 dark:border-night-line">
            <h2 className="font-display text-2xl">{b.title}</h2>
            <p className="mt-2 text-sm text-muted">{b.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
