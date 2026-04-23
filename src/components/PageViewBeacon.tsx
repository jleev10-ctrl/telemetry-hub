import { useEffect } from "react";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/27340465/ujnzwlp/";

/**
 * Silently fires a Page_View event to Zapier on every page load.
 * Guarded with sessionStorage so React strict-mode double-mounts don't double-fire.
 */
export const PageViewBeacon = () => {
  useEffect(() => {
    const key = `pv_fired_${window.location.pathname}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify({
        event: "Page_View",
        path: window.location.pathname,
        url: window.location.href,
        referrer: document.referrer || null,
        timestamp: new Date().toISOString(),
        source: window.location.origin,
      }),
    }).catch((err) => console.error("Page_View webhook error:", err));
  }, []);

  return null;
};
