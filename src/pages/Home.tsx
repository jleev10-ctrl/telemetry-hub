import { Link } from "react-router-dom";
import { useState } from "react";
import { JoinModal } from "@/components/JoinModal";
import { InfluencerGrid } from "@/components/InfluencerGrid";
import { PartnersNode } from "@/components/PartnersNode";
import { TickersNode } from "@/components/TickersNode";
import { Grand13Hero } from "@/components/Grand13Hero";
import { LegalNode } from "@/components/LegalNode";
import { Button } from "@/components/ui/button";
import { User, BarChart3 } from "lucide-react";

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
            {/* Reskinned Header — brushed-steel tactical bezel */}
            <header className="relative">
              {/* Top dome strip — fake speaker/sensor bar */}
              <div
                className="h-2 w-full border-b border-foreground/10"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(215 18% 42%) 0%, hsl(215 16% 26%) 45%, hsl(215 14% 14%) 100%)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.25)",
                }}
              />
              <div
                className="relative border-b-2 border-[hsl(var(--hud)/0.4)]"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(215 16% 26%) 0%, hsl(215 14% 14%) 55%, hsl(215 16% 18%) 100%)",
                }}
              >
                {/* specular top highlight across whole bar */}
                <span
                  className="pointer-events-none absolute inset-x-6 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.55) 50%, transparent 100%)",
                  }}
                />
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 h-[68px] px-2.5">
                  {/* LEFT POD — angled chrome cartridge */}
                  <Link
                    to="/"
                    aria-label="Live data"
                    className="group relative h-12 w-[74px] hover:brightness-125 transition"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(215 18% 44%) 0%, hsl(215 16% 22%) 50%, hsl(215 14% 12%) 100%)",
                        boxShadow:
                          "inset 0 1px 0 hsl(0 0% 100% / 0.35), inset 0 -1px 0 hsl(0 0% 0% / 0.6)",
                      }}
                    />
                    <div
                      className="absolute inset-[2px]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%)",
                        background:
                          "linear-gradient(180deg, hsl(215 14% 18%) 0%, hsl(215 14% 10%) 100%)",
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center gap-0.5">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3 text-[hsl(var(--hud))]" />
                        <span className="font-mono text-sm font-black tracking-tight text-[hsl(45_100%_55%)] drop-shadow-[0_0_4px_hsl(45_100%_55%/0.7)] leading-none">
                          $$$
                        </span>
                      </div>
                      <span className="font-mono text-[7px] tracking-[0.2em] text-foreground/70 uppercase leading-none">
                        Live Data
                      </span>
                    </div>
                  </Link>

                  {/* CENTER WORDMARK — engraved chrome plate */}
                  <Link
                    to="/"
                    aria-label="Synthetic Syndicate home"
                    className="leading-none text-center min-w-0 flex justify-stretch hover:brightness-110 transition"
                  >
                    <div
                      className="relative w-full flex flex-col items-center justify-center rounded-md px-2 py-1.5"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(215 14% 10%) 0%, hsl(215 14% 16%) 100%)",
                        boxShadow:
                          "inset 0 2px 4px hsl(0 0% 0% / 0.7), inset 0 -1px 0 hsl(0 0% 100% / 0.08), 0 1px 0 hsl(0 0% 100% / 0.18)",
                        border: "1px solid hsl(215 20% 8%)",
                      }}
                    >
                      <span
                        className="pointer-events-none absolute inset-x-3 top-px h-px"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.35), transparent)",
                        }}
                      />
                      <div className="font-mono text-[15px] sm:text-lg font-black tracking-[0.24em] text-foreground/95 drop-shadow-[0_1px_0_hsl(0_0%_0%/0.9)] leading-none">
                        SYNTHETIC
                      </div>
                      <div className="mt-0.5 font-mono text-[15px] sm:text-lg font-black tracking-[0.24em] text-[hsl(var(--hud))] drop-shadow-[0_0_8px_hsl(var(--hud)/0.6)] leading-none">
                        SYNDICATE
                      </div>
                    </div>
                  </Link>

                  {/* RIGHT POD — mirrored angled chrome cartridge */}
                  <button
                    type="button"
                    onClick={() => setJoinOpen(true)}
                    aria-label="Account / Join Free"
                    className="group relative h-12 w-[74px] hover:brightness-125 transition"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 70%)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(215 18% 44%) 0%, hsl(215 16% 22%) 50%, hsl(215 14% 12%) 100%)",
                        boxShadow:
                          "inset 0 1px 0 hsl(0 0% 100% / 0.35), inset 0 -1px 0 hsl(0 0% 0% / 0.6)",
                      }}
                    />
                    <div
                      className="absolute inset-[2px]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 70%)",
                        background:
                          "linear-gradient(180deg, hsl(215 14% 18%) 0%, hsl(215 14% 10%) 100%)",
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center gap-0.5">
                      <User className="h-4 w-4 text-[hsl(var(--hud))] drop-shadow-[0_0_4px_hsl(var(--hud)/0.6)]" />
                      <span className="font-mono text-[7px] tracking-[0.2em] text-foreground/70 uppercase leading-none">
                        Account
                      </span>
                    </div>
                  </button>
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
