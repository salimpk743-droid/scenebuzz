import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Cricketer } from "@/lib/types";

function num(v: number | string | undefined): number | null {
  return typeof v === "number" ? v : null;
}

export function CareerChart({ player }: { player: Cricketer }) {
  const runs = [
    { format: "Test", value: num(player.tests?.runs) },
    { format: "ODI", value: num(player.odis?.runs) },
    { format: "T20I", value: num(player.t20is?.runs) },
  ].filter((d) => d.value !== null);

  const wickets = [
    { format: "Test", value: num(player.tests?.wickets) },
    { format: "ODI", value: num(player.odis?.wickets) },
    { format: "T20I", value: num(player.t20is?.wickets) },
  ].filter((d) => d.value !== null && (d.value as number) > 0);

  if (runs.length === 0 && wickets.length === 0) {
    return (
      <p className="text-sm text-muted">
        No chartable numeric totals in this snapshot. Charts are built from the same published
        career figures shown in the table — SceneBuzz does not invent yearly series.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {runs.length ? (
        <figure>
          <figcaption className="mb-2 text-sm font-medium">International runs by format</figcaption>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={runs}>
                <XAxis dataKey="format" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#c41e3a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      ) : null}
      {wickets.length ? (
        <figure>
          <figcaption className="mb-2 text-sm font-medium">International wickets by format</figcaption>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wickets}>
                <XAxis dataKey="format" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1b1e27" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </figure>
      ) : null}
    </div>
  );
}
