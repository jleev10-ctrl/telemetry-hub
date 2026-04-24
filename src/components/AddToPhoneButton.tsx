import { useEffect, useState } from "react";
import appIcon from "@/assets/app-icon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Lightweight PWA install prompt event type
type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export const AddToPhoneButton = () => {
  const [open, setOpen] = useState(false);
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) setPlatform("ios");
    else if (/Android/i.test(ua)) setPlatform("android");
    else setPlatform("desktop");

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const handleClick = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Add app to phone"
        className="group relative shrink-0 rounded-full p-[2px] bg-gradient-to-b from-[hsl(45_100%_60%)] to-[hsl(45_100%_30%)] shadow-[0_0_8px_hsl(45_100%_55%/0.5)] hover:brightness-110 transition"
      >
        <img
          src={appIcon}
          alt="Add Synthetic Syndicate to phone"
          className="h-7 w-7 rounded-full block"
        />
        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[hsl(var(--hud))] shadow-[0_0_4px_hsl(var(--hud))] animate-pulse" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono uppercase tracking-widest">
              Add to Phone
            </DialogTitle>
            <DialogDescription>
              Install Synthetic Syndicate as an app on your home screen.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-2">
            <img src={appIcon} alt="App icon" className="h-14 w-14 rounded-xl" />
            <div className="text-sm space-y-1">
              {platform === "ios" && (
                <>
                  <p>1. Tap the <strong>Share</strong> icon in Safari.</p>
                  <p>2. Choose <strong>Add to Home Screen</strong>.</p>
                </>
              )}
              {platform === "android" && (
                <>
                  <p>1. Tap the <strong>⋮ menu</strong> in Chrome.</p>
                  <p>2. Choose <strong>Add to Home screen</strong>.</p>
                </>
              )}
              {platform === "desktop" && (
                <p>Open this site on your phone, then use your browser's "Add to Home Screen" option.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
