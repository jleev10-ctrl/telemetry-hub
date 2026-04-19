const partners = [
  { name: "DraftKings", cls: "bg-[#1E6B3C] text-white" },
  { name: "FanDuel", cls: "bg-[#1565C0] text-white" },
  { name: "BetMGM", cls: "bg-[#E65100] text-white" },
  { name: "Caesars", cls: "bg-[#B71C1C] text-white" },
  { name: "BET365", cls: "bg-[#F9A825] text-[#111]" },
];

export const PartnersBar = () => (
  <div className="bg-card border-b border-syndicate py-[7px] px-2.5 text-center">
    <span className="block text-[9px] text-muted-foreground tracking-[3px] uppercase mb-[5px]">Partners</span>
    <div className="grid grid-cols-5 gap-[3px]">
      {partners.map((p) => (
        <a
          key={p.name}
          href="#"
          className={`py-[5px] px-[2px] text-[10px] sm:text-[11px] font-bold rounded-[2px] text-center hover:opacity-75 transition-opacity ${p.cls}`}
        >
          {p.name}
        </a>
      ))}
    </div>
  </div>
);
