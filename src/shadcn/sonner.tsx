"use client";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * shadcn/ui's Sonner toaster, styled like the kit's toast: ink on light (light
 * on ink in dark mode) with a coloured edge on the left, green for success.
 * Colours come from the theme's CSS variables, so `theme` only matters for
 * Sonner's own details.
 */
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin motion-off:animate-none" />,
      }}
      style={
        {
          "--normal-bg": "var(--foreground)",
          "--normal-text": "var(--background)",
          "--normal-border": "var(--foreground)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: "!border-l-[6px] !border-l-brand-green !font-sans !text-[15px] !font-semibold",
          error: "!border-l-destructive",
          warning: "!border-l-highlight",
          info: "!border-l-primary",
          description: "!font-normal !opacity-80",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
