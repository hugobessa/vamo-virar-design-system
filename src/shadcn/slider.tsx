"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import { useMemo, type ComponentProps } from "react";
import { cn } from "../web/utils";

/** A blue range on a light track; the thumbs are 24px with a blue rim. */
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: ComponentProps<typeof SliderPrimitive.Root>) {
  const values = useMemo(() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]), [value, defaultValue, min, max]);
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-chip data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5"
      >
        <SliderPrimitive.Range data-slot="slider-range" className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={i}
          className="block size-6 shrink-0 cursor-grab rounded-full border-[3px] border-primary bg-background shadow-[0_2px_0_var(--vv-primary-depth)] outline-none transition-[box-shadow] hover:ring-4 hover:ring-ring/30 focus-visible:ring-4 focus-visible:ring-ring/50 disabled:pointer-events-none active:cursor-grabbing"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
