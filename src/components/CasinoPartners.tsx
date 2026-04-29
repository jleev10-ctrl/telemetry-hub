import jackpotCityLogo from "@/assets/jackpot-city-logo.png";
import spinCasinoLogo from "@/assets/spin-casino-logo.png";
import casino888Logo from "@/assets/888casino-logo.png";
import tonybetLogo from "@/assets/tonybet-logo.png";
import leovegasLogo from "@/assets/leovegas-logo.png";
import { trackAffiliateClick } from "@/hooks/useAffiliateClick";

const CASINOS = [
  { name: "Jackpot City", url: "https://www.jackpotcity.com", logo: jackpotCityLogo },
  { name: "Spin Casino", url: "https://www.spincasino.com", logo: spinCasinoLogo },
  { name: "888casino", url: "https://www.888casino.com", logo: casino888Logo },
  { name: "LeoVegas", url: "https://www.leovegas.com", logo: leovegasLogo },
];

const NEON = "hsl(140 100% 55%)";

export const CasinoPartners = () => (
  <section>
    <div className="rounded-md overflow-hidden border border-[hsl(140_100%_55%/0.35)] bg-gradient-to-b from-[hsl(220_25%_6%)] to-[hsl(220_30%_3%)] shadow-[0_0_18px_hsl(140_100%_55%/0.15),inset_0_0_24px_hsl(0_0%_0%/0.6)]">
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

      {/* Scroller — scrolls on mobile, locked grid on desktop */}
      <div className="overflow-x-auto sm:overflow-x-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-2.5 px-3 py-3 snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:snap-none">
          {CASINOS.map((c) => (
            <li
              key={c.name}
              className="snap-start shrink-0 w-[155px] sm:w-auto rounded-md border border-[hsl(140_100%_55%/0.25)] bg-[hsl(220_30%_4%)] p-1.5 flex flex-col gap-1.5 hover:border-[hsl(140_100%_55%/0.7)] hover:shadow-[0_0_14px_hsl(140_100%_55%/0.35)] transition"
            >
              {/* Logo block */}
              <div className="h-20 rounded-sm flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 20% 10%) 0%, hsl(220 25% 5%) 100%)", border: "1px solid hsl(140 100% 55% / 0.3)" }}>
                <img src={c.logo} alt={c.name} loading="lazy" className="w-[90%] h-[90%] object-contain" />
              </div>
              <div className="font-mono text-[10px] font-bold tracking-[1.5px] uppercase text-foreground/85 text-center truncate">
                {c.name}
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick({
                  placement: "casino_partners",
                  book: c.name.toLowerCase().replace(/\s+/g, "_"),
                  destination_url: c.url,
                })}
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
