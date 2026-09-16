import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;
    const prev = JSON.parse(localStorage.getItem("sb-newsletter") || "[]") as string[];
    localStorage.setItem("sb-newsletter", JSON.stringify([...prev, email]));
    setStatus("saved");
    e.currentTarget.reset();
  }

  return (
    <section className="border border-line bg-ink px-6 py-10 text-paper dark:border-night-line md:px-10">
      <p className="sb-kicker text-signal-soft">Newsletter</p>
      <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
        Get the latest cricket, drama, movie and celebrity updates.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-paper/70">
        Prototype capture only. Addresses are stored in this browser and are not sent to a
        server. Connect an email service (for example Buttondown, Mailchimp or Loops) before
        launch.
      </p>
      {status === "saved" ? (
        <p className="mt-5 text-sm text-signal-soft" role="status">
          Saved locally. No email was sent.
        </p>
      ) : (
        <form className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="h-12 flex-1 rounded-md border border-ink-3 bg-ink-2 px-4 text-paper placeholder:text-muted outline-none focus:border-signal"
          />
          <button
            type="submit"
            className="h-12 rounded-md bg-signal px-6 text-sm font-semibold text-paper hover:bg-signal-dark"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
