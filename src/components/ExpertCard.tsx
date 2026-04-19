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
  const badgeClass = expert.badgeLeader
    ? "bg-[hsl(45_93%_58%/0.15)] text-[hsl(45_93%_58%)] border-[hsl(45_93%_58%/0.4)]"
    : expert.badgeHot
    ? "bg-[hsl(142_76%_50%/0.15)] text-green border-[hsl(142_76%_50%/0.4)]"
    : "bg-[hsl(217_91%_67%/0.15)] text-[hsl(217_91%_67%)] border-[hsl(217_91%_67%/0.4)]";

  const avatarClass = expert.badgeLeader
    ? "bg-[hsl(45_93%_58%/0.1)] text-[hsl(45_93%_58%)] border-[hsl(45_93%_58%/0.3)]"
    : expert.badgeHot
    ? "bg-[hsl(142_76%_50%/0.1)] text-green border-[hsl(142_76%_50%/0.3)]"
    : "bg-[hsl(217_91%_67%/0.1)] text-[hsl(217_91%_67%)] border-[hsl(217_91%_67%/0.3)]";

  return (
    <article
      className={`relative bg-card overflow-hidden rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
        expert.badgeLeader
          ? "border-[hsl(45_93%_58%/0.3)]"
          : "border-syndicate hover:border-green/40 hover:shadow-[0_0_24px_hsl(142_76%_50%/0.08)]"
      }`}
      style={{ minHeight: "calc(100svh - 240px)" }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 z-[1] bg-background overflow-hidden">
        {expert.image && (
          <img
            src={expert.image}
            alt={`${expert.name}, ${expert.role}`}
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.82) saturate(0.88)" }}
          />
        )}
        {/* readable bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-card to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Top-right badge */}
      <div
        className={`absolute top-3 right-3 z-[4] text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-[3px] rounded border font-mono ${badgeClass}`}
      >
        {expert.badge}
      </div>

      {/* Body pinned to bottom */}
      <div className="absolute bottom-0 inset-x-0 z-[3] px-[18px] pt-[14px] pb-4 bg-gradient-to-t from-card via-card/90 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`w-[42px] h-[42px] rounded-full grid place-items-center font-mono text-sm font-bold border shrink-0 ${avatarClass}`}
          >
            {expert.initials}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[17px] font-bold text-foreground tracking-[0.02em] truncate">
              {expert.name}
            </div>
            <div className="text-[12px] text-muted-foreground truncate">{expert.role}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-3.5 p-3 rounded-lg bg-black/25 border border-white/[0.04]">
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-green">{expert.winPct}</div>
            <div className="text-[10px] text-muted-foreground tracking-wide">Win%</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-foreground">{expert.record}</div>
            <div className="text-[10px] text-muted-foreground tracking-wide">30-Day</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-green">{expert.units}</div>
            <div className="text-[10px] text-muted-foreground tracking-wide">Units</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-[12px] text-muted-foreground min-w-0 truncate">
            Pick: <strong className="text-green font-semibold">{expert.pick}</strong>
          </div>
          <div
            className={`font-mono text-[12px] font-bold tracking-[0.06em] uppercase px-4 py-[7px] rounded-md border whitespace-nowrap ${
              expert.badgeLeader
                ? "text-[hsl(45_93%_58%)] border-[hsl(45_93%_58%/0.4)]"
                : "text-green border-green/40"
            }`}
          >
            Tap to Engage
          </div>
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
