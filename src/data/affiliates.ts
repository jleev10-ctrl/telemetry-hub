// ============================================================
// LEAGUE → AFFILIATE MAP
// ------------------------------------------------------------
// One entry per league. When a new affiliate deal lands for a
// league, edit ONLY that league's line below. Every bet bucket
// on the site that uses that league updates automatically.
//
// Fields:
//   book   = display name on the button
//   url    = raw affiliate URL (UTM params added automatically)
//   color  = tailwind gradient (from-... to-...)
// ============================================================

export type League = "NFL" | "NBA" | "NHL" | "MLB" | "STATS";

export interface LeagueAffiliate {
  book: string;
  url: string;
  color: string;
}

export const LEAGUE_AFFILIATES: Record<League, LeagueAffiliate> = {
  NFL: {
    book: "DraftKings",
    url: "https://sportsbook.draftkings.com/",
    color: "from-[hsl(142_76%_45%)] to-[hsl(142_76%_35%)]",
  },
  NBA: {
    book: "BetMGM",
    url: "https://sports.betmgm.com/",
    color: "from-[hsl(40_90%_55%)] to-[hsl(30_90%_45%)]",
  },
  NHL: {
    book: "FanDuel",
    url: "https://sportsbook.fanduel.com/",
    color: "from-[hsl(210_100%_50%)] to-[hsl(210_100%_40%)]",
  },
  MLB: {
    book: "Caesars",
    url: "https://www.caesars.com/sportsbook-and-casino",
    color: "from-[hsl(0_75%_50%)] to-[hsl(0_75%_38%)]",
  },
  STATS: {
    book: "Bet365",
    url: "https://www.bet365.com/",
    color: "from-[hsl(75_100%_50%)] to-[hsl(75_100%_40%)]",
  },
};
