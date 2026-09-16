import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { articles } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sports/")({
  head: () =>
    pageHead({
      title: "Sports — cricket and PSL first",
      description:
        "SceneBuzz sports: Pakistan cricket and PSL first. Football is a supporting desk. No invented scores.",
      path: "/sports",
      image: "/assets/images/hero-cricket.jpg",
    }),
  component: SportsHome,
});

function SportsHome() {
  const cricket = articles.filter((a) => a.category === "Cricket").slice(0, 3);
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sports" }]} />
      <h1 className="font-display text-4xl md:text-5xl">Sports</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Cricket and the PSL are the primary sport desks. Football sits behind them and is not a
        major homepage destination.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Link to="/cricket" className="relative min-h-64 overflow-hidden bg-ink text-paper">
          <img src="/assets/images/hero-cricket.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <span className="relative z-10 flex h-full flex-col justify-end p-6">
            <span className="sb-kicker text-signal-soft">Primary desk</span>
            <span className="font-display text-4xl">Cricket</span>
          </span>
        </Link>
        <Link to="/psl" className="relative min-h-64 overflow-hidden bg-ink text-paper">
          <img src="/assets/images/hero-cricket.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <span className="relative z-10 flex h-full flex-col justify-end p-6">
            <span className="sb-kicker text-signal-soft">Pakistan Super League</span>
            <span className="font-display text-4xl">PSL</span>
          </span>
        </Link>
      </div>
      <p className="mt-6">
        <Link to="/sports/football" className="text-sm font-semibold text-signal hover:underline">
          Football (supporting desk) →
        </Link>
      </p>
      <section className="mt-10">
        <h2 className="font-display text-2xl">From the cricket desk</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {cricket.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </main>
  );
}
