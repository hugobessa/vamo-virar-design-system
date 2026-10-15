import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../web/utils";

/** shadcn/ui Alert with the kit's coloured left edge. `warn` and `ok` join shadcn's variants. */
const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border border-l-4 px-4 py-3 text-[15px] has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-l-muted-foreground bg-card text-card-foreground",
        destructive: "border-l-destructive bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90",
        warn: "border-l-warn bg-card text-warn *:data-[slot=alert-description]:text-warn/90",
        ok: "border-l-ok bg-card text-ok *:data-[slot=alert-description]:text-ok/90",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("col-start-2 line-clamp-1 min-h-5 font-bold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("col-start-2 grid justify-items-start gap-1 text-muted-foreground [&_p]:leading-relaxed", className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
