import { ExpertCard, ExpertSocket, type Expert } from "./ExpertCard";
import ironmike from "@/assets/ironmike.jpg";
import swoosh from "@/assets/swoosh.jpg";
import sarah from "@/assets/sarah.jpg";
import mlb from "@/assets/mlb.jpg";
import nhl from "@/assets/nhl.jpg";

const experts: Expert[] = [
  {
    initials: "IM", name: '"Iron" Mike K.', role: "NFL • 15 yrs", badge: "✓ Verified",
    winPct: "83%", record: "22-4", units: "+29.5u", pick: "Raiders +3.5", image: ironmike,
  },
  {
    initials: "DJ", name: '"Swoosh" D. James', role: "NBA • 8 yrs", badge: "HOT", badgeHot: true,
    winPct: "76%", record: "19-6", units: "+21u", pick: "Lakers ML", image: swoosh,
  },
  {
    initials: "SS", name: '"Stats" Sarah', role: "MLB • Clinical Quant", badge: "✓ Verified",
    winPct: "79%", record: "22-6", units: "+18u", pick: "Reds ML +107", image: sarah,
  },
  {
    initials: "RB", name: 'Rick "The Baseburner" B.', role: "MLB • 11 yrs", badge: "✓ Diamond",
    winPct: "71%", record: "24-10", units: "+29.5u", pick: "Dodgers ML", image: mlb,
  },
  {
    initials: "TC", name: 'Tommy "The Mask" C.', role: "NHL • 9 yrs", badge: "✓ Ice & Pucks",
    winPct: "68%", record: "21-10", units: "+22.5u", pick: "Rangers ML", image: nhl,
  },
];

export const InfluencerGrid = () => (
  <section className="px-2.5 pb-4">
    <div className="pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground tracking-[3px] uppercase">
      AI Influencer Picks
    </div>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-2 mt-2">
      {experts.map((e) => (
        <ExpertCard key={e.name} expert={e} />
      ))}
      <ExpertSocket />
    </div>
  </section>
);
