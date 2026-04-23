import type { Driver } from "./types";
import sarah from "@/assets/sarah.jpg";
import sarahAgreeDisagreeVideo from "@/assets/sarah-agree-disagree.mp4";
import { MIKE } from "./mike";

// Placeholder — uses Mike's bucket data until Sarah's bucket is built.
// Keep Mike's structure, but Sarah owns the hero identity + hero video.
export const SARAH: Driver = {
  ...MIKE,
  slug: "sarah",
  name: '"stats" sarah',
  league: "MLB",
  tag: "clinical · quant",
  homeImage: sarah,
  homeName: '"Stats" Sarah',
  homeRole: "MLB • Clinical Quant",
  heroVideo: sarahAgreeDisagreeVideo,
};
