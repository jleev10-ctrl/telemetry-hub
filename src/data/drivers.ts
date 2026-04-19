import type { Game } from "@/components/DriverCard";

// Bucket scene + portrait imports
import mikeStadium from "@/assets/mike-stadium.jpg";
import mikeStadiumSunny from "@/assets/mike-stadium-sunny.jpg";
import mikeRainyField from "@/assets/mike-rainy-field.jpg";
import mikeBroadcastBooth from "@/assets/mike-broadcast-booth.jpg";
import mikeLockerRoom from "@/assets/mike-locker-room.jpg";
import mikeSportsbook from "@/assets/mike-sportsbook.jpg";
import swooshCourt from "@/assets/swoosh-court.jpg";
import swooshNet from "@/assets/swoosh-net.jpg";
import swooshArena from "@/assets/swoosh-arena.jpg";
import swooshBall from "@/assets/swoosh-ball.jpg";
import swooshScoreboard from "@/assets/swoosh-scoreboard.jpg";

// Home portrait imports
import ironmike from "@/assets/ironmike.jpg";
import swooshPortrait from "@/assets/swoosh.jpg";
import sarah from "@/assets/sarah.jpg";
import mlb from "@/assets/mlb.jpg";
import nhl from "@/assets/nhl.jpg";

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
  // identity
  slug: string;
  name: string;            // bucket display name
  league: string;
  tag: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";

  // home card
  homeImage: string;
  homeName: string;        // home card display name (often title-cased)
  homeRole: string;        // e.g. "NFL • 15 yrs"

  // telemetry / stats
  record: string;
  winPct: string;
  units: string;
  telemetryLabel: string;  // e.g. "mike · telemetry"
  tickerCallout: string;   // e.g. "MIKE'S CALL: RIDE IT" suffix label

  // picks
  games: Game[];
  gamesV2: Game[];

  // bucket scenes + voice
  scenes: string[];
  quotes: string[];
  voice: VoiceTuning;

  // bets + league board
  betsTitle: string;
  boardTitle: string;
  boardSubLabel: string;
  leagueBoard: LeagueGame[];
  bets: BetSlate[];
}

const MIKE: Driver = {
  slug: "mike",
  name: 'iron "mike" k.',
  league: "NFL",
  tag: "professional · analytic",
  status: "HOT",

  homeImage: ironmike,
  homeName: '"Iron" Mike K.',
  homeRole: "NFL • 15 yrs",

  record: "22-8",
  winPct: "73%",
  units: "+18.5u",
  telemetryLabel: "mike · telemetry",
  tickerCallout: "MIKE'S CALL",

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

  scenes: [mikeStadium, mikeStadiumSunny, mikeRainyField, mikeBroadcastBooth, mikeLockerRoom, mikeSportsbook],
  quotes: [
    "Winning isn't everything — it's the only thing.",
    "Show me a good loser, I'll show you a loser.",
    "Fortune favors the bold. Money moves on Dallas.",
    "You miss 100% of the shots you don't take.",
    "Pressure is a privilege. Ride it.",
  ],
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

  homeImage: swooshPortrait,
  homeName: '"Swoosh" D. James',
  homeRole: "NBA • 8 yrs",

  record: "19-6",
  winPct: "76%",
  units: "+21u",
  telemetryLabel: "swoosh · telemetry",
  tickerCallout: "SWOOSH'S CALL",

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

  scenes: [swooshCourt, swooshNet, swooshArena, swooshBall, swooshScoreboard],
  quotes: [
    "Ball don't lie. Lakers cover.",
    "Defense wins championships. Bet the under.",
    "When the threes are falling, ride the wave.",
    "Never bet against a closer. Take the moneyline.",
    "Garbage time stats kill bad lines. Trust the spread.",
  ],
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

// Sarah / Baseburner / Tommy: home cards only for now — buckets fall back to Mike's content.
// To activate them as full buckets, expand each into a complete Driver object like MIKE/SWOOSH above.
const SARAH_PLACEHOLDER: Driver = {
  ...MIKE,
  slug: "sarah",
  homeImage: sarah,
  homeName: '"Stats" Sarah',
  homeRole: "MLB • Clinical Quant",
};

const BASEBURNER_PLACEHOLDER: Driver = {
  ...MIKE,
  slug: "baseburner",
  homeImage: mlb,
  homeName: 'Rick "The Baseburner" B.',
  homeRole: "MLB • 11 yrs",
};

const TOMMY_PLACEHOLDER: Driver = {
  ...MIKE,
  slug: "tommy",
  homeImage: nhl,
  homeName: 'Tommy "The Mask" C.',
  homeRole: "NHL • 9 yrs",
};

// Order = display order on home grid
export const DRIVERS_LIST: Driver[] = [MIKE, SWOOSH, SARAH_PLACEHOLDER, BASEBURNER_PLACEHOLDER, TOMMY_PLACEHOLDER];

export const DRIVERS: Record<string, Driver> = Object.fromEntries(
  DRIVERS_LIST.map((d) => [d.slug, d])
);

export const getDriver = (slug?: string): Driver =>
  (slug && DRIVERS[slug]) || MIKE;
