import { createFileRoute } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { movies } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/upcoming-movies/")({
  head: () =>
    pageHead({
      title: "Upcoming movies",
      description: "Announced Bollywood, Pakistani and international films. Unconfirmed dates are TBA.",
      path: "/upcoming-movies",
    }),
  component: UpcomingMovies,
});

function UpcomingMovies() {
  const list = movies.filter((m) => m.upcoming || m.status === "Upcoming" || m.status === "TBA");
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Upcoming movies" }]} />
      <h1 className="font-display text-4xl">Upcoming movies</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Bollywood, Pakistani cinema, Indian regional titles and major international films. Dates that
        are not confirmed appear as TBA.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <MediaCard
            key={m.slug}
            title={m.title}
            href={`/movies/${m.slug}`}
            image="/assets/images/hero-cinema.jpg"
            kicker={`${m.country} · ${m.language}`}
            meta={`${m.director} · ${m.release}`}
          />
        ))}
      </div>
    </main>
  );
}
