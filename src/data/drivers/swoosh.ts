import type { Driver } from "./types";
import swooshPortrait from "@/assets/swoosh.jpg";
import swooshHeroVideo from "@/assets/swoosh-hero.mp4";
import { MIKE } from "./mike";

// Mirrors Mike's bucket exactly (same as Sarah's pattern).
// Swoosh owns the hero identity + hero video.
export const SWOOSH: Driver = {
  ...MIKE,
  slug: "swoosh",
  name: '"swoosh" d. james',
  league: "NBA",
  tag: "professional · hot hand",
  homeImage: swooshPortrait,
  homeName: '"Swoosh" D. James',
  homeRole: "NBA • 8 yrs",
  heroVideo: swooshHeroVideo,
  active: false,
};
