import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { actors } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/actors/")({
  head: () =>
    pageHead({
      title: "Celebrities — Pakistani and Indian",
      description:
        "Pakistani celebrities first, then Indian and Bollywood actors and actresses. SceneBuzz directories, not rankings.",
      path: "/actors",
    }),
  component: ActorsDirectory,
});

function ActorsDirectory() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<"all" | "pakistan" | "india">("all");
  const list = useMemo(() => {
    return actors.filter((a) => {
      if (group !== "all" && a.group !== group) return false;
      if (q.trim() && !`${a.name} ${a.fullName}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, group]);

  const pk = list.filter((a) => a.group === "pakistan");
  const inn = list.filter((a) => a.group === "india");

  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Celebrities" }]} />
      <p className="sb-kicker">Pakistan first · India next</p>
      <h1 className="mt-2 font-display text-4xl">Celebrities</h1>
      <p className="mt-3 max-w-3xl text-muted">
        Pakistani actors, actresses, hosts and screen talent first. Indian and Bollywood names
        follow. This is not a worldwide celebrity database and not an objective ranking.
      </p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name"
          className="h-12 flex-1 rounded-md border border-line bg-card px-4 dark:border-night-line dark:bg-night-card"
          aria-label="Search actors"
        />
        <select
          className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card"
          value={group}
          onChange={(e) => setGroup(e.target.value as typeof group)}
          aria-label="Industry"
        >
          <option value="all">All</option>
          <option value="pakistan">Pakistani celebrities</option>
          <option value="india">Indian / Bollywood</option>
        </select>
      </div>
      <section className="mt-10">
        <h2 className="font-display text-2xl">Pakistani celebrities</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pk.map((a) => (
            <ProfileCard key={a.slug} name={a.name} href={`/actors/${a.slug}`} country={a.nationality} meta={a.profession} />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">Indian / Bollywood celebrities</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {inn.map((a) => (
            <ProfileCard key={a.slug} name={a.name} href={`/actors/${a.slug}`} country={a.nationality} meta={a.profession} />
          ))}
        </div>
      </section>
    </main>
  );
}
