import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Stats {
  totals: { today: number; week: number; all: number };
  topPages: { label: string; count: number }[];
  topCountries: { label: string; count: number }[];
  topReferrers: { label: string; count: number }[];
  topDevices: { label: string; count: number }[];
  recent: {
    path: string;
    country: string | null;
    city: string | null;
    device: string | null;
    referrer: string;
    at: string;
  }[];
}

const Stats = () => {
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data, error } = await supabase.functions.invoke("read-stats", {
        body: { password },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setStats(data as Stats);
    } catch (e: any) {
      setErr(e?.message || "Failed to load");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 font-mono">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between border-b border-hud/30 pb-3">
          <h1 className="text-lg sm:text-xl font-black tracking-[0.25em] text-[hsl(var(--hud))] uppercase">
            Traffic · Old Man Counter
          </h1>
          <a
            href="/"
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
          >
            ← Home
          </a>
        </header>

        {!stats && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              Enter password
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load()}
                placeholder="••••••••"
                className="font-mono"
              />
              <Button onClick={load} disabled={loading}>
                {loading ? "..." : "Open"}
              </Button>
            </div>
            {err && <p className="text-xs text-red-500">{err}</p>}
          </div>
        )}

        {stats && (
          <>
            {/* Totals */}
            <section className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Today", value: stats.totals.today },
                { label: "7 days", value: stats.totals.week },
                { label: "All time", value: stats.totals.all },
              ].map((t) => (
                <div
                  key={t.label}
                  className="hud-panel border border-hud/30 rounded-md p-3 text-center"
                >
                  <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                    {t.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[hsl(var(--hud))] mt-1">
                    {t.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </section>

            <Block title="Top pages" rows={stats.topPages} />
            <Block title="Top referrers" rows={stats.topReferrers} />
            <Block title="Top countries" rows={stats.topCountries} />
            <Block title="Devices" rows={stats.topDevices} />

            <section>
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--hud))] mb-2">
                Last 20 visits
              </h2>
              <div className="border border-hud/30 rounded-md overflow-hidden">
                {stats.recent.length === 0 && (
                  <div className="p-3 text-xs text-muted-foreground">No visits yet.</div>
                )}
                {stats.recent.map((r, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto] gap-2 px-3 py-2 text-[11px] border-b border-hud/15 last:border-b-0"
                  >
                    <div className="truncate">
                      <span className="text-foreground">{r.path}</span>
                      <span className="text-muted-foreground"> · {r.referrer}</span>
                    </div>
                    <div className="text-muted-foreground whitespace-nowrap">
                      {[r.city, r.country].filter(Boolean).join(", ") || "—"} · {r.device || "—"} ·{" "}
                      {new Date(r.at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Button variant="outline" onClick={load} disabled={loading} className="w-full">
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const Block = ({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; count: number }[];
}) => (
  <section>
    <h2 className="text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--hud))] mb-2">
      {title}
    </h2>
    <div className="border border-hud/30 rounded-md overflow-hidden">
      {rows.length === 0 && (
        <div className="p-3 text-xs text-muted-foreground">No data.</div>
      )}
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between px-3 py-1.5 text-[11px] border-b border-hud/15 last:border-b-0"
        >
          <span className="truncate text-foreground">{r.label}</span>
          <span className="font-bold text-[hsl(var(--hud))]">{r.count}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
