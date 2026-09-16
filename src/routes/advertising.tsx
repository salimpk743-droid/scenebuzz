import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/advertising")({
  head: () =>
    pageHead({
      title: "Advertising",
      description: "Advertise with SceneBuzz. Inventory placeholders only in this prototype.",
      path: "/advertising",
    }),
  component: AdvertisingPage,
});

function AdvertisingPage() {
  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Advertising" }]} />
      <h1 className="font-display text-4xl">Advertising</h1>
      <p className="mt-3 max-w-2xl text-muted">
        SceneBuzz is designed for display advertising, direct sponsorship, sponsored content,
        newsletter sponsorship and brand partnerships. It is not an advertising farm.
      </p>
      <div className="mt-8 space-y-4">
        <AdSlot label="Header advertisement" />
        <AdSlot label="Homepage advertisement" />
        <AdSlot label="Article / sidebar advertisement" size="sidebar" />
      </div>
      <p className="mt-6 text-sm">
        Enquiries: {SITE.placeholderEmail} or the{" "}
        <Link to="/contact" className="text-signal hover:underline">
          contact form
        </Link>
        , topic Advertising.
      </p>
    </main>
  );
}
