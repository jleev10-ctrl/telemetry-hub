import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PASSWORD = "OLDMAN2026";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json().catch(() => ({ password: "" }));
    if (password !== PASSWORD) {
      return new Response(JSON.stringify({ error: "Wrong password" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setUTCHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total counts
    const [{ count: totalAll }, { count: totalWeek }, { count: totalToday }] = await Promise.all([
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo.toISOString()),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString()),
    ]);

    // Pull last 1000 rows to aggregate (small site, fine for now)
    const { data: rows } = await supabase
      .from("page_views")
      .select("path, referrer, country, city, device, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    const tally = (key: string, list: any[] | null) => {
      const counts: Record<string, number> = {};
      (list || []).forEach((r) => {
        const v = r[key] || "(unknown)";
        counts[v] = (counts[v] || 0) + 1;
      });
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([label, count]) => ({ label, count }));
    };

    const cleanReferrer = (rows || []).map((r) => ({
      ...r,
      referrer: r.referrer
        ? (() => {
            try {
              return new URL(r.referrer).hostname;
            } catch {
              return r.referrer;
            }
          })()
        : "(direct)",
    }));

    // Affiliate click totals + breakdowns
    const [{ count: clicksAll }, { count: clicksWeek }, { count: clicksToday }] = await Promise.all([
      supabase.from("affiliate_clicks").select("*", { count: "exact", head: true }),
      supabase.from("affiliate_clicks").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo.toISOString()),
      supabase.from("affiliate_clicks").select("*", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString()),
    ]);

    const { data: clickRows } = await supabase
      .from("affiliate_clicks")
      .select("placement, book, destination_url, page, country, city, device, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    const stats = {
      totals: {
        today: totalToday || 0,
        week: totalWeek || 0,
        all: totalAll || 0,
      },
      topPages: tally("path", rows),
      topCountries: tally("country", rows),
      topReferrers: tally("referrer", cleanReferrer),
      topDevices: tally("device", rows),
      recent: (rows || []).slice(0, 20).map((r) => ({
        path: r.path,
        country: r.country,
        city: r.city,
        device: r.device,
        referrer: r.referrer
          ? (() => {
              try {
                return new URL(r.referrer).hostname;
              } catch {
                return r.referrer;
              }
            })()
          : "(direct)",
        at: r.created_at,
      })),
      clicks: {
        totals: {
          today: clicksToday || 0,
          week: clicksWeek || 0,
          all: clicksAll || 0,
        },
        topPlacements: tally("placement", clickRows),
        topBooks: tally("book", clickRows),
        recent: (clickRows || []).slice(0, 20).map((r) => ({
          placement: r.placement,
          book: r.book,
          page: r.page,
          country: r.country,
          city: r.city,
          device: r.device,
          at: r.created_at,
        })),
      },
    };

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("read-stats error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
