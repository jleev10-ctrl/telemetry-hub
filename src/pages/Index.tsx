import { useState } from "react";
import { Activity, BarChart3, Flame, ShieldCheck, TrendingUp, Zap, ChevronRight, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ironmike from "@/assets/ironmike.jpg";
import swoosh from "@/assets/swoosh.jpg";
import sarah from "@/assets/sarah.jpg";
import mlb from "@/assets/mlb.jpg";
import nhl from "@/assets/nhl.jpg";

type DriverId = "ironmike" | "swoosh" | "sarah" | "mlb" | "nhl";

interface Driver {
  id: DriverId;
  name: string;
  tag: string;
  league: string;
  image: string;
  record: string;
  winPct: string;
  units: string;
  pick: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";
  ticker: string[];
}

const drivers: Driver[] = [
  {
    id: "ironmike",
    name: 'iron "mike" k.',
    tag: "professional / analytic",
    league: "NFL Tank",
    image: ironmike,
    record: "22-8",
    winPct: "73%",
    units: "+18.5u",
    pick: "Raiders +3.5",
    status: "HOT",
    ticker: ["RAIDERS +3.5 ✦ confidence 92%", "line move: -0.5 → +3.5", "sharp action: 78% on RAIDERS", "weather: clear · wind 4mph", "injury report: clean"],
  },
  {
    id: "swoosh",
    name: '"swoosh" d. james',
    tag: "high-energy / dynamic",
    league: "NBA Hype Man",
    image: swoosh,
    record: "15-15",
    winPct: "50%",
    units: "+2.1u",
    pick: "Lakers ML",
    status: "COOLDOWN",
    ticker: ["NBA UNDERDOG ALERT: LAKERS ML", "pace differential +6.2", "back-to-back fatigue index: high", "ref crew avg total: 228", "trend: home dogs 11-4 ATS"],
  },
  {
    id: "sarah",
    name: '"stats" sarah',
    tag: "exclusive / vip",
    league: "Quant Desk",
    image: sarah,
    record: "25-5",
    winPct: "83%",
    units: "+29.5u",
    pick: "Reds ML +167",
    status: "LEADER",
    ticker: ["MLB REDS ML +167 ✦ syndicate leader", "monte carlo: 71.4% win prob", "edge vs market: +14.2%", "kelly stake: 3.1%", "model v4.2 confidence: elite"],
  },
  {
    id: "mlb",
    name: 'rick "the baseburner" b.',
    tag: "league overview",
    league: "MLB Analyst · 11 yrs",
    image: mlb,
    record: "24-10",
    winPct: "71%",
    units: "+29.5u",
    pick: "Dodgers ML",
    status: "VERIFIED",
    ticker: ["DODGERS ML ✦ diamond analytics", "starter xFIP: 2.91", "bullpen rest: 100%", "park factor: -0.8", "bvp index: favorable"],
  },
  {
    id: "nhl",
    name: 'tommy "the mask" c.',
    tag: "league overview",
    league: "NHL Analyst · 9 yrs",
    image: nhl,
    record: "21-10",
    winPct: "68%",
    units: "+22.5u",
    pick: "Rangers ML",
    status: "VERIFIED",
    ticker: ["RANGERS ML ✦ ice & pucks tracker", "goalie SV%: 0.928", "PP efficiency: 24.1%", "corsi-for last 5: 54.2%", "line chemistry: stacked"],
  },
];

interface Sportsbook {
  name: string;
  slug: string;
  url: string;
  color: string;
}

const sportsbooks: Sportsbook[] = [
  { name: "DraftKings", slug: "draftkings", url: "https://sportsbook.draftkings.com/", color: "from-[hsl(142_76%_45%)] to-[hsl(142_76%_35%)]" },
  { name: "FanDuel", slug: "fanduel", url: "https://sportsbook.fanduel.com/", color: "from-[hsl(220_90%_55%)] to-[hsl(220_90%_40%)]" },
  { name: "BetMGM", slug: "betmgm", url: "https://sports.betmgm.com/", color: "from-[hsl(40_90%_55%)] to-[hsl(30_90%_45%)]" },
  { name: "Caesars", slug: "caesars", url: "https://www.caesars.com/sportsbook-and-casino", color: "from-[hsl(0_75%_50%)] to-[hsl(0_75%_38%)]" },
  { name: "ESPN BET", slug: "espnbet", url: "https://espnbet.com/", color: "from-[hsl(15_90%_55%)] to-[hsl(0_85%_45%)]" },
];

const withUtm = (url: string, book: string, placement: string) => {
  const u = new URL(url);
  u.searchParams.set("utm_source", "synthetic_syndicate");
  u.searchParams.set("utm_medium", "affiliate");
  u.searchParams.set("utm_campaign", "telemetry_funnel");
  u.searchParams.set("utm_content", placement);
  u.searchParams.set("utm_term", book);
  return u.toString();
};

const statusColor: Record<Driver["status"], string> = {
  HOT: "text-hot border-hot/40 bg-hot/10",
  COOLDOWN: "text-hud border-hud/40 bg-hud/10",
  LEADER: "text-win border-win/40 bg-win/10",
  VERIFIED: "text-win border-win/40 bg-win/10",
};

// Grand 13 leaderboard data
const grand13 = [
  { rank: 1, name: '"stats" sarah', league: "Quant Desk", record: "25-5", winPct: "83%", units: "+29.5u", streak: "W7", trend: "↑" },
  { rank: 2, name: 'rick "the baseburner" b.', league: "MLB", record: "24-10", winPct: "71%", units: "+29.5u", streak: "W4", trend: "↑" },
  { rank: 3, name: 'iron "mike" k.', league: "NFL", record: "22-8", winPct: "73%", units: "+18.5u", streak: "W3", trend: "↑" },
  { rank: 4, name: 'tommy "the mask" c.', league: "NHL", record: "21-10", winPct: "68%", units: "+22.5u", streak: "W2", trend: "→" },
  { rank: 5, name: '"swoosh" d. james', league: "NBA", record: "15-15", winPct: "50%", units: "+2.1u", streak: "L2", trend: "↓" },
  { rank: 6, name: '"the oracle" p.', league: "NFL", record: "19-11", winPct: "63%", units: "+14.2u", streak: "W1", trend: "→" },
  { rank: 7, name: '"parlay pete" w.', league: "NBA", record: "18-12", winPct: "60%", units: "+12.8u", streak: "W2", trend: "↑" },
  { rank: 8, name: '"ace" martinez', league: "MLB", record: "17-13", winPct: "57%", units: "+9.4u", streak: "L1", trend: "↓" },
  { rank: 9, name: '"iceman" j.', league: "NHL", record: "16-12", winPct: "57%", units: "+8.1u", streak: "W1", trend: "→" },
  { rank: 10, name: '"the professor" d.', league: "NFL", record: "20-14", winPct: "59%", units: "+7.5u", streak: "L1", trend: "↓" },
  { rank: 11, name: '"money" mike r.', league: "NBA", record: "14-14", winPct: "50%", units: "+3.2u", streak: "W1", trend: "↑" },
  { rank: 12, name: '"diamond" dave', league: "MLB", record: "13-15", winPct: "46%", units: "-1.2u", streak: "L3", trend: "↓" },
  { rank: 13, name: '"the rook" n.', league: "NHL", record: "11-14", winPct: "44%", units: "-3.8u", streak: "L2", trend: "↓" },
];

const Index = () => {
  const [active, setActive] = useState<DriverId>("ironmike");
  const driver = drivers.find((d) => d.id === active)!;

  return (
    <div className="min-h-screen w-full">
      {/* Double-Bar Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl">
        <div className="border-b border-border/60 bg-background/80">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 grid place-items-center rounded-md hud-panel">
                <Activity className="h-5 w-5 text-hud" />
              </div>
              <div className="leading-tight">
                <div className="font-mono text-sm tracking-[0.3em] text-hud">SYNTHETIC</div>
                <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground">SYNDICATE</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
              live telemetry · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>

        <div className="border-b border-border/60 bg-gradient-to-r from-secondary/80 via-background/80 to-secondary/80">
          <div className="container flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
            <span className="hud-chip shrink-0">
              <Flame className="h-3 w-3" /> place action
            </span>
            {sportsbooks.map((b) => (
              <a
                key={b.name}
                href={withUtm(b.url, b.slug, "header_strip")}
                target="_blank"
                rel="sponsored noopener noreferrer"
                data-book={b.slug}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground",
                  "bg-gradient-to-b shadow-lg shadow-black/40 hover:scale-105 transition-transform",
                  b.color
                )}
              >
                {b.name} →
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="h-[108px]" />

      <main className="container pb-24">
        {/* Consensus Feed Ticker */}
        <section className="my-4 hud-panel border border-hud/30 overflow-hidden">
          <div className="flex items-center">
            <div className="px-3 py-2 border-r border-hud/30 bg-secondary/60">
              <span className="font-mono text-[10px] tracking-[0.3em] text-hud">CONSENSUS FEED</span>
            </div>
            <div className="relative flex-1 overflow-hidden py-2">
              <div className="ticker flex gap-8 whitespace-nowrap font-mono text-xs text-foreground/80 pl-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    <span>4/5 PREDICT <span className="text-win">RAIDERS +3.5</span></span>
                    <span>NBA UNDERDOG ALERT: <span className="text-hud">LAKERS ML</span></span>
                    <span>MLB SYNDICATE: <span className="text-win">REDS +167</span></span>
                    <span>NHL EDGE: <span className="text-hud">RANGERS ML</span></span>
                    <span>SHARP $ FLOW: <span className="text-hot">78% RAIDERS</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HERO STAGE — Full Width */}
        <section className="hud-panel border border-hud/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
            <div className="flex items-center gap-2">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-hud">DRIVER ONLINE</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{driver.tag}</span>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
            <img src={driver.image} alt={driver.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />

            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="hud-chip"><ShieldCheck className="h-3 w-3" /> verified analyst</span>
              <span className="hud-chip"><Zap className="h-3 w-3" /> {driver.league}</span>
            </div>

            <button className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-hud/20 border border-hud/60 backdrop-blur-sm hover:bg-hud/30 transition">
              <Play className="h-5 w-5 text-hud fill-hud" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-3xl sm:text-5xl font-bold tracking-tight">{driver.name}</div>
              <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest mt-1">
                current pick · <span className="text-win font-bold">{driver.pick}</span>
              </div>
            </div>
          </div>

          {/* Stat strip + Telemetry inline */}
          <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-border border-t border-hud/20">
            {[
              { label: "30-day win%", value: driver.winPct, icon: TrendingUp },
              { label: "30-day record", value: driver.record, icon: BarChart3 },
              { label: "units won", value: driver.units, icon: Flame },
            ].map((s) => (
              <div key={s.label} className="px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <s.icon className="h-3 w-3" /> {s.label}
                </div>
                <div className="mt-1 text-lg sm:text-2xl font-bold text-win font-mono">{s.value}</div>
              </div>
            ))}
            {driver.ticker.slice(0, 3).map((line, i) => (
              <div key={i} className="hidden sm:block px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="text-hud">›</span> telemetry
                </div>
                <div className="mt-1 text-xs font-mono text-foreground/80 leading-snug">{line}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="p-4 border-t border-hud/20 bg-gradient-to-b from-transparent to-secondary/60 flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto font-bold tracking-wider uppercase text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              tap to play this parlay <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              routes to your sportsbook ↑
            </p>
          </div>
        </section>

        {/* SELECTION HUB — Horizontal driver nav */}
        <section className="mt-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            {drivers.map((d) => {
              const isActive = d.id === active;
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={cn(
                    "shrink-0 flex items-center gap-3 rounded-lg border px-3 py-2 transition-all",
                    isActive
                      ? "border-hud bg-secondary/80 shadow-[0_0_16px_hsl(var(--hud)/0.3)]"
                      : "border-border/60 hover:border-hud/60 bg-secondary/30"
                  )}
                >
                  <img src={d.image} alt={d.name} className="h-10 w-10 rounded-md object-cover" />
                  <div className="text-left">
                    <div className="text-xs font-bold leading-tight">{d.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">{d.league}</span>
                      <span className={cn("rounded px-1.5 py-0.5 text-[8px] font-mono border", statusColor[d.status])}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* GRAND 13 LEADERBOARD */}
        <section className="mt-8 hud-panel border border-hud/30 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-hud/20 bg-secondary/40">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-hud" />
              <span className="font-mono text-xs tracking-[0.3em] text-hud">GRAND 13 LEADERBOARD</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">season 4.2 · live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3 text-left w-12">#</th>
                  <th className="px-4 py-3 text-left">driver</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">league</th>
                  <th className="px-4 py-3 text-center">record</th>
                  <th className="px-4 py-3 text-center">win%</th>
                  <th className="px-4 py-3 text-center">units</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">streak</th>
                  <th className="px-4 py-3 text-center w-12">trend</th>
                </tr>
              </thead>
              <tbody>
                {grand13.map((row) => (
                  <tr
                    key={row.rank}
                    className={cn(
                      "border-b border-border/30 transition-colors hover:bg-secondary/50",
                      row.rank <= 3 && "bg-secondary/30"
                    )}
                  >
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.rank <= 3 ? (
                        <span className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                          row.rank === 1 && "bg-[hsl(45_100%_50%/0.2)] text-[hsl(45_100%_60%)]",
                          row.rank === 2 && "bg-[hsl(0_0%_75%/0.15)] text-[hsl(0_0%_75%)]",
                          row.rank === 3 && "bg-[hsl(30_70%_45%/0.15)] text-[hsl(30_70%_55%)]",
                        )}>
                          {row.rank}
                        </span>
                      ) : row.rank}
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.league}</td>
                    <td className="px-4 py-3 text-center">{row.record}</td>
                    <td className="px-4 py-3 text-center text-win font-bold">{row.winPct}</td>
                    <td className={cn("px-4 py-3 text-center font-bold", row.units.startsWith("+") ? "text-win" : "text-hot")}>
                      {row.units}
                    </td>
                    <td className={cn(
                      "px-4 py-3 text-center hidden sm:table-cell",
                      row.streak.startsWith("W") ? "text-win" : "text-hot"
                    )}>
                      {row.streak}
                    </td>
                    <td className={cn(
                      "px-4 py-3 text-center text-lg",
                      row.trend === "↑" && "text-win",
                      row.trend === "↓" && "text-hot",
                      row.trend === "→" && "text-muted-foreground",
                    )}>
                      {row.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary funnel push */}
        <section className="mt-8 hud-panel border border-primary/30 p-5 sm:p-6 text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-hud mb-2">SYNDICATE EDGE</div>
          <h3 className="text-xl sm:text-2xl font-bold mb-1">join the consensus. fade the public.</h3>
          <p className="text-sm text-muted-foreground mb-4">5 drivers · 1 verified edge · zero noise.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {sportsbooks.slice(0, 3).map((b) => (
              <a
                key={b.name}
                href={withUtm(b.url, b.slug, "edge_cta")}
                target="_blank"
                rel="sponsored noopener noreferrer"
                data-book={b.slug}
                className="rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-b from-primary to-accent text-primary-foreground hover:scale-105 transition"
              >
                deploy on {b.name} →
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        synthetic syndicate · telemetry v4.2 · 21+ · play responsibly
      </footer>
    </div>
  );
};

export default Index;
