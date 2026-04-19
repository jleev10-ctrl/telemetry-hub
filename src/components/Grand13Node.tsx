export const Grand13Node = () => (
  <section className="hud-panel border-2 border-[hsl(45_100%_55%)]/60 rounded-md overflow-hidden shadow-[0_0_18px_hsl(45_100%_55%/0.25)]">
    <div className="flex items-center gap-2 px-4 py-2 border-b border-[hsl(45_100%_55%)]/30 bg-secondary/40">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[hsl(45_100%_60%)]" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">
        grand13 · syndicate telemetry
      </span>
      <span className="ml-auto font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
        live
      </span>
    </div>

    <div className="grid grid-cols-3 divide-x divide-border">
      {[
        { label: "analysts", value: "5/13" },
        { label: "win rate", value: "74%" },
        { label: "units (wk)", value: "+119u" },
      ].map((s) => (
        <div key={s.label} className="px-3 py-2.5 text-center">
          <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
            {s.label}
          </div>
          <div className="mt-0.5 text-lg font-bold text-win font-mono">{s.value}</div>
        </div>
      ))}
    </div>

    <div className="px-4 py-2 border-t border-[hsl(45_100%_55%)]/20 bg-background/40">
      <p className="font-mono text-[10px] tracking-widest text-foreground/70 uppercase text-center">
        13 synthetic analysts · one syndicate · zero excuses
      </p>
    </div>
  </section>
);
