import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaCard } from "@/components/cards/MediaCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { SectionHeader } from "@/components/site/SectionHeader";
import { actors, articles, movies } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bollywood/")({
  head: () =>
    pageHead({
      title: "Bollywood & Indian Cinema",
      description:
        "Bollywood movies, Hindi cinema, Indian film releases, stars and upcoming titles on SceneBuzz. India is the major secondary market after Pakistan.",
      path: "/bollywood",
      image: "/assets/images/hero-cinema.jpg",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Bollywood", path: "/bollywood" },
      ]),
    }),
  component: BollywoodHome,
});

const LINKS = [
  { label: "Bollywood News", href: "/bollywood" },
  { label: "Upcoming Bollywood Movies", href: "/upcoming-movies" },
  { label: "Bollywood Actors", href: "/actors" },
  { label: "Bollywood Actresses", href: "/actors" },
  { label: "Indian Movies", href: "/movies" },
  { label: "Movie Profiles", href: "/movies" },
];

function BollywoodHome() {
  const indian = movies.filter((m) => m.country === "India" && !m.upcoming);
  const upcoming = movies.filter((m) => m.country === "India" && m.upcoming);
  const news = articles.filter(
    (a) => a.category.includes("Bollywood") || a.tags.includes("Bollywood") || a.category === "Movies",
  );
  const stars = actors.filter((a) => a.group === "india");
  const actresses = stars.filter((a) => a.profession.toLowerCase().includes("actress"));
  const actorsOnly = stars.filter((a) => !a.profession.toLowerCase().includes("actress"));

  return (
    <main>
      <section className="bg-ink text-paper">
        <div className="sb-container-wide py-12 md:py-16">
          <p className="sb-kicker text-signal-soft">India · Hindi cinema · Indian film</p>
          <h1 className="mt-2 font-display text-4xl md:text-6xl">Bollywood</h1>
          <p className="mt-4 max-w-2xl text-paper/75">
            The latest Bollywood movies, Indian cinema news, upcoming releases, stars and stories from
            India’s film industry. SceneBuzz does not host films or reprint unverified box-office
            figures.
          </p>
        </div>
      </section>
      <CategoryStrip />
      <div className="sb-container-wide py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Movies", href: "/movies" },
            { name: "Bollywood" },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          {LINKS.map((x) => (
            <Link
              key={x.label}
              to={x.href as "/"}
              className="inline-flex h-10 items-center border border-line px-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:border-signal hover:text-signal dark:border-night-line"
            >
              {x.label}
            </Link>
          ))}
        </div>

        <section className="mt-12">
          <SectionHeader title="Bollywood news" href="/news" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(news.length ? news : articles.slice(0, 3)).slice(0, 3).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="Indian movies" href="/movies" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {indian.map((m) => (
              <MediaCard
                key={m.slug}
                title={m.title}
                href={`/movies/${m.slug}`}
                image="/assets/images/hero-cinema.jpg"
                kicker={m.language}
                meta={`${m.release} · ${m.director}`}
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

        <section className="mt-12">
          <SectionHeader title="Bollywood actors" href="/actors" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actorsOnly.slice(0, 8).map((p) => (
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
          <SectionHeader title="Bollywood actresses" href="/actors" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {actresses.slice(0, 8).map((p) => (
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
      </div>
    </main>
  );
}
