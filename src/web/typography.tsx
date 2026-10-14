import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils";

/** A page title. `caps={false}` for titles people wrote themselves, which read better as typed. A little larger from `medium` up. */
export function Title({ caps = true, className, ...props }: ComponentProps<"h1"> & { caps?: boolean }) {
  return (
    <h1
      className={cn(
        "text-foreground",
        caps
          ? "font-condensed text-[34px] leading-[36px] font-black uppercase medium:text-[44px] medium:leading-[46px]"
          : "font-sans text-[28px] leading-[34px] font-extrabold tracking-[-0.3px] medium:text-[32px] medium:leading-[38px]",
        className,
      )}
      {...props}
    />
  );
}

export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn("mt-2 text-xl leading-[26px] font-bold text-foreground", className)} {...props} />;
}

export function Body({ muted, className, ...props }: ComponentProps<"p"> & { muted?: boolean }) {
  return <p className={cn("text-base leading-6", muted ? "text-muted-foreground" : "text-foreground", className)} {...props} />;
}

/** Titled group of fields: a short brand-coloured bar, then the title. */
export function FormSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("mt-2 flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <span aria-hidden className="h-[22px] w-1.5 -skew-y-[11.3deg] bg-brand" />
        <h3 className="font-display text-lg font-black tracking-[-0.3px] text-foreground uppercase">{title}</h3>
      </div>
      {children}
    </section>
  );
}

/** The heading of a group on a board: small, spaced capitals, with the count after it. */
export function GroupHeading({ text, n, tone, className }: { text: string; n?: number; tone?: "brand"; className?: string }) {
  return (
    <h3 className={cn("font-display text-xs font-extrabold tracking-[2px] uppercase", tone === "brand" ? "text-brand" : "text-muted-foreground", className)}>
      {n === undefined ? text : `${text} · ${n}`}
    </h3>
  );
}
