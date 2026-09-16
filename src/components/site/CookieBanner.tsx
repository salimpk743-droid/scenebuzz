import { useEffect, useState } from "react";

type Pref = "accepted" | "rejected" | "custom" | null;

export function CookieBanner() {
  const [pref, setPref] = useState<Pref>("accepted");
  const [manage, setManage] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sb-cookie") as Pref | null;
    setPref(stored ?? null);
  }, []);

  function save(next: Exclude<Pref, null>) {
    localStorage.setItem("sb-cookie", next);
    setPref(next);
    setManage(false);
  }

  if (pref) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream p-4 shadow-[0_-12px_40px_-24px_rgba(18,20,26,0.45)] dark:border-night-line dark:bg-night-card"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="sb-container flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-lg text-ink dark:text-night-paper">Cookies</p>
          <p className="mt-1 text-sm text-muted">
            SceneBuzz uses essential cookies for preferences such as theme and consent. Optional
            analytics are not loaded in this prototype. You can accept, reject optional cookies,
            or manage preferences.
          </p>
          {manage ? (
            <p className="mt-2 text-xs text-muted">
              Essential: always on. Analytics/advertising: off until a provider is connected.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="h-11 rounded-md bg-signal px-4 text-sm font-semibold text-paper hover:bg-signal-dark"
            onClick={() => save("accepted")}
          >
            Accept
          </button>
          <button
            type="button"
            className="h-11 rounded-md border border-line px-4 text-sm font-semibold dark:border-night-line"
            onClick={() => save("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="h-11 rounded-md px-4 text-sm font-semibold underline"
            onClick={() => (manage ? save("custom") : setManage(true))}
          >
            {manage ? "Save preferences" : "Manage preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
