"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Collapsible as CollapsiblePrimitive, Progress as ProgressPrimitive } from "radix-ui";
import { useEffect, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { BrandBox } from "./brand";
import { Button } from "./button";
import { motion, useReducedMotion } from "./theme";
import { Body } from "./typography";
import { cn } from "./utils";

/** Slides and fades its children in when mounted. */
export function Enter({ children, delay = 0, from = 8, className }: { children: ReactNode; delay?: number; from?: number; className?: string }) {
  const style = { "--vv-enter-from": `${from}px`, animationDelay: `${delay}ms` } as CSSProperties;
  return (
    <div className={cn("animate-vv-enter motion-off:animate-none", className)} style={style}>
      {children}
    </div>
  );
}

export const bannerVariants = cva("border-l-4 py-1 pl-3 text-[15px]", {
  variants: {
    tone: {
      neutral: "border-muted-foreground text-muted-foreground",
      warn: "border-warn text-warn",
      danger: "border-destructive text-destructive",
      ok: "border-ok text-ok",
    },
  },
  defaultVariants: { tone: "neutral" },
});

/** A one-line notice with a coloured edge (shadcn's Alert). `animated` slides it in. */
export function Banner({ className, tone, animated, ...props }: ComponentProps<"div"> & VariantProps<typeof bannerVariants> & { animated?: boolean }) {
  const body = <div role="status" data-slot="banner" className={cn(bannerVariants({ tone }), className)} {...props} />;
  return animated ? <Enter from={-8}>{body}</Enter> : body;
}

/** A sheared bar that fills to `value / max` when it appears. */
export function Progress({ value, max, label, tone = "ok", className }: { value: number; max: number; label?: string; tone?: "ok" | "warn"; className?: string }) {
  const ratio = max > 0 ? Math.min(1, value / max) : 0;
  // Start empty and fill on the next frame, so the bar visibly fills.
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(ratio));
    return () => cancelAnimationFrame(raf);
  }, [ratio]);
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <ProgressPrimitive.Root value={Math.min(value, max)} max={max > 0 ? max : 1} aria-label={label} className="mx-0.5 h-2.5 -skew-x-[11.3deg] overflow-hidden bg-chip">
        <ProgressPrimitive.Indicator
          className={cn("h-full transition-[width] duration-[600ms] ease-vv-out motion-off:transition-none", tone === "ok" ? "bg-brand-green" : "bg-highlight")}
          style={{ width: `${shown * 100}%` }}
        />
      </ProgressPrimitive.Root>
      {label ? (
        <p aria-hidden className="text-sm leading-5 text-muted-foreground">
          {label}
        </p>
      ) : null}
    </div>
  );
}

/** A short confirmation that slides up and fades after a few seconds. Render the node where it should appear. */
export function useToast(): [ReactNode, (text: string) => void] {
  const reduced = useReducedMotion();
  const [toast, setToast] = useState<{ text: string; key: number; leaving: boolean } | null>(null);
  const key = toast?.key;
  useEffect(() => {
    if (key === undefined) return;
    const leave = setTimeout(() => setToast((t) => (t && t.key === key ? { ...t, leaving: true } : t)), 3500);
    const gone = setTimeout(() => setToast((t) => (t && t.key === key ? null : t)), 3500 + (reduced ? 0 : motion.base));
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, [key, reduced]);
  const node = toast ? (
    <div
      key={toast.key}
      role="status"
      className={cn(
        "rounded-lg border-l-[6px] border-l-brand-green bg-foreground p-3 text-[15px] font-semibold text-background motion-off:animate-none",
        toast.leaving ? "animate-vv-fade-out" : "animate-vv-toast-in",
      )}
    >
      {toast.text}
    </div>
  ) : null;
  return [node, (text: string) => setToast({ text, key: Date.now(), leaving: false })];
}

/** An empty list, drawn with the brand's boxes instead of a lonely sentence. */
export function EmptyState({ title, body, action, onAction, className }: { title: string; body?: string; action?: string; onAction?: () => void; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-3 py-4", className)}>
      <div aria-hidden className="flex flex-col gap-2">
        {(["green", "yellow", "blue"] as const).map((tone, i) => (
          <Enter key={tone} delay={i * motion.stagger * 2}>
            <div style={{ paddingLeft: i * 14 }}>
              <BrandBox tone={tone} size="sm">
                <div style={{ width: 48 + i * 16, height: 10 }} />
              </BrandBox>
            </div>
          </Enter>
        ))}
      </div>
      <p className="text-xl leading-[26px] font-bold text-foreground">{title}</p>
      {body ? <Body muted>{body}</Body> : null}
      {action && onAction ? <Button onClick={onAction}>{action}</Button> : null}
    </div>
  );
}

/** A section that opens on click (Radix Collapsible); the plus turns into a cross and the content slides in. */
export function Collapsible({
  title,
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof CollapsiblePrimitive.Root>, "title"> & { title: ReactNode }) {
  return (
    <CollapsiblePrimitive.Root data-slot="collapsible" className={cn("flex flex-col gap-3", className)} {...props}>
      <CollapsiblePrimitive.Trigger className="group flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 border-t pt-3 text-left font-display text-base font-black tracking-[-0.3px] text-foreground uppercase focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
        {title}
        <span aria-hidden className="text-[22px] leading-6 font-black text-primary transition-transform duration-200 ease-vv-out group-data-[state=open]:rotate-45 motion-off:transition-none">
          +
        </span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="animate-vv-enter motion-off:animate-none">{children}</CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
