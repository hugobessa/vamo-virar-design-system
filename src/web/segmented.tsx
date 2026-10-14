"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { CountBadge } from "./card";
import { cn } from "./utils";

/**
 * Tabs with a pill that slides to the selected option (Radix Tabs). On a phone
 * they share the width; from `medium` up each tab has the same fixed width and
 * the bar hugs them. `badge` puts a count next to an option's label, for
 * things waiting there. Put `SegmentedContent` panels in `children` if the
 * tabs switch content; leave them out to use it as a plain switch.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  children,
  className,
}: {
  options: { value: T; label: string; badge?: number }[];
  value: T;
  onChange: (v: T) => void;
  children?: ReactNode;
  className?: string;
}) {
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  const pill = { "--n": options.length, "--i": index } as CSSProperties;
  return (
    <TabsPrimitive.Root data-slot="segmented" value={value} onValueChange={(v) => onChange(v as T)} className={cn("flex flex-col gap-3", className)}>
      <TabsPrimitive.List className="relative flex w-full rounded-lg bg-muted p-1 medium:w-fit">
        <span
          aria-hidden
          style={pill}
          className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/var(--n))] translate-x-[calc(var(--i)*100%)] rounded-sm bg-background transition-[translate] duration-200 ease-vv-out motion-off:transition-none medium:w-[148px]"
        />
        {options.map((o) => (
          <TabsPrimitive.Trigger
            key={o.value}
            value={o.value}
            aria-label={o.badge ? `${o.label} (${o.badge})` : undefined}
            className={cn(
              "relative inline-flex min-h-10 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2 text-base font-medium text-foreground medium:w-[148px] medium:flex-none",
              "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none data-[state=active]:font-bold",
              // Four tabs across a phone leave little room for each: the labels shrink a size.
              options.length >= 4 && "max-medium:text-[15px]",
            )}
          >
            <span className="truncate">{o.label}</span>
            {o.badge ? <CountBadge n={o.badge} /> : null}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  );
}

/** The panel shown while its `value` is the selected tab. */
export function SegmentedContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />;
}
