import type { Driver } from "./types";
import nhl from "@/assets/nhl.jpg";
import tommyHeroVideo from "@/assets/tommy-hero.mp4";
import { MIKE } from "./mike";

// Mirrors Mike's bucket exactly (same as Sarah & Swoosh pattern).
// Tommy owns the hero identity + hero video.
export const TOMMY: Driver = {
  ...MIKE,
  slug: "tommy",
  name: 'NHL',
  league: "NHL",
  tag: "professional · ice & pucks",
  homeImage: nhl,
  homeName: 'NHL',
  homeRole: 'NHL',
  heroVideo: tommyHeroVideo,
  active: false,
};
