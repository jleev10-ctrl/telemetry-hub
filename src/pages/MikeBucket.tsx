import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Game } from "@/components/DriverCard";
import { MikeImageBox } from "@/components/MikeImageBox";
import { MikeTelemetryBox } from "@/components/MikeTelemetryBox";
import { TodaysBoardBox } from "@/components/TodaysBoardBox";
import { JoinModal } from "@/components/JoinModal";
import { PartnersNode } from "@/components/PartnersNode";
import { LegalNode } from "@/components/LegalNode";
import { MIKE_QUOTES } from "@/data/mikeScenes";

const MIKE = {
  name: 'iron "mike" k.',
  league: "NFL",
  tag: "professional · analytic",
  status: "HOT" as const,
  record: "22-8",
  winPct: "73%",
  units: "+18.5u",
  games: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3.5", odds: "-110", confidence: 92 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-105", confidence: 78 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6", odds: "-115", confidence: 71 },
  ] as Game[],
  gamesV2: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3", odds: "-108", confidence: 94 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-110", confidence: 81 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6.5", odds: "-110", confidence: 73 },
  ] as Game[],
};

// 14 fake NFL games for the scoreboard
const NFL_GAMES = [
  { away: "DAL", awayScore: 24, home: "PHI", homeScore: 21, q: "4Q 2:14", live: true },
  { away: "KC",  awayScore: 17, home: "BUF", homeScore: 20, q: "4Q 5:42", live: true },
  { away: "SF",  awayScore: 28, home: "SEA", homeScore: 14, q: "FINAL", live: false },
  { away: "GB",  awayScore: 10, home: "DET", homeScore: 27, q: "FINAL", live: false },
  { away: "MIA", awayScore: 31, home: "NYJ", homeScore: 24, q: "FINAL", live: false },
  { away: "BAL", awayScore: 13, home: "CIN", homeScore: 13, q: "3Q 8:01", live: true },
  { away: "LAR", awayScore: 7,  home: "ARI", homeScore: 14, q: "2Q 0:48", live: true },
  { away: "TB",  awayScore: 0,  home: "ATL", homeScore: 3,  q: "1Q 9:22", live: true },
  { away: "NE",  awayScore: 17, home: "PIT", homeScore: 23, q: "FINAL", live: false },
  { away: "CHI", awayScore: 14, home: "MIN", homeScore: 30, q: "FINAL", live: false },
  { away: "NO",  awayScore: 21, home: "CAR", homeScore: 20, q: "4Q 0:32", live: true },
  { away: "HOU", awayScore: 24, home: "TEN", homeScore: 17, q: "FINAL", live: false },
  { away: "JAX", awayScore: 10, home: "IND", homeScore: 13, q: "3Q 4:12", live: true },
  { away: "DEN", awayScore: 27, home: "LAC", homeScore: 24, q: "FINAL/OT", live: false },
];

// Fake bets slate
const FAKE_BETS = [
  { matchup: "Cowboys @ Eagles", pick: "DAL +2.5", odds: "-110", units: "3u", status: "LIVE" },
  { matchup: "Chiefs @ Bills",   pick: "UNDER 47.5", odds: "-105", units: "2u", status: "LIVE" },
  { matchup: "49ers @ Seahawks", pick: "SF -6.5", odds: "-110", units: "2u", status: "WON" },
  { matchup: "Ravens @ Bengals", pick: "BAL ML", odds: "+115", units: "1.5u", status: "LIVE" },
  { matchup: "Saints @ Panthers", pick: "OVER 41", odds: "-110", units: "1u", status: "PEND" },
];

interface Sportsbook { name: string; slug: string; url: string; color: string }
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

const statusBadge = (s: string) => {
  if (s === "WON") return "text-win border-win/40 bg-win/10";
  if (s === "LIVE") return "text-hot border-hot/40 bg-hot/10";
  return "text-hud border-hud/40 bg-hud/10";
};

const Index = () => {
  const [joinOpen, setJoinOpen] = useState(false);

  // Tap / speech state lifted from old DriverCard so MikeImageBox + MikeTelemetryBox stay in sync
  const [tap, setTap] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [spokenWords, setSpokenWords] = useState(0);
  const [meterTick, setMeterTick] = useState(0);
  const tickerRef = useRef<number | null>(null);

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

    const quote = MIKE_QUOTES[(next - 1) % MIKE_QUOTES.length];
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
        // Android Chrome / Samsung Internet: must call resume() inside gesture
        try { synth.resume(); } catch { /* ignore */ }

        const u = new SpeechSynthesisUtterance(quote);
        u.rate = 0.95;
        u.pitch = 0.85;
        u.volume = 1;
        u.lang = "en-US";

        // Pick an English voice if available (Samsung often needs explicit voice)
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

  const games = tap >= 2 ? MIKE.gamesV2 : MIKE.games;

  return (
    <div className="min-h-screen w-full">
      {/* Sticky Header */}
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
        {/* MIKE IMAGE BOX */}
        <div className="origin-top scale-[0.82] sm:scale-100 -mb-[18%] sm:mb-0 px-2 sm:px-0 overflow-visible">
          <MikeImageBox
            name={MIKE.name}
            league={MIKE.league}
            tag={MIKE.tag}
            status={MIKE.status}
            tap={tap}
            onTap={handleTap}
            speaking={speaking}
            spokenWords={spokenWords}
            meterTick={meterTick}
          />
        </div>

        {/* TELEMETRY BOX */}
        <MikeTelemetryBox
          tap={tap}
          winPct={MIKE.winPct}
          record={MIKE.record}
          units={MIKE.units}
        />

        {/* TODAY'S BOARD BOX */}
        <TodaysBoardBox tap={tap} games={games} />

        {/* NFL SCORES BOX — full slate, 14 games */}
        <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">nfl · live board</span>
            <span className="ml-auto font-mono text-[9px] text-muted-foreground tracking-widest">week 12</span>
          </div>
          <div className="divide-y divide-border/40">
            {NFL_GAMES.map((g, i) => (
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
            <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">mike's bets · today</span>
          </div>
          <div className="divide-y divide-border/40">
            {FAKE_BETS.map((b, i) => (
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

        {/* BACK TO HOME BOX */}
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

export default Index;
