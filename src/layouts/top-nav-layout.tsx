"use client";

import { Menu } from "lucide-react";
import { useState, type ElementType, type ReactNode } from "react";
import { Button } from "../shadcn/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../shadcn/sheet";
import { FlagStripe } from "../web/brand";
import { cn } from "../web/utils";

export type TopNavLink = { title: string; href?: string; isActive?: boolean; onClick?: () => void; badge?: ReactNode };

/**
 * A page with a contained top bar (brand, links, actions) over a contained
 * body, both centred in the board column (1040px). On phones the links move
 * into a sheet behind a menu button.
 */
export function TopNavLayout({
  brand,
  links,
  actions,
  linkAs: Link = "a",
  footer,
  children,
  className,
}: {
  /** A compact mark that fits the 64px bar, e.g. `<BrandBox size="sm">Vamo virar</BrandBox>` (the full Wordmark is too tall). */
  brand?: ReactNode;
  links: TopNavLink[];
  /** Right side of the bar: search, notifications, `<UserButton />`. */
  actions?: ReactNode;
  linkAs?: ElementType;
  /** Optional page footer. */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const link = (l: TopNavLink, mobile: boolean) => {
    const cls = cn(
      "relative inline-flex items-center gap-2 rounded-lg font-bold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
      mobile ? "min-h-12 w-full px-3 text-[17px] hover:bg-accent data-[active=true]:bg-accent data-[active=true]:shadow-[inset_4px_0_0_var(--vv-brand)]" : "h-10 px-3 text-[15px] text-muted-foreground hover:bg-accent hover:text-foreground data-[active=true]:text-foreground",
    );
    const body = (
      <>
        {l.title}
        {l.badge !== undefined ? <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-extrabold text-vv-white">{l.badge}</span> : null}
        {/* The current page gets a short sheared brand bar under it, like the kit's section marker. */}
        {!mobile && l.isActive ? <span aria-hidden className="absolute inset-x-3 -bottom-[11px] h-1 -skew-x-[11.3deg] bg-brand" /> : null}
      </>
    );
    const close = () => setOpen(false);
    return l.href ? (
      <Link key={l.title} href={l.href} data-active={l.isActive} aria-current={l.isActive ? "page" : undefined} className={cls} onClick={mobile ? close : undefined}>
        {body}
      </Link>
    ) : (
      <button
        key={l.title}
        type="button"
        data-active={l.isActive}
        className={cn(cls, "cursor-pointer")}
        onClick={() => {
          l.onClick?.();
          if (mobile) close();
        }}
      >
        {body}
      </button>
    );
  };
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", className)}>
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <FlagStripe height={4} />
        <header className="border-b">
          <div className="mx-auto flex h-16 w-full max-w-[1040px] items-center gap-4 px-4 medium:px-6 wide:px-10">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="medium:hidden" aria-label="Abrir menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>{brand ?? "Menu"}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-3">{links.map((l) => link(l, true))}</nav>
              </SheetContent>
            </Sheet>
            {brand ? <div className="flex shrink-0 items-center">{brand}</div> : null}
            <nav aria-label="Principal" className="hidden flex-1 items-center gap-1 medium:flex">
              {links.map((l) => link(l, false))}
            </nav>
            <div className="ml-auto flex items-center gap-2">{actions}</div>
          </div>
        </header>
      </div>
      <main className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col gap-6 px-4 py-6 medium:px-6 wide:px-10">{children}</main>
      {footer ? (
        <footer className="border-t">
          <div className="mx-auto w-full max-w-[1040px] px-4 py-6 text-sm text-muted-foreground medium:px-6 wide:px-10">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
