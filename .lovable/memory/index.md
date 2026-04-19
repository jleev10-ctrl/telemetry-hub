# Memory: index.md
Updated: now

# Project Memory

## Core
GOLDEN RULE: One step at a time. Propose → wait for approval → execute → confirm → propose next. Never bundle.
Keep the build clean, lean, minimal. No dead files, no unused imports, no orphaned components.
Live featured-driver card is `DriverCard` (used in `Index.tsx`). `FeaturedDriver.tsx` is NOT mounted — do not edit it expecting the page to change.
Source of truth for original UI = uploaded `index-2.html` (1218 lines, full original). `lovable.html` is deprecated.
Home `ExpertCard` = stripped clean: image (4/5 aspect, object-top) + "TAP TO ENGAGE" pill under it. NO stats overlay, NO badges, NO full-bleed gradient. User explicitly killed that layer.
Each home card links to its bucket (`/drivers/<slug>`). Mike bucket exists; Swoosh/Sarah/Baseburner/Tommy buckets to be built from Mike's template.

## Checkpoint (resume here)
ExpertCard simplified ✓. Next: tweak cards per user feedback, then scale buckets (NBA Swoosh next), then backend plumbing.
