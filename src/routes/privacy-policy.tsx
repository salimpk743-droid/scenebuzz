import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      title: "Privacy policy",
      description: "How SceneBuzz handles information in this prototype.",
      path: "/privacy-policy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const L = SITE.legal;
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
      <h1 className="font-display text-4xl">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated {L.date}. Template — have a qualified lawyer review it.</p>
      <div className="sb-prose mt-6">
        <p>
          This prototype is operated by {L.businessName} ({L.ownerName}), {L.address}, {L.country}.
          Contact: {L.email}.
        </p>
        <p>
          SceneBuzz currently stores, in your browser only: theme preference, cookie-consent choice,
          and optionally a newsletter address you type into the subscribe field. Those values are
          not transmitted to a SceneBuzz server in this version.
        </p>
        <p>
          The contact form does not email anyone until a form backend is connected. Optional
          analytics and advertising scripts are not loaded. If they are added later, this policy
          will be updated and consent will be requested first.
        </p>
        <p>
          Third-party fonts may be requested from Google Fonts when pages load. We do not sell
          personal information in this prototype because we do not collect a server-side audience
          database.
        </p>
      </div>
    </main>
  );
}
