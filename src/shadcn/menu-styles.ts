// Shared looks of the floating panels (menus, popovers, selects) so they read as one family.

/** A floating panel: popover surface, 12px radius, a soft shadow, and the open/close animation. */
export const panel =
  "z-50 rounded-lg border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 motion-off:animate-none";

/** One row of a menu (shared by Radix menus and Command): a 40px target, the hover surface when focused, `destructive` rows in dark red. */
export const menuRow =
  "relative flex min-h-10 cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-[15px] font-medium outline-hidden select-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

/** A Radix menu row: Radix sets data-disabled only on disabled items. (cmdk sets it on every item, so Command uses `menuRow`.) */
export const menuItem = `${menuRow} focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10`;

/** A checkbox or radio row: room on the left for the indicator. */
export const menuCheckItem =
  "relative flex min-h-10 cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-[15px] font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

/** The small spaced capitals that head a group in a menu (the kit's GroupHeading). */
export const menuLabel = "px-2 py-1.5 font-display text-xs font-extrabold tracking-[2px] text-muted-foreground uppercase data-[inset]:pl-8";

/** The dimmed backdrop under dialogs, sheets and drawers. */
export const overlay =
  "fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-off:animate-none";

/** A dialog's title: the kit's Heading size. */
export const dialogTitle = "text-xl leading-[26px] font-bold";
