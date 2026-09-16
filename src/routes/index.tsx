import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { MediaCard } from "@/components/cards/MediaCard";
import { AdSlot } from "@/components/site/AdSlot";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  actors,
  articles,
  cricketers,
  dramas,
  featuredArticles,
  movies,
} from "@/lib/data";
import { breadcrumbLd, pageHead, websiteLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      path: "/",
      image: "/assets/images/hero-cricket.jpg",
      jsonLd: [websiteLd(), breadcrumbLd([{ name: "Home", path: "/" }])],
    }),
  component: Home,
});

function Home() {
  const featured = featuredArticles(5);
  const hero = featured[0] ?? articles[0];
  const side = featured.slice(1, 5);
  const cricketNews = articles.filter((a) => a.section === "Cricket" || a.category === "Cricket").slice(0, 4);
  const dramaNews = articles.filter((a) => a.section.includes("Drama") || a.category.includes("Drama")).slice(0, 4);
  const movieNews = articles.filter((a) => a.category.includes("Movie") || a.category.includes("Bollywood") || a.section.includes("Movie")).slice(0, 4);
  const celebNews = articles.filter((a) => a.category.includes("Celebrity") || a.section.includes("Celebrity") || a.section.includes("Talk")).slice(0, 4);
  const legends = cricketers.filter((p) => p.status === "Retired").slice(0, 8);
  const featuredActors = actors.filter((a) => a.featured).slice(0, 8);
  const currentDramas = dramas.filter((d) => !d.upcoming).slice(0, 4);
  const upcomingDramas = dramas.filter((d) => d.upcoming).slice(0, 4);
  const currentMovies = movies.filter((m) => !m.upcoming).slice(0, 4);
  const upcomingMovies = movies.filter((m) => m.upcoming).slice(0, 4);
  const popular = articles.slice(0, 6);

  return (
    <main>
      <section className="border-b border-ink-3 bg-ink text-paper">
        <div className="sb-container-wide flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:py-6">
          <div>
            <h1 className="font-display text-2xl tracking-tight md:text-3xl">SceneBuzz</h1>
            <p className="mt-1 text-sm text-paper/70">{SITE.tagline}</p>
          </div>
          <p className="max-w-md text-sm text-paper/60">
            A South Asian digital media desk for cricket, dramas, cinema and the people who
            define the culture — from Karachi to Toronto.
          </p>
        </div>
      </section>


      {hero ? (
        <section className="sb-container-wide py-10">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <StoryCard article={hero} variant="hero" />
            </div>
            <div className="grid gap-4 lg:col-span-5">
              {side.map((a) => (
                <StoryCard key={a.slug} article={a} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Cricket" title="Latest cricket" href="/cricket" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cricketNews.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Dramas" title="Latest Pakistani dramas" href="/dramas" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {currentDramas.map((d) => (
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

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Cinema" title="Latest movies" href="/movies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(movieNews.length ? movieNews : articles.slice(4, 8)).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Bollywood" title="Bollywood" href="/movies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {currentMovies.slice(0, 4).map((m) => (
            <MediaCard
              key={m.slug}
              title={m.title}
              href={`/movies/${m.slug}`}
              image="/assets/images/hero-cinema.jpg"
              kicker={m.country}
              meta={`${m.language} · ${m.status}`}
            />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="People" title="Celebrity news" href="/actors" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(celebNews.length ? celebNews : articles.slice(2, 6)).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-10 dark:bg-ink-2">
        <div className="sb-container-wide">
          <SectionHeader kicker="Culture" title="Talk of the Town" href="/talk-of-the-town" />
          <div className="grid gap-5 md:grid-cols-2">
            <img
              src="/assets/images/hero-fashion.jpg"
              alt="Editorial fashion still life used as a Talk of the Town section image"
              className="h-64 w-full object-cover"
            />
            <div>
              <p className="text-muted">
                A tasteful desk for trending personalities, fashion appearances and public work —
                never gossip presented as fact.
              </p>
              <Link
                to="/talk-of-the-town"
                className="mt-4 inline-flex h-11 items-center font-semibold text-signal"
              >
                Enter Talk of the Town
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title="Upcoming dramas" href="/upcoming-dramas" />
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingDramas.map((d) => (
                <MediaCard
                  key={d.slug}
                  title={d.title}
                  href={`/dramas/${d.slug}`}
                  image="/assets/images/hero-drama.jpg"
                  meta={`${d.release} · ${d.status}`}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Upcoming movies" href="/upcoming-movies" />
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingMovies.map((m) => (
                <MediaCard
                  key={m.slug}
                  title={m.title}
                  href={`/movies/${m.slug}`}
                  image="/assets/images/hero-cinema.jpg"
                  meta={`${m.release} · ${m.status}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Archive" title="Cricket legends" href="/cricket/players" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {legends.map((p) => (
            <ProfileCard
              key={p.slug}
              name={p.name}
              href={`/cricket/${p.slug}`}
              country={p.country}
              meta={`${p.country} · ${p.role}`}
            />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader kicker="Screen" title="Featured actors" href="/actors" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredActors.map((p) => (
            <ProfileCard
              key={p.slug}
              name={p.name}
              href={`/actors/${p.slug}`}
              country={p.nationality}
              meta={`${p.nationality} · ${p.profession}`}
            />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-8">
        <SectionHeader title="Popular stories" href="/news" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          “Popular” and “Trending this week” are editorial sample groupings in this prototype —
          not analytics.
        </p>
      </section>

      <section className="sb-container-wide py-8">
        <AdSlot />
      </section>

      <section className="sb-container-wide py-8">
        <Newsletter />
      </section>

      <section className="sb-container-wide py-10">
        <SectionHeader title="SceneBuzz on social" />
        <p className="text-sm text-muted">
          Official social profiles have not been published yet. SceneBuzz does not display
          placeholder follower counts or unofficial accounts.
        </p>
      </section>
    </main>
  );
}
