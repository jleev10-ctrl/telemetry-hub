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

// Baseburner (MLB) bucket scenes
import baseburnerBatter from "@/assets/baseburner-batter.jpg";
import baseburnerHomerun from "@/assets/baseburner-homerun.jpg";
import baseburnerDugout from "@/assets/baseburner-dugout.jpg";
import baseburnerStadium from "@/assets/baseburner-stadium.jpg";
import baseburnerScoreboard from "@/assets/baseburner-scoreboard.jpg";

// Tommy (NHL) bucket scenes
import tommyArena from "@/assets/tommy-arena.jpg";
import tommyGoalie from "@/assets/tommy-goalie.jpg";
import tommyFaceoff from "@/assets/tommy-faceoff.jpg";
import tommyLockerroom from "@/assets/tommy-lockerroom.jpg";
import tommyScoreboard from "@/assets/tommy-scoreboard.jpg";

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

const BASEBURNER: Driver = {
  slug: "baseburner",
  name: 'rick "the baseburner" b.',
  league: "MLB",
  tag: "professional · power hitter",
  status: "HOT",

  homeImage: mlb,
  homeName: 'Rick "The Baseburner" B.',
  homeRole: "MLB • 11 yrs",

  record: "24-10",
  winPct: "71%",
  units: "+29.5u",
  telemetryLabel: "baseburner · telemetry",
  tickerCallout: "BASEBURNER'S CALL",

  games: [
    { matchup: "Dodgers @ Giants",   pick: "DODGERS ML",  odds: "-135", confidence: 86 },
    { matchup: "Yankees @ Red Sox",  pick: "OVER 9.5",    odds: "-105", confidence: 78 },
    { matchup: "Astros @ Rangers",   pick: "ASTROS -1.5", odds: "+125", confidence: 70 },
  ],
  gamesV2: [
    { matchup: "Dodgers @ Giants",   pick: "DODGERS -1.5", odds: "+115", confidence: 88 },
    { matchup: "Yankees @ Red Sox",  pick: "OVER 9.5",     odds: "-110", confidence: 82 },
    { matchup: "Astros @ Rangers",   pick: "ASTROS ML",    odds: "-160", confidence: 76 },
  ],

  scenes: [baseburnerBatter, baseburnerHomerun, baseburnerDugout, baseburnerStadium, baseburnerScoreboard],
  quotes: [
    "Swing big, miss big, win big. Take the over.",
    "Pitchers are nervous tonight. Bet the bats.",
    "Day game after a night game? Fade the favorite.",
    "When the wind blows out, the under is dead.",
    "Rookie on the mound, sharp money on the over.",
  ],
  voice: { rate: 0.92, pitch: 0.78 },

  betsTitle: "baseburner's bets · today",
  boardTitle: "mlb · live board",
  boardSubLabel: "tonight",
  leagueBoard: [
    { away: "LAD", awayScore: 5, home: "SF",  homeScore: 2, q: "T7",     live: true },
    { away: "NYY", awayScore: 4, home: "BOS", homeScore: 6, q: "B8",     live: true },
    { away: "HOU", awayScore: 3, home: "TEX", homeScore: 3, q: "T9",     live: true },
    { away: "ATL", awayScore: 7, home: "PHI", homeScore: 4, q: "FINAL",  live: false },
    { away: "CHC", awayScore: 2, home: "STL", homeScore: 8, q: "FINAL",  live: false },
    { away: "MIL", awayScore: 1, home: "CIN", homeScore: 0, q: "T5",     live: true },
    { away: "TOR", awayScore: 6, home: "BAL", homeScore: 5, q: "B6",     live: true },
    { away: "TB",  awayScore: 0, home: "MIA", homeScore: 2, q: "T3",     live: true },
    { away: "OAK", awayScore: 4, home: "SEA", homeScore: 9, q: "FINAL",  live: false },
    { away: "MIN", awayScore: 3, home: "DET", homeScore: 5, q: "FINAL",  live: false },
    { away: "ARI", awayScore: 2, home: "SD",  homeScore: 1, q: "B7",     live: true },
    { away: "COL", awayScore: 8, home: "PIT", homeScore: 7, q: "F/10",   live: false },
    { away: "KC",  awayScore: 0, home: "CWS", homeScore: 1, q: "T2",     live: true },
    { away: "WAS", awayScore: 5, home: "NYM", homeScore: 3, q: "FINAL",  live: false },
  ],
  bets: [
    { matchup: "Dodgers @ Giants",   pick: "LAD ML",      odds: "-135", units: "3u",   status: "LIVE" },
    { matchup: "Yankees @ Red Sox",  pick: "OVER 9.5",    odds: "-105", units: "2u",   status: "LIVE" },
    { matchup: "Astros @ Rangers",   pick: "HOU -1.5",    odds: "+125", units: "2u",   status: "WON" },
    { matchup: "Braves @ Phillies",  pick: "ATL ML",      odds: "-120", units: "1.5u", status: "WON" },
    { matchup: "Brewers @ Reds",     pick: "UNDER 8.5",   odds: "-110", units: "1u",   status: "LIVE" },
  ],
};

const TOMMY: Driver = {
  slug: "tommy",
  name: 'tommy "the mask" c.',
  league: "NHL",
  tag: "professional · ice & pucks",
  status: "HOT",

  homeImage: nhl,
  homeName: 'Tommy "The Mask" C.',
  homeRole: "NHL • 9 yrs",

  record: "21-10",
  winPct: "68%",
  units: "+22.5u",
  telemetryLabel: "tommy · telemetry",
  tickerCallout: "TOMMY'S CALL",

  games: [
    { matchup: "Rangers @ Bruins",    pick: "RANGERS ML",   odds: "+115", confidence: 84 },
    { matchup: "Oilers @ Flames",     pick: "OVER 6.5",     odds: "-110", confidence: 77 },
    { matchup: "Lightning @ Panthers",pick: "PANTHERS -1.5",odds: "+135", confidence: 71 },
  ],
  gamesV2: [
    { matchup: "Rangers @ Bruins",    pick: "RANGERS +1.5", odds: "-180", confidence: 89 },
    { matchup: "Oilers @ Flames",     pick: "OVER 6.5",     odds: "-115", confidence: 80 },
    { matchup: "Lightning @ Panthers",pick: "FLA ML",       odds: "-130", confidence: 75 },
  ],

  scenes: [tommyArena, tommyGoalie, tommyFaceoff, tommyLockerroom, tommyScoreboard],
  quotes: [
    "Goalie pulls the mask off, money goes on the under.",
    "Back-to-back road game? Fade the tired team.",
    "Power play percentage tells the whole story.",
    "When the goalie's hot, ride him till he breaks.",
    "Empty netter or not, the puck always finds twine.",
  ],
  voice: { rate: 0.98, pitch: 0.92 },

  betsTitle: "tommy's bets · today",
  boardTitle: "nhl · live board",
  boardSubLabel: "tonight",
  leagueBoard: [
    { away: "NYR", awayScore: 3, home: "BOS", homeScore: 2, q: "P3 4:12", live: true },
    { away: "EDM", awayScore: 4, home: "CGY", homeScore: 4, q: "P3 1:48", live: true },
    { away: "TBL", awayScore: 2, home: "FLA", homeScore: 5, q: "FINAL",   live: false },
    { away: "TOR", awayScore: 3, home: "MTL", homeScore: 1, q: "FINAL",   live: false },
    { away: "COL", awayScore: 1, home: "VGK", homeScore: 0, q: "P2 6:33", live: true },
    { away: "DAL", awayScore: 2, home: "MIN", homeScore: 3, q: "P3 9:01", live: true },
    { away: "PIT", awayScore: 4, home: "PHI", homeScore: 3, q: "F/OT",    live: false },
    { away: "WSH", awayScore: 0, home: "CAR", homeScore: 1, q: "P1 3:22", live: true },
    { away: "LAK", awayScore: 5, home: "ANA", homeScore: 2, q: "FINAL",   live: false },
    { away: "VAN", awayScore: 3, home: "SEA", homeScore: 3, q: "P3 0:45", live: true },
    { away: "WPG", awayScore: 2, home: "STL", homeScore: 4, q: "FINAL",   live: false },
    { away: "NSH", awayScore: 1, home: "CHI", homeScore: 2, q: "P2 11:08",live: true },
    { away: "BUF", awayScore: 4, home: "OTT", homeScore: 5, q: "F/SO",    live: false },
    { away: "DET", awayScore: 0, home: "NJD", homeScore: 0, q: "P1 12:55",live: true },
  ],
  bets: [
    { matchup: "Rangers @ Bruins",     pick: "NYR ML",       odds: "+115", units: "3u",   status: "LIVE" },
    { matchup: "Oilers @ Flames",      pick: "OVER 6.5",     odds: "-110", units: "2u",   status: "LIVE" },
    { matchup: "Lightning @ Panthers", pick: "FLA -1.5",     odds: "+135", units: "2u",   status: "WON" },
    { matchup: "Avalanche @ Knights",  pick: "COL ML",       odds: "-115", units: "1.5u", status: "LIVE" },
    { matchup: "Penguins @ Flyers",    pick: "UNDER 6",      odds: "-105", units: "1u",   status: "WON" },
  ],
};

// Sarah still placeholder until we build her bucket
const SARAH_PLACEHOLDER: Driver = {
  ...MIKE,
  slug: "sarah",
  homeImage: sarah,
  homeName: '"Stats" Sarah',
  homeRole: "MLB • Clinical Quant",
};

// Order = display order on home grid
export const DRIVERS_LIST: Driver[] = [MIKE, SWOOSH, SARAH_PLACEHOLDER, BASEBURNER, TOMMY];

export const DRIVERS: Record<string, Driver> = Object.fromEntries(
  DRIVERS_LIST.map((d) => [d.slug, d])
);

export const getDriver = (slug?: string): Driver =>
  (slug && DRIVERS[slug]) || MIKE;
