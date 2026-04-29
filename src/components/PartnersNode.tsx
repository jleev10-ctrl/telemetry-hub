import { cn } from "@/lib/utils";
import { AddToPhoneButton } from "@/components/AddToPhoneButton";
import { trackAffiliateClick } from "@/hooks/useAffiliateClick";

interface Sportsbook {
  name: string;
  slug: string;
  url: string;
  color: string;
}

const sportsbooks: Sportsbook[] = [
  { name: "DraftKings", slug: "draftkings", url: "https://sportsbook.draftkings.com/", color: "from-[hsl(142_76%_45%)] to-[hsl(142_76%_35%)]" },
  { name: "FanDuel",    slug: "fanduel",    url: "https://sportsbook.fanduel.com/",    color: "from-[hsl(220_90%_55%)] to-[hsl(220_90%_40%)]" },
  { name: "BetMGM",     slug: "betmgm",     url: "https://sports.betmgm.com/",         color: "from-[hsl(40_90%_55%)] to-[hsl(30_90%_45%)]" },
  { name: "Caesars",    slug: "caesars",    url: "https://www.caesars.com/sportsbook-and-casino", color: "from-[hsl(0_75%_50%)] to-[hsl(0_75%_38%)]" },
  { name: "bet365",     slug: "bet365",     url: "https://www.bet365.com/",            color: "from-[hsl(50_90%_50%)] to-[hsl(45_90%_38%)]" },
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

export const PartnersNode = () => (
  <section className="hud-panel border border-hud/30 rounded-md overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-1.5 border-b border-hud/20 bg-secondary/40">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[hsl(45_100%_60%)]" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">official partners</span>
      <div className="ml-auto"><AddToPhoneButton /></div>
    </div>
    <div className="grid grid-cols-5 gap-1.5 px-3 py-3 bg-secondary/20">
      {sportsbooks.map((b) => (
        <a
          key={b.name}
          href={withUtm(b.url, b.slug, "home_partners_node")}
          target="_blank"
          rel="sponsored noopener noreferrer"
          data-book={b.slug}
          onClick={() => trackAffiliateClick({
            placement: "home_partners_node",
            book: b.slug,
            destination_url: b.url,
          })}
          className={cn(
            "rounded px-1 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary-foreground text-center truncate",
            "bg-gradient-to-b shadow-md shadow-black/40 hover:brightness-110 transition",
            b.color
          )}
        >
          {b.name}
        </a>
      ))}
    </div>
  </section>
);
