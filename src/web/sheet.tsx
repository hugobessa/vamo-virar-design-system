"use client";

import { Bell, BellOff, Ellipsis, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useContext, type ComponentProps, type ReactNode } from "react";
import { CountBadge } from "./card";
import { ReadOnly } from "./theme";
import { cn } from "./utils";

const roundButton =
  "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-accent active:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none";

/**
 * A panel over a dimmed page (Radix Dialog). On a phone it slides up from the
 * bottom; from `medium` up it is a dialog in the middle of the window, with a
 * close button. Clicking outside or pressing Escape closes it either way.
 * Pass `trigger` to open it from a button, or control it with `open`.
 */
export function Sheet({
  title,
  description,
  trigger,
  children,
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root> & { title?: ReactNode; description?: ReactNode; trigger?: ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Root {...props}>
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-vv-fade-out data-[state=open]:animate-vv-fade-in motion-off:animate-none" />
        <DialogPrimitive.Content
          data-slot="sheet"
          {...(description ? null : { "aria-describedby": undefined })}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl bg-background text-foreground outline-none",
            "data-[state=closed]:animate-vv-sheet-out data-[state=open]:animate-vv-sheet-in motion-off:animate-none",
            "medium:inset-x-auto medium:bottom-auto medium:top-1/2 medium:left-1/2 medium:w-[calc(100%-48px)] medium:max-w-[520px] medium:-translate-x-1/2 medium:-translate-y-1/2 medium:rounded-3xl medium:border",
            "medium:data-[state=closed]:animate-vv-dialog-out medium:data-[state=open]:animate-vv-dialog-in",
            className,
          )}
        >
          <div aria-hidden className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border medium:hidden" />
          <div className="flex flex-col gap-3 overflow-y-auto p-4 medium:p-6">
            {title ? null : <DialogPrimitive.Title className="sr-only">Painel</DialogPrimitive.Title>}
            <div className={cn("flex items-center gap-3", !title && "hidden medium:flex")}>
              {title ? <DialogPrimitive.Title className="flex-1 text-xl leading-[26px] font-bold">{title}</DialogPrimitive.Title> : <span className="flex-1" />}
              <DialogPrimitive.Close aria-label="Fechar" className={cn(roundButton, "hidden medium:inline-flex")}>
                <X className="size-5" strokeWidth={3} />
              </DialogPrimitive.Close>
            </div>
            {description ? <DialogPrimitive.Description className="text-muted-foreground">{description}</DialogPrimitive.Description> : null}
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Closes the sheet it is in when clicked; wrap a button with `asChild`. */
export const SheetClose = DialogPrimitive.Close;

/** One row of a menu inside a Sheet. `danger` rows are red. */
export function MenuItem({ className, danger, allowReadOnly, disabled, ...props }: ComponentProps<"button"> & { danger?: boolean; allowReadOnly?: boolean }) {
  const off = disabled || (useContext(ReadOnly) && !allowReadOnly);
  return (
    <button
      type="button"
      disabled={off}
      className={cn(
        "flex min-h-12 w-full cursor-pointer items-center rounded-lg px-3 text-left text-[17px] font-semibold hover:bg-muted active:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        danger ? "text-destructive" : "text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** A bell for the header, with how many notifications wait. */
export function BellButton({ count, label, className, ...props }: ComponentProps<"button"> & { count: number; label: string }) {
  return (
    <button type="button" aria-label={count ? `${label} (${count})` : label} className={cn(roundButton, "w-auto min-w-10 gap-1 px-1.5", className)} {...props}>
      {count ? <Bell aria-hidden className="size-5 text-brand" strokeWidth={2.5} /> : <BellOff aria-hidden className="size-5" strokeWidth={2.5} />}
      {count ? <CountBadge n={count} /> : null}
    </button>
  );
}

/** A round "⋯" button that opens more options. */
export function MoreButton({ label, className, ...props }: ComponentProps<"button"> & { label: string }) {
  return (
    <button type="button" aria-label={label} className={cn(roundButton, className)} {...props}>
      <Ellipsis aria-hidden className="size-6" strokeWidth={3} />
    </button>
  );
}
