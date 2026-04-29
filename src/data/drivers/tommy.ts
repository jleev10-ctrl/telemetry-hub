import type { Driver } from "./types";
import nhl from "@/assets/nhl.jpg";
import tommyHeroVideo from "@/assets/tommy-hero.mp4";
import { MIKE } from "./mike";

// Mirrors Mike's bucket exactly (same as Sarah & Swoosh pattern).
// Tommy owns the hero identity + hero video.
export const TOMMY: Driver = {
  ...MIKE,
  slug: "tommy",
  name: 'tommy "the mask" c.',
  league: "NHL",
  tag: "professional · ice & pucks",
  homeImage: nhl,
  homeName: 'Tommy "The Mask" C.',
  homeRole: "NHL • 9 yrs",
  heroVideo: tommyHeroVideo,
  active: true,
};
