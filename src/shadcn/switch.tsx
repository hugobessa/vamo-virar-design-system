"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** On is the CTA blue; the thumb slides with the kit's `out` curve. */
function Switch({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent outline-none transition-colors duration-200 motion-off:transition-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-6 rounded-full bg-background shadow-[0_1px_2px_rgb(0_0_0/0.3)] ring-0 transition-transform duration-200 ease-vv-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 motion-off:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
