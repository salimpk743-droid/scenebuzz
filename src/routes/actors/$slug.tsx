import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Portrait } from "@/components/portrait/Portrait";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShareBar } from "@/components/site/ShareBar";
import { PhotoAttribution } from "@/components/media/PhotoCredit";
import { getActor, relatedActors } from "@/lib/data";
import { mediaPaths } from "@/lib/media";
import { prettyDate } from "@/lib/format";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/actors/$slug")({
  loader: ({ params }) => { const a = getActor(params.slug); if (!a) throw notFound(); return a; },
  head: ({ loaderData }) => pageHead({ title: loaderData ? `${loaderData.name} — profile` : "Actor", description: loaderData?.overview.slice(0, 160) ?? "", path: `/actors/${loaderData?.slug ?? ""}`, type: "profile", jsonLd: loaderData ? [breadcrumbLd([{ name: "Home", path: "/" }, { name: "Actors", path: "/actors" }, { name: loaderData.name, path: `/actors/${loaderData.slug}` }]), { "@context": "https://schema.org", "@type": "Person", name: loaderData.name, jobTitle: loaderData.profession, nationality: loaderData.nationality }] : undefined }),
  component: ActorPage,
});

function ActorPage() {
  const a = Route.useLoaderData();
  const related = relatedActors(a.related, a.slug);
  const photo = a.photo ?? { src: mediaPaths.celebrity(a.group, a.slug), alt: `${a.name} portrait` };
  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Celebrities", href: "/actors" }, { name: a.name }]} />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Portrait name={a.name} country={a.nationality} photo={photo} size="hero" className="min-h-80 rounded-xl" />
          {a.photo ? <PhotoAttribution photo={a.photo} /> : <p className="mt-2 text-xs text-muted">Add the licensed portrait at <code>{mediaPaths.celebrity(a.group, a.slug)}</code> to replace this fallback.</p>}
        </div>
        <div className="lg:col-span-8"><p className="sb-kicker">{a.group === "pakistan" ? "Featured Pakistani actors" : "Featured Indian actors"}</p><h1 className="mt-1 font-display text-4xl">{a.name}</h1><p className="text-muted">{a.fullName} · {a.profession}</p><dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-muted">Nationality</dt><dd>{a.nationality}</dd></div><div><dt className="text-muted">Date of birth</dt><dd>{prettyDate(a.dob)}</dd></div><div><dt className="text-muted">Place of birth</dt><dd>{a.birthplace}</dd></div></dl></div>
      </div>
      <section className="mt-8 max-w-3xl"><h2 className="font-display text-2xl">Career overview</h2><p className="mt-3">{a.overview}</p></section>
      <section className="mt-8 grid gap-8 md:grid-cols-2"><div><h2 className="font-display text-2xl">Television</h2><ul className="mt-2 list-disc pl-5 text-sm">{a.television.map((t) => <li key={t}>{t}</li>)}</ul></div><div><h2 className="font-display text-2xl">Film</h2><ul className="mt-2 list-disc pl-5 text-sm">{a.film.map((t) => <li key={t}>{t}</li>)}</ul></div></section>
      <section className="mt-8"><h2 className="font-display text-2xl">Major roles</h2><ul className="mt-2 list-disc pl-5 text-sm">{a.majorRoles.map((t) => <li key={t}>{t}</li>)}</ul></section>
      <section className="mt-8 grid gap-8 md:grid-cols-2"><div><h2 className="font-display text-2xl">Awards</h2><ul className="mt-2 list-disc pl-5 text-sm">{a.awards.map((t) => <li key={t}>{t}</li>)}</ul></div><div><h2 className="font-display text-2xl">Upcoming projects</h2><ul className="mt-2 list-disc pl-5 text-sm">{a.upcoming.map((t) => <li key={t}>{t}</li>)}</ul></div></section>
      {a.social.length ? <section className="mt-8"><h2 className="font-display text-2xl">Official social</h2><ul className="mt-2 text-sm">{a.social.filter((s) => s.verified).map((s) => <li key={s.href}><a href={s.href} className="text-signal" target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul></section> : <p className="mt-8 text-sm text-muted">Official social accounts are not listed until independently verified.</p>}
      <div className="mt-8"><ShareBar title={a.name} path={`/actors/${a.slug}`} /></div>
      {related.length ? <section className="mt-10"><h2 className="font-display text-2xl">Related</h2><ul className="mt-3 flex flex-wrap gap-3">{related.map((r) => <li key={r.slug}><Link to="/actors/$slug" params={{ slug: r.slug }} className="text-signal hover:underline">{r.name}</Link></li>)}<li><Link to="/dramas" className="hover:underline">Pakistani dramas</Link></li><li><Link to="/movies" className="hover:underline">Movies</Link></li></ul></section> : null}
    </main>
  );
}
