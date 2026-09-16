import { createFileRoute } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { movies } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/upcoming-movies/")({
  head: () =>
    pageHead({
      title: "Upcoming Bollywood movies",
      description:
        "Announced Bollywood and Indian films. Unconfirmed dates are TBA. SceneBuzz lists Indian cinema only.",
      path: "/upcoming-movies",
    }),
  component: UpcomingMovies,
});

function UpcomingMovies() {
  const list = movies.filter(
    (m) => m.country === "India" && (m.upcoming || m.status === "Upcoming" || m.status === "TBA"),
  );
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Bollywood", href: "/bollywood" },
          { name: "Upcoming movies" },
        ]}
      />
      <p className="sb-kicker">Bollywood · Indian cinema</p>
      <h1 className="mt-2 font-display text-4xl">Upcoming Bollywood movies</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Hindi and other Indian titles only. Dates that are not confirmed appear as TBA. This page
        is not a worldwide release calendar.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <MediaCard
            key={m.slug}
            title={m.title}
            href={`/movies/${m.slug}`}
            image="/assets/images/hero-cinema.jpg"
            kicker={`${m.language} · ${m.country}`}
            meta={`${m.director} · ${m.release}`}
          />
        ))}
      </div>
    </main>
  );
}
