import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { movies } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/movies/")({
  head: () =>
    pageHead({
      title: "Movies • Bollywood & Indian Cinema",
      description:
        "Bollywood, Hindi cinema and Indian films on SceneBuzz. Upcoming Indian releases. SceneBuzz does not host movies.",
      path: "/movies",
      image: "/assets/images/hero-cinema.jpg",
    }),
  component: MoviesHome,
});

function MoviesHome() {
  const released = movies.filter((m) => !m.upcoming);
  const upcoming = movies.filter((m) => m.upcoming && m.country === "India");
  const bollywood = released.filter((m) => m.country === "India");
  const pak = released.filter((m) => m.country === "Pakistan");
  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-10">
          <p className="sb-kicker text-signal-soft">Movies • Bollywood</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Indian cinema</h1>
          <p className="mt-3 max-w-2xl text-paper/70">
            Bollywood, Hindi cinema and Indian film. This is not a worldwide movies website.
            Official trailers and licensed platforms only — no unauthorized copies.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/bollywood"
              className="inline-flex h-11 items-center bg-signal px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-paper hover:bg-signal-dark"
            >
              Explore Bollywood
            </Link>
            <Link
              to="/upcoming-movies"
              className="inline-flex h-11 items-center border border-paper/30 px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] hover:bg-paper hover:text-ink"
            >
              Upcoming Bollywood
            </Link>
          </div>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Movies" }]} />
        <section className="mt-4">
          <SectionHeader title="Bollywood & Indian cinema" href="/bollywood" action="Explore Bollywood →" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bollywood.map((m) => (
              <MediaCard
                key={m.slug}
                title={m.title}
                href={`/movies/${m.slug}`}
                image="/assets/images/hero-cinema.jpg"
                kicker={m.language}
                meta={m.release}
              />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Upcoming Bollywood movies" href="/upcoming-movies" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((m) => (
              <MediaCard
                key={m.slug}
                title={m.title}
                href={`/movies/${m.slug}`}
                image="/assets/images/hero-cinema.jpg"
                meta={`${m.release} · ${m.status}`}
              />
            ))}
          </div>
        </section>
        {pak.length ? (
          <section className="mt-12">
            <SectionHeader title="Pakistani cinema" />
            <p className="mb-4 max-w-2xl text-sm text-muted">
              Pakistani theatrical films sit here as a supporting catalogue. Pakistani dramas remain
              the larger entertainment desk.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pak.map((m) => (
                <MediaCard
                  key={m.slug}
                  title={m.title}
                  href={`/movies/${m.slug}`}
                  image="/assets/images/hero-cinema.jpg"
                  kicker={m.language}
                  meta={m.release}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
