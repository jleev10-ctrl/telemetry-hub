import { leaders } from "@/data/leaders";

export const Grand13Hero = () => {
  return (
    <section className="hud-panel border-2 border-[hsl(45_100%_55%)]/60 rounded-md overflow-hidden shadow-[0_0_24px_hsl(45_100%_55%/0.3)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[hsl(45_100%_55%)]/30 bg-secondary/40">
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[hsl(45_100%_60%)]" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">
          grand13 · syndicate command
        </span>
        <span className="ml-auto font-mono text-[9px] text-win tracking-widest uppercase">
          live
        </span>
      </div>

      {/* Leaderboard — top 7 */}
      <div className="bg-background/40">
        <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/30">
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">
            leaderboard · top 7
          </span>
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
            30-day
          </span>
        </div>
        <ol className="divide-y divide-border/40">
          {leaders.map((r) => (
            <li key={r.rank} className="flex items-center gap-3 px-3 py-2">
              <span className="font-mono text-xs font-bold text-[hsl(45_100%_60%)] w-5 text-center shrink-0">
                {r.rank}
              </span>
              <div className="h-7 w-7 rounded-full overflow-hidden border border-hud/30 shrink-0 bg-secondary/40">
                <img src={r.img} alt={r.name} className="h-full w-full object-cover" />
              </div>
              <div className="font-mono text-xs text-foreground/90 truncate flex-1 min-w-0">
                {r.name}
              </div>
              <div className="font-mono text-xs font-bold text-win shrink-0">{r.winPct}</div>
              <div className="font-mono text-[10px] text-[hsl(45_100%_60%)] shrink-0 w-14 text-right">
                {r.units}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer tagline */}
      <div className="px-4 py-2 border-t border-[hsl(45_100%_55%)]/20 bg-secondary/40">
        <p className="font-mono text-[10px] tracking-widest text-foreground/70 uppercase text-center">
          13 synthetic analysts · one syndicate · zero excuses
        </p>
      </div>
    </section>
  );
};
