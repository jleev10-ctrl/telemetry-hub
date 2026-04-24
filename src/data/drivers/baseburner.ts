import type { Driver } from "./types";
import mlb from "@/assets/mlb.jpg";
import baseburnerBatter from "@/assets/baseburner-batter.jpg";
import baseburnerHomerun from "@/assets/baseburner-homerun.jpg";
import baseburnerDugout from "@/assets/baseburner-dugout.jpg";
import baseburnerStadium from "@/assets/baseburner-stadium.jpg";
import baseburnerScoreboard from "@/assets/baseburner-scoreboard.jpg";

export const BASEBURNER: Driver = {
  slug: "baseburner",
  name: 'rick "the baseburner" b.',
  league: "MLB",
  tag: "professional · power hitter",
  status: "HOT",
  active: false,

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
