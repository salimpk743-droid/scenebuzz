import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { DemoBadge } from "@/components/site/DemoBadge";
import { ShareBar } from "@/components/site/ShareBar";
import { articles, getArticle } from "@/lib/data";
import { prettyDate } from "@/lib/format";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.title ?? "Article",
      description: loaderData?.dek ?? "",
      path: `/news/${loaderData?.slug ?? ""}`,
      image: loaderData?.hero,
      type: "article",
      jsonLd: loaderData
        ? [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
              { name: loaderData.title, path: `/news/${loaderData.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: loaderData.title,
              datePublished: loaderData.published,
              dateModified: loaderData.updated,
              author: { "@type": "Organization", name: loaderData.author },
              description: loaderData.dek,
            },
          ]
        : undefined,
    }),
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  const related = articles.filter((x) => a.related.includes(x.slug) || (x.category === a.category && x.slug !== a.slug)).slice(0, 3);
  const mid = Math.ceil(a.body.length / 2);

  return (
    <main className="sb-container py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "News", href: "/news" }, { name: a.title }]} />
      <p className="sb-kicker">{a.category}</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">{a.title}</h1>
      <p className="mt-3 text-lg text-muted">{a.dek}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
        {a.demo ? <DemoBadge /> : null}
        <span>Written by {a.author}</span>
        <span>Published {prettyDate(a.published)}</span>
        <span>Updated {prettyDate(a.updated)}</span>
      </div>
      <div className="my-6">
        <AdSlot size="inline" />
      </div>
      <figure>
        <img src={a.hero} alt={a.caption} className="w-full object-cover" />
        <figcaption className="mt-2 text-xs text-muted">{a.caption}</figcaption>
      </figure>
      <div className="sb-prose mt-8">
        {a.body.slice(0, mid).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <div className="my-8">
        <AdSlot size="inline" />
      </div>
      <div className="sb-prose">
        {a.body.slice(mid).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      {a.sources.length ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl">Sources</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {a.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <p className="mt-6 text-xs text-muted">
        Tags: {a.tags.join(", ")}. Corrections: write to editorial via the contact form. SceneBuzz
        publishes a corrections policy on the disclaimer page.
      </p>
      <div className="mt-8">
        <ShareBar title={a.title} path={`/news/${a.slug}`} />
      </div>
      <div className="mt-8">
        <AdSlot />
      </div>
      {related.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Related stories</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to="/news/$slug" params={{ slug: r.slug }} className="text-signal hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
