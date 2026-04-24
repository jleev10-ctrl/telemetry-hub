# Project Memory

## Core
GOLDEN RULE: One step at a time. Propose → wait for approval → execute → confirm → propose next. Never bundle.
NEVER auto-delete files/components/code — even if orphaned. Always ask first.
ALL drivers live in `src/data/drivers/` — one file per driver (mike.ts, swoosh.ts, sarah.ts, baseburner.ts, tommy.ts) + types.ts + index.ts. Public API: `import { DRIVERS_LIST, DRIVERS, getDriver, type Driver } from "@/data/drivers"`.
ALL bucket pages render through ONE component: `src/pages/BucketPage.tsx` (route `/drivers/:slug`).
Home grid (`InfluencerGrid`) reads from `DRIVERS_LIST` — adding a driver = new file in `src/data/drivers/` + append to DRIVERS_LIST in index.ts.
Driver bucket gating: `active?: boolean` on Driver. `active: false` → home card renders but click is dead (no nav). Currently Mike + Sarah are `active: false`. Flip to `true` to open the bucket route.
Shared bucket UI: `DriverImageBox`, `DriverTelemetryBox`. Telemetry label + ticker callout fed via props.
User likes the current card design — preserve its look.
Age verification feature is parked (not active) — keep in mind for later.
`index-3.html` (1218 lines) = baseline reference only — do NOT overwrite our buckets/improvements with it.
GitHub sync: ACTIVE. Repo on user's account. Every change auto-pushes.

## Checkpoint (current Home stack, top → bottom)
Header: $$$ link · GRAND13 wide banner link · JOIN FREE button.
Body: PartnersNode → TickersNode → InfluencerGrid (5 cards from DRIVERS_LIST) → Grand13Hero → PartnersNode → LegalNode.

## Bucket page (shared)
Route `/drivers/:slug` → `BucketPage.tsx`. Fully active drivers: mike, swoosh, baseburner, tommy. Placeholder: sarah (uses Mike's bucket data, only home card differs). To activate Sarah = build her own object in `src/data/drivers/sarah.ts`.
Layout: Header → DriverImageBox → DriverTelemetryBox → TodaysBoardBox → League Live Board → Bets → PartnersNode → LegalNode → Back-to-home.

## Components (live)
PartnersNode, TickersNode, Grand13Hero, LegalNode, InfluencerGrid, ExpertCard, JoinModal, DriverImageBox, DriverTelemetryBox, TodaysBoardBox, BucketPage.

## Memories
- [No auto-delete](mem://preferences/no-auto-delete) — never remove files/code without explicit approval
- [Bucket architecture](mem://features/bucket-architecture) — one BucketPage + per-driver files in src/data/drivers/, never inline driver data in pages
