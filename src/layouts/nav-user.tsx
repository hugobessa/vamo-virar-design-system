"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../shadcn/sidebar";
import { cn } from "../web/utils";

export type User = { name: string; email?: string; avatar?: string };

export type UserMenuItem = { label: string; icon?: ReactNode; onSelect?: () => void; href?: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function UserAvatar({ user, className }: { user: User; className?: string }) {
  return (
    <Avatar className={cn("size-9", className)}>
      {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
      <AvatarFallback>{initials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

/** The user's items and a "Sair" row, shared by the sidebar footer and the top bar. */
function UserMenuContent({ user, items, onSignOut, side, align }: { user: User; items?: UserMenuItem[]; onSignOut?: () => void; side?: "top" | "bottom" | "right"; align?: "start" | "end" }) {
  return (
    <DropdownMenuContent className="w-60" side={side} align={align} sideOffset={6}>
      <DropdownMenuLabel className="flex items-center gap-2 py-2 font-sans text-[15px] tracking-normal normal-case">
        <UserAvatar user={user} className="size-8" />
        <span className="grid min-w-0 leading-tight">
          <span className="truncate font-bold text-foreground">{user.name}</span>
          {user.email ? <span className="truncate text-xs font-medium text-muted-foreground">{user.email}</span> : null}
        </span>
      </DropdownMenuLabel>
      {items?.length ? (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((it) =>
              it.href ? (
                <DropdownMenuItem key={it.label} asChild>
                  <a href={it.href}>
                    {it.icon}
                    {it.label}
                  </a>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={it.label} onSelect={it.onSelect}>
                  {it.icon}
                  {it.label}
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuGroup>
        </>
      ) : null}
      {onSignOut ? (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={onSignOut}>
            <LogOut /> Sair
          </DropdownMenuItem>
        </>
      ) : null}
    </DropdownMenuContent>
  );
}

/** The signed-in person at the foot of the sidebar; opens their menu. */
function SidebarUser({ user, items, onSignOut }: { user: User; items?: UserMenuItem[]; onSignOut?: () => void }) {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <UserAvatar user={user} className="size-8" />
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-bold">{user.name}</span>
                {user.email ? <span className="truncate text-xs text-muted-foreground">{user.email}</span> : null}
              </span>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <UserMenuContent user={user} items={items} onSignOut={onSignOut} side={isMobile ? "bottom" : "right"} align="end" />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/** A round avatar button for a top bar; opens the same menu. */
function UserButton({ user, items, onSignOut }: { user: User; items?: UserMenuItem[]; onSignOut?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50" aria-label={`Menu de ${user.name}`}>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <UserMenuContent user={user} items={items} onSignOut={onSignOut} align="end" />
    </DropdownMenu>
  );
}

export { SidebarUser, UserAvatar, UserButton, UserMenuContent };
