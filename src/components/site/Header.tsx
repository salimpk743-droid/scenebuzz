import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { NAV_PRIMARY, NAV_SECONDARY } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("sb-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored ? stored === "dark" : prefers;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sb-theme", next ? "dark" : "light");
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    void navigate({ to: "/search", search: { q: q.trim() } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur dark:border-night-line dark:bg-night/95">
      <div className="sb-container-wide">
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 md:min-h-[4.5rem] md:py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="SceneBuzz home">
            <span className="inline-block h-8 w-1.5 bg-signal" aria-hidden="true" />
            <span className="leading-none">
              <span className="block font-display text-[1.55rem] font-medium tracking-[-0.05em] text-ink dark:text-night-paper sm:text-[1.75rem]">
                SCENE
                <span className="ml-1 font-sans text-[1rem] font-extrabold tracking-[0.1em] sm:text-[1.08rem]">BUZZ</span>
              </span>
              <span className="mt-0.5 hidden text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted sm:block">
                Pakistan first
              </span>
            </span>
          </Link>

          <form
            onSubmit={onSearch}
            className="hidden min-w-0 flex-1 items-center justify-center px-4 md:flex"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              Search SceneBuzz
            </label>
            <div className="relative w-full max-w-sm lg:max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="global-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search PSL, dramas, Bollywood…"
                className="h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/10 dark:border-night-line dark:bg-night-card"
              />
            </div>
          </form>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink transition hover:bg-paper-2 dark:text-night-paper dark:hover:bg-night-card"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <Link
              to="/search"
              className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2 md:hidden dark:hover:bg-night-card"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2 lg:hidden dark:hover:bg-night-card"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        <nav
          className="hidden overflow-x-auto border-t border-line py-1.5 lg:block dark:border-night-line sb-scrollbar-none"
          aria-label="Primary"
        >
          <ul className="flex min-w-max items-center gap-1">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="inline-flex h-9 items-center whitespace-nowrap px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink/75 transition hover:text-signal dark:text-night-paper/75"
                  activeProps={{ className: "text-signal" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          className="hidden overflow-x-auto border-t border-line/70 py-1 lg:block dark:border-night-line sb-scrollbar-none"
          aria-label="Secondary"
        >
          <ul className="flex min-w-max items-center gap-1">
            {NAV_SECONDARY.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  to={item.href as "/"}
                  className="inline-flex h-8 items-center whitespace-nowrap px-3 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-muted hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-cream px-3 py-3 shadow-lg lg:hidden dark:border-night-line dark:bg-night"
        >
          <form onSubmit={onSearch} className="mb-3" role="search">
            <label className="sr-only" htmlFor="mobile-search">
              Search SceneBuzz
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="mobile-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search PSL, dramas, Bollywood…"
                className="h-12 w-full rounded-md border border-line bg-card pl-10 pr-4 shadow-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/10 dark:border-night-line dark:bg-night-card"
              />
            </div>
          </form>
          <p className="sb-kicker mb-2">Destinations</p>
          <ul className="grid grid-cols-2 gap-1.5">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="flex min-h-12 items-center justify-center bg-ink px-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.1em] text-paper hover:bg-signal"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="sb-kicker mt-4 mb-2">More</p>
          <ul className="grid gap-1">
            {NAV_SECONDARY.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  to={item.href as "/"}
                  className="flex min-h-11 items-center px-1 text-sm text-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
