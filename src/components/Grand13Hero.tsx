import p1 from "@/assets/g13/p1.jpg";
import p2 from "@/assets/g13/p2.jpg";
import p3 from "@/assets/g13/p3.jpg";
import p4 from "@/assets/g13/p4.jpg";
import p5 from "@/assets/g13/p5.jpg";
import p6 from "@/assets/g13/p6.jpg";
import p7 from "@/assets/g13/p7.jpg";

const leaders = [
  { rank: 1, name: '"Iron" Mike K.',          winPct: "83%", units: "+29.5u", img: p1 },
  { rank: 2, name: 'Rick "Baseburner" B.',    winPct: "79%", units: "+27.2u", img: p2 },
  { rank: 3, name: '"Stats" Sarah',           winPct: "78%", units: "+22.8u", img: p3 },
  { rank: 4, name: '"Swoosh" D. James',       winPct: "76%", units: "+21.0u", img: p4 },
  { rank: 5, name: 'Tommy "The Mask" C.',     winPct: "72%", units: "+18.4u", img: p5 },
  { rank: 6, name: '"The Professor" Reyes',   winPct: "70%", units: "+15.1u", img: p6 },
  { rank: 7, name: '"Vegas" V. Romano',       winPct: "68%", units: "+12.6u", img: p7 },
];

const feedItems = [
  ["SHARP $", "78% DAL"],
  ["LINE", "-3 → -2.5"],
  ["STEAM", "DAL ML"],
  ["HANDLE", "62%"],
  ["TICKETS", "71%"],
  ["RLM", "BAL UNDER"],
  ["MIKE'S CALL", "RIDE IT"],
];

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

      {/* Stat strip */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-[hsl(45_100%_55%)]/20">
        {[
          { label: "analysts", value: "5/13" },
          { label: "win rate", value: "74%" },
          { label: "units (wk)", value: "+119u" },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5 text-center">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-0.5 text-lg font-bold text-win font-mono">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Dueling tickers */}
      <div className="border-b border-[hsl(45_100%_55%)]/20">
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
        {/* G13 — scrolls right (reverse) */}
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
