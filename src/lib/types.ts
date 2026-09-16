export type PhotoLicense = "owned" | "licensed" | "permission" | "creative_commons" | "public_domain";

export type PhotoAsset = {
  src: string;
  alt: string;
  photographer?: string;
  source?: string;
  license?: PhotoLicense;
  credit?: string;
  originalUrl?: string;
  obtainedAt?: string;
  usageNotes?: string;
};

export type FormatStats = {
  matches?: number | string;
  innings?: number | string;
  runs?: number | string;
  average?: number | string;
  highest?: string;
  hundreds?: number | string;
  fifties?: number | string;
  wickets?: number | string;
  bowlAvg?: number | string;
  bestBowling?: string;
  fiveWickets?: number | string;
  note?: string;
};

export type Cricketer = {
  slug: string;
  name: string;
  fullName: string;
  country: string;
  role: "Batter" | "Bowler" | "All-rounder" | "Wicketkeeper";
  battingStyle: string;
  bowlingStyle: string;
  status: "Active" | "Retired";
  dob: string;
  birthplace: string;
  debut: { test?: string; odi?: string; t20i?: string };
  teams: string[];
  captaincy?: string;
  awards: string[];
  highlights: string[];
  summary: string;
  related: string[];
  featured: boolean;
  tests?: FormatStats | null;
  odis?: FormatStats | null;
  t20is?: FormatStats | null;
  statsUpdated: string;
  statsNote: string;
  photo?: PhotoAsset;
};

export type Actor = {
  slug: string;
  name: string;
  fullName: string;
  profession: string;
  nationality: string;
  group: "pakistan" | "india";
  dob: string;
  birthplace: string;
  overview: string;
  television: string[];
  film: string[];
  majorRoles: string[];
  awards: string[];
  notable: string[];
  upcoming: string[];
  social: { label: string; href: string; verified: boolean }[];
  related: string[];
  featured: boolean;
  photo?: PhotoAsset;
};

export type Personality = {
  slug: string;
  name: string;
  profession: string;
  country: string;
  tags: string[];
  knownFor: string[];
  bio: string;
  television: string[];
  film: string[];
  modeling: string[];
  appearances: string[];
  related: string[];
  featured: boolean;
  unverifiedNote?: string;
  photo?: PhotoAsset;
};

export type Drama = {
  slug: string;
  title: string;
  genre: string[];
  language: string;
  country: string;
  network: string;
  release: string;
  status: "Aired" | "Ongoing" | "Upcoming" | "TBA";
  cast: { name: string; slug?: string; role?: string }[];
  director: string;
  writer: string;
  producer: string;
  synopsis: string;
  episodes: string;
  ost: string;
  whereToWatch: string;
  upcoming?: boolean;
  source?: string;
  photo?: PhotoAsset;
};

export type Movie = {
  slug: string;
  title: string;
  genre: string[];
  language: string;
  country: string;
  release: string;
  status: "Released" | "Upcoming" | "TBA";
  director: string;
  writer: string;
  cast: { name: string; slug?: string }[];
  synopsis: string;
  runtime: string;
  production: string;
  trailer?: string;
  whereToWatch: string;
  upcoming?: boolean;
  source?: string;
  photo?: PhotoAsset;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  section: string;
  author: string;
  published: string;
  updated: string;
  hero: string;
  caption: string;
  body: string[];
  tags: string[];
  related: string[];
  sources: string[];
  demo: boolean;
  featured?: boolean;
  photo?: PhotoAsset;
};

export type SearchDoc = {
  type: "cricketer" | "actor" | "personality" | "drama" | "movie" | "article";
  title: string;
  href: string;
  blurb: string;
  meta: string;
};
