import type { Driver } from "./types";
import swooshPortrait from "@/assets/swoosh.jpg";
import swooshCourt from "@/assets/swoosh-court.jpg";
import swooshNet from "@/assets/swoosh-net.jpg";
import swooshArena from "@/assets/swoosh-arena.jpg";
import swooshBall from "@/assets/swoosh-ball.jpg";
import swooshScoreboard from "@/assets/swoosh-scoreboard.jpg";

export const SWOOSH: Driver = {
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
