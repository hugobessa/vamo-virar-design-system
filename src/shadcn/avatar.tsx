"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

function Avatar({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Root>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />;
}

function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} />;
}

/** Initials in the display face on the chip colour. */
function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-full bg-chip font-display text-sm font-black text-foreground uppercase", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
