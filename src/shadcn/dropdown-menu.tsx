"use client";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { menuCheckItem, menuItem, menuLabel, panel } from "./menu-styles";
import { cn } from "../web/utils";

function DropdownMenu(props: ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(props: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuGroup(props: ComponentProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuPortal(props: ComponentProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuSub(props: ComponentProps<typeof MenuPrimitive.Sub>) {
  return <MenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuRadioGroup(props: ComponentProps<typeof MenuPrimitive.RadioGroup>) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuContent({ className, sideOffset = 6, ...props }: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(panel, "max-h-(--radix-dropdown-menu-content-available-height) min-w-[12rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto p-1", className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, inset, variant = "default", ...props }: ComponentProps<typeof MenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }) {
  return <MenuPrimitive.Item data-slot="dropdown-menu-item" data-inset={inset} data-variant={variant} className={cn(menuItem, className)} {...props} />;
}

function DropdownMenuCheckboxItem({ className, children, checked, ...props }: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn(menuCheckItem, className)} checked={checked} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" strokeWidth={3} />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({ className, children, ...props }: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn(menuCheckItem, className)} {...props}>
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-primary">
        <MenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2.5 fill-current" />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({ className, inset, ...props }: ComponentProps<typeof MenuPrimitive.Label> & { inset?: boolean }) {
  return <MenuPrimitive.Label data-slot="dropdown-menu-label" data-inset={inset} className={cn(menuLabel, className)} {...props} />;
}

function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto text-xs font-semibold tracking-widest text-muted-foreground", className)} {...props} />;
}

function DropdownMenuSubTrigger({ className, inset, children, ...props }: ComponentProps<typeof MenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(menuItem, "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({ className, ...props }: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return <MenuPrimitive.SubContent data-slot="dropdown-menu-sub-content" className={cn(panel, "min-w-[10rem] overflow-hidden p-1", className)} {...props} />;
}

export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger };
