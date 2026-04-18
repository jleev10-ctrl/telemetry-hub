import { useState, useRef, useEffect } from "react";
import { ChevronRight, Radio, RefreshCw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MIKE_SCENES, MIKE_QUOTES } from "@/data/mikeScenes";

export interface Game {
  matchup: string;
  pick: string;
  odds: string;
  confidence: number;
}

export interface DriverData {
  id: string;
  name: string;
  league: string;
  tag: string;
  image: string;
  record: string;
  winPct: string;
  units: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";
  games: Game[];
  gamesV2: Game[];
  voicePrompt1: string;
  voicePrompt2: string;
}

const statusColor: Record<DriverData["status"], string> = {
  HOT: "text-hot border-hot/40 bg-hot/10",
  COOLDOWN: "text-hud border-hud/40 bg-hud/10",
  LEADER: "text-win border-win/40 bg-win/10",
  VERIFIED: "text-win border-win/40 bg-win/10",
};

interface DriverCardProps {
  driver: DriverData;
  onFreeze: () => void;
  onEngage?: () => void;
}

export const DriverCard = ({ driver, onFreeze, onEngage }: DriverCardProps) => {
  // tap counter — infinite. Cycles through MIKE_SCENES / MIKE_QUOTES via modulo.
  const [tap, setTap] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [spokenWords, setSpokenWords] = useState(0); // count of words spoken so far
  const [meterTick, setMeterTick] = useState(0); // bumps on each word boundary (real or synthetic)
  const ref = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<number | null>(null);
  const fallbackArmedRef = useRef<number | null>(null);
  const sawBoundaryRef = useRef(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const sceneIndex = tap === 0 ? 0 : tap % MIKE_SCENES.length;
  const quoteIndex = tap === 0 ? 0 : (tap - 1) % MIKE_QUOTES.length;
  const currentPrompt = tap === 0 ? "" : MIKE_QUOTES[quoteIndex];

  // Word-by-word caption reveal driven by real OR synthetic word ticks
  const promptWords = currentPrompt ? currentPrompt.split(/\s+/) : [];
  const revealedCaption = speaking
    ? promptWords.slice(0, spokenWords).join(" ")
    : currentPrompt;

  // Pick a deeper male English voice once available (helps Mike sound the part)
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const preferred = [
        /Daniel/i, /Alex/i, /Fred/i, /Aaron/i, /Arthur/i,
        /Google UK English Male/i, /Microsoft.*(David|Guy|Mark)/i,
      ];
      for (const re of preferred) {
        const match = voices.find((v) => re.test(v.name) && /en[-_]/i.test(v.lang));
        if (match) { voiceRef.current = match; return; }
      }
      voiceRef.current = voices.find((v) => /en[-_]/i.test(v.lang)) ?? voices[0];
    };
    pick();
    window.speechSynthesis.addEventListener?.("voiceschanged", pick);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", pick);
  }, []);

  const clearSyntheticTicker = () => {
    if (tickerRef.current !== null) {
      window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
    if (fallbackArmedRef.current !== null) {
      window.clearTimeout(fallbackArmedRef.current);
      fallbackArmedRef.current = null;
    }
  };

  // Cleanup any in-flight speech / timers on unmount
  useEffect(() => {
    return () => {
      clearSyntheticTicker();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
      }
    };
  }, []);

  const startSyntheticTicker = (totalWords: number, estDurationMs: number) => {
    clearSyntheticTicker();
    if (totalWords <= 0) return;
    const interval = Math.max(160, Math.round(estDurationMs / totalWords));
    let i = 0;
    tickerRef.current = window.setInterval(() => {
      i += 1;
      setSpokenWords((n) => Math.min(totalWords, n + 1));
      setMeterTick((n) => n + 1);
      if (i >= totalWords) {
        clearSyntheticTicker();
        setSpeaking(false);
      }
    }, interval);
  };

  const handleTap = () => {
    const next = tap + 1;
    setTap(next);
    if (tap === 0) onEngage?.();
    if (next === 3) onFreeze();

    const quote = MIKE_QUOTES[(next - 1) % MIKE_QUOTES.length];
    const totalWords = quote.split(/\s+/).length;
    const estDurationMs = totalWords * 360;

    // Reset + arm visuals IMMEDIATELY (don't wait for onstart — iOS silent mode never fires it)
    clearSyntheticTicker();
    setSpokenWords(0);
    setMeterTick(0);
    setSpeaking(true);
    sawBoundaryRef.current = false;

    // Start synthetic ticker right away — real boundaries (if any) will cancel it
    startSyntheticTicker(totalWords, estDurationMs);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();

        const u = new SpeechSynthesisUtterance(quote);
        if (voiceRef.current) u.voice = voiceRef.current;
        u.rate = 0.95;
        u.pitch = 0.7;
        u.volume = 1;

        u.onboundary = (e) => {
          if (e.name === "word" || e.name === undefined) {
            if (!sawBoundaryRef.current) {
              // Real boundaries arrived — kill the synthetic ticker, take over
              sawBoundaryRef.current = true;
              clearSyntheticTicker();
              // Reset to current word position so we don't double-count
              setSpokenWords(0);
            }
            setSpokenWords((n) => Math.min(totalWords, n + 1));
            setMeterTick((n) => n + 1);
          }
        };
        const stop = () => {
          // Only stop visuals if real speech ended AND we were following real events
          if (sawBoundaryRef.current) {
            clearSyntheticTicker();
            setSpeaking(false);
            setSpokenWords(totalWords);
          }
          // Otherwise let the synthetic ticker finish on its own clock
        };
        u.onend = stop;
        u.onerror = stop;

        window.speechSynthesis.speak(u);
      } catch {
        /* synthetic ticker is already running, visuals are covered */
      }
    }
  };

  useEffect(() => {
    if (tap === 1 && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [tap]);

  const games = tap >= 2 ? driver.gamesV2 : driver.games;

  const ctaLabel =
    tap === 0 ? "tap to engage driver" :
    tap === 1 ? "tap to refresh telemetry" :
    "tap mike for next call";

  const CtaIcon = tap === 0 ? Radio : RefreshCw;

  return (
    <div
      ref={ref}
      className={cn(
        "hud-panel border overflow-hidden transition-all relative",
        tap >= 1 ? "border-win/60 shadow-[0_0_40px_hsl(var(--win)/0.35)]" : "border-hud/30",
        speaking && "shadow-[0_0_70px_hsl(var(--win)/0.55),0_0_140px_hsl(var(--win)/0.25)]"
      )}
    >
      {/* Outer aura removed — was being clipped by overflow-hidden parent.
          Real flash now lives inside the hero portrait below. */}
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hud/20 bg-secondary/40">
        <div className="flex items-center gap-2">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-win" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud">DRIVER ONLINE</span>
        </div>
        <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-mono border", statusColor[driver.status])}>
          {driver.status}
        </span>
      </div>

      {/* Hero portrait */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap();
          }
        }}
        className={cn(
          "group relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden cursor-pointer outline-none bg-background",
          "transition-shadow duration-500",
          "hover:shadow-[inset_0_0_60px_hsl(var(--win)/0.35)]",
          "focus-visible:shadow-[inset_0_0_60px_hsl(var(--win)/0.5)]",
          tap >= 1 && "shadow-[inset_0_0_90px_hsl(var(--win)/0.45),0_0_50px_hsl(var(--gold,45_95%_55%)/0.35)]",
          speaking && "shadow-[inset_0_0_110px_hsl(var(--win)/0.6)]"
        )}
      >
        {/* Voice flash — bright color overlay that pops + decays on each word.
            Lives INSIDE the hero (overflow-hidden won't clip it here). Opacity-only animation. */}
        {speaking && (
          <div
            key={`flash-${meterTick}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[15] mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--win) / 0.6) 0%, hsl(var(--win) / 0.25) 45%, transparent 75%)",
              animation: "mike-flash 420ms ease-out forwards",
            }}
          />
        )}
        {/* Steady speaking glow — always-on under the per-word flash */}
        {speaking && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[14]"
            style={{ boxShadow: "inset 0 0 90px hsl(var(--win) / 0.5)" }}
          />
        )}
        {/* Crossfade stack — render every scene, fade only the active one */}
        {MIKE_SCENES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={driver.name}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
              i === sceneIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="hud-chip"><Zap className="h-3 w-3" /> {driver.league}</span>
        </div>

        {/* Voice prompt visual */}
        {speaking && currentPrompt && (
          <div className="absolute top-3 right-3 animate-fade-in">
            <div className="hud-chip border-win/60 text-win">
              <Radio className="h-3 w-3 animate-pulse" />
              live · speaking
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">{driver.name}</div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
            {driver.tag}
          </div>

          {(speaking || (tap > 0 && currentPrompt)) && (
            <div className="mt-3 animate-fade-in">
              <div className="flex items-end gap-1 mb-1.5 h-5">
                {[...Array(24)].map((_, i) => {
                  // Each word boundary bumps meterTick → bars burst, then decay via CSS transition.
                  // Center bars react harder than edges (bell curve) for a natural meter feel.
                  const center = 11.5;
                  const distance = Math.abs(i - center);
                  const bell = Math.max(0.25, 1 - distance / 14);
                  const burst = speaking
                    ? 4 + bell * (10 + ((meterTick * 7 + i * 13) % 11))
                    : 3;
                  return (
                    <span
                      key={i}
                      className="block w-0.5 bg-win rounded-full transition-[height,opacity] duration-200 ease-out"
                      style={{
                        height: `${burst}px`,
                        opacity: speaking ? 0.7 + bell * 0.3 : 0.3,
                      }}
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

      {/* Live ticker — directly under hero, only after engagement */}
      {tap >= 1 && (
        <div className="border-t border-hud/20 bg-background/60 overflow-hidden animate-fade-in">
          <div className="flex items-center">
            <div className="px-2.5 py-1 border-r border-hud/30 bg-secondary/60 shrink-0">
              <span className="font-mono text-[9px] tracking-[0.25em] text-win">MIKE</span>
            </div>
            <div className="relative flex-1 overflow-hidden py-1">
              <div className="ticker flex gap-8 whitespace-nowrap font-mono text-[10px] text-foreground/80 pl-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    <span>SHARP $ <span className="text-win">78% DAL</span></span>
                    <span>LINE <span className="text-hud">-3 → -2.5</span></span>
                    <span><span className="text-hot">STEAM ALERT</span> · DAL ML</span>
                    <span>HANDLE <span className="text-win">62%</span> · TICKETS <span className="text-hud">71%</span></span>
                    <span>MIKE'S CALL: <span className="text-[hsl(45_100%_60%)]">RIDE IT</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat strip */}
      <div className="grid grid-cols-3 divide-x divide-border border-t border-hud/20">
        {[
          { label: "win%", value: driver.winPct },
          { label: "record", value: driver.record },
          { label: "units", value: driver.units },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-0.5 text-lg font-bold text-win font-mono">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Slide-out game list */}
      {tap >= 1 && (
        <div className="border-t border-hud/20 bg-secondary/30 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-2 border-b border-hud/10">
            <span className="font-mono text-[10px] tracking-[0.3em] text-hud">
              {tap >= 2 ? "TELEMETRY · REFRESHED" : "TODAY'S BOARD"}
            </span>
            {tap >= 2 && (
              <span className="flex items-center gap-1 font-mono text-[9px] text-win">
                <RefreshCw className="h-2.5 w-2.5" /> live
              </span>
            )}
          </div>
          <div className="divide-y divide-border/40">
            {games.map((g, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{g.matchup}</div>
                  <div className="font-mono text-[10px] text-win uppercase tracking-wider mt-0.5">
                    {g.pick} · {g.odds}
                  </div>
                </div>
                <div className="ml-3 shrink-0">
                  <div className="text-[9px] font-mono uppercase text-muted-foreground text-right">conf</div>
                  <div className="font-mono text-sm font-bold text-hud">{g.confidence}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="p-3 border-t border-hud/20 bg-gradient-to-b from-transparent to-secondary/60">
        <Button
          onClick={handleTap}
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
