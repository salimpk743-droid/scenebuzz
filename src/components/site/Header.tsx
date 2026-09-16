import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { NAV, SITE } from "@/lib/site";

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
        <div className="flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
          <Link to="/" className="flex items-center gap-3" aria-label="SceneBuzz home">
            <span className="inline-block h-8 w-1.5 bg-signal" aria-hidden="true" />
            <span className="leading-none">
              <span className="block font-display text-[1.65rem] font-medium tracking-[-0.04em] text-ink dark:text-night-paper">
                SCENE<span className="ml-1 font-sans text-[1.15rem] font-extrabold tracking-[0.12em]">BUZZ</span>
              </span>
            </span>
          </Link>

          <form
            onSubmit={onSearch}
            className="hidden min-w-0 flex-1 items-center justify-end md:flex"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              Search SceneBuzz
            </label>
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="global-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search players, dramas, movies…"
                className="h-11 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none focus:border-signal dark:border-night-line dark:bg-night-card"
              />
            </div>
          </form>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink dark:text-night-paper"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <Link
              to="/search"
              className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-line py-2 lg:block dark:border-night-line" aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="inline-flex h-10 items-center text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink/80 hover:text-signal dark:text-night-paper/80"
                  activeProps={{ className: "text-signal" }}
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
          className="border-t border-line bg-cream px-4 py-4 lg:hidden dark:border-night-line dark:bg-night"
        >
          <form onSubmit={onSearch} className="mb-4" role="search">
            <label className="sr-only" htmlFor="mobile-search">
              Search SceneBuzz
            </label>
            <input
              id="mobile-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search SceneBuzz"
              className="h-12 w-full rounded-md border border-line bg-card px-4 dark:border-night-line dark:bg-night-card"
            />
          </form>
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href as "/"}
                  className="flex min-h-11 items-center text-base font-medium"
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
