import { createFileRoute } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeader } from "@/components/site/SectionHeader";
import { movies } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/movies/")({
  head: () =>
    pageHead({
      title: "Movies",
      description: "Bollywood, Indian cinema, Pakistani cinema, reviews and upcoming films. SceneBuzz does not host movies.",
      path: "/movies",
      image: "/assets/images/hero-cinema.jpg",
    }),
  component: MoviesHome,
});

function MoviesHome() {
  const released = movies.filter((m) => !m.upcoming);
  const upcoming = movies.filter((m) => m.upcoming);
  const bollywood = released.filter((m) => m.country === "India");
  const pak = released.filter((m) => m.country === "Pakistan");
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Movies" }]} />
      <h1 className="font-display text-4xl md:text-5xl">Movies</h1>
      <p className="mt-3 max-w-3xl text-muted">
        Bollywood, Indian regional cinema and Pakistani film. Official trailers only. No unauthorized copies.
      </p>
      <section className="mt-10">
        <SectionHeader title="Pakistani cinema" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pak.map((m) => (
            <MediaCard key={m.slug} title={m.title} href={`/movies/${m.slug}`} image="/assets/images/hero-cinema.jpg" kicker={m.language} meta={m.release} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Bollywood & Indian cinema" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bollywood.map((m) => (
            <MediaCard key={m.slug} title={m.title} href={`/movies/${m.slug}`} image="/assets/images/hero-cinema.jpg" kicker={m.language} meta={m.release} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <SectionHeader title="Upcoming movies" href="/upcoming-movies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((m) => (
            <MediaCard key={m.slug} title={m.title} href={`/movies/${m.slug}`} image="/assets/images/hero-cinema.jpg" meta={`${m.release} · ${m.status}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
