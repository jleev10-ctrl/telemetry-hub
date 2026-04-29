// Fire-and-forget outbound affiliate click logger.
// Uses navigator.sendBeacon when available so the request survives navigation.
// Never blocks the click — link still opens normally.

const FN_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/track-click`;

export interface AffiliateClickPayload {
  placement: string; // e.g. "nfl_bet_bucket", "home_partners_node", "casino_partners"
  book: string;      // e.g. "draftkings"
  destination_url: string;
}

export const trackAffiliateClick = (p: AffiliateClickPayload) => {
  try {
    const body = JSON.stringify({
      placement: p.placement,
      book: p.book,
      destination_url: p.destination_url,
      page: typeof window !== "undefined" ? window.location.pathname : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(FN_URL, blob);
      return;
    }

    // Fallback — keepalive lets the request finish during page navigation
    fetch(FN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block the click
  }
};

// Convenience handler for <a> elements
export const useAffiliateClick = () => {
  return (p: AffiliateClickPayload) => trackAffiliateClick(p);
};
