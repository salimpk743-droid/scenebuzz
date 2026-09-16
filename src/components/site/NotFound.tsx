import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="sb-container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="sb-kicker">404</p>
      <h1 className="mt-3 font-display text-4xl md:text-6xl">Oops! This scene doesn't exist.</h1>
      <p className="mt-4 max-w-md text-muted">
        The page may have moved, or the URL is incomplete. Try the homepage or search SceneBuzz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex h-12 items-center rounded-md bg-signal px-5 font-semibold text-paper">
          Go Home
        </Link>
        <Link to="/cricket" className="inline-flex h-12 items-center rounded-md border border-line px-5 font-semibold dark:border-night-line">
          Cricket
        </Link>
        <Link to="/entertainment" className="inline-flex h-12 items-center rounded-md border border-line px-5 font-semibold dark:border-night-line">
          Entertainment
        </Link>
        <Link to="/talk-of-the-town" className="inline-flex h-12 items-center rounded-md border border-line px-5 font-semibold dark:border-night-line">
          Talk of the Town
        </Link>
        <Link to="/search" className="inline-flex h-12 items-center rounded-md border border-line px-5 font-semibold dark:border-night-line">
          Search SceneBuzz
        </Link>
      </div>
    </main>
  );
}
