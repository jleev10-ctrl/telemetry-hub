import { Link } from "react-router-dom";
import { useState } from "react";
import { Zap, ChevronRight } from "lucide-react";
import { JoinModal } from "@/components/JoinModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ironmike from "@/assets/ironmike.jpg";
import swoosh from "@/assets/swoosh.jpg";
import sarah from "@/assets/sarah.jpg";
import mlb from "@/assets/mlb.jpg";
import nhl from "@/assets/nhl.jpg";

interface Driver {
  slug: string;
  name: string;
  league: string;
  tag: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";
  record: string;
  winPct: string;
  units: string;
  image: string;
}

const drivers: Driver[] = [
  { slug: "mike",       name: 'iron "mike" k.',           league: "NFL", tag: "professional · analytic", status: "HOT",      record: "22-8",  winPct: "73%", units: "+18.5u", image: ironmike },
  { slug: "swoosh",     name: '"swoosh" d. james',        league: "NBA", tag: "hardwood · sharp",        status: "HOT",      record: "19-6",  winPct: "76%", units: "+21u",   image: swoosh },
  { slug: "sarah",      name: '"stats" sarah',            league: "MLB", tag: "clinical · quant",        status: "VERIFIED", record: "22-6",  winPct: "79%", units: "+18u",   image: sarah },
  { slug: "baseburner", name: 'rick "the baseburner" b.', league: "MLB", tag: "diamond · power",         status: "LEADER",   record: "24-10", winPct: "71%", units: "+29.5u", image: mlb },
  { slug: "tommy",      name: 'tommy "the mask" c.',      league: "NHL", tag: "ice & pucks",             status: "COOLDOWN", record: "21-10", winPct: "68%", units: "+22.5u", image: nhl },
];

const statusColor: Record<Driver["status"], string> = {
  HOT: "text-hot border-hot/40 bg-hot/10",
  COOLDOWN: "text-hud border-hud/40 bg-hud/10",
  LEADER: "text-win border-win/40 bg-win/10",
  VERIFIED: "text-win border-win/40 bg-win/10",
};

const Home = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      {/* Sticky Header — same as Mike bucket */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl">
        <div className="border-b border-border/60 bg-background/85">
          <div className="mx-auto w-full max-w-2xl grid grid-cols-[auto_1fr_auto] items-center gap-2 h-16 px-4">
            <Link
              to="/"
              aria-label="Home"
              className="relative h-10 grid place-items-center rounded-md hud-panel px-1.5 hover:brightness-125 transition"
            >
              <span className="font-mono text-xl font-black tracking-tighter text-[hsl(45_100%_55%)] drop-shadow-[0_0_6px_hsl(45_100%_55%/0.7)] leading-none">
                $$$
              </span>
            </Link>
            <div className="leading-none text-center min-w-0 flex justify-center">
              <div className="inline-flex flex-col items-center rounded-md border-2 border-[hsl(45_100%_55%)] bg-gradient-to-b from-[hsl(45_100%_55%/0.15)] to-[hsl(45_100%_45%/0.05)] px-3 py-1.5 shadow-[0_0_18px_hsl(45_100%_55%/0.45),inset_0_0_12px_hsl(45_100%_55%/0.15)]">
                <div className="font-mono text-base sm:text-lg font-black tracking-[0.3em] text-[hsl(45_100%_60%)] drop-shadow-[0_0_8px_hsl(45_100%_55%/0.8)]">
                  GRAND<span className="ml-1.5 text-win drop-shadow-[0_0_8px_hsl(var(--win)/0.7)]">13</span>
                </div>
                <div className="mt-0.5 font-mono text-[8px] tracking-[0.3em] text-[hsl(45_100%_70%)]/80 uppercase">
                  the sports syndicate
                </div>
              </div>
            </div>
            <Button
              onClick={() => setJoinOpen(true)}
              size="sm"
              className="h-10 px-3 mr-1 flex flex-col items-center justify-center gap-0 leading-none font-bold uppercase tracking-widest text-[11px] bg-gradient-to-b from-[hsl(45_100%_60%)] to-[hsl(40_95%_45%)] text-background border border-[hsl(45_100%_70%)] shadow-[0_0_18px_hsl(45_100%_55%/0.55)]"
            >
              <span>join</span>
              <span className="text-[8px] tracking-[0.25em] opacity-90">free</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="h-[68px]" />

      <main className="container max-w-2xl px-1 sm:px-4 pb-24 space-y-4 pt-4">
        <div className="px-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">the syndicate · driver lineup</div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase mt-1">tap a driver to enter their bucket</div>
        </div>

        {drivers.map((d) => (
          <Link
            key={d.slug}
            to={`/drivers/${d.slug}`}
            className="block group hud-panel border border-hud/30 rounded-md overflow-hidden hover:border-win/60 hover:shadow-[0_0_40px_hsl(var(--win)/0.25)] transition-all"
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
              <div className="flex items-center gap-2">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-hud">DRIVER ONLINE</span>
              </div>
              <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-mono border", statusColor[d.status])}>
                {d.status}
              </span>
            </div>

            {/* Hero portrait */}
            <div className="relative aspect-[16/10] overflow-hidden bg-background">
              <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="hud-chip"><Zap className="h-3 w-3" /> {d.league}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{d.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{d.tag}</div>
                <div className="flex items-center gap-3 mt-2 font-mono text-[10px] tracking-widest">
                  <span className="text-win">{d.winPct} <span className="text-muted-foreground">win</span></span>
                  <span className="text-win">{d.record} <span className="text-muted-foreground">rec</span></span>
                  <span className="text-[hsl(45_100%_60%)]">{d.units}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-3 border-t border-hud/20 bg-gradient-to-b from-transparent to-secondary/60">
              <div className="w-full font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-1 py-2 rounded bg-gradient-to-r from-win to-accent text-primary-foreground shadow-[0_0_30px_hsl(var(--win)/0.35)] group-hover:opacity-90">
                enter {d.slug}'s bucket
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </main>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default Home;
