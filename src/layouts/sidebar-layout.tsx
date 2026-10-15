"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ComponentType, ElementType, ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../shadcn/collapsible";
import { Separator } from "../shadcn/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../shadcn/sidebar";
import { FlagStripe } from "../web/brand";
import { cn } from "../web/utils";

export type NavLink = {
  title: string;
  href?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  isActive?: boolean;
  /** A count beside the item (things waiting there). */
  badge?: ReactNode;
  onClick?: () => void;
  /** Sub-items; the item opens and closes them. */
  items?: { title: string; href?: string; isActive?: boolean; onClick?: () => void }[];
};

export type NavSection = {
  /** Heading of the section, in the kit's spaced capitals; leave it out for an unlabelled first section. */
  label?: string;
  items: NavLink[];
  /** A small button beside the heading (e.g. "+" to add a community). */
  action?: { label: string; icon: ReactNode; onClick?: () => void };
};

/**
 * A page with the sidebar menu on the left (a sheet on phones; collapses to
 * icons with ⌘/Ctrl+B or the rail), a sticky header with the page title and
 * actions, and the page body. `width="contained"` centres the body in the
 * board column (1040px); `"fluid"` lets it fill the window, for tables, boards
 * and maps.
 */
export function SidebarLayout({
  brand,
  sections,
  footer,
  title,
  actions,
  width = "contained",
  linkAs: Link = "a",
  defaultOpen = true,
  children,
  className,
}: {
  /** Top of the sidebar: usually the Wordmark or the community's name. */
  brand?: ReactNode;
  sections: NavSection[];
  /** Bottom of the sidebar: usually `<SidebarUser />`. */
  footer?: ReactNode;
  /** Header title, or a Breadcrumb. */
  title?: ReactNode;
  /** Header buttons on the right. */
  actions?: ReactNode;
  width?: "contained" | "fluid";
  /** The link component for items with `href` (e.g. Next's `Link`). */
  linkAs?: ElementType;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const item = (link: NavLink) => {
    const Icon = link.icon;
    const label = (
      <>
        {Icon ? <Icon /> : null}
        <span>{link.title}</span>
      </>
    );
    if (link.items?.length) {
      return (
        <Collapsible key={link.title} asChild defaultOpen={link.isActive || link.items.some((s) => s.isActive)} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={link.title} isActive={link.isActive}>
                {label}
                <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {link.items.map((sub) => (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton asChild isActive={sub.isActive}>
                      {sub.href ? <Link href={sub.href}>{sub.title}</Link> : <button type="button" onClick={sub.onClick}>{sub.title}</button>}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }
    return (
      <SidebarMenuItem key={link.title}>
        {link.href ? (
          <SidebarMenuButton asChild isActive={link.isActive} tooltip={link.title}>
            <Link href={link.href} aria-current={link.isActive ? "page" : undefined}>
              {label}
            </Link>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton isActive={link.isActive} tooltip={link.title} onClick={link.onClick}>
            {label}
          </SidebarMenuButton>
        )}
        {link.badge !== undefined ? <SidebarMenuBadge>{link.badge}</SidebarMenuBadge> : null}
      </SidebarMenuItem>
    );
  };
  return (
    <SidebarProvider defaultOpen={defaultOpen} className={className}>
      <Sidebar collapsible="icon">
        {brand ? <SidebarHeader className="overflow-hidden group-data-[collapsible=icon]:hidden">{brand}</SidebarHeader> : null}
        <SidebarContent>
          {sections.map((section, i) => (
            <SidebarGroup key={section.label ?? i}>
              {section.label ? <SidebarGroupLabel>{section.label}</SidebarGroupLabel> : null}
              {section.action ? (
                <SidebarGroupAction title={section.action.label} onClick={section.action.onClick}>
                  {section.action.icon}
                  <span className="sr-only">{section.action.label}</span>
                </SidebarGroupAction>
              ) : null}
              <SidebarGroupContent>
                <SidebarMenu>{section.items.map(item)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        {footer ? <SidebarFooter>{footer}</SidebarFooter> : null}
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-w-0">
        <div className="sticky top-0 z-20 bg-background">
          <FlagStripe height={4} />
          <header className="flex h-14 items-center gap-2 border-b px-3 medium:px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-5" />
            <div className="min-w-0 flex-1 truncate font-bold">{title}</div>
            {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
          </header>
        </div>
        <div className={cn("flex w-full flex-1 flex-col gap-6 px-4 py-6 medium:px-6 wide:px-10", width === "contained" && "mx-auto max-w-[1040px]")}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
