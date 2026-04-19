import { leaders, feedItems } from "@/data/leaders";

export const TickersNode = () => (
  <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">
        live feed · g13 leaders
      </span>
      <span className="ml-auto font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
        live
      </span>
    </div>

    {/* FEED — scrolls left */}
    <div className="flex items-center bg-background/60">
      <div className="w-14 px-3 py-1.5 border-r border-hud/30 bg-secondary/60 shrink-0 text-center">
        <span className="font-mono text-[9px] tracking-[0.25em] text-win">FEED</span>
      </div>
      <div className="relative flex-1 overflow-hidden py-1.5">
        <div className="ticker flex gap-8 whitespace-nowrap font-mono text-[10px] text-foreground/80 pl-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 shrink-0">
              {feedItems.map(([k, v], j) => (
                <span key={j}>
                  {k} <span className="text-win">{v}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* G13 — scrolls right */}
    <div className="flex items-center bg-background/40 border-t border-hud/20">
      <div className="w-14 px-3 py-1.5 border-r border-[hsl(45_100%_55%)]/30 bg-secondary/60 shrink-0 text-center">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[hsl(45_100%_60%)]">G13</span>
      </div>
      <div className="relative flex-1 overflow-hidden py-1.5">
        <div className="ticker-reverse flex gap-8 whitespace-nowrap font-mono text-[10px] text-foreground/80 pl-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 shrink-0">
              {leaders.map((r) => (
                <span key={r.rank}>
                  #{r.rank} <span className="text-hud">{r.name}</span>{" "}
                  <span className="text-win">{r.winPct}</span>{" "}
                  <span className="text-[hsl(45_100%_60%)]">{r.units}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
