export function MediaCard({
  title,
  href,
  image,
  meta,
  kicker,
}: {
  title: string;
  href: string;
  image: string;
  meta: string;
  kicker?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden border border-line bg-card shadow-(--shadow-card) dark:border-night-line dark:bg-night-card">
      <a href={href} className="block overflow-hidden">
        <img src={image} alt="" className="h-44 w-full object-cover" loading="lazy" />
      </a>
      <div className="flex flex-1 flex-col p-4">
        {kicker ? <p className="sb-kicker">{kicker}</p> : null}
        <h3 className="mt-1 font-display text-xl leading-snug">
          <a href={href} className="hover:text-signal">
            {title}
          </a>
        </h3>
        <p className="mt-2 text-sm text-muted">{meta}</p>
      </div>
    </article>
  );
}