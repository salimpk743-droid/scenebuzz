import { createFileRoute } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { dramas } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/upcoming-dramas/")({
  head: () =>
    pageHead({
      title: "Upcoming Pakistani dramas",
      description:
        "Announced Pakistani dramas. Unconfirmed dates are listed as TBA. SceneBuzz never invents release dates.",
      path: "/upcoming-dramas",
    }),
  component: UpcomingDramas,
});

function UpcomingDramas() {
  const list = dramas.filter((d) => d.upcoming || d.status === "Upcoming" || d.status === "TBA");
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Pakistani dramas", href: "/dramas" },
          { name: "Upcoming dramas" },
        ]}
      />
      <p className="sb-kicker">Pakistan · Hum · ARY · Geo</p>
      <h1 className="mt-2 font-display text-4xl">Upcoming Pakistani dramas</h1>
      <p className="mt-3 max-w-2xl text-muted">
        If a date is not confirmed, SceneBuzz prints TBA or Expected — never a guessed calendar date.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <article key={d.slug} className="flex flex-col">
            <MediaCard
              title={d.title}
              href={`/dramas/${d.slug}`}
              image="/assets/images/hero-drama.jpg"
              kicker={d.network}
              meta={`${d.cast.map((c) => c.name).slice(0, 3).join(", ")} · ${d.release}`}
            />
            <p className="mt-2 text-sm text-muted">{d.synopsis.slice(0, 140)}…</p>
          </article>
        ))}
      </div>
    </main>
  );
}
