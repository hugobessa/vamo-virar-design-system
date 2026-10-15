"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** On reads as the selected tab does in the kit: a lavender chip and bold label. */
const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-[15px] font-medium whitespace-nowrap outline-none transition-[color,background-color,box-shadow] duration-[120ms] motion-off:transition-none hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive data-[state=on]:bg-accent data-[state=on]:font-bold data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
      },
      size: {
        default: "h-12 min-w-12 px-3",
        sm: "h-10 min-w-10 px-2.5",
        lg: "h-14 min-w-14 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Toggle({ className, variant, size, ...props }: ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}

export { Toggle, toggleVariants };
