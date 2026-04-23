import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DriverImageBox } from "@/components/DriverImageBox";
import { DriverTelemetryBox } from "@/components/DriverTelemetryBox";
import { TodaysBoardBox } from "@/components/TodaysBoardBox";
import { JoinModal } from "@/components/JoinModal";
import { PartnersNode } from "@/components/PartnersNode";
import { LegalNode } from "@/components/LegalNode";
import { getDriver } from "@/data/drivers";

const statusBadge = (s: string) => {
  if (s === "WON") return "text-win border-win/40 bg-win/10";
  if (s === "LIVE") return "text-hot border-hot/40 bg-hot/10";
  return "text-hud border-hud/40 bg-hud/10";
};

const BucketPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const driver = getDriver(slug);

  const [joinOpen, setJoinOpen] = useState(false);
  const [tap, setTap] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [spokenWords, setSpokenWords] = useState(0);
  const [meterTick, setMeterTick] = useState(0);
  const tickerRef = useRef<number | null>(null);

  // Reset state on driver change so navigating between buckets stays clean
  useEffect(() => {
    setTap(0);
    setSpeaking(false);
    setSpokenWords(0);
    setMeterTick(0);
  }, [driver.slug]);

  const clearTicker = () => {
    if (tickerRef.current !== null) {
      window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  };

  useEffect(() => () => {
    clearTicker();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
  }, []);

  const startSyntheticTicker = (totalWords: number, estDurationMs: number) => {
    clearTicker();
    if (totalWords <= 0) return;
    const interval = Math.max(160, Math.round(estDurationMs / totalWords));
    let i = 0;
    tickerRef.current = window.setInterval(() => {
      i += 1;
      setSpokenWords((n) => Math.min(totalWords, n + 1));
      setMeterTick((n) => n + 1);
      if (i >= totalWords) {
        clearTicker();
        setSpeaking(false);
      }
    }, interval);
  };

  const handleTap = () => {
    const next = tap + 1;
    setTap(next);

    const quote = driver.quotes[(next - 1) % driver.quotes.length];
    const totalWords = quote.split(/\s+/).length;
    const estDurationMs = totalWords * 360;

    clearTicker();
    setSpokenWords(0);
    setMeterTick(0);
    setSpeaking(true);

    let usingSpeech = false;
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        synth.cancel();
        try { synth.resume(); } catch { /* ignore */ }

        const u = new SpeechSynthesisUtterance(quote);
        u.rate = driver.voice.rate;
        u.pitch = driver.voice.pitch;
        u.volume = 1;
        u.lang = "en-US";

        const voices = synth.getVoices();
        const enVoice =
          voices.find((v) => /en[-_]US/i.test(v.lang) && /male/i.test(v.name)) ||
          voices.find((v) => /en[-_]US/i.test(v.lang)) ||
          voices.find((v) => /^en/i.test(v.lang));
        if (enVoice) u.voice = enVoice;

        u.onboundary = (ev) => {
          if (ev.name === "word" || typeof ev.charIndex === "number") {
            setSpokenWords((n) => Math.min(totalWords, n + 1));
            setMeterTick((n) => n + 1);
          }
        };
        u.onend = () => setSpeaking(false);
        u.onerror = () => {
          setSpeaking(false);
          startSyntheticTicker(totalWords, estDurationMs);
        };
        synth.speak(u);
        usingSpeech = true;
      }
    } catch { /* ignore */ }

    if (!usingSpeech) startSyntheticTicker(totalWords, estDurationMs);
  };

  const games = tap >= 2 ? driver.gamesV2 : driver.games;

  return (
    <div className="min-h-screen w-full">
      {/* Sticky Header — identical to Home */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl">
        <div className="border-b border-border/60 bg-background/85">
          <div className="mx-auto w-full max-w-2xl grid grid-cols-[auto_1fr_auto] items-center gap-2 h-16 px-4">
            <Link
              to="/"
              aria-label="Back to home"
              className="relative h-10 grid place-items-center rounded-md hud-panel px-1.5 hover:brightness-125 transition"
            >
              <span className="font-mono text-xl font-black tracking-tighter text-[hsl(45_100%_55%)] drop-shadow-[0_0_6px_hsl(45_100%_55%/0.7)] leading-none">
                $$$
              </span>
            </Link>
            <Link
              to="/"
              aria-label="Grand13 home"
              className="leading-none text-center min-w-0 flex justify-stretch"
            >
              <div className="w-full flex flex-col items-center justify-center rounded-md border-2 border-[hsl(45_100%_55%)] bg-gradient-to-b from-[hsl(45_100%_55%/0.15)] to-[hsl(45_100%_45%/0.05)] px-2 py-1.5 shadow-[0_0_18px_hsl(45_100%_55%/0.45),inset_0_0_12px_hsl(45_100%_55%/0.15)] hover:brightness-125 transition">
                <div className="font-mono text-base sm:text-lg font-black tracking-[0.3em] text-[hsl(45_100%_60%)] drop-shadow-[0_0_8px_hsl(45_100%_55%/0.8)]">
                  GRAND<span className="ml-1.5 text-win drop-shadow-[0_0_8px_hsl(var(--win)/0.7)]">13</span>
                </div>
                <div className="mt-0.5 font-mono text-[8px] tracking-[0.3em] text-[hsl(45_100%_70%)]/80 uppercase">
                  the sports syndicate
                </div>
              </div>
            </Link>
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

      <main className="container max-w-2xl px-1 sm:px-4 pb-24 space-y-4">
        {/* DRIVER IMAGE BOX */}
        <div className="origin-top scale-[0.82] sm:scale-100 -mb-[18%] sm:mb-0 px-2 sm:px-0 overflow-visible">
          <DriverImageBox
            name={driver.name}
            league={driver.league}
            tag={driver.tag}
            status={driver.status}
            tap={tap}
            onTap={handleTap}
            speaking={speaking}
            spokenWords={spokenWords}
            meterTick={meterTick}
            scenes={driver.scenes}
            heroVideo={driver.heroVideo}
            quotes={driver.quotes}
          />
        </div>

        {/* TELEMETRY BOX */}
        <DriverTelemetryBox
          tap={tap}
          winPct={driver.winPct}
          record={driver.record}
          units={driver.units}
          label={driver.telemetryLabel}
          tickerCallout={driver.tickerCallout}
        />

        {/* TODAY'S BOARD BOX */}
        <TodaysBoardBox tap={tap} games={games} />

        {/* LEAGUE LIVE BOARD */}
        <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">{driver.boardTitle}</span>
            <span className="ml-auto font-mono text-[9px] text-muted-foreground tracking-widest">{driver.boardSubLabel}</span>
          </div>
          <div className="divide-y divide-border/40">
            {driver.leagueBoard.map((g, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={cn(
                    "font-mono text-[9px] px-1.5 py-0.5 rounded border tracking-widest shrink-0",
                    g.live ? "text-hot border-hot/40 bg-hot/10" : "text-muted-foreground border-border bg-secondary/50"
                  )}>
                    {g.q}
                  </span>
                  <div className="font-mono text-xs">
                    <span className="text-foreground/80">{g.away}</span>
                    <span className="mx-1 text-muted-foreground">@</span>
                    <span className="text-foreground/80">{g.home}</span>
                  </div>
                </div>
                <div className="font-mono text-sm font-bold text-win shrink-0">
                  {g.awayScore} <span className="text-muted-foreground">–</span> {g.homeScore}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BETS BOX */}
        <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">{driver.betsTitle}</span>
          </div>
          <div className="divide-y divide-border/40">
            {driver.bets.map((b, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5">
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{b.matchup}</div>
                  <div className="font-mono text-[10px] text-win uppercase tracking-wider mt-0.5">
                    {b.pick} · {b.odds} · <span className="text-[hsl(45_100%_60%)]">{b.units}</span>
                  </div>
                </div>
                <span className={cn("font-mono text-[9px] px-1.5 py-0.5 rounded border tracking-widest shrink-0", statusBadge(b.status))}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PARTNERS NODE — same flow as Home */}
        <PartnersNode />

        {/* LEGAL NODE — same flow as Home */}
        <LegalNode />

        {/* BACK TO HOME */}
        <Link
          to="/"
          className="block hud-panel border border-hud/30 rounded-md px-4 py-3 text-center hover:brightness-125 transition"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-hud uppercase">← back to home</span>
        </Link>
      </main>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
};

export default BucketPage;
