"use client";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { ContextMenu as MenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { menuCheckItem, menuItem, menuLabel, panel } from "./menu-styles";
import { cn } from "../web/utils";

function ContextMenu(props: ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger(props: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return <MenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />;
}

function ContextMenuGroup(props: ComponentProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuPortal(props: ComponentProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuSub(props: ComponentProps<typeof MenuPrimitive.Sub>) {
  return <MenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup(props: ComponentProps<typeof MenuPrimitive.RadioGroup>) {
  return <MenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

function ContextMenuContent({ className, ...props }: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(panel, "max-h-(--radix-context-menu-content-available-height) min-w-[12rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto p-1", className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

function ContextMenuItem({ className, inset, variant = "default", ...props }: ComponentProps<typeof MenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return <MenuPrimitive.Item data-slot="context-menu-item" data-inset={inset} data-variant={variant} className={cn(menuItem, className)} {...props} />;
}

function ContextMenuCheckboxItem({ className, children, checked, ...props }: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="context-menu-checkbox-item" className={cn(menuCheckItem, className)} checked={checked} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" strokeWidth={3} />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({ className, children, ...props }: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem data-slot="context-menu-radio-item" className={cn(menuCheckItem, className)} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2.5 fill-current" />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({ className, inset, ...props }: ComponentProps<typeof MenuPrimitive.Label> & { inset?: boolean }) {
  return <MenuPrimitive.Label data-slot="context-menu-label" data-inset={inset} className={cn(menuLabel, className)} {...props} />;
}

function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator data-slot="context-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

function ContextMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="context-menu-shortcut" className={cn("ml-auto text-xs font-semibold tracking-widest text-muted-foreground", className)} {...props} />;
}

function ContextMenuSubTrigger({ className, inset, children, ...props }: ComponentProps<typeof MenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(menuItem, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({ className, ...props }: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return <MenuPrimitive.SubContent data-slot="context-menu-sub-content" className={cn(panel, "min-w-[10rem] overflow-hidden p-1", className)} {...props} />;
}

export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger };
