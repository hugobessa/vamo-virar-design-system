"use client";

// Brand pieces from the campaign identity, for the web: sheared colour boxes
// with a visible "depth" edge, heavy upper-case type, a star, and the flag's
// colours as small details. Mirrors ../brand.tsx.

import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { palette } from "../tokens";
import { useReducedMotion } from "./theme";
import { cn } from "./utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A burst of brand stars flying out from a point, for the moment someone
 * confirms they are going. Fires each time `trigger` changes to a new
 * positive value; renders nothing between bursts and under reduced motion.
 */
export function StarBurst({ trigger, color = palette.red }: { trigger: number; color?: string }) {
  const reduced = useReducedMotion();
  const [live, setLive] = useState(0);
  useEffect(() => {
    if (!trigger || reduced) return;
    setLive(trigger);
    const t = setTimeout(() => setLive(0), 800);
    return () => clearTimeout(t);
  }, [trigger, reduced]);
  if (!live) return null;
  return (
    <div aria-hidden className="pointer-events-none relative z-10 flex h-0 justify-center overflow-visible">
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
        const reach = 56 + (i % 3) * 14;
        const style = {
          color,
          fontSize: 18 + (i % 2) * 6,
          "--dx": `${Math.cos(angle) * reach}px`,
          "--dy": `${Math.sin(angle) * reach - 24}px`,
          "--rot": `${(i % 2 ? 1 : -1) * 120}deg`,
        } as CSSProperties;
        return (
          <span key={`${live}-${i}`} className="animate-vv-star absolute top-0 leading-none" style={style}>
            ★
          </span>
        );
      })}
    </div>
  );
}

export type BoxTone = "red" | "green" | "yellow" | "blue" | "white";
export type BoxSize = "sm" | "md" | "lg" | "xl";

// Text on green and yellow is ink, not white: white on the brand green is
// 2.6:1, below the 3:1 floor for large type.
const boxFill = cva("relative", {
  variants: {
    tone: {
      red: "bg-vv-red text-vv-white",
      green: "bg-vv-green text-vv-ink",
      yellow: "bg-vv-yellow text-vv-ink",
      blue: "bg-vv-blue text-vv-white",
      white: "bg-vv-off-white text-vv-red",
    },
    size: {
      sm: "px-2.5 py-[5px]",
      md: "px-4 py-2",
      lg: "px-6 py-3",
      xl: "px-8 py-4",
    },
  },
});

const boxDepth = cva("pointer-events-none absolute", {
  variants: {
    tone: {
      red: "bg-vv-red-dark",
      green: "bg-vv-green-dark",
      yellow: "bg-[#C9A600]",
      blue: "bg-[#001F7D]",
      white: "bg-[#CFCBD0]",
    },
    size: {
      sm: "top-[3px] -left-[3px] right-[3px] -bottom-[3px]",
      md: "top-[5px] -left-[5px] right-[5px] -bottom-[5px]",
      lg: "top-[8px] -left-[8px] right-[8px] -bottom-[8px]",
      xl: "top-[12px] -left-[12px] right-[12px] -bottom-[12px]",
    },
  },
});

const boxOuter = cva("relative w-fit", {
  variants: {
    size: {
      sm: "ml-[3px] mb-[3px]",
      md: "ml-[5px] mb-[5px]",
      lg: "ml-[8px] mb-[8px]",
      xl: "ml-[12px] mb-[12px]",
    },
    skewed: { true: "-skew-y-[11.3deg]", false: "" },
  },
});

const boxText = cva("block font-display font-black uppercase", {
  variants: {
    size: {
      sm: "text-[14px] leading-[1.05] tracking-[-0.28px]",
      md: "text-[24px] leading-[1.05] tracking-[-0.48px]",
      lg: "text-[44px] leading-[1.05] tracking-[-0.88px]",
      xl: "text-[72px] leading-[1.05] tracking-[-1.44px]",
    },
  },
});

/**
 * A colour box with a darker depth edge. Sheared by default; pass
 * `skewed={false}` when a parent (like `Wordmark`) shears the whole group so
 * the edges of neighbouring boxes stay parallel.
 */
export function BrandBox({
  tone = "red",
  size = "md",
  skewed = true,
  children,
  className,
  style,
}: {
  tone?: BoxTone;
  size?: BoxSize;
  skewed?: boolean;
  /** A string is set in the display face; pass nodes for custom content. */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn(boxOuter({ size, skewed }), className)} style={style}>
      <div className={boxDepth({ tone, size })} />
      <div className={boxFill({ tone, size })}>{typeof children === "string" ? <span className={boxText({ size })}>{children}</span> : children}</div>
    </div>
  );
}

export function Star({ size = 24, color = palette.red, className }: { size?: number; color?: string; className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block", className)} style={{ color, fontSize: size, lineHeight: 1.1 }}>
      ★
    </span>
  );
}

/** Small Brazilian flag (10:7 like the real one). */
export function Flag({ width = 40, className }: { width?: number; className?: string }) {
  const disc = `vv-flag-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg role="img" aria-label="Bandeira do Brasil" width={width} height={width * 0.7} viewBox="0 0 100 70" className={cn("block shrink-0", className)}>
      <rect width="100" height="70" fill={palette.green} />
      <polygon points="10.4,35 50,6.5 89.6,35 50,63.5" fill={palette.yellow} />
      <clipPath id={disc}>
        <circle cx="50" cy="35" r="15" />
      </clipPath>
      <circle cx="50" cy="35" r="15" fill={palette.blue} />
      <rect x="29" y="33.5" width="42" height="3" fill={palette.white} transform="rotate(-14 50 35)" clipPath={`url(#${disc})`} />
    </svg>
  );
}

/** Three-colour rule (green, yellow, blue): the flag as a detail, not a banner. */
export function FlagStripe({ height = 6, width, className }: { height?: number; width?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex", width ? "w-fit" : "w-full", className)} style={{ height, width }}>
      <div className="flex-1 bg-vv-green" />
      <div className="flex-1 bg-vv-yellow" />
      <div className="flex-1 bg-vv-blue" />
    </div>
  );
}

const wordmarkScale = { sm: 0.5, md: 0.75, lg: 1, xl: 1.5 };

/**
 * The app's lockup: VAMO / VIRAR in a red cube, a blue tag and a flag box. The
 * whole group is sheared as one piece, like the campaign cube logo.
 */
export function Wordmark({ size = "md", tagline = "Comunidade", className }: { size?: keyof typeof wordmarkScale; tagline?: string; className?: string }) {
  const k = wordmarkScale[size];
  const f = 46 * k; // font size of the two words
  const depth = 8 * k;
  const w = f * 3.5 + 36 * k; // approximate width of "VIRAR" plus padding
  const lift = Math.round(w * 0.11); // room for the shear: tan(11.3°) ≈ 0.2, half each way
  return (
    <div role="img" aria-label={`Vamo Virar, ${tagline}`} className={cn("w-fit", className)} style={{ width: w + depth * 2, paddingBlock: lift + depth, paddingLeft: depth }}>
      <div className="relative -skew-y-[11.3deg]" style={{ width: w }}>
        <div className="pointer-events-none absolute bg-vv-red-dark" style={{ top: depth, left: -depth, right: depth, bottom: -depth - 14 * k }} />
        <div className="relative bg-vv-red" style={{ paddingInline: 18 * k, paddingTop: 12 * k, paddingBottom: 22 * k }}>
          {["VAMO", "VIRAR"].map((word) => (
            <span key={word} className="block overflow-hidden font-display font-black whitespace-nowrap text-vv-white" style={{ fontSize: f, lineHeight: 1, letterSpacing: -2 * k }}>
              {word}
            </span>
          ))}
          <div className="absolute" style={{ top: 8 * k, right: 12 * k }}>
            <Star size={20 * k} color={palette.white} />
          </div>
        </div>
        <div className="relative flex items-start" style={{ marginTop: -14 * k, marginLeft: 22 * k, gap: 6 * k }}>
          <BrandBox tone="blue" size="sm" skewed={false}>
            {tagline}
          </BrandBox>
          <BrandBox tone="green" size="sm" skewed={false} className="ml-0">
            <Flag width={26 * k + 8} />
          </BrandBox>
        </div>
      </div>
    </div>
  );
}

export const displayVariants = cva("font-condensed font-black uppercase", {
  variants: {
    tone: {
      text: "text-foreground",
      brand: "text-brand",
      onBrand: "text-vv-white",
      green: "text-brand-green-dark",
    },
    size: {
      jumbo: "text-[120px] leading-[108px] tracking-[-2.4px]",
      display: "text-[88px] leading-[80px] tracking-[-1.76px]",
      h1: "text-[56px] leading-[52px] tracking-[-1.12px]",
      h2: "text-[36px] leading-[36px] tracking-[-0.72px]",
    },
    align: { left: "text-left", center: "text-center" },
  },
  defaultVariants: { tone: "text", size: "h1" },
});

const displayFont = { jumbo: 120, display: 88, h1: 56, h2: 36 } as const;

/** Upper-case heavy headline in the condensed face, optionally sheared. */
export function Display({
  children,
  tone,
  size = "h1",
  skewed,
  align,
  as: Tag = "h2",
  className,
}: VariantProps<typeof displayVariants> & {
  children: ReactNode;
  skewed?: boolean;
  /** Heading level; `h2` by default. */
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  // The shear drops the left end and lifts the right end of the box by
  // tan(11.3°) / 2 ≈ 0.1 of its width; leave room for both so the headline
  // never runs into what is above or below it, however wide it gets.
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!skewed || !el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => e && setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [skewed]);
  const lift = Math.max(displayFont[size ?? "h1"] * 0.25, width * 0.1 + 4);
  return (
    <Tag
      ref={ref}
      className={cn(displayVariants({ tone, size, align }), skewed && "w-fit max-w-full -skew-y-[11.3deg]", skewed && align === "center" && "mx-auto", className)}
      style={skewed ? { marginBlock: lift } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Small spaced-out label above a section title. */
export function Eyebrow({ children, color, className }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <p className={cn("font-display text-xs font-extrabold tracking-[2.5px] text-muted-foreground uppercase", className)} style={color ? { color } : undefined}>
      {children}
    </p>
  );
}
