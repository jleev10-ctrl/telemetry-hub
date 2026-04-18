import { cn } from "@/lib/utils";

interface MockGame {
  id: string;
  away: { abbr: string; score: number };
  home: { abbr: string; score: number };
  status: string;
  state: "pre" | "in" | "post";
  spotlight?: boolean;
}

// Hardcoded Week 16 board — clean, always full, easy to swap later.
const MOCK_GAMES: MockGame[] = [
  { id: "1", away: { abbr: "DAL", score: 24 }, home: { abbr: "PHI", score: 17 }, status: "Q3 · 4:12", state: "in", spotlight: true },
  { id: "2", away: { abbr: "KC",  score: 31 }, home: { abbr: "BUF", score: 28 }, status: "FINAL",     state: "post" },
  { id: "3", away: { abbr: "SF",  score: 14 }, home: { abbr: "LAR", score: 10 }, status: "Q2 · 1:48", state: "in" },
  { id: "4", away: { abbr: "BAL", score: 21 }, home: { abbr: "CIN", score: 24 }, status: "FINAL/OT",  state: "post" },
  { id: "5", away: { abbr: "GB",  score: 0  }, home: { abbr: "DET", score: 0  }, status: "SUN 4:25 ET", state: "pre" },
  { id: "6", away: { abbr: "MIA", score: 0  }, home: { abbr: "NYJ", score: 0  }, status: "SUN 8:20 ET", state: "pre" },
];

const NflScoreboard = () => {
  return (
    <section className="hud-panel border border-hud/30 overflow-hidden animate-fade-in">
      {/* Clean node header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-hud/20 bg-secondary/40">
        <div className="flex items-center gap-2">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud">NFL · WEEK 16 · NODE</span>
        </div>
        <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
          mock feed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
        {MOCK_GAMES.map((g) => {
          const homeWin = g.state !== "pre" && g.home.score > g.away.score;
          const awayWin = g.state !== "pre" && g.away.score > g.home.score;
          const live = g.state === "in";
          const final = g.state === "post";
          return (
            <div
              key={g.id}
              className={cn(
                "px-3 py-2 sm:border-b border-border/40",
                g.spotlight && "bg-[hsl(45_100%_55%/0.06)] shadow-[inset_3px_0_0_hsl(45_100%_55%/0.7)]"
              )}
            >
              <TeamRow abbr={g.away.abbr} score={g.away.score} winning={awayWin} hideScore={g.state === "pre"} />
              <TeamRow abbr={g.home.abbr} score={g.home.score} winning={homeWin} hideScore={g.state === "pre"} />
              <div className="mt-1 flex items-center justify-between">
                <span className={cn(
                  "font-mono text-[9px] tracking-widest uppercase",
                  live ? "text-win" : final ? "text-muted-foreground" : "text-hud"
                )}>
                  {live && <span className="inline-block h-1 w-1 rounded-full bg-win mr-1.5 align-middle animate-pulse" />}
                  {g.status}
                </span>
                {g.spotlight && (
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[hsl(45_100%_60%)] border border-[hsl(45_100%_55%/0.4)] rounded px-1.5 py-0.5">
                    MIKE: DAL
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 border-t border-hud/20 bg-secondary/40">
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          board · week 16 snapshot
        </span>
        <span className="font-mono text-[9px] tracking-widest text-hud uppercase">
          live feed soon
        </span>
      </div>
    </section>
  );
};

const TeamRow = ({
  abbr,
  score,
  winning,
  hideScore,
}: {
  abbr: string;
  score: number;
  winning: boolean;
  hideScore: boolean;
}) => (
  <div className="flex items-center justify-between gap-2 py-0.5">
    <span className={cn("font-mono text-[11px] tracking-wider", winning ? "font-bold text-foreground" : "text-foreground/70")}>
      {abbr}
    </span>
    {!hideScore && (
      <span className={cn("font-mono text-sm tabular-nums", winning ? "font-bold text-foreground" : "text-foreground/60")}>
        {score}
      </span>
    )}
  </div>
);

export { NflScoreboard };
