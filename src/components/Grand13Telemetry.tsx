interface Cell {
  num: number;
  label: string;
  value?: string;
  empty?: boolean;
}

const cells: Cell[] = [
  { num: 1, label: "Iron Mike", value: "+29.5u" },
  { num: 2, label: "Baseburner", value: "+29u" },
  { num: 3, label: "Stats Sarah", value: "+18u" },
  { num: 4, label: "Tommy Mask", value: "+22.5u" },
  { num: 5, label: "Swoosh", value: "+21u" },
  { num: 6, label: "Slot Open", empty: true },
  { num: 7, label: "Slot Open", empty: true },
  { num: 8, label: "Slot Open", empty: true },
  { num: 9, label: "Slot Open", empty: true },
  { num: 10, label: "Slot Open", empty: true },
  { num: 11, label: "Slot Open", empty: true },
  { num: 12, label: "Slot Open", empty: true },
  { num: 13, label: "Slot Open", empty: true },
];

export const Grand13Telemetry = () => (
  <section className="px-2.5 pb-4">
    <div className="pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground tracking-[3px] uppercase flex items-center gap-2">
      Grand 13 — Live Telemetry
      <span className="text-[9px] text-green tracking-[2px] ml-auto animate-blink">● LIVE</span>
    </div>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] gap-[5px] mt-2">
      {cells.map((c) => (
        <div
          key={c.num}
          className={`bg-card py-2.5 px-[7px] text-center ${
            c.empty ? "border-[0.5px] border-dashed border-[#1a1a1a]" : "border-[0.5px] border-green"
          }`}
        >
          <div className="text-[16px] font-black text-green">{c.num}</div>
          <div className="text-[9px] text-muted-foreground tracking-[1px] uppercase mt-0.5">{c.label}</div>
          {c.value && <div className="text-[12px] font-bold text-foreground mt-[3px]">{c.value}</div>}
        </div>
      ))}
    </div>
  </section>
);
