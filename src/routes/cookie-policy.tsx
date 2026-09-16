import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    pageHead({
      title: "Cookie policy",
      description: "Cookies used by the SceneBuzz prototype.",
      path: "/cookie-policy",
    }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Cookie policy" }]} />
      <h1 className="font-display text-4xl">Cookie policy</h1>
      <div className="sb-prose mt-6">
        <p>
          Essential: localStorage keys <code>sb-theme</code> and <code>sb-cookie</code> remember
          appearance and consent. Optional analytics and advertising cookies are not set in this
          prototype and will not load before consent if they are added later.
        </p>
        <p>
          Newsletter addresses typed into the subscribe field stay in <code>sb-newsletter</code> on
          this device. That is not a cookie; it is local storage.
        </p>
        <p>Template for {SITE.legal.businessName}. Review with counsel. Updated {SITE.legal.date}.</p>
      </div>
    </main>
  );
}
