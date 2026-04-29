// Driver registry — single source of truth for the home grid + all bucket pages.
// Add a new driver = create a file in this folder + append to DRIVERS_LIST below.

import type { Driver } from "./types";
import { MIKE } from "./mike";
import { SWOOSH } from "./swoosh";
import { SARAH } from "./sarah";
import { BASEBURNER } from "./baseburner";
import { TOMMY } from "./tommy";

export type { Driver, Game, LeagueGame, BetSlate, VoiceTuning } from "./types";

// Order = display order on home grid
// MIKE, BASEBURNER (MLB), TOMMY (NHL) hidden per user request — data + buckets intact, just not in the grid.
export const DRIVERS_LIST: Driver[] = [SWOOSH, SARAH, BASEBURNER, TOMMY];

export const DRIVERS: Record<string, Driver> = Object.fromEntries(
  DRIVERS_LIST.map((d) => [d.slug, d])
);

export const getDriver = (slug?: string): Driver =>
  (slug && DRIVERS[slug]) || MIKE;
