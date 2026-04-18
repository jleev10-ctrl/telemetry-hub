import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DriverCard, type DriverData } from "@/components/DriverCard";
import { NflScoreboard } from "@/components/NflScoreboard";
import { CoversTable } from "@/components/CoversTable";
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
    { matchup: "Bills @ Dolphins",  pick: "OVER 48.5",   odds: "-105", confidence: 78 },
    { matchup: "49ers @ Seahawks",  pick: "49ERS -6",    odds: "-115", confidence: 71 },
  ],
  gamesV2: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3",   odds: "-108", confidence: 94 },
    { matchup: "Bills @ Dolphins",  pick: "OVER 48.5",   odds: "-110", confidence: 81 },
    { matchup: "49ers @ Seahawks",  pick: "49ERS -6.5",  odds: "-110", confidence: 73 },
  ],
};

const Mike = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Minimal sandbox header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/60 bg-background/85">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.25em] text-hud uppercase hover:text-win transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            back
          </Link>
          <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            mike · sandbox
          </span>
          <span className="w-12" />
        </div>
      </header>

      <main className="container max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          {/* Mike — big, focused */}
          <div className="lg:row-span-2">
            <DriverCard driver={mike} onFreeze={() => {}} />
          </div>

          {/* Right column: scoreboard + covers */}
          <div className="space-y-4">
            <NflScoreboard />
            <CoversTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mike;
