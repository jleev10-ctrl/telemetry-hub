# Memory: index.md
Updated: now

# Project Memory

## Core
GOLDEN RULE: One step at a time. Propose → wait for approval → execute → confirm → propose next. Never bundle.
Keep the build clean, lean, minimal. No dead files, no unused imports, no orphaned components.
Live featured-driver card is `DriverCard` (used in `Index.tsx`). `FeaturedDriver.tsx` is NOT mounted — do not edit it expecting the page to change.
User likes the current card design — preserve its look.

## Checkpoint (saved 2026-04-19)
Home (`/`) flow is locked and approved:
- Top: header + PartnersBar (exactly 5 partners: DraftKings, FanDuel, BetMGM, Caesars, BET365). Do NOT add more.
- Body: stacked `ExpertCard`s (5 experts), each wrapped in `<Link to="/drivers/:slug">`. Card image (nfl.jpg, nba.jpg, mlb.jpg, nhl.jpg) IS the tap target → goes to that expert's bucket.
- `ExpertCard` has no in-place voice toggle — "Tap for Voice" is purely visual; the Link handles navigation.
- Mike's bucket (`MikeBucket.tsx`) is the perfect template. All other slugs currently load it as placeholder.

## Next phase
Build a unique bucket per expert by swapping sport content (Swoosh=NBA, Sarah=MLB, Baseburner=MLB, Tommy=NHL) using Mike's bucket as the template. After buckets, scale to hosting + backend (ElevenLabs voices, etc).

## Memories
(none yet — add as project grows)
