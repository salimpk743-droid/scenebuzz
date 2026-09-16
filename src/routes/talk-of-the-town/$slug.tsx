import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait/Portrait";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { getPersonality } from "@/lib/data";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/talk-of-the-town/$slug")({
  loader: ({ params }) => {
    const p = getPersonality(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData ? `${loaderData.name} — Talk of the Town` : "Personality",
      description: loaderData?.bio.slice(0, 160) ?? "",
      path: `/talk-of-the-town/${loaderData?.slug ?? ""}`,
      type: "profile",
      jsonLd: loaderData
        ? [
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Talk of the Town", path: "/talk-of-the-town" },
              { name: loaderData.name, path: `/talk-of-the-town/${loaderData.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: loaderData.name,
              jobTitle: loaderData.profession,
              nationality: loaderData.country,
            },
          ]
        : undefined,
    }),
  component: PersonalityPage,
});

function PersonalityPage() {
  const p = Route.useLoaderData();
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Talk of the Town", href: "/talk-of-the-town" },
          { name: p.name },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Portrait name={p.name} country={p.country} size="hero" className="min-h-[28rem] rounded-xl" />
          <p className="mt-2 text-xs text-muted">Editorial portrait placeholder. Licensed photography to follow.</p>
        </div>
        <div className="lg:col-span-7">
          <p className="sb-kicker">{p.profession}</p>
          <h1 className="mt-2 font-display text-5xl">{p.name}</h1>
          <p className="mt-2 text-muted">{p.country}</p>
          <p className="mt-6 max-w-2xl">{p.bio}</p>
          {p.unverifiedNote ? <p className="mt-4 text-sm text-muted">{p.unverifiedNote}</p> : null}
        </div>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl">About</h2>
          <p className="mt-2 text-sm">{p.bio}</p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Known for</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">{p.knownFor.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
        <section>
          <h2 className="font-display text-2xl">Television</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">{p.television.length ? p.television.map((x) => <li key={x}>{x}</li>) : <li>Information not currently verified.</li>}</ul>
        </section>
        <section>
          <h2 className="font-display text-2xl">Film</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">{p.film.length ? p.film.map((x) => <li key={x}>{x}</li>) : <li>Information not currently verified.</li>}</ul>
        </section>
        <section>
          <h2 className="font-display text-2xl">Modeling</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">{p.modeling.length ? p.modeling.map((x) => <li key={x}>{x}</li>) : <li>Information not currently verified.</li>}</ul>
        </section>
        <section>
          <h2 className="font-display text-2xl">Fashion / public appearances</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">{p.appearances.length ? p.appearances.map((x) => <li key={x}>{x}</li>) : <li>Information not currently verified.</li>}</ul>
        </section>
      </div>
      <section className="mt-10">
        <h2 className="font-display text-2xl">Latest news</h2>
        <p className="mt-2 text-sm text-muted">Related SceneBuzz articles will appear here as they are commissioned.</p>
      </section>
      <div className="mt-8">
        <ShareBar title={p.name} path={`/talk-of-the-town/${p.slug}`} />
      </div>
      <section className="mt-10">
        <h2 className="font-display text-2xl">Related</h2>
        <ul className="mt-3 flex flex-wrap gap-4 text-sm">
          <li><Link to="/talk-of-the-town" className="text-signal hover:underline">Talk of the Town</Link></li>
          <li><Link to="/actors" className="text-signal hover:underline">Actors</Link></li>
          <li><Link to="/entertainment" className="text-signal hover:underline">Entertainment</Link></li>
        </ul>
      </section>
    </main>
  );
}
