import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/cards/StoryCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { MediaCard } from "@/components/cards/MediaCard";
import { AdSlot } from "@/components/site/AdSlot";
import { Newsletter } from "@/components/site/Newsletter";
import { SectionHeader } from "@/components/site/SectionHeader";
import { DemoBadge } from "@/components/site/DemoBadge";
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
        <div className="sb-container-wide flex flex-col gap-4 py-6 sm:py-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-paper/75">
                South Asian media
              </span>
              <DemoBadge className="border-paper/15 bg-paper/5 text-paper/70" />
            </div>
            <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Cricket, cinema, dramas &amp; the people everyone is talking about.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/65 md:text-base">
              SceneBuzz is a modern South Asian media desk built around useful evergreen profiles,
              timely updates and easy discovery — from Karachi to Toronto.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <Link to="/cricket/players" className="rounded-full border border-paper/20 px-3 py-2 transition hover:bg-paper/10">
              Cricket profiles
            </Link>
            <Link to="/actors" className="rounded-full border border-paper/20 px-3 py-2 transition hover:bg-paper/10">
              Actor profiles
            </Link>
            <Link to="/talk-of-the-town" className="rounded-full border border-paper/20 px-3 py-2 transition hover:bg-paper/10">
              Talk of the Town
            </Link>
          </div>
        </div>
      </section>

      {hero ? (
        <section className="sb-container-wide py-7 sm:py-10">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <StoryCard article={hero} variant="hero" />
            </div>
            <div className="rounded-2xl border border-line bg-card p-4 dark:border-night-line dark:bg-night-card lg:col-span-5">
              <div className="flex items-center justify-between border-b border-line pb-3 dark:border-night-line">
                <div>
                  <p className="sb-kicker">Editor’s desk</p>
                  <h2 className="mt-1 font-display text-2xl">What’s moving today</h2>
                </div>
                <span className="text-xs text-muted">Latest</span>
              </div>
              <div className="mt-1">
                {side.map((a) => (
                  <StoryCard key={a.slug} article={a} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="sb-container-wide pb-7 sm:pb-10">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Cricket", "/cricket", "News, players & records"],
            ["Dramas", "/dramas", "Current & upcoming"],
            ["Movies", "/movies", "Bollywood & Pakistan"],
            ["Talk of the Town", "/talk-of-the-town", "People & style"],
          ].map(([label, href, meta]) => (
            <Link
              key={href}
              to={href as "/"}
              className="sb-card-hover rounded-2xl border border-line bg-card p-4 dark:border-night-line dark:bg-night-card"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-signal">SceneBuzz</span>
              <span className="mt-2 block font-display text-xl leading-tight">{label}</span>
              <span className="mt-1 block text-xs text-muted">{meta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-7 sm:py-8">
        <SectionHeader kicker="Cricket" title="Latest cricket" href="/cricket" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cricketNews.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-8 sm:py-10 dark:bg-ink-2">
        <div className="sb-container-wide">
          <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <SectionHeader kicker="Dramas" title="Pakistani dramas" href="/dramas" />
              <div className="grid gap-5 sm:grid-cols-2">
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
            </div>
            <div className="rounded-2xl border border-line bg-card p-5 dark:border-night-line dark:bg-night-card">
              <p className="sb-kicker">Evergreen</p>
              <h2 className="mt-1 font-display text-2xl">Drama discovery</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Keep long-running drama pages useful with cast, creators, episode guides, OST details,
                viewing information and related SceneBuzz coverage.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <Link to="/upcoming-dramas" className="rounded-xl border border-line px-4 py-3 text-sm font-semibold transition hover:border-signal hover:text-signal dark:border-night-line">
                  Browse upcoming dramas →
                </Link>
                <Link to="/actors" className="rounded-xl border border-line px-4 py-3 text-sm font-semibold transition hover:border-signal hover:text-signal dark:border-night-line">
                  Explore cast profiles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-7 sm:py-10">
        <SectionHeader kicker="Cinema" title="Movies & Bollywood" href="/movies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(movieNews.length ? movieNews : articles.slice(4, 8)).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-7 sm:py-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionHeader kicker="People" title="Talk of the Town" href="/talk-of-the-town" />
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              Trending personalities, models, actors, fashion appearances and public work — presented with
              professional context, not gossip stated as fact.
            </p>
          </div>
          <Link
            to="/talk-of-the-town"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-ink-2 dark:bg-paper dark:text-ink"
          >
            Explore the section
          </Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(celebNews.length ? celebNews : articles.slice(2, 6)).map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="sb-container-wide py-7 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader kicker="Coming soon" title="Upcoming dramas" href="/upcoming-dramas" />
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingDramas.map((d) => (
                <MediaCard key={d.slug} title={d.title} href={`/dramas/${d.slug}`} image="/assets/images/hero-drama.jpg" meta={`${d.release} · ${d.status}`} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader kicker="Coming soon" title="Upcoming movies" href="/upcoming-movies" />
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingMovies.map((m) => (
                <MediaCard key={m.slug} title={m.title} href={`/movies/${m.slug}`} image="/assets/images/hero-cinema.jpg" meta={`${m.release} · ${m.status}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-8 text-paper sm:py-10">
        <div className="sb-container-wide">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-signal-soft">Evergreen library</p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">Profiles worth bookmarking</h2>
            </div>
            <p className="max-w-md text-sm text-paper/60">Deep profile pages create a foundation that can stay useful long after a daily news cycle ends.</p>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader kicker="Cricket" title="Legends & featured players" href="/cricket/players" />
              <div className="grid gap-3 sm:grid-cols-2">
                {legends.map((p) => (
                  <div key={p.slug} className="rounded-2xl border border-paper/10 bg-paper/5 p-1">
                    <ProfileCard name={p.name} href={`/cricket/${p.slug}`} country={p.country} meta={`${p.country} · ${p.role}`} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeader kicker="Screen" title="Featured actors" href="/actors" />
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredActors.map((p) => (
                  <div key={p.slug} className="rounded-2xl border border-paper/10 bg-paper/5 p-1">
                    <ProfileCard name={p.name} href={`/actors/${p.slug}`} country={p.nationality} meta={`${p.nationality} · ${p.profession}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-container-wide py-8 sm:py-10">
        <SectionHeader title="Popular stories" href="/news" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          “Popular” is a sample editorial grouping in the prototype, not an analytics-based ranking.
        </p>
      </section>

      <section className="sb-container-wide py-6 sm:py-8">
        <AdSlot />
      </section>

      <section className="sb-container-wide py-6 sm:py-8">
        <Newsletter />
      </section>

      <section className="sb-container-wide pb-10 pt-6 sm:pb-14">
        <div className="rounded-2xl border border-line bg-card p-5 dark:border-night-line dark:bg-night-card">
          <p className="sb-kicker">SceneBuzz on social</p>
          <h2 className="mt-1 font-display text-2xl">Official social channels coming soon</h2>
          <p className="mt-2 text-sm text-muted">
            SceneBuzz does not display placeholder follower counts or unofficial accounts. Connect verified profiles here once they are live.
          </p>
        </div>
      </section>
    </main>
  );
}
