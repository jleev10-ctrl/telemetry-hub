import type { Driver } from "./types";
import ironmike from "@/assets/ironmike.jpg";
import mikeStadium from "@/assets/mike-stadium.jpg";
import mikeStadiumSunny from "@/assets/mike-stadium-sunny.jpg";
import mikeRainyField from "@/assets/mike-rainy-field.jpg";
import mikeBroadcastBooth from "@/assets/mike-broadcast-booth.jpg";
import mikeLockerRoom from "@/assets/mike-locker-room.jpg";
import mikeSportsbook from "@/assets/mike-sportsbook.jpg";

export const MIKE: Driver = {
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
