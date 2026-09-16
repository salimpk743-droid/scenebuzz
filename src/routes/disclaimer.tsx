import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    pageHead({
      title: "Disclaimer",
      description: "Editorial and statistical disclaimer for SceneBuzz.",
      path: "/disclaimer",
    }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Disclaimer" }]} />
      <h1 className="font-display text-4xl">Disclaimer</h1>
      <div className="sb-prose mt-6">
        <p>{SITE.statsDisclaimer}</p>
        <p>
          Entertainment profiles use publicly documented professional credits. Personal details
          that cannot be verified are marked as such. SceneBuzz distinguishes confirmed, reported,
          rumoured and unverified information and does not publish rumours as facts.
        </p>
        <h2 className="mt-8 font-display text-2xl">Corrections policy</h2>
        <p>
          If SceneBuzz publishes an error, write via the Contact page with the URL, the incorrect
          line and a source. Material corrections will be noted on the article with date and
          summary. This prototype has no published corrections yet.
        </p>
        <p className="text-sm text-muted">Template. Review with qualified counsel. Updated {SITE.legal.date}.</p>
      </div>
    </main>
  );
}
