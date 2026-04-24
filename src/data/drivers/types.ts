// Shared driver types — single source of truth.

export interface Game {
  matchup: string;
  pick: string;
  odds: string;
  confidence: number;
}

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
  name: string;
  league: string;
  tag: string;
  status: "HOT" | "COOLDOWN" | "LEADER" | "VERIFIED";

  // gating: when false, home card renders but click is dead (no nav to bucket)
  active?: boolean;

  // home card
  homeImage: string;
  homeName: string;
  homeRole: string;

  // telemetry / stats
  record: string;
  winPct: string;
  units: string;
  telemetryLabel: string;
  tickerCallout: string;

  // picks
  games: Game[];
  gamesV2: Game[];

  // bucket scenes + voice
  scenes: string[];
  heroVideo?: string;
  quotes: string[];
  voice: VoiceTuning;

  // bets + league board
  betsTitle: string;
  boardTitle: string;
  boardSubLabel: string;
  leagueBoard: LeagueGame[];
  bets: BetSlate[];
}
