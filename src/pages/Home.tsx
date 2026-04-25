import { Link } from "react-router-dom";
import { useState } from "react";
import { JoinModal } from "@/components/JoinModal";
import { InfluencerGrid } from "@/components/InfluencerGrid";
import { PartnersNode } from "@/components/PartnersNode";
import { TickersNode } from "@/components/TickersNode";
import { CasinoPartners } from "@/components/CasinoPartners";
import { Grand13Hero } from "@/components/Grand13Hero";
import { LegalNode } from "@/components/LegalNode";
import { ChromeBevel } from "@/components/ChromeBevel";
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
              {/* Top dome strip — brighter brushed-steel sensor bar */}
              <div
                className="relative h-3 w-full"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(210 22% 62%) 0%, hsl(212 18% 38%) 35%, hsl(215 16% 20%) 75%, hsl(215 18% 12%) 100%)",
                  boxShadow:
                    "inset 0 1px 0 hsl(0 0% 100% / 0.55), inset 0 -1px 0 hsl(0 0% 0% / 0.7)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-10 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.85), transparent)",
                  }}
                />
              </div>
              <div
                className="relative border-b-2 border-[hsl(var(--hud)/0.45)]"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(215 18% 28%) 0%, hsl(215 16% 14%) 55%, hsl(215 18% 20%) 100%)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-x-4 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.7) 50%, transparent 100%)",
                  }}
                />
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 h-[74px] px-3">
                  {/* LEFT POD */}
                  <Link
                    to="/"
                    aria-label="Home"
                    className="group relative h-14 w-[92px] hover:brightness-110 transition"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 55%, 60% 100%, 0 100%)",
                    }}
                  >
                    {/* outer brushed-chrome rim */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(210 18% 78%) 0%, hsl(212 14% 55%) 30%, hsl(215 12% 32%) 70%, hsl(215 14% 18%) 100%)",
                      }}
                    />
                    {/* inner inset face */}
                    <div
                      className="absolute inset-[2px]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 55%, 60% 100%, 0 100%)",
                        background:
                          "linear-gradient(180deg, hsl(215 16% 22%) 0%, hsl(215 20% 10%) 100%)",
                        boxShadow:
                          "inset 0 1px 0 hsl(0 0% 100% / 0.25), inset 0 -1px 2px hsl(0 0% 0% / 0.85), inset 0 0 16px hsl(var(--hud) / 0.22)",
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-x-2 top-[3px] h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.7), transparent)",
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center gap-0.5">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3.5 w-3.5 text-[hsl(var(--hud))] drop-shadow-[0_0_4px_hsl(var(--hud)/0.7)]" />
                        <span className="font-mono text-base font-black tracking-tight text-[hsl(45_100%_55%)] drop-shadow-[0_0_5px_hsl(45_100%_55%/0.8)] leading-none">
                          $$$
                        </span>
                      </div>
                      <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-foreground/85 uppercase leading-none">
                        Home
                      </span>
                    </div>
                  </Link>

                  {/* CENTER WORDMARK */}
                  <Link
                    to="/"
                    aria-label="Synthetic Syndicate home"
                    className="leading-none text-center min-w-0 flex justify-stretch hover:brightness-110 transition"
                  >
                    <ChromeBevel
                      tone="steel"
                      radius={12}
                      rimWidth={3}
                      className="w-full"
                      innerClassName="flex flex-col items-center justify-center px-3 py-2"
                    >
                      <div className="font-mono text-[16px] sm:text-xl font-black tracking-[0.26em] text-foreground drop-shadow-[0_1px_0_hsl(0_0%_0%/0.95)] leading-none">
                        SYNTHETIC
                      </div>
                      <div className="mt-1 font-mono text-[16px] sm:text-xl font-black tracking-[0.26em] text-[hsl(var(--hud))] drop-shadow-[0_0_10px_hsl(var(--hud)/0.7)] leading-none">
                        SYNDICATE
                      </div>
                    </ChromeBevel>
                  </Link>

                  {/* RIGHT POD */}
                  <button
                    type="button"
                    onClick={() => setJoinOpen(true)}
                    aria-label="Account / Join Free"
                    className="group relative h-14 w-[92px] hover:brightness-110 transition"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 40% 100%, 0 55%)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(210 18% 78%) 0%, hsl(212 14% 55%) 30%, hsl(215 12% 32%) 70%, hsl(215 14% 18%) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-[2px]"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 100%, 40% 100%, 0 55%)",
                        background:
                          "linear-gradient(180deg, hsl(215 16% 22%) 0%, hsl(215 20% 10%) 100%)",
                        boxShadow:
                          "inset 0 1px 0 hsl(0 0% 100% / 0.25), inset 0 -1px 2px hsl(0 0% 0% / 0.85), inset 0 0 16px hsl(var(--hud) / 0.22)",
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-x-2 top-[3px] h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.7), transparent)",
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center gap-0.5">
                      <User className="h-4 w-4 text-[hsl(var(--hud))] drop-shadow-[0_0_5px_hsl(var(--hud)/0.7)]" />
                      <span className="font-mono text-[8px] font-bold tracking-[0.25em] text-foreground/85 uppercase leading-none">
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
              <CasinoPartners />
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
