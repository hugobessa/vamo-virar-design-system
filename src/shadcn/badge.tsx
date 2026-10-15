import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/**
 * shadcn/ui Badge. Besides shadcn's variants: `brand` is a small sheared red
 * box in the display face (the campaign's tag), and `ok`/`warn` match the
 * kit's chips.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-xs font-bold whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:opacity-90",
        secondary: "bg-chip text-foreground [a&]:hover:bg-accent",
        destructive: "bg-destructive text-white [a&]:hover:opacity-90",
        outline: "border-border text-foreground [a&]:hover:bg-accent",
        brand: "-skew-y-[11.3deg] rounded-none bg-brand px-2 font-display font-black tracking-[-0.2px] text-brand-foreground uppercase shadow-[-3px_3px_0_var(--vv-brand-dark)]",
        ok: "bg-chip text-ok",
        warn: "bg-chip text-warn",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, asChild = false, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
