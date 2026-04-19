import p1 from "@/assets/g13/p1.jpg";
import p2 from "@/assets/g13/p2.jpg";
import p3 from "@/assets/g13/p3.jpg";
import p4 from "@/assets/g13/p4.jpg";
import p5 from "@/assets/g13/p5.jpg";
import p6 from "@/assets/g13/p6.jpg";
import p7 from "@/assets/g13/p7.jpg";

export interface Leader {
  rank: number;
  name: string;
  winPct: string;
  units: string;
  img: string;
}

export const leaders: Leader[] = [
  { rank: 1, name: '"Iron" Mike K.',          winPct: "83%", units: "+29.5u", img: p1 },
  { rank: 2, name: 'Rick "Baseburner" B.',    winPct: "79%", units: "+27.2u", img: p2 },
  { rank: 3, name: '"Stats" Sarah',           winPct: "78%", units: "+22.8u", img: p3 },
  { rank: 4, name: '"Swoosh" D. James',       winPct: "76%", units: "+21.0u", img: p4 },
  { rank: 5, name: 'Tommy "The Mask" C.',     winPct: "72%", units: "+18.4u", img: p5 },
  { rank: 6, name: '"The Professor" Reyes',   winPct: "70%", units: "+15.1u", img: p6 },
  { rank: 7, name: '"Vegas" V. Romano',       winPct: "68%", units: "+12.6u", img: p7 },
];

export const feedItems: [string, string][] = [
  ["SHARP $", "78% DAL"],
  ["LINE", "-3 → -2.5"],
  ["STEAM", "DAL ML"],
  ["HANDLE", "62%"],
  ["TICKETS", "71%"],
  ["RLM", "BAL UNDER"],
  ["MIKE'S CALL", "RIDE IT"],
];
