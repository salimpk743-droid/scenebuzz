import { Link } from "@tanstack/react-router";
import { FOOTER_COLS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink bg-ink text-paper">
      <div className="sb-container-wide py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-3xl tracking-tight">
              SCENE<span className="ml-1 font-sans text-lg font-extrabold tracking-[0.12em]">BUZZ</span>
            </p>
            <p className="mt-2 text-sm text-paper/65">{SITE.tagline}</p>
            <p className="mt-4 text-sm text-paper/65">{SITE.positioning}</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-soft">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link to={link.href as "/"} className="text-sm text-paper/80 hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-ink-3 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SceneBuzz. All rights reserved.</p>
          <p>Pakistan first. India next. Sample editorial is labeled. Statistics must be verified before publication.</p>
        </div>
      </div>
    </footer>
  );
}
