import { cn } from "@/lib/utils";

interface Cover {
  matchup: string;
  pick: string;
  line: string;
  result: "W" | "L" | "P" | "—";
}

const COVERS: Cover[] = [
  { matchup: "DAL @ PHI",  pick: "DAL +3.5",   line: "-110", result: "W" },
  { matchup: "KC vs BUF",  pick: "OVER 48.5",  line: "-105", result: "W" },
  { matchup: "SF @ LAR",   pick: "SF -6",      line: "-115", result: "L" },
  { matchup: "BAL @ CIN",  pick: "BAL ML",     line: "+135", result: "L" },
  { matchup: "GB vs DET",  pick: "DET -3",     line: "-110", result: "—" },
  { matchup: "MIA vs NYJ", pick: "UNDER 41.5", line: "-110", result: "—" },
  { matchup: "LV @ KC",    pick: "LV +9.5",    line: "-108", result: "W" },
  { matchup: "NYG @ WAS",  pick: "WAS -2.5",   line: "-110", result: "P" },
];

const resultColor: Record<Cover["result"], string> = {
  W: "text-win",
  L: "text-hot",
  P: "text-muted-foreground",
  "—": "text-muted-foreground/60",
};

export const CoversTable = () => (
  <section className="hud-panel border border-hud/30 overflow-hidden">
    <div className="flex items-center justify-between px-3 py-2 border-b border-hud/20 bg-secondary/40">
      <div className="flex items-center gap-2">
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-hud">MIKE · COVERS</span>
      </div>
      <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
        last 8
      </span>
    </div>

    <table className="w-full text-sm font-mono">
      <thead>
        <tr className="border-b border-border/40 text-[9px] uppercase tracking-widest text-muted-foreground">
          <th className="px-3 py-2 text-left">matchup</th>
          <th className="px-3 py-2 text-left">pick</th>
          <th className="px-3 py-2 text-center">line</th>
          <th className="px-3 py-2 text-center w-10">res</th>
        </tr>
      </thead>
      <tbody>
        {COVERS.map((c, i) => (
          <tr key={i} className="border-b border-border/30 hover:bg-secondary/40 transition-colors">
            <td className="px-3 py-2 text-xs font-bold text-foreground">{c.matchup}</td>
            <td className="px-3 py-2 text-[11px] text-win uppercase tracking-wider">{c.pick}</td>
            <td className="px-3 py-2 text-center text-[11px] text-hud">{c.line}</td>
            <td className={cn("px-3 py-2 text-center font-bold text-xs", resultColor[c.result])}>
              {c.result}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
