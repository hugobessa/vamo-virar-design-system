"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, MouseEvent } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { cn } from "../web/utils";

/** A text field with things inside its border (icons, text, buttons). Focus rings the whole group in blue. */
function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex w-full items-center rounded-lg border border-input bg-background transition-[border-color,box-shadow] duration-[120ms] outline-none motion-off:transition-none",
        "h-12 min-w-0 has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot=input-group-control]:focus-visible]:ring-primary",
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-1 has-[[data-slot][aria-invalid=true]]:ring-destructive",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-[15px] font-semibold text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-sm [&>svg:not([class*='size-'])]:size-5",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
      },
    },
    defaultVariants: { align: "inline-start" },
  },
);

function InputGroupAddon({ className, align = "inline-start", ...props }: ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("flex items-center gap-2 text-[15px] shadow-none active:translate-y-0", {
  variants: {
    size: {
      xs: "h-7 gap-1 rounded-sm px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "min-h-9 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-7 rounded-sm p-0 has-[>svg]:p-0",
      "icon-sm": "size-9 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: { size: "xs" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>) {
  return <Button type={type} data-size={size} variant={variant} className={cn(inputGroupButtonVariants({ size }), className)} {...props} />;
}

function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("flex items-center gap-2 text-[15px] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", className)} {...props} />;
}

function InputGroupInput({ className, ...props }: ComponentProps<"input">) {
  return <Input data-slot="input-group-control" className={cn("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0", className)} {...props} />;
}

function InputGroupTextarea({ className, ...props }: ComponentProps<"textarea">) {
  return <Textarea data-slot="input-group-control" className={cn("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0", className)} {...props} />;
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea };
