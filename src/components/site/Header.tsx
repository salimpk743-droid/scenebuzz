import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { NAV } from "@/lib/site";

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
            <span className="inline-block h-8 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            <span className="leading-none">
              <span className="block font-display text-[1.55rem] font-medium tracking-[-0.05em] text-ink dark:text-night-paper sm:text-[1.75rem]">
                SCENE
                <span className="ml-1 font-sans text-[1rem] font-extrabold tracking-[0.1em] sm:text-[1.08rem]">BUZZ</span>
              </span>
            </span>
          </Link>

          <form
            onSubmit={onSearch}
            className="hidden min-w-0 flex-1 items-center justify-center px-4 lg:flex"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              Search SceneBuzz
            </label>
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="global-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search players, actors, dramas, movies…"
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
              className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2 lg:hidden dark:hover:bg-night-card"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-paper-2 lg:hidden dark:hover:bg-night-card"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>

        <nav className="hidden overflow-x-auto border-t border-line py-1.5 lg:block dark:border-night-line sb-scrollbar-none" aria-label="Primary">
          <ul className="flex min-w-max items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-full px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink/75 transition hover:bg-paper-2 hover:text-signal dark:text-night-paper/75 dark:hover:bg-night-card"
                  activeProps={{ className: "bg-signal text-paper hover:bg-signal hover:text-paper" }}
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
                placeholder="Search SceneBuzz"
                className="h-12 w-full rounded-xl border border-line bg-card pl-10 pr-4 shadow-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/10 dark:border-night-line dark:bg-night-card"
              />
            </div>
          </form>
          <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition hover:bg-paper-2 dark:hover:bg-night-card"
                  activeProps={{ className: "bg-signal text-paper hover:bg-signal" }}
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
