import type { Driver } from "./types";
import nhl from "@/assets/nhl.jpg";
import tommyArena from "@/assets/tommy-arena.jpg";
import tommyGoalie from "@/assets/tommy-goalie.jpg";
import tommyFaceoff from "@/assets/tommy-faceoff.jpg";
import tommyLockerroom from "@/assets/tommy-lockerroom.jpg";
import tommyScoreboard from "@/assets/tommy-scoreboard.jpg";

export const TOMMY: Driver = {
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
