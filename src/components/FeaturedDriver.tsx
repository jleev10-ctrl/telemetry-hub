import { useState } from "react";
import ironmike from "@/assets/ironmike.jpg";

export const FeaturedDriver = () => {
  const [voiceActive, setVoiceActive] = useState(false);
  const [tapped, setTapped] = useState(false);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("[Mike] speechSynthesis not available");
      return;
    }
    const doSpeak = () => {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 0.85;
      u.volume = 1;
      const voices = synth.getVoices();
      const preferred =
        voices.find((v) => /male|daniel|fred|alex|david/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (preferred) u.voice = preferred;
      console.log("[Mike] speaking:", text, "voice:", preferred?.name || "default");
      synth.speak(u);
    };
    if (synth.getVoices().length === 0) {
      synth.addEventListener("voiceschanged", doSpeak, { once: true });
      synth.speak(new SpeechSynthesisUtterance(""));
    } else {
      doSpeak();
    }
  };

  const handleTap = () => {
    console.log("[Mike] tap fired");
    setTapped(true);
    setVoiceActive(true);
    speak("Money's moving to Dallas — heavy.");
    setTimeout(() => setVoiceActive(false), 3500);
  };

  return (
    <>
      <div className="px-2.5 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground tracking-[3px] uppercase flex items-center gap-2">
        ★ Featured Driver
        <span className="text-[9px] text-green tracking-[2px] ml-auto">TAP SEQUENCE ACTIVE</span>
      </div>

      <div
        onClick={handleTap}
        className={`mx-2.5 mb-3 border-[1.5px] border-green bg-card overflow-hidden cursor-pointer transition-shadow ${
          tapped ? "shadow-[0_0_30px_hsl(var(--green)/0.6)]" : "hover:shadow-[0_0_15px_hsl(var(--green)/0.3)]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-2 px-3 border-b border-syndicate/50">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-green tracking-[1px] uppercase">
            <span className="w-2 h-2 rounded-full bg-green animate-blink" />
            Driver Online
          </div>
          <span className="bg-green text-background text-[10px] font-black py-[3px] px-2 tracking-[1px]">HOT</span>
        </div>

        {/* League */}
        <div className="flex items-center gap-1.5 py-1.5 px-3 text-[11px] font-bold text-green border-b border-syndicate/50 tracking-[1px]">
          ⚡ NFL
        </div>

        {/* Image */}
        <div className="relative w-full h-[300px] overflow-hidden bg-secondary">
          <img src={ironmike} alt='Iron "Mike" K., featured NFL analyst' className="w-full h-full object-cover object-top" />

          {/* Chart overlay */}
          <div className="absolute top-2.5 right-2.5 w-[110px] h-[55px] pointer-events-none">
            <svg viewBox="0 0 110 55" className="w-full h-full">
              <polyline
                points="0,40 15,32 30,38 45,22 60,28 75,14 90,18 110,6"
                fill="none"
                stroke="hsl(var(--green))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,40 15,32 30,38 45,22 60,28 75,14 90,18 110,6"
                fill="none"
                stroke="hsl(var(--green))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Pulse frame */}
          <div className={`absolute inset-0 pointer-events-none ${voiceActive ? "animate-frame-pulse" : ""}`} />

          {/* Voice line */}
          {voiceActive && (
            <div className="absolute top-2.5 left-2.5 right-[130px] animate-fade-in">
              <div className="bg-background/90 border border-green px-2 py-1.5">
                <div className="text-[9px] text-green tracking-[1.5px] uppercase font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                  Mike · live
                </div>
                <div className="text-[11px] text-foreground font-bold mt-0.5 italic">
                  "Money's moving to Dallas — heavy."
                </div>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-b from-transparent to-black/90">
            <div className="text-[20px] font-black text-foreground tracking-[1px]">"Iron" Mike K.</div>
            <div className="text-[11px] text-green tracking-[1px] mt-0.5">✓ Verified Analyst · 30-Day Record: 22-4 (73%)</div>
            <div className="text-[10px] text-green mt-[3px] tracking-[1px] uppercase">Trained Model · RAIDERS +3.5</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between py-2.5 px-3 border-t border-syndicate/50">
          <span className="text-[10px] text-muted-foreground tracking-[2px] uppercase">Voice chat ready</span>
          <button
            onClick={(e) => { e.stopPropagation(); setVoiceActive((v) => !v); }}
            className={`border border-green text-[11px] font-bold tracking-[2px] uppercase py-[7px] px-4 transition-colors ${
              voiceActive ? "bg-green text-background" : "bg-transparent text-green hover:bg-green hover:text-background"
            }`}
          >
            {voiceActive ? "Listening…" : "Activate Voice"}
          </button>
        </div>
      </div>
    </>
  );
};
