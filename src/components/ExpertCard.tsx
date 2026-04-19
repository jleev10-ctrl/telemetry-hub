export interface Expert {
  initials: string;
  name: string;
  role: string;
  badge: string;
  badgeHot?: boolean;
  badgeLeader?: boolean;
  winPct: string;
  record: string;
  units: string;
  pick: string;
  image?: string;
}

interface Props {
  expert: Expert;
}

export const ExpertCard = ({ expert }: Props) => {
  return (
    <article className="relative bg-card overflow-hidden rounded-2xl border border-syndicate hover:border-green/40 transition-all cursor-pointer active:scale-[0.98]">
      <div className="aspect-[4/5] w-full overflow-hidden bg-background">
        {expert.image && (
          <img
            src={expert.image}
            alt={`${expert.name}, ${expert.role}`}
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>
      <div className="px-4 py-3 text-center border-t border-syndicate">
        <div className="font-mono text-[13px] font-bold tracking-[0.18em] uppercase text-green">
          Tap to Engage
        </div>
      </div>
    </article>
  );
};

export const ExpertSocket = () => (
  <div className="bg-card border border-dashed border-[#222] rounded-2xl flex flex-col items-center justify-center gap-2 min-h-[200px] cursor-pointer hover:border-[#444] transition-colors">
    <div className="w-9 h-9 rounded-full border border-dashed border-[#333] grid place-items-center text-[18px] text-[#333]">
      +
    </div>
    <span className="text-[10px] text-[#333] tracking-[2px] uppercase">Slot 6</span>
  </div>
);
