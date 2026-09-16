/**
 * PSL architecture only. Franchise names below are the publicly known set.
 * Do not invent squads, tables, fixtures, results or auction prices.
 */
export const PSL_TEAMS = [
  { slug: "islamabad-united", name: "Islamabad United", city: "Islamabad" },
  { slug: "karachi-kings", name: "Karachi Kings", city: "Karachi" },
  { slug: "lahore-qalandars", name: "Lahore Qalandars", city: "Lahore" },
  { slug: "multan-sultans", name: "Multan Sultans", city: "Multan" },
  { slug: "peshawar-zalmi", name: "Peshawar Zalmi", city: "Peshawar" },
  { slug: "quetta-gladiators", name: "Quetta Gladiators", city: "Quetta" },
] as const;

export const PSL_DESKS = [
  {
    slug: "news",
    title: "PSL News",
    body: "League explainers and sample features until a live newsroom feed is commissioned. No invented scores.",
  },
  {
    slug: "teams",
    title: "PSL Teams",
    body: "The publicly known franchise list. Confirm the current season set against PCB announcements.",
  },
  {
    slug: "players",
    title: "PSL Players",
    body: "Links into the SceneBuzz cricket directory. This is not a current squad sheet.",
  },
  {
    slug: "fixtures",
    title: "PSL Fixtures",
    body: "TBA until an official schedule is published and a licensed data partner is connected.",
  },
  {
    slug: "results",
    title: "PSL Results",
    body: "Empty on purpose. SceneBuzz will not invent match results.",
  },
  {
    slug: "points-table",
    title: "PSL Points Table",
    body: "Not connected. A live table will replace this slot — never a guessed standing.",
  },
  {
    slug: "records",
    title: "PSL Records",
    body: "Career and tournament records only when they can be sourced. Verify before publication.",
  },
  {
    slug: "draft",
    title: "Draft / Retentions",
    body: "Draft, trade and retention notes belong here after official PCB/PSL statements.",
  },
  {
    slug: "match-reports",
    title: "Match Reports",
    body: "Architecture for future commissioned reports. Sample copy is labeled.",
  },
  {
    slug: "seasons",
    title: "Season pages",
    body: "Each edition will get an archive URL once that season is documented. No invented year tables.",
  },
] as const;

export type PslDesk = (typeof PSL_DESKS)[number];
export type PslTeam = (typeof PSL_TEAMS)[number];

export function getPslDesk(slug: string): PslDesk | undefined {
  return PSL_DESKS.find((d) => d.slug === slug);
}
