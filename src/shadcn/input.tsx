import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** The kit's text field look: 48px tall, 17px text, a blue ring on focus and the error colour when invalid. */
export const inputClasses = [
  "w-full min-w-0 rounded-lg border border-input bg-background px-3 text-[17px] text-foreground outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
  "transition-[border-color,box-shadow] duration-[120ms] motion-off:transition-none",
  "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary",
  "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
];

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputClasses,
        "h-12 py-1 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-[15px] file:font-bold file:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
