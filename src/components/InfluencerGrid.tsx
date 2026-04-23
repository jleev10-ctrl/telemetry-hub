import { Link } from "react-router-dom";
import { ExpertCard } from "./ExpertCard";
import { DRIVERS_LIST } from "@/data/drivers";

export const InfluencerGrid = () => (
  <section className="px-2.5 pb-4">
    <div className="pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground tracking-[3px] uppercase">
      AI Expert Picks
    </div>
    <div className="flex flex-col gap-3 mt-2">
      {DRIVERS_LIST.map((d) => {
        const card = (
          <ExpertCard
            expert={{
              initials: d.homeName.split(/\s+/).map((w) => w.replace(/[^A-Za-z]/g, "")[0]).filter(Boolean).slice(0, 2).join("") || "??",
              name: d.homeName,
              role: d.homeRole,
              badge: d.status === "HOT" ? "HOT" : "✓ Verified",
              badgeHot: d.status === "HOT",
              winPct: d.winPct,
              record: d.record,
              units: d.units,
              pick: d.games[0]?.pick ?? "",
              image: d.homeImage,
              videoSrc: d.slug === "mike" ? "/videos/mike-daily.mp4" : d.heroVideo,
            }}
          />
        );

        // Mike: video-only, no navigation. Everyone else: link to bucket.
        if (d.slug === "mike") {
          return <div key={d.slug} className="block w-full">{card}</div>;
        }
        return (
          <Link key={d.slug} to={`/drivers/${d.slug}`} className="block w-full">
            {card}
          </Link>
        );
      })}
    </div>
  </section>
);
