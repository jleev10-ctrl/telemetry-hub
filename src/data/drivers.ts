import type { Game } from "@/components/DriverCard";
import { MIKE_SCENES, MIKE_QUOTES } from "@/data/mikeScenes";
import { SWOOSH_SCENES, SWOOSH_QUOTES } from "@/data/swooshScenes";

export interface LeagueGame {
  away: string;
  awayScore: number;
  home: string;
  homeScore: number;
  q: string;
  live: boolean;
}

export interface BetSlate {
  matchup: string;
  pick: string;
  odds: string;
  units: string;
  status: "LIVE" | "WON" | "PEND" | string;
}

export interface VoiceTuning {
  rate: number;
  pitch: number;
}

export interface Driver {
  slug: string;
  name: string;
  league: string;
  tag: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";
  record: string;
  winPct: string;
  units: string;
  games: Game[];
  gamesV2: Game[];
  scenes: string[];
  quotes: string[];
  voice: VoiceTuning;
  betsTitle: string;       // e.g. "mike's bets · today"
  boardTitle: string;      // e.g. "nfl · live board"
  boardSubLabel: string;   // e.g. "week 12" or "tonight"
  leagueBoard: LeagueGame[];
  bets: BetSlate[];
}

const MIKE: Driver = {
  slug: "mike",
  name: 'iron "mike" k.',
  league: "NFL",
  tag: "professional · analytic",
  status: "HOT",
  record: "22-8",
  winPct: "73%",
  units: "+18.5u",
  games: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3.5", odds: "-110", confidence: 92 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-105", confidence: 78 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6", odds: "-115", confidence: 71 },
  ],
  gamesV2: [
    { matchup: "Raiders @ Chiefs", pick: "RAIDERS +3", odds: "-108", confidence: 94 },
    { matchup: "Bills @ Dolphins", pick: "OVER 48.5", odds: "-110", confidence: 81 },
    { matchup: "49ers @ Seahawks", pick: "49ERS -6.5", odds: "-110", confidence: 73 },
  ],
  scenes: MIKE_SCENES,
  quotes: MIKE_QUOTES,
  voice: { rate: 0.95, pitch: 0.85 },
  betsTitle: "mike's bets · today",
  boardTitle: "nfl · live board",
  boardSubLabel: "week 12",
  leagueBoard: [
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
  ],
  bets: [
    { matchup: "Cowboys @ Eagles", pick: "DAL +2.5", odds: "-110", units: "3u", status: "LIVE" },
    { matchup: "Chiefs @ Bills",   pick: "UNDER 47.5", odds: "-105", units: "2u", status: "LIVE" },
    { matchup: "49ers @ Seahawks", pick: "SF -6.5", odds: "-110", units: "2u", status: "WON" },
    { matchup: "Ravens @ Bengals", pick: "BAL ML", odds: "+115", units: "1.5u", status: "LIVE" },
    { matchup: "Saints @ Panthers", pick: "OVER 41", odds: "-110", units: "1u", status: "PEND" },
  ],
};

const SWOOSH: Driver = {
  slug: "swoosh",
  name: '"swoosh" d. james',
  league: "NBA",
  tag: "professional · hot hand",
  status: "HOT",
  record: "19-6",
  winPct: "76%",
  units: "+21u",
  games: [
    { matchup: "Lakers @ Warriors", pick: "LAKERS ML", odds: "+105", confidence: 88 },
    { matchup: "Celtics @ Heat",    pick: "OVER 218.5", odds: "-110", confidence: 76 },
    { matchup: "Nuggets @ Suns",    pick: "NUGGETS -4.5", odds: "-108", confidence: 72 },
  ],
  gamesV2: [
    { matchup: "Lakers @ Warriors", pick: "LAKERS +1.5", odds: "-115", confidence: 91 },
    { matchup: "Celtics @ Heat",    pick: "OVER 219.5", odds: "-110", confidence: 80 },
    { matchup: "Nuggets @ Suns",    pick: "NUGGETS -5",  odds: "-110", confidence: 74 },
  ],
  scenes: SWOOSH_SCENES,
  quotes: SWOOSH_QUOTES,
  voice: { rate: 1.0, pitch: 1.05 },
  betsTitle: "swoosh's bets · today",
  boardTitle: "nba · live board",
  boardSubLabel: "tonight",
  leagueBoard: [
    { away: "LAL", awayScore: 102, home: "GSW", homeScore: 99,  q: "4Q 1:48", live: true },
    { away: "BOS", awayScore: 88,  home: "MIA", homeScore: 91,  q: "4Q 6:12", live: true },
    { away: "DEN", awayScore: 118, home: "PHX", homeScore: 110, q: "FINAL",   live: false },
    { away: "MIL", awayScore: 104, home: "PHI", homeScore: 112, q: "FINAL",   live: false },
    { away: "DAL", awayScore: 121, home: "MEM", homeScore: 117, q: "FINAL/OT",live: false },
    { away: "NYK", awayScore: 56,  home: "BKN", homeScore: 58,  q: "3Q 4:22", live: true },
    { away: "OKC", awayScore: 33,  home: "MIN", homeScore: 30,  q: "2Q 8:01", live: true },
    { away: "SAC", awayScore: 14,  home: "POR", homeScore: 18,  q: "1Q 6:44", live: true },
    { away: "ATL", awayScore: 99,  home: "ORL", homeScore: 105, q: "FINAL",   live: false },
    { away: "CHI", awayScore: 95,  home: "DET", homeScore: 102, q: "FINAL",   live: false },
    { away: "HOU", awayScore: 71,  home: "SAS", homeScore: 68,  q: "3Q 0:55", live: true },
    { away: "TOR", awayScore: 110, home: "CHA", homeScore: 98,  q: "FINAL",   live: false },
    { away: "UTA", awayScore: 47,  home: "NOP", homeScore: 49,  q: "2Q 2:18", live: true },
    { away: "LAC", awayScore: 116, home: "IND", homeScore: 116, q: "FINAL/OT",live: false },
  ],
  bets: [
    { matchup: "Lakers @ Warriors", pick: "LAL +1.5",     odds: "-115", units: "3u",   status: "LIVE" },
    { matchup: "Celtics @ Heat",    pick: "OVER 219.5",   odds: "-110", units: "2u",   status: "LIVE" },
    { matchup: "Nuggets @ Suns",    pick: "NUG -5",       odds: "-110", units: "2u",   status: "WON" },
    { matchup: "Mavs @ Grizzlies",  pick: "LUKA o32.5",   odds: "-115", units: "1.5u", status: "LIVE" },
    { matchup: "Knicks @ Nets",     pick: "UNDER 213.5",  odds: "-110", units: "1u",   status: "PEND" },
  ],
};

export const DRIVERS: Record<string, Driver> = {
  mike: MIKE,
  swoosh: SWOOSH,
};

export const getDriver = (slug?: string): Driver =>
  (slug && DRIVERS[slug]) || MIKE;
