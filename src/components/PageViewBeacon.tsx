import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/27340465/ujnzwlp/";

/**
 * Fires a Page_View on every route change.
 * - Pings Zapier (legacy, kept per no-delete rule)
 * - Pings our own Supabase counter via track-pageview edge function
 * Guarded with sessionStorage so React strict-mode double-mounts don't double-fire.
 */
export const PageViewBeacon = () => {
  const location = useLocation();

  useEffect(() => {
    const key = `pv_fired_${location.pathname}${location.search}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const url = new URL(window.location.href);
    const utm_source = url.searchParams.get("utm_source");
    const utm_medium = url.searchParams.get("utm_medium");
    const utm_campaign = url.searchParams.get("utm_campaign");

    // 1) Our own counter
    supabase.functions
      .invoke("track-pageview", {
        body: {
          path: location.pathname,
          referrer: document.referrer || null,
          utm_source,
          utm_medium,
          utm_campaign,
          user_agent: navigator.userAgent,
        },
      })
      .catch((err) => console.error("track-pageview error:", err));

    // 2) Legacy Zapier hook (kept)
    fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify({
        event: "Page_View",
        path: location.pathname,
        url: window.location.href,
        referrer: document.referrer || null,
        timestamp: new Date().toISOString(),
        source: window.location.origin,
      }),
    }).catch((err) => console.error("Page_View webhook error:", err));
  }, [location.pathname, location.search]);

  return null;
};

