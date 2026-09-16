import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { MediaCard } from "@/components/cards/MediaCard";
import { AdSlot } from "@/components/site/AdSlot";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  actors,
  articles,
  cricketers,
  dramas,
  featuredArticles,
  movies,
  personalities,
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
  const pslNews = articles.filter((a) => a.tags.includes("PSL") || a.title.includes("PSL")).slice(0, 4);
  const dramaNews = articles.filter((a) => a.section.includes("Drama") || a.category.includes("Drama")).slice(0, 4);
  const bollywoodNews = articles.filter(
    (a) => a.category.includes("Bollywood") || a.tags.includes("Bollywood") || a.category === "Movies",
  ).slice(0, 4);
  const celebNews = articles.filter(
    (a) => a.category.includes("Celebrity") || a.section.includes("Talk"),
  ).slice(0, 4);
  const pakPlayers = cricketers.filter((p) => p.country === "Pakistan").slice(0, 8);
  const pakActors = actors.filter((a) => a.group === "pakistan").slice(0, 4);
  const indianActors = actors.filter((a) => a.group === "india").slice(0, 4);
  const currentDramas = dramas.filter((d) => !d.upcoming).slice(0, 4);
  const upcomingDramas = dramas.filter((d) => d.upcoming).slice(0, 4);
  const indianMovies = movies.filter((m) => m.country === "India" && !m.upcoming).slice(0, 4);
  const upcomingBollywood = movies.filter((m) => m.country === "India" && m.upcoming).slice(0, 4);
  const tot = personalities.filter((p) => p.country === "Pakistan" || p.country === "India").slice(0, 6);

  return (
    <main>
      <section className="border-b border-ink-3 bg-ink text-paper">
        <div className="sb-container-wide flex flex-col gap-5 py-6 md:flex-row md:items-end md:justify-between md:py-8">
          <div className="max-w-2xl">
            <p className="sb-kicker text-signal-soft">Pakistan first · India next · South Asia</p>
            <h1 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">SceneBuzz</h1>
            <p className="mt-3 max-w-xl text-sm text-paper/70 md:text-base">{SITE.positioning}</p>
          </div>
          <Link
            to="/news"
            className="inline-flex h-12 shrink-0 items-center justify-center bg-signal px-6 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper hover:bg-signal-dark"
          >
            Explore Latest Stories
          </Link>
        </div>
      </section>

      {hero ? (
        <section className="sb-container-wide py-8 md:py-10">
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

      <CategoryStrip />

      <section className="sb-container-wide py-10">
        <SectionHeader kicker="Pakistan" title="Pakistan Cricket" href="/cricket" action="View All Cricket →" />
        <p className="mb-5 max-w-2xl text-sm text-muted">
          National-team cricket, Pakistani players and the desk that sits at the centre of SceneBuzz sport.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cricketNews.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pakPlayers.slice(0, 4).map((p) => (
            <ProfileCard
              key={p.slug}
              name={p.name}
              href={`/cricket/${p.slug}`}
              country={p.country}
              meta={`${p.role} · ${p.status}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-10 dark:bg-ink-2">
        <div className="sb-container-wide">
          <SectionHeader kicker="League" title="PSL" href="/psl" action="Explore PSL →" />
          <p className="mb-5 max-w-2xl text-sm text-muted">
            The Pakistan Super League is a major SceneBuzz destination — not a footnote inside cricket.
            Fixtures and tables stay empty until official data is connected.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(pslNews.length ? pslNews : cricketNews).slice(0, 4).map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-10">
        <SectionHeader
          kicker="Television"
          title="Pakistani Dramas"
          href="/dramas"
          action="Explore Pakistani Dramas →"
        />
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
        {dramaNews.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dramaNews.map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        ) : null}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="bg-paper-2 py-10 dark:bg-ink-2">
        <div className="sb-container-wide">
          <SectionHeader
            kicker="India"
            title="Bollywood & Indian Cinema"
            href="/bollywood"
            action="Explore Bollywood →"
          />
          <p className="mb-5 max-w-2xl text-sm text-muted">
            The latest Bollywood movies, Indian cinema news, upcoming releases, stars and stories from
            India’s film industry — not a generic worldwide movies desk.
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { label: "Bollywood News", href: "/bollywood" },
              { label: "Upcoming Bollywood Movies", href: "/upcoming-movies" },
              { label: "Bollywood Actors", href: "/actors" },
              { label: "Bollywood Actresses", href: "/actors" },
              { label: "Indian Movies", href: "/movies" },
              { label: "Movie Profiles", href: "/movies" },
            ].map((x) => (
              <Link
                key={x.label}
                to={x.href as "/"}
                className="inline-flex h-10 items-center border border-line px-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:border-signal hover:text-signal dark:border-night-line"
              >
                {x.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {indianMovies.map((m) => (
              <MediaCard
                key={m.slug}
                title={m.title}
                href={`/movies/${m.slug}`}
                image="/assets/images/hero-cinema.jpg"
                kicker={m.language}
                meta={`${m.release} · ${m.status}`}
              />
            ))}
          </div>
          {bollywoodNews.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {bollywoodNews.map((a) => (
                <StoryCard key={a.slug} article={a} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="sb-container-wide py-10">
        <SectionHeader kicker="People" title="Celebrities" href="/actors" action="View All Celebrities →" />
        <p className="mb-5 max-w-2xl text-sm text-muted">
          Pakistani screen talent first, then Indian and Bollywood names. Directories, not rankings.
        </p>
        <h3 className="mb-3 font-display text-xl">Pakistani celebrities</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pakActors.map((p) => (
            <ProfileCard
              key={`celeb-${p.slug}`}
              name={p.name}
              href={`/actors/${p.slug}`}
              country={p.nationality}
              meta={`Pakistan · ${p.profession}`}
            />
          ))}
        </div>
        <h3 className="mt-8 mb-3 font-display text-xl">Indian / Bollywood celebrities</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {indianActors.map((p) => (
            <ProfileCard
              key={p.slug}
              name={p.name}
              href={`/actors/${p.slug}`}
              country={p.nationality}
              meta={`India · ${p.profession}`}
            />
          ))}
        </div>
        {celebNews.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {celebNews.map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="bg-paper-2 py-10 dark:bg-ink-2">
        <div className="sb-container-wide">
          <SectionHeader kicker="Culture" title="Talk of the Town" href="/talk-of-the-town" />
          <p className="mb-5 max-w-2xl text-sm text-muted">
            Trending personalities and public work from Pakistan, then India, then the wider region —
            never gossip printed as fact.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <img
              src="/assets/images/hero-fashion.jpg"
              alt="Editorial fashion still life used as a Talk of the Town section image"
              className="h-64 w-full object-cover"
            />
            <div className="grid gap-3">
              {tot.slice(0, 4).map((p) => (
                <ProfileCard
                  key={p.slug}
                  name={p.name}
                  href={`/talk-of-the-town/${p.slug}`}
                  country={p.country}
                  meta={`${p.country} · ${p.profession}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title="Upcoming Pakistani Dramas" href="/upcoming-dramas" />
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
            <SectionHeader title="Upcoming Bollywood Movies" href="/upcoming-movies" />
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingBollywood.map((m) => (
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
        <AdSlot />
      </section>

      <section className="sb-container-wide py-8">
        <Newsletter />
      </section>
    </main>
  );
}
