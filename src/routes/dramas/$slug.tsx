import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { PhotoAttribution } from "@/components/media/PhotoCredit";
import { TitleBanner } from "@/components/media/TitleBanner";
import { getDrama } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/dramas/$slug")({
  loader: ({ params }) => { const d = getDrama(params.slug); if (!d) throw notFound(); return d; },
  head: ({ loaderData }) => pageHead({ title: loaderData ? `${loaderData.title} — drama` : "Drama", description: loaderData?.synopsis.slice(0, 160) ?? "", path: `/dramas/${loaderData?.slug ?? ""}`, jsonLd: loaderData ? [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Dramas", path: "/dramas" }, { name: loaderData.title, path: `/dramas/${loaderData.slug}` }]), { "@context": "https://schema.org", "@type": "TVSeries", name: loaderData.title, inLanguage: loaderData.language, countryOfOrigin: loaderData.country }] : undefined }),
  component: DramaPage,
});

function DramaPage() {
  const d = Route.useLoaderData();
  const banner = d.photo;
  const meta = `${d.genre.join(" · ")} · ${d.language} · ${d.country}`;
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Dramas", href: "/dramas" }, { name: d.title }]} />
      <div className="overflow-hidden rounded-xl border border-line bg-card dark:border-night-line dark:bg-night-card">
        <div className="relative h-64 md:h-96">
          {banner ? <><img src={banner.src} alt={banner.alt} className="h-full w-full object-cover" loading="eager" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-8"><p className="sb-kicker text-signal-soft">{d.status}</p><h1 className="mt-2 font-display text-4xl md:text-5xl">{d.title}</h1><p className="mt-2 text-sm text-paper/80">{meta}</p></div></> : <TitleBanner title={d.title} eyebrow="Pakistani drama" meta={meta} />}
        </div>
        {banner ? <div className="px-5 pb-2 md:px-8"><PhotoAttribution photo={banner} /></div> : <p className="px-5 py-2 text-xs text-muted md:px-8">Original SceneBuzz editorial banner shown until a licensed drama image is supplied.</p>}
      </div>
      <div className="mt-8"><dl className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><dt className="text-muted">Network / platform</dt><dd>{d.network}</dd></div><div><dt className="text-muted">Release</dt><dd>{d.release}</dd></div><div><dt className="text-muted">Director</dt><dd>{d.director}</dd></div><div><dt className="text-muted">Writer</dt><dd>{d.writer}</dd></div><div><dt className="text-muted">Producer</dt><dd>{d.producer}</dd></div><div><dt className="text-muted">Episodes</dt><dd>{d.episodes}</dd></div></dl></div>
      <section className="mt-8 max-w-3xl"><h2 className="font-display text-2xl">Synopsis</h2><p className="mt-3">{d.synopsis}</p></section>
      <section className="mt-8"><h2 className="font-display text-2xl">Cast</h2><ul className="mt-3 space-y-1">{d.cast.map((c) => <li key={c.name}>{c.slug ? <Link to="/actors/$slug" params={{ slug: c.slug }} className="text-signal hover:underline">{c.name}</Link> : c.name}{c.role ? <span className="text-muted"> — {c.role}</span> : null}</li>)}</ul></section>
      <section className="mt-8 grid gap-6 md:grid-cols-2"><div><h2 className="font-display text-2xl">OST</h2><p className="mt-2 text-sm">{d.ost}</p></div><div><h2 className="font-display text-2xl">Where to watch</h2><p className="mt-2 text-sm">{d.whereToWatch}</p></div></section>
      {d.source ? <p className="mt-6 text-xs text-muted">Announcement source: {d.source}</p> : null}<div className="mt-8"><ShareBar title={d.title} path={`/dramas/${d.slug}`} /></div>
      <p className="mt-8 text-sm"><Link to="/dramas" className="text-signal hover:underline">More Pakistani dramas</Link>{" · "}<Link to="/upcoming-dramas" className="text-signal hover:underline">Upcoming dramas</Link>{" · "}<Link to="/actors" className="text-signal hover:underline">Actors</Link></p>
    </main>
  );
}
