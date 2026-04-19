import { Link } from "react-router-dom";
import { useState } from "react";
import { JoinModal } from "@/components/JoinModal";
import { InfluencerGrid } from "@/components/InfluencerGrid";
import { PartnersBar } from "@/components/PartnersBar";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
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

      <main className="container max-w-2xl px-1 sm:px-4 pb-24">
        <InfluencerGrid />
      </main>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default Home;
