import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({ title: "Terms of use", description: "Terms of use for SceneBuzz.", path: "/terms" }),
  component: TermsPage,
});

function TermsPage() {
  const L = SITE.legal;
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
      <h1 className="font-display text-4xl">Terms of use</h1>
      <p className="mt-2 text-sm text-muted">Last updated {L.date}. Template for legal review.</p>
      <div className="sb-prose mt-6">
        <p>
          By using SceneBuzz you agree to these terms. Content is for general information. Sample
          editorial is labeled and must not be treated as live reporting.
        </p>
        <p>
          You may not scrape the site in a way that overloads it, republish entire articles without
          permission, or use SceneBuzz to host or link to pirated films or drama episodes.
        </p>
        <p>
          Operator: {L.businessName}, {L.ownerName}, {L.country}. These terms do not claim
          compliance with any specific national statute until counsel has reviewed them.
        </p>
      </div>
    </main>
  );
}
