import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ClickBody {
  placement?: string;
  book?: string;
  destination_url?: string;
  page?: string;
  referrer?: string | null;
  user_agent?: string | null;
}

const parseDevice = (ua: string): string => {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
};
const parseBrowser = (ua: string): string => {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  if (/Firefox/i.test(ua)) return "Firefox";
  return "Other";
};
const parseOS = (ua: string): string => {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iOS/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const body: ClickBody = await req.json().catch(() => ({}));
    const placement = (body.placement || "unknown").slice(0, 100);
    const book = (body.book || "unknown").slice(0, 100);
    const destination_url = (body.destination_url || "").slice(0, 1000);
    const page = body.page ? String(body.page).slice(0, 500) : null;
    const referrer = body.referrer ? String(body.referrer).slice(0, 500) : null;
    const ua = body.user_agent || req.headers.get("user-agent") || "";

    const country = req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country") || null;
    const region  = req.headers.get("cf-region")    || req.headers.get("x-vercel-ip-country-region") || null;
    const city    = req.headers.get("cf-ipcity")    || req.headers.get("x-vercel-ip-city") || null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("affiliate_clicks").insert({
      placement,
      book,
      destination_url,
      page,
      referrer,
      country,
      region,
      city,
      device: parseDevice(ua),
      browser: parseBrowser(ua),
      os: parseOS(ua),
    });

    if (error) console.error("track-click insert error:", error);

    return new Response(JSON.stringify({ ok: !error }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-click error:", e);
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
