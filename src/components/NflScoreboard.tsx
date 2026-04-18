import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ESPN_URL = "https://www.espn.com/nfl/scoreboard";
const ESPN_API = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";

interface ApiTeam {
  team: { abbreviation: string; logo: string; displayName: string };
  score: string;
  homeAway: "home" | "away";
}
interface ApiEvent {
  id: string;
  status: { type: { state: string; shortDetail: string; completed: boolean } };
  competitions: { competitors: ApiTeam[] }[];
}

interface Game {
  id: string;
  home: { abbr: string; logo: string; score: number };
  away: { abbr: string; logo: string; score: number };
  status: string;
  state: "pre" | "in" | "post";
  spotlight: boolean;
}

const SPOTLIGHT_TEAM = "DAL"; // Mike's pick

const NflScoreboard = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(ESPN_API);
        if (!res.ok) throw new Error(`ESPN ${res.status}`);
        const data = await res.json();
        const parsed: Game[] = (data.events as ApiEvent[]).map((e) => {
          const comp = e.competitions[0];
          const home = comp.competitors.find((c) => c.homeAway === "home")!;
          const away = comp.competitors.find((c) => c.homeAway === "away")!;
          return {
            id: e.id,
            home: { abbr: home.team.abbreviation, logo: home.team.logo, score: Number(home.score) || 0 },
            away: { abbr: away.team.abbreviation, logo: away.team.logo, score: Number(away.score) || 0 },
            status: e.status.type.shortDetail,
            state: e.status.type.state as Game["state"],
            spotlight: home.team.abbreviation === SPOTLIGHT_TEAM || away.team.abbreviation === SPOTLIGHT_TEAM,
          };
        });
        if (!cancelled) setGames(parsed);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "fetch failed");
      }
    };
    load();
    const i = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(i);
    };
  }, []);

  return (
    <section className="hud-panel border border-hud/30 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-hud/20 bg-secondary/40">
        <span className="font-mono text-[10px] tracking-[0.3em] text-hud">NFL · LIVE · ESPN</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-win">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
          live
        </span>
      </div>

      {/* Body */}
      {!games && !error && (
        <div className="flex items-center justify-center gap-2 px-3 py-8 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-mono text-[10px] tracking-widest uppercase">syncing telemetry</span>
        </div>
      )}

      {error && (
        <div className="px-4 py-6 text-center space-y-2">
          <p className="font-mono text-[10px] tracking-widest text-hot uppercase">feed unavailable</p>
          <a
            href={ESPN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-hud hover:text-win uppercase"
          >
            open espn <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      )}

      {games && games.length === 0 && (
        <div className="px-4 py-6 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          no games scheduled
        </div>
      )}

      {games && games.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
          {games.map((g) => {
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
                <TeamRow team={g.away} winning={awayWin} hideScore={g.state === "pre"} />
                <TeamRow team={g.home} winning={homeWin} hideScore={g.state === "pre"} />
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
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-hud/20 bg-secondary/40">
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          source: espn · auto-refresh 30s
        </span>
        <a
          href={ESPN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-widest text-hud hover:text-win uppercase inline-flex items-center gap-1"
        >
          full board <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </section>
  );
};

const TeamRow = ({
  team,
  winning,
  hideScore,
}: {
  team: { abbr: string; logo: string };
  winning: boolean;
  hideScore: boolean;
} & { team: { abbr: string; logo: string; score: number } }) => (
  <div className="flex items-center justify-between gap-2 py-0.5">
    <div className="flex items-center gap-2 min-w-0">
      <img
        src={team.logo}
        alt={team.abbr}
        loading="lazy"
        className="h-5 w-5 shrink-0 object-contain"
      />
      <span className={cn("font-mono text-[11px] tracking-wider", winning ? "font-bold text-foreground" : "text-foreground/70")}>
        {team.abbr}
      </span>
    </div>
    {!hideScore && (
      <span className={cn("font-mono text-sm tabular-nums", winning ? "font-bold text-foreground" : "text-foreground/60")}>
        {team.score}
      </span>
    )}
  </div>
);

export { NflScoreboard };
