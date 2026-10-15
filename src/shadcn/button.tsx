import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/**
 * shadcn/ui Button in the campaign's style. Calls to action are blue
 * (`default`) or yellow (`accent`); red is never a fill, so `destructive` is
 * outlined dark red. The filled variants sit on a 3px depth edge and sink
 * onto it while pressed; a disabled filled button turns flat grey.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent font-bold whitespace-nowrap select-none outline-none",
    "transition-[translate,box-shadow,opacity,background-color] duration-[120ms] ease-vv-out motion-off:transition-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/30",
    "disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[0_3px_0_var(--vv-primary-depth)] hover:opacity-90 active:translate-y-[3px] active:shadow-none disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-[0_3px_0_var(--border)]",
        accent:
          "border-highlight bg-highlight text-highlight-foreground shadow-[0_3px_0_var(--vv-accent-depth)] hover:opacity-90 active:translate-y-[3px] active:shadow-none disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-[0_3px_0_var(--border)]",
        destructive:
          "border-destructive bg-background text-destructive shadow-[0_3px_0_var(--destructive)] hover:bg-destructive/5 active:translate-y-[3px] active:shadow-none disabled:opacity-50",
        outline:
          "border-border bg-background text-foreground shadow-[0_3px_0_var(--border)] hover:bg-muted active:translate-y-[3px] active:shadow-none disabled:opacity-50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent disabled:opacity-50",
        ghost: "text-foreground hover:bg-accent disabled:opacity-50",
        link: "text-primary underline-offset-4 hover:underline disabled:opacity-50",
      },
      size: {
        default: "min-h-12 px-4 text-[17px] has-[>svg]:px-3",
        sm: "min-h-10 gap-1.5 px-3 text-[15px] has-[>svg]:px-2.5",
        lg: "min-h-14 px-6 text-lg has-[>svg]:px-4",
        icon: "size-12",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
