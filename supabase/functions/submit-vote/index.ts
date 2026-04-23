// Silent IP-locked voting endpoint for Grand 13.
// - Hashes the caller IP (SHA-256) — raw IP is never stored.
// - One vote per (contest_id, ip_hash) per 24 hours.
// - Returns { ok: true } on accept, { ok: false, reason: "rate_limited" } on duplicate.
// - Frontend UI is intentionally NOT wired up yet.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getClientIp = (req: Request): string => {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
};

const sha256 = async (input: string): Promise<string> => {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, reason: "method_not_allowed" }, 405);
  }

  let body: { contest_id?: unknown; choice?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, reason: "bad_json" }, 400);
  }

  const contest_id =
    typeof body.contest_id === "string" ? body.contest_id.trim() : "";
  const choice =
    typeof body.choice === "string" ? body.choice.trim().toLowerCase() : "";

  if (!contest_id || contest_id.length > 64) {
    return json({ ok: false, reason: "invalid_contest" }, 400);
  }
  if (choice !== "agree" && choice !== "disagree") {
    return json({ ok: false, reason: "invalid_choice" }, 400);
  }

  const ip = getClientIp(req);
  // Salt with the project ref so hashes aren't portable / rainbow-table-able.
  const salt = Deno.env.get("SUPABASE_URL") ?? "ssyn";
  const ip_hash = await sha256(`${salt}|${ip}`);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Has this ip_hash voted on this contest in the last 24h?
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: existing, error: selErr } = await supabase
    .from("votes")
    .select("id")
    .eq("contest_id", contest_id)
    .eq("ip_hash", ip_hash)
    .gte("created_at", since)
    .limit(1);

  if (selErr) {
    console.error("select error:", selErr);
    return json({ ok: false, reason: "server_error" }, 500);
  }
  if (existing && existing.length > 0) {
    // Silent rejection — same shape as success so it's not obvious from outside.
    return json({ ok: false, reason: "rate_limited" }, 200);
  }

  const { error: insErr } = await supabase.from("votes").insert({
    contest_id,
    ip_hash,
    choice,
    user_agent: req.headers.get("user-agent")?.slice(0, 256) ?? null,
  });

  if (insErr) {
    console.error("insert error:", insErr);
    return json({ ok: false, reason: "server_error" }, 500);
  }

  return json({ ok: true });
});
