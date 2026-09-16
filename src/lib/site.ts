export const SITE = {
  name: "SceneBuzz",
  shortName: "SB",
  tagline: "Pakistan's home for cricket, PSL, dramas and Bollywood",
  longTagline:
    "Pakistan cricket • PSL • Pakistani dramas • Bollywood • Indian cinema • Celebrities",
  domain: "https://scenebuzz.com",
  description:
    "SceneBuzz is a Pakistan-first South Asian media destination covering Pakistan cricket, PSL, Pakistani dramas, Bollywood, Indian movies, celebrities and trending South Asian culture. Pakistan is the centre; India is the major secondary market.",
  positioning:
    "SceneBuzz is a Pakistan-first South Asian media destination covering Pakistan cricket, PSL, Pakistani dramas, Bollywood, Indian movies, celebrities and trending South Asian culture.",
  locale: "en",
  themeColor: "#12141a",
  accent: "#c41e3a",
  demoNotice:
    "Sample editorial for the SceneBuzz prototype. Not a live news report. Replace with commissioned reporting before publication.",
  statsDisclaimer:
    "Career figures are published international records compiled for this prototype. Active players change with every match. Verify against official board and ESPNcricinfo records before publication.",
  placeholderEmail: "hello@scenebuzz.com",
  legal: {
    businessName: "[LEGAL BUSINESS NAME]",
    ownerName: "[OWNER NAME]",
    country: "[COUNTRY]",
    address: "[ADDRESS]",
    email: "[CONTACT EMAIL]",
    date: "16 September 2026",
  },
} as const;

/** Primary masthead — the eight destinations a first-time reader should see. */
export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Cricket", href: "/cricket" },
  { label: "PSL", href: "/psl" },
  { label: "Pakistani Dramas", href: "/dramas" },
  { label: "Movies", href: "/movies" },
  { label: "Bollywood", href: "/bollywood" },
  { label: "Celebrities", href: "/actors" },
  { label: "Talk of the Town", href: "/talk-of-the-town" },
] as const;

export const NAV_SECONDARY = [
  { label: "Upcoming Dramas", href: "/upcoming-dramas" },
  { label: "Upcoming Movies", href: "/upcoming-movies" },
  { label: "Cricket Players", href: "/cricket/players" },
  { label: "Actors", href: "/actors" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
] as const;

/** @deprecated use NAV_PRIMARY — kept so older imports keep compiling. */
export const NAV = NAV_PRIMARY;

/** Homepage and hub strip — Cricket | PSL | Pakistani Dramas | Bollywood | Indian Movies | Celebrities | Talk of the Town */
export const DESTINATIONS = [
  { label: "Cricket", href: "/cricket" },
  { label: "PSL", href: "/psl" },
  { label: "Pakistani Dramas", href: "/dramas" },
  { label: "Bollywood", href: "/bollywood" },
  { label: "Indian Movies", href: "/movies" },
  { label: "Celebrities", href: "/actors" },
  { label: "Talk of the Town", href: "/talk-of-the-town" },
] as const;

export const TRENDING = [
  { label: "PSL", href: "/psl" },
  { label: "Pakistani Dramas", href: "/dramas" },
  { label: "Bollywood", href: "/bollywood" },
  { label: "Pakistan Cricket", href: "/cricket" },
  { label: "Indian Movies", href: "/movies" },
  { label: "Upcoming Dramas", href: "/upcoming-dramas" },
  { label: "Celebrities", href: "/actors" },
  { label: "Talk of the Town", href: "/talk-of-the-town" },
] as const;

export const FOOTER_COLS = [
  {
    title: "Cricket",
    links: [
      { label: "Cricket Home", href: "/cricket" },
      { label: "PSL", href: "/psl" },
      { label: "PSL Teams", href: "/psl/teams" },
      { label: "PSL Fixtures", href: "/psl/fixtures" },
      { label: "Pakistani Cricketers", href: "/cricket/players" },
      { label: "Cricket News", href: "/news" },
    ],
  },
  {
    title: "Entertainment",
    links: [
      { label: "Pakistani Dramas", href: "/dramas" },
      { label: "Upcoming Dramas", href: "/upcoming-dramas" },
      { label: "Movies • Bollywood", href: "/movies" },
      { label: "Bollywood", href: "/bollywood" },
      { label: "Upcoming Bollywood", href: "/upcoming-movies" },
    ],
  },
  {
    title: "People",
    links: [
      { label: "Celebrities", href: "/actors" },
      { label: "Talk of the Town", href: "/talk-of-the-town" },
      { label: "Personalities", href: "/talk-of-the-town/personalities" },
      { label: "News & Features", href: "/news" },
    ],
  },
  {
    title: "SceneBuzz",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Advertising", href: "/advertising" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
] as const;

export function absUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.domain}${p}`;
}
