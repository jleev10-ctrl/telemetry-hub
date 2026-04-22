import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ChromeBevel — reusable 3D metallic wrapper.
 *
 * Layers (outside → inside):
 *  1. Outer brushed-chrome rim (multi-stop gradient, looks like machined metal)
 *  2. Recessed inner face (inset shadows for depth)
 *  3. Top specular highlight (thin bright line — "light hitting metal")
 *  4. Optional corner rivets
 *
 * Usage:
 *   <ChromeBevel>...content...</ChromeBevel>
 *   <ChromeBevel rivets radius={16}>...</ChromeBevel>
 *   <ChromeBevel tone="dark" className="p-4">...</ChromeBevel>
 */

type ChromeTone = "steel" | "dark" | "gold";

interface ChromeBevelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer rim thickness in px. Default 3. */
  rimWidth?: number;
  /** Border radius in px for the outer shape. Default 14. */
  radius?: number;
  /** Show corner rivets. Default false. */
  rivets?: boolean;
  /** Color tone of the chrome. Default "steel". */
  tone?: ChromeTone;
  /** Inner content wrapper className (padding, layout, etc). */
  innerClassName?: string;
}

const RIM_GRADIENTS: Record<ChromeTone, string> = {
  // Bright brushed steel — top-lit
  steel:
    "linear-gradient(180deg, hsl(210 18% 82%) 0%, hsl(212 14% 58%) 28%, hsl(215 12% 32%) 68%, hsl(215 14% 18%) 100%)",
  // Dark gunmetal
  dark:
    "linear-gradient(180deg, hsl(215 14% 42%) 0%, hsl(215 16% 22%) 35%, hsl(215 20% 10%) 75%, hsl(215 22% 6%) 100%)",
  // Warm gold rim
  gold:
    "linear-gradient(180deg, hsl(45 85% 75%) 0%, hsl(42 75% 50%) 32%, hsl(38 70% 32%) 72%, hsl(32 60% 18%) 100%)",
};

const FACE_GRADIENT =
  "linear-gradient(180deg, hsl(215 18% 16%) 0%, hsl(215 20% 9%) 55%, hsl(215 22% 7%) 100%)";

export const ChromeBevel = React.forwardRef<HTMLDivElement, ChromeBevelProps>(
  (
    {
      rimWidth = 3,
      radius = 14,
      rivets = false,
      tone = "steel",
      innerClassName,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const innerRadius = Math.max(radius - rimWidth, 0);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{
          padding: rimWidth,
          borderRadius: radius,
          background: RIM_GRADIENTS[tone],
          // Subtle outer shadow + soft HUD glow
          boxShadow:
            "0 1px 0 hsl(0 0% 100% / 0.18), 0 6px 18px hsl(0 0% 0% / 0.55), 0 0 24px hsl(var(--hud) / 0.12)",
          ...style,
        }}
        {...rest}
      >
        {/* Top specular highlight — light hitting the rim */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 right-3 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.85) 50%, transparent 100%)",
          }}
        />

        {/* Optional rivets */}
        {rivets && (
          <>
            <span className="pointer-events-none absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.85)]" />
            <span className="pointer-events-none absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.85)]" />
            <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.85)]" />
            <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 shadow-[inset_0_0_2px_hsl(0_0%_0%/0.85)]" />
          </>
        )}

        {/* Recessed inner face */}
        <div
          className={cn("relative overflow-hidden", innerClassName)}
          style={{
            borderRadius: innerRadius,
            background: FACE_GRADIENT,
            boxShadow:
              "inset 0 2px 5px hsl(0 0% 0% / 0.85), inset 0 -1px 0 hsl(0 0% 100% / 0.08), inset 0 0 18px hsl(var(--hud) / 0.10)",
          }}
        >
          {/* Inner top gloss line — glass-morphism specular */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-2 right-2 top-px h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.45), transparent)",
            }}
          />
          {children}
        </div>
      </div>
    );
  },
);
ChromeBevel.displayName = "ChromeBevel";
