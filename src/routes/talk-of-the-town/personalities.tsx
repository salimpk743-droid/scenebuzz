import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { personalities } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/talk-of-the-town/personalities")({
  head: () =>
    pageHead({
      title: "Personality directory",
      description: "Search Talk of the Town personalities by name, country and profession.",
      path: "/talk-of-the-town/personalities",
    }),
  component: PersonalityDirectory,
});

const TAGS = ["All", "Model", "Actor", "Actress", "Television", "Fashion", "Social Media", "Rising Star"];

function PersonalityDirectory() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("All");
  const [tag, setTag] = useState("All");
  const countries = ["All", ...Array.from(new Set(personalities.map((p) => p.country))).sort()];

  const list = useMemo(() => {
    return personalities
      .filter((p) => {
        if (country !== "All" && p.country !== country) return false;
        if (tag !== "All" && !p.tags.includes(tag)) return false;
        if (q.trim() && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q, country, tag]);

  return (
    <main className="sb-container-wide py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Talk of the Town", href: "/talk-of-the-town" },
          { name: "Personalities" },
        ]}
      />
      <h1 className="font-display text-4xl">Personality directory</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Alphabetical search"
          className="h-12 rounded-md border border-line bg-card px-4 dark:border-night-line dark:bg-night-card"
          aria-label="Search by name"
        />
        <select className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country">
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select className="h-12 rounded-md border border-line bg-card px-3 dark:border-night-line dark:bg-night-card" value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Profession">
          {TAGS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-muted">{list.length} profiles</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProfileCard key={p.slug} name={p.name} href={`/talk-of-the-town/${p.slug}`} country={p.country} meta={`${p.profession} · ${p.country}`} />
        ))}
      </div>
    </main>
  );
}
