import { useState } from "react";
import { Activity, BarChart3, Flame, ShieldCheck, TrendingUp, Zap, ChevronRight, Play } from "lucide-react";
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

const Index = () => {
  const [active, setActive] = useState<DriverId>("ironmike");
  const driver = drivers.find((d) => d.id === active)!;

  return (
    <div className="min-h-screen w-full">
      {/* Double-Bar Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl">
        {/* Top Bar — Logo */}
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

        {/* Second Bar — CTA "Big Boys" */}
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

      {/* Spacer for fixed header */}
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
                    <span>4/5 AI PREDICT <span className="text-win">RAIDERS +3.5</span></span>
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

        {/* Driver Switcher */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">AI INFLUENCER CARDS</h2>
            <span className="hud-chip">{drivers.length} drivers online</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {drivers.map((d) => {
              const isActive = d.id === active;
              return (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={cn(
                    "group relative rounded-lg overflow-hidden border transition-all text-left",
                    "aspect-[4/5] sm:aspect-[3/4]",
                    isActive
                      ? "border-hud shadow-[0_0_24px_hsl(var(--hud)/0.45)] scale-[1.02]"
                      : "border-border hover:border-hud/60"
                  )}
                >
                  <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                  <div className="absolute top-1.5 right-1.5">
                    <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-mono border", statusColor[d.status])}>
                      {d.status}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <div className="font-bold text-[11px] sm:text-xs leading-tight text-foreground">{d.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-muted-foreground font-mono uppercase">{d.league}</div>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 ring-1 ring-inset ring-hud pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Stage */}
        <section className="mt-6 grid lg:grid-cols-5 gap-4">
          {/* Portrait */}
          <div className="lg:col-span-3 hud-panel border border-hud/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
              <div className="flex items-center gap-2">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-hud">DRIVER ONLINE</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{driver.tag}</span>
            </div>
            <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden">
              <img src={driver.image} alt={driver.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              {/* HUD overlays */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="hud-chip"><ShieldCheck className="h-3 w-3" /> verified analyst</span>
                <span className="hud-chip"><Zap className="h-3 w-3" /> {driver.league}</span>
              </div>
              <button className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-hud/20 border border-hud/60 backdrop-blur-sm hover:bg-hud/30 transition">
                <Play className="h-4 w-4 text-hud fill-hud" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">{driver.name}</div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">current pick · <span className="text-win">{driver.pick}</span></div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 divide-x divide-border border-t border-hud/20">
              {[
                { label: "30-day win%", value: driver.winPct, icon: TrendingUp },
                { label: "30-day record", value: driver.record, icon: BarChart3 },
                { label: "units won", value: driver.units, icon: Flame },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <s.icon className="h-3 w-3" /> {s.label}
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-win font-mono">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Feed */}
          <aside className="lg:col-span-2 hud-panel border border-hud/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
              <span className="font-mono text-[10px] tracking-[0.3em] text-hud">TELEMETRY FEED</span>
              <span className="font-mono text-[10px] text-muted-foreground">live · srt-92</span>
            </div>
            <ul className="flex-1 divide-y divide-border/50 font-mono text-xs">
              {driver.ticker.map((line, i) => (
                <li key={i} className="px-4 py-2.5 flex items-start gap-2 hover:bg-secondary/50 transition">
                  <span className="text-hud mt-0.5">›</span>
                  <span className="text-foreground/90">{line}</span>
                </li>
              ))}
              <li className="px-4 py-2.5 flex items-start gap-2 text-muted-foreground">
                <span className="text-hud mt-0.5">›</span>
                <span>signal lock · awaiting next packet…</span>
              </li>
            </ul>

            {/* Funnel CTA — drives clicks back to header partners */}
            <div className="p-3 border-t border-hud/30 bg-gradient-to-b from-transparent to-secondary/60 space-y-2">
              <Button
                size="lg"
                className="w-full font-bold tracking-wider uppercase text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                tap to play this parlay <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                routes to your sportsbook ↑
              </p>
            </div>
          </aside>
        </section>

        {/* Secondary funnel push */}
        <section className="mt-8 hud-panel border border-primary/30 p-5 sm:p-6 text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-hud mb-2">SYNDICATE EDGE</div>
          <h3 className="text-xl sm:text-2xl font-bold mb-1">join the consensus. fade the public.</h3>
          <p className="text-sm text-muted-foreground mb-4">5 ai drivers · 1 verified edge · zero noise.</p>
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
