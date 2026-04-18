import { useState } from "react";

const tabs = ["All Sports", "NFL", "NBA", "NHL", "MLB", "Consensus", "AI Picks"];

export const NavTabs = () => {
  const [active, setActive] = useState("All Sports");
  return (
    <div className="flex bg-card border-b border-syndicate overflow-x-auto px-2.5">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`py-[10px] px-[14px] text-[11px] font-bold whitespace-nowrap border-b-2 tracking-[0.5px] uppercase transition-colors ${
            active === t
              ? "text-green border-green"
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};
