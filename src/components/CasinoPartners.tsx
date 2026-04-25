const CASINOS = [
  { name: "Jackpot City", tag: "JC", url: "https://www.jackpotcity.com" },
  { name: "Spin Casino", tag: "SPIN", url: "https://www.spincasino.com" },
  { name: "888casino", tag: "888", url: "https://www.888casino.com" },
  { name: "TonyBet", tag: "TB", url: "https://tonybet.com" },
  { name: "LeoVegas", tag: "LEO", url: "https://www.leovegas.com" },
];

const NEON = "hsl(140 100% 55%)";

export const CasinoPartners = () => (
  <section className="px-2.5">
    <div className="rounded-lg border border-[hsl(140_100%_55%/0.35)] bg-gradient-to-b from-[hsl(220_25%_6%)] to-[hsl(220_30%_3%)] shadow-[0_0_18px_hsl(140_100%_55%/0.15),inset_0_0_24px_hsl(0_0%_0%/0.6)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[hsl(140_100%_55%/0.25)]">
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ background: NEON, boxShadow: `0 0 6px ${NEON}` }}
        />
        <span
          className="font-mono text-[10px] font-bold tracking-[3px] uppercase"
          style={{ color: NEON, textShadow: `0 0 6px ${NEON}` }}
        >
          Casino Partners
        </span>
        <span className="ml-auto font-mono text-[8px] tracking-[2px] uppercase text-foreground/40">
          High-Stakes
        </span>
      </div>

      {/* Scroller */}
      <div className="overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-2.5 px-3 py-3 snap-x snap-mandatory">
          {CASINOS.map((c) => (
            <li
              key={c.name}
              className="snap-start shrink-0 w-[140px] rounded-md border border-[hsl(140_100%_55%/0.25)] bg-[hsl(220_30%_4%)] p-2.5 flex flex-col gap-2 hover:border-[hsl(140_100%_55%/0.7)] hover:shadow-[0_0_14px_hsl(140_100%_55%/0.35)] transition"
            >
              {/* Logo block */}
              <div
                className="h-12 rounded-sm flex items-center justify-center font-mono font-black tracking-widest text-sm"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(220 20% 10%) 0%, hsl(220 25% 5%) 100%)",
                  color: NEON,
                  textShadow: `0 0 8px ${NEON}`,
                  border: `1px solid hsl(140 100% 55% / 0.3)`,
                }}
              >
                {c.tag}
              </div>
              <div className="font-mono text-[10px] font-bold tracking-[1.5px] uppercase text-foreground/85 text-center truncate">
                {c.name}
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block text-center font-mono text-[9px] font-bold tracking-[2px] uppercase rounded-sm py-1.5 border transition"
                style={{
                  color: NEON,
                  borderColor: "hsl(140 100% 55% / 0.45)",
                  background: "hsl(140 100% 55% / 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 12px ${NEON}, inset 0 0 8px hsl(140 100% 55% / 0.3)`;
                  e.currentTarget.style.background = "hsl(140 100% 55% / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "hsl(140 100% 55% / 0.05)";
                }}
              >
                Visit Casino →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
