import { actors } from "@/data/actors";
import { articles } from "@/data/articles";
import { cricketers } from "@/data/cricketers";
import { dramas } from "@/data/dramas";
import { movies } from "@/data/movies";
import { personalities } from "@/data/personalities";
import type {
  Actor,
  Article,
  Cricketer,
  Drama,
  Movie,
  Personality,
  SearchDoc,
} from "@/lib/types";

export {
  actors,
  articles,
  cricketers,
  dramas,
  movies,
  personalities,
};

export function getCricketer(slug: string): Cricketer | undefined {
  return cricketers.find((p) => p.slug === slug);
}

export function getActor(slug: string): Actor | undefined {
  return actors.find((p) => p.slug === slug);
}

export function getPersonality(slug: string): Personality | undefined {
  return personalities.find((p) => p.slug === slug);
}

export function getDrama(slug: string): Drama | undefined {
  return dramas.find((p) => p.slug === slug);
}

export function getMovie(slug: string): Movie | undefined {
  return movies.find((p) => p.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((p) => p.slug === slug);
}

export function relatedCricketers(slugs: string[], except?: string): Cricketer[] {
  return slugs
    .filter((s) => s !== except)
    .map(getCricketer)
    .filter((p): p is Cricketer => Boolean(p));
}

export function relatedActors(slugs: string[], except?: string): Actor[] {
  return slugs
    .filter((s) => s !== except)
    .map(getActor)
    .filter((p): p is Actor => Boolean(p));
}

export function featuredArticles(limit = 6): Article[] {
  const featured = articles.filter((a) => a.featured);
  return (featured.length ? featured : articles).slice(0, limit);
}

export function articlesByCategory(category: string, limit = 6): Article[] {
  return articles.filter((a) => a.category === category || a.section === category).slice(0, limit);
}

export function searchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const p of cricketers) {
    docs.push({
      type: "cricketer",
      title: p.name,
      href: `/cricket/${p.slug}`,
      blurb: p.summary.slice(0, 160),
      meta: `${p.country} · ${p.role} · ${p.status}`,
    });
  }
  for (const p of actors) {
    docs.push({
      type: "actor",
      title: p.name,
      href: `/actors/${p.slug}`,
      blurb: p.overview.slice(0, 160),
      meta: `${p.nationality} · ${p.profession}`,
    });
  }
  for (const p of personalities) {
    docs.push({
      type: "personality",
      title: p.name,
      href: `/talk-of-the-town/${p.slug}`,
      blurb: p.bio.slice(0, 160),
      meta: `${p.country} · ${p.profession}`,
    });
  }
  for (const d of dramas) {
    docs.push({
      type: "drama",
      title: d.title,
      href: `/dramas/${d.slug}`,
      blurb: d.synopsis.slice(0, 160),
      meta: `${d.country} · ${d.status}`,
    });
  }
  for (const m of movies) {
    docs.push({
      type: "movie",
      title: m.title,
      href: `/movies/${m.slug}`,
      blurb: m.synopsis.slice(0, 160),
      meta: `${m.country} · ${m.status}`,
    });
  }
  for (const a of articles) {
    docs.push({
      type: "article",
      title: a.title,
      href: `/news/${a.slug}`,
      blurb: a.dek,
      meta: `${a.category} · Sample editorial`,
    });
  }
  return docs;
}

export function searchAll(q: string, limit = 24): SearchDoc[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const terms = query.split(/\s+/).filter(Boolean);
  return searchIndex()
    .map((doc) => {
      const hay = `${doc.title} ${doc.blurb} ${doc.meta}`.toLowerCase();
      const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      const exact = doc.title.toLowerCase().includes(query) ? 5 : 0;
      return { doc, score: score + exact };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.doc);
}
