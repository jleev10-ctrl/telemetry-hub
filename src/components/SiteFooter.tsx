export const SiteFooter = () => (
  <footer className="bg-background border-t border-syndicate/50 py-5 px-2.5 text-center">
    <div className="text-[11px] text-green tracking-[3px] uppercase font-bold mb-1">
      Synthetic Sports Syndicate
    </div>
    <div className="text-[10px] text-[#444] tracking-[1px] mb-3">
      syntheticsportssyndicate.com · synthetic-sports-syndicate.com · Beta Build April 2026
    </div>
    <div className="flex gap-3 justify-center flex-wrap mb-2.5">
      {["Grand 13", "Experts", "FanDuel", "DraftKings", "BetMGM", "Caesars", "BET365", "Contact"].map((l) => (
        <a key={l} href="#" className="text-[10px] text-[#444] tracking-[1px] uppercase hover:text-green transition-colors">
          {l}
        </a>
      ))}
    </div>
    <div className="text-[9px] text-[#222] max-w-[580px] mx-auto leading-[1.6]">
      Synthetic Sports Syndicate is a sports data and analytics platform and conduit to established
      third-party platforms. This site does not offer gambling services. All partner links direct to
      independent regulated platforms. Please review each platform's terms before participating. 21+.
    </div>
  </footer>
);
