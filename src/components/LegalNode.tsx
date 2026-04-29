// Synthetic Syndicate is an entertainment + affiliate referral service.
// We are NOT a sportsbook, casino, or wagering operator.

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
          Entertainment + affiliate referral service. NOT a sportsbook, casino, or wagering operator.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-win tracking-widest mt-0.5 shrink-0">[02]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          All analysts are AI-generated synthetic personas. Picks &amp; stats are simulated for entertainment.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <span className="font-mono text-[9px] text-win tracking-widest mt-0.5 shrink-0">[03]</span>
        <p className="font-mono text-[10px] leading-relaxed text-foreground/80 uppercase tracking-wide">
          Outbound links go to licensed third-party operators governed by their own terms.
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
          . Play responsibly. 21+ only.
        </p>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-hud/20 bg-secondary/40">
      <div className="flex gap-3">
        <a href="/terms" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          terms
        </a>
        <a href="/privacy" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          privacy
        </a>
        <a href="/contact" className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground hover:text-hud uppercase">
          contact
        </a>
      </div>
      <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
        © grand13
      </span>
    </div>
  </section>
);

