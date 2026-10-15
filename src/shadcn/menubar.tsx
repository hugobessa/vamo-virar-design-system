"use client";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { Menubar as MenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { menuCheckItem, menuItem, menuLabel, panel } from "./menu-styles";
import { cn } from "../web/utils";

/** A bar of menus, like a desktop app's. */
function Menubar({ className, ...props }: ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root data-slot="menubar" className={cn("flex min-h-12 items-center gap-1 rounded-lg border bg-background p-1", className)} {...props} />;
}

function MenubarMenu(props: ComponentProps<typeof MenuPrimitive.Menu>) {
  return <MenuPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarTrigger({ className, ...props }: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn("flex min-h-10 items-center rounded-sm px-3 text-[15px] font-bold outline-hidden select-none focus:bg-accent data-[state=open]:bg-accent", className)}
      {...props}
    />
  );
}

function MenubarGroup(props: ComponentProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal(props: ComponentProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarSub(props: ComponentProps<typeof MenuPrimitive.Sub>) {
  return <MenuPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarRadioGroup(props: ComponentProps<typeof MenuPrimitive.RadioGroup>) {
  return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(panel, "min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto p-1", className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

function MenubarItem({ className, inset, variant = "default", ...props }: ComponentProps<typeof MenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return <MenuPrimitive.Item data-slot="menubar-item" data-inset={inset} data-variant={variant} className={cn(menuItem, className)} {...props} />;
}

function MenubarCheckboxItem({ className, children, checked, ...props }: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="menubar-checkbox-item" className={cn(menuCheckItem, className)} checked={checked} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" strokeWidth={3} />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({ className, children, ...props }: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem data-slot="menubar-radio-item" className={cn(menuCheckItem, className)} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2.5 fill-current" />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function MenubarLabel({ className, inset, ...props }: ComponentProps<typeof MenuPrimitive.Label> & { inset?: boolean }) {
  return <MenuPrimitive.Label data-slot="menubar-label" data-inset={inset} className={cn(menuLabel, className)} {...props} />;
}

function MenubarSeparator({ className, ...props }: ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator data-slot="menubar-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

function MenubarShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="menubar-shortcut" className={cn("ml-auto text-xs font-semibold tracking-widest text-muted-foreground", className)} {...props} />;
}

function MenubarSubTrigger({ className, inset, children, ...props }: ComponentProps<typeof MenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(menuItem, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubTrigger>
  );
}

function MenubarSubContent({ className, ...props }: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return <MenuPrimitive.SubContent data-slot="menubar-sub-content" className={cn(panel, "min-w-[10rem] overflow-hidden p-1", className)} {...props} />;
}

export { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger };
