import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DriverCard, type DriverData } from "@/components/DriverCard";
import { JoinModal } from "@/components/JoinModal";
import ironmike from "@/assets/ironmike.jpg";

const mike: DriverData = {
  id: "ironmike",
  name: 'iron "mike" k.',
  league: "NFL",
  tag: "professional · analytic",
  image: ironmike,
  record: "22-8",
  winPct: "73%",
  units: "+18.5u",
  status: "HOT",
  voicePrompt1: "board's loaded. raiders are the play. let's ride.",
  voicePrompt2: "telemetry refreshed. sharp money confirms. green light.",
  games: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3.5", odds: "-110", confidence: 92 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-105", confidence: 78 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6", odds: "-115", confidence: 71 },
  ],
  gamesV2: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3", odds: "-108", confidence: 94 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-110", confidence: 81 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6.5", odds: "-110", confidence: 73 },
  ],
};

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
  { name: "bet365", slug: "bet365", url: "https://www.bet365.com/", color: "from-[hsl(50_90%_50%)] to-[hsl(45_90%_38%)]" },
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

const Index = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      {/* Sticky Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl">
        <div className="border-b border-border/60 bg-background/85">
          <div className="mx-auto w-full max-w-2xl grid grid-cols-[auto_1fr_auto] items-center gap-2 h-16 px-4">
            <a
              href="/"
              aria-label="Back to home"
              className="relative h-10 grid place-items-center rounded-md hud-panel px-1.5 hover:brightness-125 transition"
            >
              <span className="font-mono text-xl font-black tracking-tighter text-[hsl(45_100%_55%)] drop-shadow-[0_0_6px_hsl(45_100%_55%/0.7)] leading-none">
                $$$
              </span>
            </a>
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

        {/* Partners sub-header */}
        <div className="border-b border-border/60 bg-secondary/70">
          <div className="mx-auto flex w-full max-w-full items-center justify-center flex-wrap gap-1.5 py-1.5 px-2">
            <span className="w-full text-center font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase pb-0.5">
              partners
            </span>
            {sportsbooks.map((b) => (
              <a
                key={b.name}
                href={withUtm(b.url, b.slug, "header_strip")}
                target="_blank"
                rel="sponsored noopener noreferrer"
                data-book={b.slug}
                className={cn(
                  "shrink-0 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground",
                  "bg-gradient-to-b shadow-md shadow-black/40",
                  b.color
                )}
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="h-[132px]" />

      <main className="container max-w-2xl px-1 sm:px-4 pb-24 space-y-4">
        {/* MIKE — proportional scale-down on phones; padding gives the outer glow room to bleed */}
        <div className="origin-top scale-[0.82] sm:scale-100 -mb-[18%] sm:mb-0 px-6 sm:px-0">
          <DriverCard driver={mike} onFreeze={() => {}} />
        </div>

        {/* NFL SCORES BOX */}
        <section className="hud-panel border border-hud/30 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">nfl · scores</span>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            live board loading…
          </p>
        </section>

        {/* BETS BOX */}
        <section className="hud-panel border border-hud/30 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">bets</span>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            mike's slate locks soon…
          </p>
        </section>

        {/* BACK TO HOME BOX */}
        <a
          href="/"
          className="block hud-panel border border-hud/30 px-4 py-3 text-center hover:brightness-125 transition"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-hud uppercase">← back to home</span>
        </a>
      </main>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default Index;
