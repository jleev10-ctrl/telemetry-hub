export const LiveFeed = () => (
  <div className="border-b border-syndicate">
    <div className="flex items-center gap-2 py-[7px] px-2.5 border-b border-white/[0.03] text-[12px] overflow-hidden">
      <span className="bg-secondary text-green text-[10px] font-bold py-[3px] px-[7px] tracking-[1px] shrink-0 border-[0.5px] border-syndicate">
        FEED
      </span>
      <span className="text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="text-green font-bold">+3.5</span> NBA: LAKERS ML &nbsp;•&nbsp; MLB SYNDICATE: RE-LOCK
      </span>
    </div>
    <div className="flex items-center gap-2 py-[7px] px-2.5 text-[12px] overflow-hidden">
      <span className="bg-secondary text-green text-[10px] font-bold py-[3px] px-[7px] tracking-[1px] shrink-0 border-[0.5px] border-syndicate">
        G13
      </span>
      <span className="text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
        #1 <span className="text-green font-bold">83% +29.5u</span> &nbsp;•&nbsp; #2 rick "baseburner" 71% +29 &nbsp;•&nbsp; tommy "the mask" 68% +22.5u
      </span>
    </div>
  </div>
);
