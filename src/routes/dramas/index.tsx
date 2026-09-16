import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { actors, articles, dramas } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/dramas/")({
  head: () =>
    pageHead({
      title: "Pakistani dramas",
      description:
        "Pakistani dramas, upcoming serials, cast, reviews and official viewing notes. A major SceneBuzz category. Episodes are not hosted.",
      path: "/dramas",
      image: "/assets/images/hero-drama.jpg",
    }),
  component: DramasHome,
});

const LINKS = [
  { label: "Upcoming Dramas", href: "/upcoming-dramas" },
  { label: "Drama Reviews", href: "/news" },
  { label: "Drama Cast", href: "/dramas#cast" },
  { label: "Drama Episodes / Updates", href: "/dramas#episodes" },
  { label: "Pakistani Actors", href: "/actors" },
  { label: "Pakistani Actresses", href: "/actors" },
];

function DramasHome() {
  const current = dramas.filter((d) => !d.upcoming);
  const upcoming = dramas.filter((d) => d.upcoming);
  const news = articles.filter((a) => a.section.includes("Drama") || a.category.includes("Drama"));
  const pakActors = actors.filter((a) => a.group === "pakistan").slice(0, 8);

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-12">
          <p className="sb-kicker text-signal-soft">Pakistan · Hum · ARY · Geo · Green</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">Pakistani dramas</h1>
          <p className="mt-4 max-w-2xl text-paper/75">
            One of SceneBuzz’s largest entertainment categories. Episode files are not hosted.
            Watch through official networks and authorized platforms only.
          </p>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pakistani dramas" }]} />
        <div className="flex flex-wrap gap-2">
          {LINKS.map((x) =>
            x.href.startsWith("/dramas#") ? (
              <a
                key={x.label}
                href={x.href}
                className="inline-flex h-10 items-center border border-line px-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:border-signal hover:text-signal dark:border-night-line"
              >
                {x.label}
              </a>
            ) : (
              <Link
                key={x.label}
                to={x.href as "/"}
                className="inline-flex h-10 items-center border border-line px-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:border-signal hover:text-signal dark:border-night-line"
              >
                {x.label}
              </Link>
            ),
          )}
        </div>
        <section className="mt-10">
          <SectionHeader title="Drama features & reviews" href="/news" />
          <div className="grid gap-5 md:grid-cols-3">
            {news.slice(0, 3).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Popular & catalogued dramas" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {current.map((d) => (
              <MediaCard
                key={d.slug}
                title={d.title}
                href={`/dramas/${d.slug}`}
                image="/assets/images/hero-drama.jpg"
                kicker={d.network}
                meta={`${d.genre.slice(0, 2).join(" · ")} · ${d.status}`}
              />
            ))}
          </div>
        </section>
        <section className="mt-12" id="cast">
          <SectionHeader title="Drama cast — Pakistani actors" href="/actors" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pakActors.map((p) => (
              <ProfileCard
                key={p.slug}
                name={p.name}
                href={`/actors/${p.slug}`}
                country={p.nationality}
                meta={p.profession}
              />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <SectionHeader title="Upcoming dramas" href="/upcoming-dramas" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((d) => (
              <MediaCard
                key={d.slug}
                title={d.title}
                href={`/dramas/${d.slug}`}
                image="/assets/images/hero-drama.jpg"
                meta={`${d.release} · ${d.status}`}
              />
            ))}
          </div>
        </section>
        <section className="mt-12" id="episodes">
          <SectionHeader title="Drama episodes / updates" />
          <p className="max-w-2xl text-sm text-muted">
            Episode updates belong on individual drama pages as official broadcast notes — never as
            pirated files or unofficial mirrors. SceneBuzz does not host copyrighted episodes.
          </p>
        </section>
      </div>
    </main>
  );
}
