import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description: "Contact SceneBuzz for general, editorial, advertising, corrections and copyright matters.",
      path: "/contact",
    }),
  component: ContactPage,
});

const TOPICS = [
  "General inquiries",
  "Editorial",
  "Advertising",
  "Corrections",
  "Copyright concerns",
] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="sb-container py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <h1 className="font-display text-4xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Placeholder inbox: {SITE.placeholderEmail} — replace with the production address. This form
        does not send email until a backend or form service is connected.
      </p>
      {sent ? (
        <p className="mt-8 border border-line bg-card p-6 dark:border-night-line dark:bg-night-card" role="status">
          Stored in this browser only. No message was delivered. Connect a form endpoint before launch.
        </p>
      ) : (
        <form className="mt-8 max-w-xl space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium">
            Topic
            <select name="topic" className="mt-1 h-12 w-full rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card">
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Name
            <input required name="name" className="mt-1 h-12 w-full rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input required type="email" name="email" className="mt-1 h-12 w-full rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" />
          </label>
          <label className="block text-sm font-medium">
            Message
            <textarea required name="message" rows={6} className="mt-1 w-full rounded-md border border-line bg-card px-3 py-2 dark:border-night-line dark:bg-night-card" />
          </label>
          <button type="submit" className="h-12 rounded-md bg-signal px-6 font-semibold text-paper">
            Send
          </button>
        </form>
      )}
    </main>
  );
}
