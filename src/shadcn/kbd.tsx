import type { ComponentProps } from "react";
import { cn } from "../web/utils";

function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-6 w-fit min-w-6 items-center justify-center gap-1 rounded-sm border bg-muted px-1.5 font-sans text-xs font-bold text-muted-foreground shadow-[0_2px_0_var(--border)] select-none [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content]_&]:border-background/20 [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}

export { Kbd, KbdGroup };
