import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Expert {
  initials: string;
  name: string;
  role: string;
  badge: string;
  badgeHot?: boolean;
  winPct: string;
  record: string;
  units: string;
  pick: string;
  image?: string;
}

interface Props {
  expert: Expert;
  slug?: string;
}

export const ExpertCard = ({ expert, slug }: Props) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => setActive((a) => !a)}
      className={`relative bg-card border-[0.5px] flex flex-col overflow-hidden cursor-pointer transition-colors ${
        active ? "border-green" : "border-syndicate hover:border-green"
      }`}
    >
      <div className="relative w-full h-[140px] sm:h-[260px] md:h-[320px] overflow-hidden bg-secondary">
        {expert.image ? (
          <img src={expert.image} alt={`${expert.name}, ${expert.role}`} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full grid place-items-center text-green font-mono text-[28px] font-black opacity-60">
            {expert.initials}
          </div>
        )}
        <div
          className={`absolute top-1.5 right-1.5 bg-black/75 border-[0.5px] text-[9px] py-[2px] px-1.5 tracking-[1px] uppercase ${
            expert.badgeHot ? "text-green border-green" : "text-green border-green"
          }`}
        >
          {expert.badge}
        </div>

        {active && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute -inset-1 border-[1.5px] border-green animate-pulse-frame" />
            <span className="absolute -inset-1 border-[1.5px] border-green animate-pulse-frame" style={{ animationDelay: "0.8s" }} />
          </div>
        )}
      </div>

      <div className="p-2.5 flex-1 flex flex-col gap-[5px]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary border border-green text-[10px] font-black text-green">
            {expert.initials}
          </span>
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-foreground tracking-[0.3px] leading-[1.3] truncate">{expert.name}</div>
            <div className="text-[10px] text-green tracking-[1px] uppercase">{expert.role}</div>
          </div>
        </div>

        <div className="flex gap-2 mt-0.5">
          <div className="text-[11px]">
            <div className="font-bold text-green">{expert.winPct}</div>
            <div className="text-[9px] text-muted-foreground">Win%</div>
          </div>
          <div className="text-[11px]">
            <div className="font-bold text-green">{expert.record}</div>
            <div className="text-[9px] text-muted-foreground">30-Day</div>
          </div>
          <div className="text-[11px]">
            <div className="font-bold text-green">{expert.units}</div>
            <div className="text-[9px] text-muted-foreground">Units</div>
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground">
          Pick: <span className="text-green font-bold">{expert.pick}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (slug) navigate(`/drivers/${slug}`);
          }}
          className="border-[0.5px] border-green text-[10px] font-bold tracking-[1px] uppercase py-1.5 w-full mt-1 transition-colors bg-transparent text-green hover:bg-green hover:text-background"
        >
          Listen
        </button>
      </div>
    </div>
  );
};

export const ExpertSocket = () => (
  <div className="bg-card border-[0.5px] border-dashed border-[#222] flex flex-col items-center justify-center gap-2 min-h-[200px] cursor-pointer hover:border-[#444] transition-colors">
    <div className="w-9 h-9 rounded-full border border-dashed border-[#333] grid place-items-center text-[18px] text-[#333]">
      +
    </div>
    <span className="text-[10px] text-[#333] tracking-[2px] uppercase">Slot 6</span>
  </div>
);
