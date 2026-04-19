import type { Driver } from "./types";
import sarah from "@/assets/sarah.jpg";
import { MIKE } from "./mike";

// Placeholder — uses Mike's bucket data until Sarah's bucket is built.
// Only her home card identity is unique.
export const SARAH: Driver = {
  ...MIKE,
  slug: "sarah",
  homeImage: sarah,
  homeName: '"Stats" Sarah',
  homeRole: "MLB • Clinical Quant",
};
