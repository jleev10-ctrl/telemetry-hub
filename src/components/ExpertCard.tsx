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

