import type { PhotoAsset } from "@/lib/types";

const LICENSE_LABELS: Record<PhotoAsset["license"], string> = {
  owned: "Owned by SceneBuzz",
  licensed: "Licensed",
  permission: "Used with permission",
  creative_commons: "Creative Commons",
  public_domain: "Public domain",
};

export function PhotoCredit({ photo, className = "" }: { photo: PhotoAsset; className?: string }) {
  if (!photo.credit && !photo.photographer && !photo.source) return null;
  const credit = photo.credit ?? [photo.photographer, photo.source].filter(Boolean).join(" / ");
  return (
    <div className={`mt-1 text-[0.68rem] leading-relaxed text-muted ${className}`}>
      <span>Photo: {credit}</span>
      {photo.license ? <span> · {LICENSE_LABELS[photo.license]}</span> : null}
    </div>
  );
}

export function PhotoAttribution({ photo }: { photo: PhotoAsset }) {
  return (
    <details className="mt-2 text-xs text-muted">
      <summary className="cursor-pointer select-none hover:text-signal">Photo information</summary>
      <dl className="mt-2 grid gap-1 border-l border-line pl-3 dark:border-night-line">
        {photo.photographer ? <div><dt className="inline font-semibold">Photographer: </dt><dd className="inline">{photo.photographer}</dd></div> : null}
        {photo.source ? <div><dt className="inline font-semibold">Source: </dt><dd className="inline">{photo.source}</dd></div> : null}
        {photo.license ? <div><dt className="inline font-semibold">License: </dt><dd className="inline">{LICENSE_LABELS[photo.license]}</dd></div> : null}
        {photo.originalUrl ? <div><dt className="inline font-semibold">Original: </dt><dd className="inline"><a href={photo.originalUrl} target="_blank" rel="noreferrer">Source page</a></dd></div> : null}
        {photo.obtainedAt ? <div><dt className="inline font-semibold">Obtained: </dt><dd className="inline">{photo.obtainedAt}</dd></div> : null}
        {photo.usageNotes ? <div><dt className="inline font-semibold">Usage: </dt><dd className="inline">{photo.usageNotes}</dd></div> : null}
      </dl>
    </details>
  );
}
