import { RefreshCw } from "lucide-react";
import type { Game } from "@/components/DriverCard";

interface TodaysBoardBoxProps {
  tap: number;
  games: Game[];
}

export const TodaysBoardBox = ({ tap, games }: TodaysBoardBoxProps) => {
  if (tap < 1) return null;
  return (
    <section className="hud-panel border border-hud/30 rounded-md overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
        <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">
          {tap >= 2 ? "today's board · refreshed" : "today's board"}
        </span>
        {tap >= 2 && (
          <span className="flex items-center gap-1 font-mono text-[9px] text-win">
            <RefreshCw className="h-2.5 w-2.5" /> live
          </span>
        )}
      </div>
      <div className="divide-y divide-border/40">
        {games.map((g, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5">
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">{g.matchup}</div>
              <div className="font-mono text-[10px] text-win uppercase tracking-wider mt-0.5">
                {g.pick} · {g.odds}
              </div>
            </div>
            <div className="ml-3 shrink-0">
              <div className="text-[9px] font-mono uppercase text-muted-foreground text-right">conf</div>
              <div className="font-mono text-sm font-bold text-hud">{g.confidence}%</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
