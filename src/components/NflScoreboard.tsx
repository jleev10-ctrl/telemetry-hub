import { cn } from "@/lib/utils";

// Minimal helmet — single-color SVG, recolored per team via currentColor.
const Helmet = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 3c-4.4 0-8 3.2-8 7.5 0 1.7.5 3.2 1.4 4.4l-.9 2.4c-.2.5.3 1 .8.8l2.5-.9c1.2.6 2.6.9 4.2.9 4.4 0 8-3.2 8-7.6S16.4 3 12 3Zm-5.5 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm9.5 1.5H8v-2h8v2Z" />
  </svg>
);

interface Team {
  abbr: string;
  color: string; // hsl tuple, e.g. "0 70% 45%"
  score: number;
}

interface Game {
  home: Team;
  away: Team;
  status: string; // "Q3 8:42" | "FINAL" | "HALF" | "7:30 PM"
  live?: boolean;
  spotlight?: boolean; // gold accent (e.g. Mike's Dallas play)
  note?: string; // e.g. "MIKE: DAL"
}

const games: Game[] = [
  {
    away: { abbr: "DAL", color: "215 80% 35%", score: 21 },
    home: { abbr: "PHI", color: "150 60% 25%", score: 17 },
    status: "Q3 8:42",
    live: true,
    spotlight: true,
    note: "MIKE: DAL",
  },
  {
    away: { abbr: "LV",  color: "0 0% 15%",   score: 10 },
    home: { abbr: "KC",  color: "0 75% 42%",  score: 13 },
    status: "Q2 2:11",
    live: true,
  },
  {
    away: { abbr: "BUF", color: "215 85% 40%", score: 27 },
    home: { abbr: "MIA", color: "190 80% 40%", score: 24 },
    status: "FINAL",
  },
  {
    away: { abbr: "SF",  color: "0 65% 40%",   score: 14 },
    home: { abbr: "SEA", color: "210 70% 30%", score: 7  },
    status: "Q2 0:48",
    live: true,
  },
  {
    away: { abbr: "GB",  color: "60 50% 30%",  score: 0 },
    home: { abbr: "DET", color: "200 70% 45%", score: 0 },
    status: "4:25 PM",
  },
  {
    away: { abbr: "NYJ", color: "150 55% 25%", score: 0 },
    home: { abbr: "NE",  color: "215 50% 22%", score: 0 },
    status: "8:20 PM",
  },
];

const TeamRow = ({ team, winning }: { team: Team; winning: boolean }) => (
  <div className="flex items-center justify-between gap-2 py-0.5">
    <div className="flex items-center gap-2 min-w-0">
      <Helmet className="h-4 w-4 shrink-0" style={{ color: `hsl(${team.color})` } as React.CSSProperties} />
      <span className={cn("font-mono text-[11px] tracking-wider", winning ? "font-bold text-foreground" : "text-foreground/70")}>
        {team.abbr}
      </span>
    </div>
    <span className={cn("font-mono text-sm tabular-nums", winning ? "font-bold text-foreground" : "text-foreground/60")}>
      {team.score}
    </span>
  </div>
);

export const NflScoreboard = () => {
  return (
    <section className="hud-panel border border-hud/30 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-hud/20 bg-secondary/40">
        <div className="flex items-center gap-2">
          <Helmet className="h-3.5 w-3.5 text-hud" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud">NFL · WEEK SLATE</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-win">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
          live
        </span>
      </div>

      {/* Grid of games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
        {games.map((g, i) => {
          const homeWin = g.home.score > g.away.score;
          const awayWin = g.away.score > g.home.score;
          return (
            <div
              key={i}
              className={cn(
                "px-3 py-2 sm:border-b border-border/40",
                g.spotlight && "bg-[hsl(45_100%_55%/0.06)] shadow-[inset_3px_0_0_hsl(45_100%_55%/0.7)]"
              )}
            >
              <TeamRow team={g.away} winning={awayWin} />
              <TeamRow team={g.home} winning={homeWin} />
              <div className="mt-1 flex items-center justify-between">
                <span className={cn(
                  "font-mono text-[9px] tracking-widest uppercase",
                  g.live ? "text-win" : g.status === "FINAL" ? "text-muted-foreground" : "text-hud"
                )}>
                  {g.live && <span className="inline-block h-1 w-1 rounded-full bg-win mr-1.5 align-middle animate-pulse" />}
                  {g.status}
                </span>
                {g.note && (
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[hsl(45_100%_60%)] border border-[hsl(45_100%_55%/0.4)] rounded px-1.5 py-0.5">
                    {g.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
