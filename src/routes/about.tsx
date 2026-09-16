import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description: "About SceneBuzz, a South Asian digital media platform for cricket, dramas, cinema and culture.",
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
        <p>
          SceneBuzz is being built as a South Asian digital media brand covering cricket, football,
          Pakistani dramas, Indian and Pakistani cinema, celebrities and culture. The audience is
          international: Pakistan, India, Bangladesh, Sri Lanka, Nepal, the Gulf, the UK, North
          America, Australia and the wider diaspora.
        </p>
        <p>
          The publication is original. Sample articles in this prototype are labeled as demo
          content. Statistics are published career records or marked for verification. Rumours are
          not presented as fact.
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
