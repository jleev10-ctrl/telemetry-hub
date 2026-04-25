import { cn } from "@/lib/utils";

interface BetBucketProps {
  league: string; // e.g. "NFL"
  parlayHref?: string;
  bookName?: string; // e.g. "DraftKings"
  bookHref?: string;
  bookColor?: string; // tailwind gradient classes
}

const withUtm = (url: string, book: string, placement: string) => {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "synthetic_syndicate");
    u.searchParams.set("utm_medium", "affiliate");
    u.searchParams.set("utm_campaign", "bet_bucket");
    u.searchParams.set("utm_content", placement);
    u.searchParams.set("utm_term", book);
    return u.toString();
  } catch {
    return url;
  }
};

export const BetBucket = ({
  league,
  parlayHref = "#",
  bookName = "DraftKings",
  bookHref = "https://sportsbook.draftkings.com/",
  bookColor = "from-[hsl(142_76%_45%)] to-[hsl(142_76%_35%)]",
}: BetBucketProps) => (
  <section className="hud-panel border border-hud/30 rounded-md overflow-hidden mt-2">
    <div className="flex items-center gap-2 px-4 py-1.5 border-b border-hud/20 bg-secondary/40">
      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[hsl(45_100%_60%)]" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-[hsl(45_100%_60%)] uppercase">
        {league} bet bucket
      </span>
    </div>
    <div className="relative grid grid-cols-2 bg-secondary/20">
      {/* Vertical divider down the middle */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-hud/40"
      />
      {/* LEFT — Parlay */}
      <a
        href={parlayHref}
        className="px-3 py-3 text-center font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.3em] text-foreground hover:text-[hsl(var(--hud))] transition"
      >
        Parlay
      </a>
      {/* RIGHT — Sportsbook */}
      <a
        href={withUtm(bookHref, bookName.toLowerCase(), `${league.toLowerCase()}_bet_bucket`)}
        target="_blank"
        rel="sponsored noopener noreferrer"
        data-book={bookName.toLowerCase()}
        className={cn(
          "mx-3 my-2 rounded px-2 py-2 text-center text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-primary-foreground",
          "bg-gradient-to-b shadow-md shadow-black/40 hover:brightness-110 transition",
          bookColor
        )}
      >
        {bookName}
      </a>
    </div>
  </section>
);
