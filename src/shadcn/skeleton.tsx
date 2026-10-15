import type { ComponentProps } from "react";
import { cn } from "../web/utils";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("animate-pulse rounded-lg bg-chip motion-off:animate-none", className)} {...props} />;
}

export { Skeleton };
