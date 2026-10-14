"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import { useContext, type ComponentProps } from "react";
import { ReadOnly } from "./theme";
import { cn } from "./utils";

/**
 * Button variants. There is deliberately no brand-red variant: red reads as
 * "danger", so calls to action are blue (`primary`) or yellow (`accent`, for
 * brand-coloured and dark surfaces). `danger` is outlined dark red, for
 * destructive actions only. The face sits on a 3px depth edge and sinks onto
 * it while pressed; a disabled filled button turns flat grey (a busy one
 * keeps its colour, faded, with a spinner).
 */
export const buttonVariants = cva(
  [
    "relative mb-[3px] inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border font-bold whitespace-nowrap select-none",
    "transition-[translate,box-shadow,opacity] duration-[120ms] ease-vv-out motion-off:transition-none",
    "hover:opacity-90 active:translate-y-[3px] active:shadow-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
    "disabled:pointer-events-none aria-disabled:pointer-events-none aria-busy:pointer-events-none aria-busy:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground shadow-[0_3px_0_var(--vv-primary-depth)] data-disabled:border-border data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:shadow-[0_3px_0_var(--border)]",
        accent:
          "border-highlight bg-highlight text-highlight-foreground shadow-[0_3px_0_var(--vv-accent-depth)] data-disabled:border-border data-disabled:bg-muted data-disabled:text-muted-foreground data-disabled:shadow-[0_3px_0_var(--border)]",
        secondary: "border-border bg-background text-foreground shadow-[0_3px_0_var(--border)] data-disabled:opacity-50",
        danger: "border-destructive bg-background text-destructive shadow-[0_3px_0_var(--destructive)] data-disabled:opacity-50",
      },
      size: {
        default: "min-h-12 px-4 text-[17px]",
        /** Smaller, for secondary actions next to content; still a full touch target. */
        compact: "min-h-11 px-3 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

export function Button({
  className,
  variant,
  size,
  asChild = false,
  busy,
  allowReadOnly,
  disabled: disabledProp,
  children,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Renders the child element (a link, say) with the button's look. */
    asChild?: boolean;
    /** Shows a spinner and ignores presses. */
    busy?: boolean;
    /** Stays on in a read-only (disabled) community. */
    allowReadOnly?: boolean;
  }) {
  const readOnly = useContext(ReadOnly) && !allowReadOnly;
  const disabled = disabledProp || readOnly;
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={asChild ? undefined : disabled || busy}
      aria-disabled={asChild && disabled ? true : undefined}
      data-disabled={disabled || undefined}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy && !asChild ? <LoaderCircle aria-hidden className="animate-spin motion-off:animate-none" /> : null}
      {busy && !asChild ? <span className="sr-only">{children}</span> : children}
    </Comp>
  );
}
