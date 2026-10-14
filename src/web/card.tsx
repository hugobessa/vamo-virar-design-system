"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps, KeyboardEvent } from "react";
import { cn } from "./utils";

/**
 * A card. `accent` adds a brand-coloured edge on the left, for cards that open
 * something. With `onClick` (or `asChild` around a link) it rises a little
 * under the pointer and dips when pressed.
 */
export function Card({ className, accent, asChild, onClick, onKeyDown, ...props }: ComponentProps<"div"> & { accent?: boolean; asChild?: boolean }) {
  const interactive = !!onClick || !!asChild;
  const Comp = asChild ? Slot.Root : "div";
  const keys = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            e.currentTarget.click();
          }
        },
      }
    : { onKeyDown };
  return (
    <Comp
      data-slot="card"
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground",
        accent && "border-l-[6px] border-l-brand",
        interactive &&
          "cursor-pointer transition-[translate,scale,opacity,border-color] duration-[120ms] ease-vv-out hover:-translate-y-0.5 hover:border-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none active:translate-y-0 active:scale-[0.985] active:opacity-85 motion-off:transition-none",
        className,
      )}
      onClick={onClick}
      {...keys}
      {...props}
    />
  );
}

export const chipVariants = cva("inline-flex w-fit items-center rounded-full bg-chip px-3 py-1 text-sm font-semibold", {
  variants: {
    tone: {
      neutral: "text-foreground",
      ok: "text-ok",
      warn: "text-warn",
      danger: "text-destructive",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export type ChipTone = NonNullable<VariantProps<typeof chipVariants>["tone"]>;

/** A small rounded label (shadcn's Badge). */
export function Chip({ className, tone, ...props }: ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span data-slot="chip" className={cn(chipVariants({ tone }), className)} {...props} />;
}

/** A small round count, in the brand colour. */
export function CountBadge({ n, className }: { n: number; className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-[5px] text-xs font-extrabold text-vv-white", className)}>
      {n > 99 ? "99+" : n}
    </span>
  );
}

/**
 * A strip of figures at the top of a board: each a number over its label,
 * sharing the width. `tone` colours a number that asks for attention; a zero
 * stays quiet whatever its tone.
 */
export function Stats({ items, className }: { items: { value: number; label: string; tone?: "warn" | "danger" | "ok" }[]; className?: string }) {
  return (
    <div className={cn("flex gap-2 medium:gap-3", className)}>
      {items.map((it) => (
        <div key={it.label} role="group" aria-label={`${it.label}: ${it.value}`} className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-lg border bg-muted px-2 py-2 medium:px-3">
          <span
            aria-hidden
            className={cn(
              "font-condensed text-[28px] leading-[30px] font-black",
              it.value === 0 || !it.tone ? "text-foreground" : it.tone === "danger" ? "text-destructive" : it.tone === "warn" ? "text-warn" : "text-ok",
            )}
          >
            {it.value}
          </span>
          {/* On a phone the tiles are narrow: the label keeps its case and loses its tracking to fit. */}
          <span aria-hidden className="truncate text-[11px] font-bold text-muted-foreground medium:text-xs medium:tracking-[1px] medium:uppercase">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
