import { useRef, useState, type MouseEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";

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
  videoSrc?: string;
}

interface Props {
  expert: Expert;
}

export const ExpertCard = ({ expert }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) {
      // Unmuting: nudge a play() in case browser paused it
      v.play().catch(() => {});
    }
    setMuted(next);
  };

  return (
    <article className="relative bg-card overflow-hidden rounded-2xl border border-syndicate hover:border-green/40 transition-all cursor-pointer active:scale-[0.98]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
        {expert.videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={expert.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-top"
              aria-label={`${expert.name} live broadcast`}
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-2 right-2 z-10 grid place-items-center h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border border-syndicate text-foreground hover:bg-background/90"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-background/70 backdrop-blur-sm border border-syndicate">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-green">Live</span>
            </div>
          </>
        ) : (
          expert.image && (
            <img
              src={expert.image}
              alt={`${expert.name}, ${expert.role}`}
              className="w-full h-full object-cover object-top"
            />
          )
        )}
      </div>
      <div className="px-4 py-3 text-center border-t border-syndicate flex items-center justify-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full bg-[hsl(0_85%_55%)] shadow-[0_0_6px_hsl(0_85%_55%/0.8)]"
          aria-label="Offline"
        />
        <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[hsl(0_85%_60%)]">
          Offline
        </span>
        <span className="font-mono text-[13px] font-bold tracking-[0.18em] uppercase text-green">
          · Tap to Engage
        </span>
      </div>
    </article>
  );
};
