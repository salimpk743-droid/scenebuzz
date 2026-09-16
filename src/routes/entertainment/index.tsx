import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeader } from "@/components/site/SectionHeader";
import { articles, dramas, movies } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/entertainment/")({
  head: () =>
    pageHead({
      title: "Entertainment — Pakistani dramas and Bollywood",
      description:
        "Pakistani dramas, Bollywood and Indian cinema on SceneBuzz. Pakistan first, India as the major secondary entertainment market.",
      path: "/entertainment",
      image: "/assets/images/hero-cinema.jpg",
    }),
  component: EntertainmentHome,
});

function EntertainmentHome() {
  const news = articles.filter((a) => a.category !== "Cricket" && a.category !== "Football").slice(0, 4);
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Entertainment" }]} />
      <h1 className="font-display text-4xl md:text-5xl">Entertainment</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Pakistani dramas first. Bollywood and Indian cinema next. Not a generic worldwide
        entertainment homepage.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/dramas", label: "Pakistani dramas", img: "/assets/images/hero-drama.jpg" },
          { to: "/bollywood", label: "Bollywood", img: "/assets/images/hero-cinema.jpg" },
          { to: "/movies", label: "Indian movies", img: "/assets/images/hero-cinema.jpg" },
          { to: "/talk-of-the-town", label: "Talk of the Town", img: "/assets/images/hero-fashion.jpg" },
        ].map((x) => (
          <Link key={x.to} to={x.to as "/"} className="relative min-h-40 overflow-hidden bg-ink text-paper">
            <img src={x.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
            <span className="relative z-10 flex h-full items-end p-4 font-display text-2xl">{x.label}</span>
          </Link>
        ))}
      </div>
      <section className="mt-12">
        <SectionHeader title="Latest entertainment features" href="/news" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {news.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Pakistani dramas" href="/dramas" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dramas.filter((d) => !d.upcoming).slice(0, 4).map((d) => (
            <MediaCard key={d.slug} title={d.title} href={`/dramas/${d.slug}`} image="/assets/images/hero-drama.jpg" meta={d.status} kicker={d.network} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Upcoming Bollywood" href="/upcoming-movies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {movies.filter((m) => m.upcoming && m.country === "India").slice(0, 4).map((m) => (
            <MediaCard key={m.slug} title={m.title} href={`/movies/${m.slug}`} image="/assets/images/hero-cinema.jpg" meta={`${m.release} · ${m.status}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
