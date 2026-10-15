"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** The kit's sheared bar: a green fill on a light track, slanted like the campaign's boxes. */
function Progress({ className, value, ...props }: ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root data-slot="progress" className={cn("relative mx-0.5 h-2.5 w-full -skew-x-[11.3deg] overflow-hidden bg-chip", className)} {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-brand-green transition-transform duration-[600ms] ease-vv-out motion-off:transition-none"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
