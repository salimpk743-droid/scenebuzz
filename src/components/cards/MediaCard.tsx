import type { PhotoAsset } from "@/lib/types";
import { PhotoCredit } from "@/components/media/PhotoCredit";

export function MediaCard({ title, href, image, meta, kicker, photo }: { title: string; href: string; image: string; meta: string; kicker?: string; photo?: PhotoAsset }) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-line bg-card shadow-(--shadow-card) dark:border-night-line dark:bg-night-card">
      <a href={href} className="block overflow-hidden">
        <img src={photo?.src ?? image} alt={photo?.alt ?? title} className="h-44 w-full object-cover" loading="lazy" onError={(event) => { if (photo) event.currentTarget.src = image; }} />
      </a>
      <div className="flex flex-1 flex-col p-4">
        {kicker ? <p className="sb-kicker">{kicker}</p> : null}
        <h3 className="mt-1 font-display text-xl leading-snug"><a href={href} className="hover:text-signal">{title}</a></h3>
        <p className="mt-2 text-sm text-muted">{meta}</p>
        {photo ? <PhotoCredit photo={photo} /> : null}
      </div>
    </article>
  );
}
