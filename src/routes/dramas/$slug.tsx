import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { getDrama } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/dramas/$slug")({
  loader: ({ params }) => {
    const d = getDrama(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData ? `${loaderData.title} — drama` : "Drama",
      description: loaderData?.synopsis.slice(0, 160) ?? "",
      path: `/dramas/${loaderData?.slug ?? ""}`,
      jsonLd: loaderData
        ? [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Dramas", path: "/dramas" },
              { name: loaderData.title, path: `/dramas/${loaderData.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "TVSeries",
              name: loaderData.title,
              inLanguage: loaderData.language,
              countryOfOrigin: loaderData.country,
            },
          ]
        : undefined,
    }),
  component: DramaPage,
});

function DramaPage() {
  const d = Route.useLoaderData();
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Dramas", href: "/dramas" }, { name: d.title }]} />
      <div className="grid gap-8 lg:grid-cols-12">
        <img src="/assets/images/hero-drama.jpg" alt={`${d.title} editorial still — licensed photography to follow`} className="h-80 w-full object-cover lg:col-span-5" />
        <div className="lg:col-span-7">
          <p className="sb-kicker">{d.status}</p>
          <h1 className="mt-2 font-display text-4xl">{d.title}</h1>
          <p className="mt-2 text-muted">{d.genre.join(" · ")} · {d.language} · {d.country}</p>
          <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-muted">Network / platform</dt><dd>{d.network}</dd></div>
            <div><dt className="text-muted">Release</dt><dd>{d.release}</dd></div>
            <div><dt className="text-muted">Director</dt><dd>{d.director}</dd></div>
            <div><dt className="text-muted">Writer</dt><dd>{d.writer}</dd></div>
            <div><dt className="text-muted">Producer</dt><dd>{d.producer}</dd></div>
            <div><dt className="text-muted">Episodes</dt><dd>{d.episodes}</dd></div>
          </dl>
        </div>
      </div>
      <section className="mt-8 max-w-3xl">
        <h2 className="font-display text-2xl">Synopsis</h2>
        <p className="mt-3">{d.synopsis}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl">Cast</h2>
        <ul className="mt-3 space-y-1">
          {d.cast.map((c) => (
            <li key={c.name}>
              {c.slug ? <Link to="/actors/$slug" params={{ slug: c.slug }} className="text-signal hover:underline">{c.name}</Link> : c.name}
              {c.role ? <span className="text-muted"> — {c.role}</span> : null}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">OST</h2>
          <p className="mt-2 text-sm">{d.ost}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Where to watch</h2>
          <p className="mt-2 text-sm">{d.whereToWatch}</p>
        </div>
      </section>
      {d.source ? <p className="mt-6 text-xs text-muted">Announcement source: {d.source}</p> : null}
      <div className="mt-8">
        <ShareBar title={d.title} path={`/dramas/${d.slug}`} />
      </div>
      <p className="mt-8 text-sm">
        <Link to="/dramas" className="text-signal hover:underline">More Pakistani dramas</Link>
        {" · "}
        <Link to="/upcoming-dramas" className="text-signal hover:underline">Upcoming dramas</Link>
        {" · "}
        <Link to="/actors" className="text-signal hover:underline">Actors</Link>
      </p>
    </main>
  );
}
