import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { cricketers } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cricket/players")({
  head: () =>
    pageHead({
      title: "Cricket players directory",
      description:
        "Searchable SceneBuzz directory of featured cricketers and legends. Filter by country, status and role.",
      path: "/cricket/players",
    }),
  component: PlayersDirectory,
});

const COUNTRIES = ["All", ...Array.from(new Set(cricketers.map((p) => p.country))).sort()];
const ROLES = ["All", "Batter", "Bowler", "All-rounder", "Wicketkeeper"] as const;
const STATUSES = ["All", "Active", "Retired"] as const;

function PlayersDirectory() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("All");
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");

  const list = useMemo(() => {
    return cricketers.filter((p) => {
      if (country !== "All" && p.country !== country) return false;
      if (role !== "All" && p.role !== role) return false;
      if (status !== "All" && p.status !== status) return false;
      if (q.trim() && !`${p.name} ${p.fullName}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, country, role, status]);

  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cricket", href: "/cricket" },
          { name: "Players" },
        ]}
      />
      <h1 className="font-display text-4xl">Featured cricketers & legends</h1>
      <p className="mt-3 max-w-3xl text-muted">
        This is not an objective ranking of the greatest players. It is a featured directory designed
        to grow. Search by name or filter by country, career status and role.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by player name"
          className="h-12 rounded-md border border-line bg-card px-4 dark:border-night-line dark:bg-night-card"
          aria-label="Search by player name"
        />
        <select className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country">
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" value={role} onChange={(e) => setRole(e.target.value as typeof role)} aria-label="Role">
          {ROLES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Status">
          {STATUSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted">{list.length} players</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProfileCard
            key={p.slug}
            name={p.name}
            href={`/cricket/${p.slug}`}
            country={p.country}
            meta={`${p.country} · ${p.role} · ${p.status}`}
          />
        ))}
      </div>
    </main>
  );
}
