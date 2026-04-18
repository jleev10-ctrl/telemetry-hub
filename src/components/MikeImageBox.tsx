import { useState, useRef, useEffect } from "react";
import { Radio, RefreshCw, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MIKE_SCENES, MIKE_QUOTES } from "@/data/mikeScenes";

interface MikeImageBoxProps {
  name: string;
  league: string;
  tag: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";
  tap: number;
  onTap: () => void;
  speaking: boolean;
  spokenWords: number;
  meterTick: number;
}

const statusColor: Record<MikeImageBoxProps["status"], string> = {
  HOT: "text-hot border-hot/40 bg-hot/10",
  COOLDOWN: "text-hud border-hud/40 bg-hud/10",
  LEADER: "text-win border-win/40 bg-win/10",
  VERIFIED: "text-win border-win/40 bg-win/10",
};

export const MikeImageBox = ({
  name, league, tag, status, tap, onTap, speaking, spokenWords, meterTick,
}: MikeImageBoxProps) => {
  const sceneIndex = tap === 0 ? 0 : tap % MIKE_SCENES.length;
  const quoteIndex = tap === 0 ? 0 : (tap - 1) % MIKE_QUOTES.length;
  const currentPrompt = tap === 0 ? "" : MIKE_QUOTES[quoteIndex];
  const promptWords = currentPrompt ? currentPrompt.split(/\s+/) : [];
  const revealedCaption = speaking ? promptWords.slice(0, spokenWords).join(" ") : currentPrompt;

  const ctaLabel =
    tap === 0 ? "tap to engage driver" :
    tap === 1 ? "tap to refresh telemetry" :
    "tap mike for next call";
  const CtaIcon = tap === 0 ? Radio : RefreshCw;

  return (
    <div className="relative">
      {/* Outer glow layer — paints OUTSIDE the box, unaffected by transform/overflow clipping */}
      <div
        key={speaking ? `glow-${meterTick}` : "glow-idle"}
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-6 sm:-inset-8 rounded-2xl",
          "bg-[radial-gradient(ellipse_at_center,hsl(var(--win)/0.55),hsl(var(--win)/0.15)_45%,transparent_70%)]",
          speaking ? "opacity-100" : tap >= 1 ? "opacity-30" : "opacity-0",
          "transition-opacity duration-300"
        )}
        style={speaking ? { animation: "mike-glow-burst 520ms ease-out forwards" } : undefined}
      />
      <div
        className={cn(
          "hud-panel border transition-all relative rounded-md",
          tap >= 1 ? "border-win/60" : "border-hud/30"
        )}
      >
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
        <div className="flex items-center gap-2">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud">DRIVER ONLINE</span>
        </div>
        <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-mono border", statusColor[status])}>
          {status}
        </span>
      </div>

      {/* Hero portrait */}
      <div
        role="button"
        tabIndex={0}
        onClick={onTap}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTap(); } }}
        className="group relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden cursor-pointer outline-none bg-background transition-shadow duration-500"
      >
        {MIKE_SCENES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={name}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
              i === sceneIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="hud-chip"><Zap className="h-3 w-3" /> {league}</span>
        </div>

        {speaking && currentPrompt && (
          <div className="absolute top-3 right-3 animate-fade-in">
            <div className="hud-chip border-win/60 text-win">
              <Radio className="h-3 w-3 animate-pulse" />
              live · speaking
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">{name}</div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{tag}</div>

          {(speaking || (tap > 0 && currentPrompt)) && (
            <div className="mt-3 animate-fade-in">
              <div className="flex items-end gap-1 mb-1.5 h-5">
                {[...Array(24)].map((_, i) => {
                  const center = 11.5;
                  const distance = Math.abs(i - center);
                  const bell = Math.max(0.25, 1 - distance / 14);
                  const burst = speaking ? 4 + bell * (10 + ((meterTick * 7 + i * 13) % 11)) : 3;
                  return (
                    <span
                      key={i}
                      className="block w-0.5 bg-win rounded-full transition-[height,opacity] duration-200 ease-out"
                      style={{ height: `${burst}px`, opacity: speaking ? 0.7 + bell * 0.3 : 0.3 }}
                    />
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-win/90 italic min-h-[1.25rem]">
                "{revealedCaption}
                {speaking && spokenWords < promptWords.length && (
                  <span className="inline-block w-1.5 h-3 ml-0.5 bg-win align-middle animate-pulse" />
                )}
                {!speaking && '"'}
                {speaking && spokenWords >= promptWords.length && '"'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tap CTA — directly under image */}
      <div className="p-3 border-t border-hud/20 bg-gradient-to-b from-transparent to-secondary/60">
        <Button
          onClick={onTap}
          size="lg"
          className="w-full font-bold tracking-wider uppercase text-sm shadow-[0_0_30px_hsl(var(--win)/0.35)] bg-gradient-to-r from-win to-accent text-primary-foreground hover:opacity-90"
        >
          <CtaIcon className={cn("mr-2 h-4 w-4", speaking && "animate-pulse")} />
          {ctaLabel}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        {tap > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="font-mono text-[9px] tracking-[0.3em] text-hud uppercase">
              call {tap} · scene {sceneIndex + 1}/{MIKE_SCENES.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
