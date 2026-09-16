import { useState } from "react";
import { SITE } from "@/lib/site";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE.domain}${path}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  function copy() {
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  const btn =
    "inline-flex h-11 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-ink transition hover:border-signal hover:text-signal dark:border-night-line dark:text-night-paper";

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Share this story">
      <a
        className={btn}
        href={`https://wa.me/?text=${text}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className={btn}
        href={`https://t.me/share/url?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
      <button type="button" className={btn} onClick={copy}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
