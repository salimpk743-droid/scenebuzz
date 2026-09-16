import { Portrait } from "@/components/portrait/Portrait";
import type { PhotoAsset } from "@/lib/types";

export function ProfileCard({
  name,
  href,
  meta,
  country,
  photo,
}: {
  name: string;
  href: string;
  meta: string;
  country?: string;
  photo?: PhotoAsset;
}) {
  return (
    <a href={href} className="group flex items-center gap-3 border border-line bg-card p-3 shadow-(--shadow-card) transition hover:-translate-y-0.5 hover:shadow-(--shadow-lift) dark:border-night-line dark:bg-night-card">
      <Portrait name={name} country={country} photo={photo} size="sm" className="rounded-md" />
      <span>
        <span className="block font-display text-lg leading-tight group-hover:text-signal">{name}</span>
        <span className="mt-0.5 block text-xs text-muted">{meta}</span>
      </span>
    </a>
  );
}
