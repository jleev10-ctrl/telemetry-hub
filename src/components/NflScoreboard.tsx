import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ESPN_URL = "https://www.espn.com/nfl/scoreboard";

export const NflScoreboard = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blocked, setBlocked] = useState(false);

  // ESPN sets X-Frame-Options. The iframe's onLoad never fires when blocked,
  // so we use a timeout to detect failure and show the fallback button.
  useEffect(() => {
    const t = window.setTimeout(() => {
      // If iframe never loaded its document, treat as blocked.
      try {
        // Cross-origin access throws — that's actually a sign it DID load.
        // If it's blocked, contentDocument is same-origin (about:blank).
        const doc = iframeRef.current?.contentDocument;
        if (doc && doc.URL === "about:blank") setBlocked(true);
      } catch {
        // Cross-origin = ESPN loaded successfully.
      }
    }, 3500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="hud-panel border border-hud/30 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-hud/20 bg-secondary/40">
        <span className="font-mono text-[10px] tracking-[0.3em] text-hud">
          NFL · LIVE SCORES · ESPN
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-win">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-win" />
          live
        </span>
      </div>

      {/* Iframe (with fallback) */}
      {!blocked ? (
        <div className="relative bg-background">
          <iframe
            ref={iframeRef}
            src={ESPN_URL}
            title="ESPN NFL Live Scoreboard"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="block w-full h-[700px] border-0"
          />
        </div>
      ) : (
        <div className="px-4 py-8 text-center space-y-3 bg-background">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            ESPN blocks in-page embedding
          </p>
          <Button
            asChild
            className="bg-gradient-to-b from-[hsl(45_100%_60%)] to-[hsl(40_95%_45%)] text-background font-bold uppercase tracking-widest text-xs shadow-[0_0_18px_hsl(45_100%_55%/0.5)]"
          >
            <a href={ESPN_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              open ESPN scoreboard
            </a>
          </Button>
        </div>
      )}

      {/* Footer attribution + new-tab link always available */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-hud/20 bg-secondary/40">
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          source: espn.com
        </span>
        <a
          href={ESPN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-widest text-hud hover:text-win uppercase inline-flex items-center gap-1"
        >
          open in new tab
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </section>
  );
};
