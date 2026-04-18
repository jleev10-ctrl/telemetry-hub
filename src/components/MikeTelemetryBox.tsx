interface MikeTelemetryBoxProps {
  tap: number;
  winPct: string;
  record: string;
  units: string;
}

export const MikeTelemetryBox = ({ tap, winPct, record, units }: MikeTelemetryBoxProps) => {
  return (
    <div className="hud-panel border border-hud/30 rounded-md overflow-hidden animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-hud/20 bg-secondary/40">
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-hud uppercase">mike · telemetry</span>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 divide-x divide-border">
        {[
          { label: "win%", value: winPct },
          { label: "record", value: record },
          { label: "units", value: units },
        ].map((s) => (
          <div key={s.label} className="px-3 py-2.5">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-0.5 text-lg font-bold text-win font-mono">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Ticker — only after engagement */}
      {tap >= 1 && (
        <div className="border-t border-hud/20 bg-background/60 overflow-hidden">
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

    </div>
  );
};
