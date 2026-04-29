import type { Driver } from "./types";
import mlb from "@/assets/mlb.jpg";
import baseburnerHeroVideo from "@/assets/baseburner-hero.mp4";
import { MIKE } from "./mike";

// Mirrors Mike's bucket exactly (same as Sarah, Swoosh, Tommy pattern).
// Baseburner owns the hero identity + hero video.
export const BASEBURNER: Driver = {
  ...MIKE,
  slug: "baseburner",
  name: 'rick "the baseburner" b.',
  league: "MLB",
  tag: "professional · power hitter",
  homeImage: mlb,
  homeName: 'Rick "The Baseburner" B.',
  homeRole: "MLB • 11 yrs",
  heroVideo: baseburnerHeroVideo,
  active: true,
};
