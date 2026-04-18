interface HeaderBarProps {
  onJoin: () => void;
}

export const HeaderBar = ({ onJoin }: HeaderBarProps) => (
  <header className="sticky top-0 z-50 flex items-center justify-between gap-2 h-[52px] px-2.5 bg-background border-b border-syndicate">
    <div className="shrink-0 bg-green text-background font-black text-[15px] tracking-[1px] py-[7px] px-2.5">
      $$$
    </div>
    <div className="flex-1 border-[1.5px] border-green text-center py-[5px] px-2">
      <div className="text-[13px] font-black text-green tracking-[3px]">GRAND 13</div>
      <div className="text-[9px] text-muted-foreground tracking-[2px] uppercase">The Sports Syndicate</div>
    </div>
    <button
      onClick={onJoin}
      className="shrink-0 bg-green text-background font-black text-[11px] py-[7px] px-3 tracking-[1px] uppercase leading-[1.3] hover:bg-green-dim transition-colors"
    >
      JOIN<br />FREE
    </button>
  </header>
);
