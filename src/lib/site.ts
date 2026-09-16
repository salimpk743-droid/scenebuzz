export const SITE = {
  name: "SceneBuzz",
  shortName: "SB",
  tagline: "Cricket • Movies • Dramas • Celebrities",
  longTagline: "Cricket • Movies • Dramas • Celebrities • Trending Personalities",
  domain: "https://scenebuzz.com",
  description:
    "SceneBuzz is a South Asian digital media platform covering cricket, football, Pakistani dramas, Indian and Pakistani cinema, celebrities, and culture for audiences across South Asia and the diaspora.",
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

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Sports", href: "/sports" },
  { label: "Cricket", href: "/cricket" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Pakistani Dramas", href: "/dramas" },
  { label: "Movies", href: "/movies" },
  { label: "Upcoming Dramas", href: "/upcoming-dramas" },
  { label: "Upcoming Movies", href: "/upcoming-movies" },
  { label: "Celebrities", href: "/actors" },
  { label: "Talk of the Town", href: "/talk-of-the-town" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRENDING = [
  { label: "Pakistan Cricket", href: "/cricket" },
  { label: "PSL", href: "/cricket" },
  { label: "Pakistani Dramas", href: "/dramas" },
  { label: "Bollywood", href: "/movies" },
  { label: "Upcoming Movies", href: "/upcoming-movies" },
  { label: "Celebrity News", href: "/talk-of-the-town" },
  { label: "Featured Cricketers", href: "/cricket/players" },
] as const;

export const FOOTER_COLS = [
  {
    title: "Sports",
    links: [
      { label: "Sports Home", href: "/sports" },
      { label: "Cricket", href: "/cricket" },
      { label: "Players & Legends", href: "/cricket/players" },
      { label: "Football", href: "/sports/football" },
    ],
  },
  {
    title: "Entertainment",
    links: [
      { label: "Entertainment", href: "/entertainment" },
      { label: "Pakistani Dramas", href: "/dramas" },
      { label: "Movies", href: "/movies" },
      { label: "Upcoming Dramas", href: "/upcoming-dramas" },
      { label: "Upcoming Movies", href: "/upcoming-movies" },
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
