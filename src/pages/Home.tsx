import { Link } from "react-router-dom";
import { useState } from "react";
import { JoinModal } from "@/components/JoinModal";
import { InfluencerGrid } from "@/components/InfluencerGrid";
import { PartnersNode } from "@/components/PartnersNode";
import { TickersNode } from "@/components/TickersNode";
import { Grand13Hero } from "@/components/Grand13Hero";
import { LegalNode } from "@/components/LegalNode";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Chrome Exoskeleton Wrapper */}
      <div className="mx-auto w-full max-w-2xl px-2 sm:px-3 py-3">
        <div
          className="relative rounded-[28px] p-[3px] shadow-[0_0_40px_hsl(var(--hud)/0.25),inset_0_0_2px_hsl(0_0%_100%/0.4)]"
          style={{
            background:
              "linear-gradient(145deg, hsl(220 15% 38%) 0%, hsl(220 12% 18%) 22%, hsl(220 10% 10%) 50%, hsl(220 12% 18%) 78%, hsl(220 15% 38%) 100%)",
          }}
        >
          {/* Corner rivets */}
          <span className="pointer-events-none absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.8)]" />
          <span className="pointer-events-none absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.8)]" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.8)]" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.8)]" />

          {/* Inner screen */}
          <div className="relative rounded-[24px] bg-background overflow-hidden border border-foreground/10">
            {/* Reskinned Header */}
            <header className="relative">
              <div
                className="border-b-2 border-[hsl(var(--hud)/0.35)]"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(220 14% 22%) 0%, hsl(220 14% 14%) 100%)",
                }}
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 h-16 px-3">
                  <Link
                    to="/"
                    aria-label="Live data"
                    className="relative h-11 px-3 grid place-items-center rounded-lg border border-[hsl(var(--hud)/0.5)] bg-gradient-to-b from-[hsl(220_14%_28%)] to-[hsl(220_14%_16%)] shadow-[inset_0_1px_0_hsl(0_0%_100%/0.15),0_2px_4px_hsl(0_0%_0%/0.4)] hover:brightness-125 transition"
                  >
                    <span className="font-mono text-lg font-black tracking-tighter text-[hsl(45_100%_55%)] drop-shadow-[0_0_6px_hsl(45_100%_55%/0.7)] leading-none">
                      $$$
                    </span>
                  </Link>
                  <Link
                    to="/"
                    aria-label="Synthetic Syndicate home"
                    className="leading-none text-center min-w-0 flex justify-stretch"
                  >
                    <div
                      className="w-full flex flex-col items-center justify-center rounded-lg border border-[hsl(var(--hud)/0.5)] px-2 py-1.5 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.12),0_2px_6px_hsl(0_0%_0%/0.5)] hover:brightness-125 transition"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(220_14%_24%) 0%, hsl(220_14%_12%) 100%)",
                      }}
                    >
                      <div className="font-mono text-[15px] sm:text-lg font-black tracking-[0.22em] text-foreground/95 drop-shadow-[0_0_8px_hsl(var(--hud)/0.6)] leading-none">
                        SYNTHETIC
                      </div>
                      <div className="mt-0.5 font-mono text-[15px] sm:text-lg font-black tracking-[0.22em] text-[hsl(var(--hud))] drop-shadow-[0_0_8px_hsl(var(--hud)/0.7)] leading-none">
                        SYNDICATE
                      </div>
                    </div>
                  </Link>
                  <Button
                    onClick={() => setJoinOpen(true)}
                    size="sm"
                    aria-label="Account / Join Free"
                    className="h-11 w-11 p-0 grid place-items-center rounded-lg border border-[hsl(var(--hud)/0.5)] bg-gradient-to-b from-[hsl(220_14%_28%)] to-[hsl(220_14%_16%)] shadow-[inset_0_1px_0_hsl(0_0%_100%/0.15),0_2px_4px_hsl(0_0%_0%/0.4)] hover:brightness-125 transition"
                  >
                    <User className="h-5 w-5 text-[hsl(var(--hud))]" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Body — UNTOUCHED */}
            <main className="px-2.5 pb-6 pt-3 space-y-3">
              <PartnersNode />
              <TickersNode />
              <InfluencerGrid />
              <Grand13Hero />
              <PartnersNode />
              <LegalNode />
            </main>
          </div>
        </div>
      </div>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default Home;
