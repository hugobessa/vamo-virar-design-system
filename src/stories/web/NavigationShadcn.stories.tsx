import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Bell, CalendarDays, Home, Megaphone, Plus, Settings, Users } from "lucide-react";
import { Badge } from "../../shadcn/badge";
import { Button } from "../../shadcn/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../../shadcn/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../shadcn/navigation-menu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../shadcn/resizable";
import { Separator } from "../../shadcn/separator";
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
} from "../../shadcn/sidebar";
import { FlagStripe, Wordmark } from "../../web";

const meta: Meta = { title: "Web/Navegação", parameters: { layout: "padded", docs: { description: { component: "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a do shadcn." } } } };
export default meta;
type Story = StoryObj;

export const MenuDeNavegacao: Story = {
  render: () => (
    <div className="pb-64">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Comunidades</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[420px] gap-1 p-1 medium:grid-cols-2">
                {[
                  ["Comitê Casa Amarela", "Recife · 48 pessoas"],
                  ["Coletivo Olinda", "Olinda · 23 pessoas"],
                  ["Horta da Vila", "Recife · 12 pessoas"],
                  ["Juventude Caruaru", "Caruaru · 31 pessoas"],
                ].map(([t, d]) => (
                  <li key={t}>
                    <NavigationMenuLink href="#">
                      <span className="font-bold">{t}</span>
                      <span className="text-sm text-muted-foreground">{d}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Materiais</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[240px] gap-1 p-1">
                {["Panfletos", "Cartazes", "Guia de mobilização"].map((t) => (
                  <li key={t}>
                    <NavigationMenuLink href="#">{t}</NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <a href="#">Sobre</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const PaineisRedimensionaveis: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-[240px] max-w-xl rounded-lg border">
      <ResizablePanel defaultSize={35}>
        <div className="flex h-full items-center justify-center p-4 font-bold">Ações</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 font-bold">Detalhes</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4 font-bold">Pessoas</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

const nav = [
  { title: "Início", icon: Home, active: true },
  { title: "Ações", icon: CalendarDays, badge: 12 },
  { title: "Pessoas", icon: Users, badge: 3 },
  { title: "Avisos", icon: Bell },
  { title: "Materiais", icon: Megaphone },
];

export const MenuLateral: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <SidebarProvider className="min-h-[640px]">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="px-1 py-2 group-data-[collapsible=icon]:hidden">
            <Wordmark size="sm" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Comitê Casa Amarela</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Outras comunidades</SidebarGroupLabel>
            <SidebarGroupAction title="Entrar em outra">
              <Plus /> <span className="sr-only">Entrar em outra</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Users />
                    <span>Coletivo Olinda</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#">Ações</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#" isActive>
                        Pessoas
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Preferências">
                <Settings />
                <span>Preferências</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <FlagStripe height={4} />
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <span className="font-bold">Início</span>
        </header>
        <div className="grid gap-4 p-4 medium:grid-cols-2 medium:p-6">
          {["Mutirão da horta", "Assembleia do bairro", "Panfletagem na feira"].map((t) => (
            <Card key={t} accent>
              <CardHeader>
                <CardTitle>{t}</CardTitle>
                <CardDescription>Esta semana</CardDescription>
              </CardHeader>
            </Card>
          ))}
          <div className="flex items-center gap-3">
            <Badge variant="brand">Vamo virar</Badge>
            <Button size="sm">Criar ação</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
