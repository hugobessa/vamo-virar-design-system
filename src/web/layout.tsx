import { Children, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { FlagStripe } from "./brand";
import { cn } from "./utils";

/**
 * A page's body under the flag stripe. The content sits in a centred column:
 * a reading measure by default, or `width="board"` for lists and two-column
 * pages. Gutters grow at the `medium` and `wide` breakpoints.
 */
export function Screen({ width = "reading", className, children, ...props }: ComponentProps<"main"> & { width?: "reading" | "board" }) {
  return (
    <main data-slot="screen" className="min-h-dvh bg-background text-foreground" {...props}>
      <FlagStripe height={4} />
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-3 px-4 pt-4 pb-4 medium:px-6 medium:pt-6 medium:pb-10 wide:px-10",
          width === "board" ? "max-w-[1040px]" : "max-w-[760px]",
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
}

/**
 * Two columns from `wide` up (`main` wider, on the left), one column below,
 * with `main` on top.
 */
export function Columns({ main, aside, className }: { main: ReactNode; aside: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 wide:grid wide:grid-cols-[3fr_2fr] wide:items-start wide:gap-10", className)}>
      <div className="flex min-w-0 flex-col gap-3">{main}</div>
      <div className="flex min-w-0 flex-col gap-3">{aside}</div>
    </div>
  );
}

/**
 * Cards in columns of equal width. By default one column on a phone and two
 * from `wide` up (the native kit's `listColumns`); pass `columns` to fix it.
 */
export function Grid({ children, columns, className }: { children: ReactNode; columns?: number; className?: string }) {
  const style = columns ? ({ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } as CSSProperties) : undefined;
  return (
    <div className={cn("grid gap-3", !columns && "grid-cols-1 wide:grid-cols-2", className)} style={style}>
      {Children.toArray(children).filter(Boolean)}
    </div>
  );
}

/** Buttons stacked on a phone, side by side (wrapping) from `medium` up. */
export function Actions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3 medium:flex-row medium:flex-wrap medium:items-start", className)} {...props} />;
}
