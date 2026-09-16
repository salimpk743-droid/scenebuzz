import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description: SITE.description,
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <h1 className="font-display text-4xl">About SceneBuzz</h1>
      <div className="sb-prose mt-6">
        <p>{SITE.positioning}</p>
        <p>
          Pakistan is the centre of the website. India is the major secondary market, especially
          for Bollywood, Indian movies and Indian celebrities. South Asia is the broader regional
          umbrella — not a generic worldwide entertainment brand.
        </p>
        <p>
          The primary desks are Pakistan cricket, the PSL, Pakistani dramas, Bollywood, Indian
          cinema, celebrities and Talk of the Town. Hollywood, American entertainment and European
          entertainment are not major sections.
        </p>
        <p>
          The publication is original. Sample articles in this prototype are labeled as demo
          content. Statistics are published career records or marked for verification. Rumours are
          not presented as fact. SceneBuzz does not host films or drama episodes.
        </p>
        <p>
          Legal entity details will appear here once they are confirmed: {SITE.legal.businessName},{" "}
          {SITE.legal.ownerName}, {SITE.legal.country}.
        </p>
        <p>Tagline: {SITE.longTagline}.</p>
      </div>
    </main>
  );
}
