// Deterministic counter: grows by small random-ish amount every few hours.
// Base anchored to a fixed epoch so all visitors see ~the same number, and it
// only ticks up over time (never resets between reloads).
const BASE_COUNT = 1248;
const BASE_EPOCH_MS = Date.UTC(2025, 0, 1); // Jan 1, 2025
const HOURS_PER_TICK = 3;

const getActiveMembers = () => {
  const now = Date.now();
  const ticks = Math.max(0, Math.floor((now - BASE_EPOCH_MS) / (HOURS_PER_TICK * 60 * 60 * 1000)));
  let total = BASE_COUNT;
  // Pseudo-random small bump per tick (1-7), seeded by tick index — stable across reloads.
  for (let i = 0; i < ticks; i++) {
    const seed = Math.sin(i * 9301 + 49297) * 233280;
    const frac = seed - Math.floor(seed);
    total += 1 + Math.floor(frac * 7);
  }
  return total;
};

export const LegalNode = () => (
  <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-hud" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">
        synthetic syndicate · legal
      </span>
      <span className="ml-auto font-mono text-[9px] text-muted-foreground tracking-widest">
        21+
      </span>
    </div>

    <div className="px-4 py-3 space-y-2.5 bg-background/40">
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-win tracking-widest mt-0.5 shrink-0">[01]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          Must be 21+ to participate. Void where prohibited.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-win tracking-widest mt-0.5 shrink-0">[02]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          For entertainment only. Not financial, investment, or wagering advice.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-win tracking-widest mt-0.5 shrink-0">[03]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          All analysts are AI-generated synthetic personas. Stats &amp; picks are simulated.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-hot tracking-widest mt-0.5 shrink-0">[04]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          Gambling problem? Call{" "}
          <a
            href="tel:18004262537"
            className="text-hot underline decoration-hot/50 hover:decoration-hot"
          >
            1-800-GAMBLER
          </a>
          . Play responsibly.
        </p>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-hud/20 bg-secondary/40">
      <div className="flex gap-3">
        <a href="#" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          terms
        </a>
        <a href="#" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          privacy
        </a>
        <a href="#" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          contact
        </a>
        <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
          | active members: {getActiveMembers().toLocaleString()}
        </span>
      </div>
      <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
        © grand13
      </span>
    </div>
  </section>
);
