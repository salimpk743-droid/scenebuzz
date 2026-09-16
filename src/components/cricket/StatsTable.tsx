import { na } from "@/lib/format";
import type { FormatStats } from "@/lib/types";

const ROWS: { key: keyof FormatStats; label: string }[] = [
  { key: "matches", label: "Matches" },
  { key: "innings", label: "Innings" },
  { key: "runs", label: "Runs" },
  { key: "average", label: "Average" },
  { key: "highest", label: "Highest score" },
  { key: "hundreds", label: "100s" },
  { key: "fifties", label: "50s" },
  { key: "wickets", label: "Wickets" },
  { key: "bowlAvg", label: "Bowling average" },
  { key: "bestBowling", label: "Best bowling" },
  { key: "fiveWickets", label: "5-wicket hauls" },
];

export function StatsTable({
  tests,
  odis,
  t20is,
}: {
  tests?: FormatStats | null;
  odis?: FormatStats | null;
  t20is?: FormatStats | null;
}) {
  const cols = [
    { id: "Test", stats: tests },
    { id: "ODI", stats: odis },
    { id: "T20I", stats: t20is },
  ].filter((c) => c.stats);

  if (cols.length === 0) {
    return (
      <p className="text-sm text-muted">
        Format statistics are not published in this prototype snapshot. Verify before publication.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <caption className="sr-only">International career statistics by format</caption>
        <thead>
          <tr className="border-b border-line text-left dark:border-night-line">
            <th className="py-2 pr-3 font-semibold">Category</th>
            {cols.map((c) => (
              <th key={c.id} className="py-2 pr-3 font-semibold">
                {c.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key} className="border-b border-line/70 dark:border-night-line">
              <th className="py-2 pr-3 text-left font-medium text-muted">{row.label}</th>
              {cols.map((c) => (
                <td key={c.id} className="py-2 pr-3 tabular-nums">
                  {na(c.stats?.[row.key] as string | number | undefined)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {cols.some((c) => c.stats?.note) ? (
        <p className="mt-3 text-xs text-muted">{cols.find((c) => c.stats?.note)?.stats?.note}</p>
      ) : null}
    </div>
  );
}
