import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { getMovie } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/movies/$slug")({
  loader: ({ params }) => {
    const m = getMovie(params.slug);
    if (!m) throw notFound();
    return m;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData ? `${loaderData.title} — film` : "Film",
      description: loaderData?.synopsis.slice(0, 160) ?? "",
      path: `/movies/${loaderData?.slug ?? ""}`,
      jsonLd: loaderData
        ? [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Movies", path: "/movies" },
              { name: loaderData.title, path: `/movies/${loaderData.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Movie",
              name: loaderData.title,
              inLanguage: loaderData.language,
            },
          ]
        : undefined,
    }),
  component: MoviePage,
});

function MoviePage() {
  const m = Route.useLoaderData();
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Movies", href: "/movies" }, { name: m.title }]} />
      <div className="grid gap-8 lg:grid-cols-12">
        <img src="/assets/images/hero-cinema.jpg" alt={`${m.title} editorial still — licensed poster art to follow`} className="h-80 w-full object-cover lg:col-span-5" />
        <div className="lg:col-span-7">
          <p className="sb-kicker">{m.status}</p>
          <h1 className="mt-2 font-display text-4xl">{m.title}</h1>
          <p className="mt-2 text-muted">{m.genre.join(" · ")} · {m.language} · {m.country}</p>
          <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-muted">Release</dt><dd>{m.release}</dd></div>
            <div><dt className="text-muted">Runtime</dt><dd>{m.runtime}</dd></div>
            <div><dt className="text-muted">Director</dt><dd>{m.director}</dd></div>
            <div><dt className="text-muted">Writer</dt><dd>{m.writer}</dd></div>
            <div><dt className="text-muted">Production</dt><dd>{m.production}</dd></div>
          </dl>
        </div>
      </div>
      <section className="mt-8 max-w-3xl">
        <h2 className="font-display text-2xl">Synopsis</h2>
        <p className="mt-3">{m.synopsis}</p>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl">Cast</h2>
        <ul className="mt-3 space-y-1">
          {m.cast.map((c) => (
            <li key={c.name}>
              {c.slug ? <Link to="/actors/$slug" params={{ slug: c.slug }} className="text-signal hover:underline">{c.name}</Link> : c.name}
            </li>
          ))}
        </ul>
      </section>
      {m.trailer ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl">Official trailer</h2>
          <p className="mt-2 text-sm">
            <a href={m.trailer} className="text-signal hover:underline" target="_blank" rel="noopener noreferrer">
              Open official trailer
            </a>
          </p>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="font-display text-2xl">Where to watch</h2>
        <p className="mt-2 text-sm">{m.whereToWatch}</p>
      </section>
      <div className="mt-8">
        <ShareBar title={m.title} path={`/movies/${m.slug}`} />
      </div>
    </main>
  );
}
