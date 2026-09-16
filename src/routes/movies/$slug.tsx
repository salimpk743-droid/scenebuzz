import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { PhotoAttribution } from "@/components/media/PhotoCredit";
import { TitleBanner } from "@/components/media/TitleBanner";
import { getMovie } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/movies/$slug")({
  loader: ({ params }) => { const m = getMovie(params.slug); if (!m) throw notFound(); return m; },
  head: ({ loaderData }) => pageHead({ title: loaderData ? `${loaderData.title} — film` : "Film", description: loaderData?.synopsis.slice(0, 160) ?? "", path: `/movies/${loaderData?.slug ?? ""}`, jsonLd: loaderData ? [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Movies", path: "/movies" }, { name: loaderData.title, path: `/movies/${loaderData.slug}` }]), { "@context": "https://schema.org", "@type": "Movie", name: loaderData.title, inLanguage: loaderData.language }] : undefined }),
  component: MoviePage,
});

function MoviePage() {
  const m = Route.useLoaderData();
  const banner = m.photo;
  const meta = `${m.genre.join(" · ")} · ${m.language} · ${m.country}`;
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Movies", href: "/movies" }, { name: m.title }]} />
      <div className="overflow-hidden rounded-xl border border-line bg-card dark:border-night-line dark:bg-night-card">
        <div className="relative h-64 md:h-96">
          {banner ? <img src={banner.src} alt={banner.alt} className="h-full w-full object-cover" loading="eager" /> : <TitleBanner title={m.title} eyebrow="Indian cinema" meta={meta} />}
          {banner ? <><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-8"><p className="sb-kicker text-signal-soft">{m.status}</p><h1 className="mt-2 font-display text-4xl md:text-5xl">{m.title}</h1><p className="mt-2 text-sm text-paper/80">{meta}</p></div></> : null}
        </div>
        {banner ? <div className="px-5 pb-2 md:px-8"><PhotoAttribution photo={banner} /></div> : <p className="px-5 py-2 text-xs text-muted md:px-8">Original SceneBuzz editorial banner shown until a licensed film image is supplied.</p>}
      </div>
      <div className="mt-8"><dl className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><dt className="text-muted">Release</dt><dd>{m.release}</dd></div><div><dt className="text-muted">Runtime</dt><dd>{m.runtime}</dd></div><div><dt className="text-muted">Director</dt><dd>{m.director}</dd></div><div><dt className="text-muted">Writer</dt><dd>{m.writer}</dd></div><div><dt className="text-muted">Production</dt><dd>{m.production}</dd></div></dl></div>
      <section className="mt-8 max-w-3xl"><h2 className="font-display text-2xl">Synopsis</h2><p className="mt-3">{m.synopsis}</p></section>
      <section className="mt-8"><h2 className="font-display text-2xl">Cast</h2><ul className="mt-3 space-y-1">{m.cast.map((c) => <li key={c.name}>{c.slug ? <Link to="/actors/$slug" params={{ slug: c.slug }} className="text-signal hover:underline">{c.name}</Link> : c.name}</li>)}</ul></section>
      {m.trailer ? <section className="mt-8"><h2 className="font-display text-2xl">Official trailer</h2><p className="mt-2 text-sm"><a href={m.trailer} className="text-signal hover:underline" target="_blank" rel="noopener noreferrer">Open official trailer</a></p></section> : null}
      <section className="mt-8"><h2 className="font-display text-2xl">Where to watch</h2><p className="mt-2 text-sm">{m.whereToWatch}</p></section>
      <div className="mt-8"><ShareBar title={m.title} path={`/movies/${m.slug}`} /></div>
    </main>
  );
}
