import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Bell, CalendarDays, FileText, Home, LayoutGrid, Megaphone, Plus, Search, Settings, Share2, User as UserIcon, Users } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { AuthLayout } from "../../layouts/auth-layout";
import { ForgotPasswordForm, LoginForm, ResetPasswordForm, SignUpForm } from "../../layouts/auth-forms";
import { SidebarUser, UserButton, type User } from "../../layouts/nav-user";
import { SidebarLayout, type NavSection } from "../../layouts/sidebar-layout";
import { TopNavLayout } from "../../layouts/top-nav-layout";
import { VerifyCodeForm } from "../../layouts/verify-code-form";
import { Avatar, AvatarFallback } from "../../shadcn/avatar";
import { Badge } from "../../shadcn/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../shadcn/breadcrumb";
import { Button } from "../../shadcn/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../shadcn/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../shadcn/chart";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../shadcn/input-group";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "../../shadcn/item";
import { Progress } from "../../shadcn/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/tabs";
import { BrandBox, Wordmark } from "../../web";

const meta: Meta = {
  title: "Web/Layouts",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Esqueletos de página prontos, feitos com os componentes do shadcn/ui. Importe de `@vamo-virar/design-system/layouts/<nome>`: `sidebar-layout`, `top-nav-layout`, `auth-layout`, `auth-forms`, `verify-code-form` e `nav-user`. Os painéis e dados daqui são só exemplos.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const user: User = { name: "Ana Souza", email: "ana@comitecasaamarela.org" };
const userItems = [
  { label: "Perfil", icon: <UserIcon /> },
  { label: "Preferências", icon: <Settings /> },
];

// ---- Dashboard example -----------------------------------------------------

const stats = [
  { label: "Pessoas", value: "248", delta: "+18 no mês", tone: "ok" as const },
  { label: "Ações na semana", value: "12", delta: "3 sem gente", tone: "warn" as const },
  { label: "Presenças confirmadas", value: "86%", delta: "+4 pontos", tone: "ok" as const },
  { label: "Pedidos para entrar", value: "7", delta: "esperando você", tone: "warn" as const },
];

const weeks = [
  { semana: "S1", confirmadas: 42, convites: 60 },
  { semana: "S2", confirmadas: 51, convites: 66 },
  { semana: "S3", confirmadas: 48, convites: 70 },
  { semana: "S4", confirmadas: 63, convites: 74 },
  { semana: "S5", confirmadas: 71, convites: 82 },
  { semana: "S6", confirmadas: 78, convites: 88 },
  { semana: "S7", confirmadas: 85, convites: 94 },
  { semana: "S8", confirmadas: 96, convites: 104 },
];

const chartConfig = {
  convites: { label: "Convites", color: "var(--chart-2)" },
  confirmadas: { label: "Confirmadas", color: "var(--chart-1)" },
} satisfies ChartConfig;

const actions = [
  { title: "Mutirão da horta", when: "Sáb, 10h", where: "Praça da Vila", have: 9, need: 12 },
  { title: "Assembleia do bairro", when: "Qui, 19h30", where: "Salão paroquial", have: 24, need: 30 },
  { title: "Panfletagem na feira", when: "Dom, 8h", where: "Feira da Encruzilhada", have: 2, need: 6 },
  { title: "Reunião de organização", when: "Ter, 20h", where: "Online", have: 8, need: 8 },
];

const activity = [
  { who: "João Pedro", what: "pediu para entrar na comunidade", when: "há 10 min" },
  { who: "Maria Silva", what: "confirmou presença no Mutirão da horta", when: "há 1 h" },
  { who: "Rafael Costa", what: "criou a ação Panfletagem na feira", when: "ontem" },
  { who: "Luiza Ferraz", what: "convidou 5 pessoas", when: "ontem" },
];

const initials = (n: string) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("");

function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-display text-xs font-extrabold tracking-[2px] text-muted-foreground uppercase">Comitê Casa Amarela</p>
          <h1 className="font-condensed text-[40px] leading-[40px] font-black tracking-[-0.8px] uppercase">Painel</h1>
        </div>
        <Tabs defaultValue="mes">
          <TabsList>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="mes">Mês</TabsTrigger>
            <TabsTrigger value="ano">Ano</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 medium:grid-cols-2 wide:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 py-5">
            <CardHeader className="px-5">
              <CardDescription className="font-display text-xs font-extrabold tracking-[1.5px] uppercase">{s.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-2 px-5">
              <span className="font-condensed text-[44px] leading-none font-black">{s.value}</span>
              <Badge variant={s.tone}>{s.delta}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 wide:grid-cols-[3fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Presenças por semana</CardTitle>
            <CardDescription>Convites enviados e presenças confirmadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
              <AreaChart data={weeks} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="semana" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="convites" type="natural" fill="var(--color-convites)" fillOpacity={0.25} stroke="var(--color-convites)" strokeWidth={2} />
                <Area dataKey="confirmadas" type="natural" fill="var(--color-confirmadas)" fillOpacity={0.35} stroke="var(--color-confirmadas)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividade</CardTitle>
            <CardDescription>O que aconteceu na comunidade</CardDescription>
          </CardHeader>
          <CardContent className="px-3">
            <ItemGroup>
              {activity.map((a) => (
                <Item key={a.who + a.when} size="sm" className="px-3">
                  <ItemMedia>
                    <Avatar className="size-9">
                      <AvatarFallback>{initials(a.who)}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-[15px]">{a.who}</ItemTitle>
                    <ItemDescription className="text-sm">
                      {a.what} · {a.when}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Próximas ações</CardTitle>
          <CardDescription>Quem já confirmou e quanta gente ainda falta</CardDescription>
          <CardAction>
            <Button size="sm">
              <Plus /> Criar ação
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ação</TableHead>
                <TableHead>Quando</TableHead>
                <TableHead className="hidden medium:table-cell">Onde</TableHead>
                <TableHead className="w-[30%]">Pessoas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.map((a) => (
                <TableRow key={a.title}>
                  <TableCell className="font-bold">{a.title}</TableCell>
                  <TableCell>{a.when}</TableCell>
                  <TableCell className="hidden text-muted-foreground medium:table-cell">{a.where}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={(a.have / a.need) * 100} className="flex-1" />
                      <span className="w-12 text-right text-sm tabular-nums">
                        {a.have}/{a.need}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="link" className="px-0">
            Ver todas as ações
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

// ---- Sidebar layouts --------------------------------------------------------

const sections = (active: string): NavSection[] => [
  {
    items: [
      { title: "Painel", href: "#", icon: Home, isActive: active === "Painel" },
      { title: "Ações", href: "#", icon: CalendarDays, badge: 12, isActive: active === "Ações" },
      { title: "Pessoas", href: "#", icon: Users, badge: 7, isActive: active === "Pessoas" },
      { title: "Avisos", href: "#", icon: Bell },
    ],
  },
  {
    label: "Mobilização",
    items: [
      { title: "Materiais", icon: Megaphone, items: [{ title: "Panfletos", href: "#" }, { title: "Cartazes", href: "#" }, { title: "Guia de conversa", href: "#" }] },
      { title: "Convites", href: "#", icon: Share2 },
      { title: "Relatórios", href: "#", icon: FileText },
    ],
  },
  {
    label: "Comunidades",
    action: { label: "Entrar em outra comunidade", icon: <Plus /> },
    items: [
      { title: "Comitê Casa Amarela", href: "#", icon: LayoutGrid },
      { title: "Coletivo Olinda", href: "#", icon: LayoutGrid },
    ],
  },
];

const sidebarBrand = (
  <div className="px-1 pt-1">
    <Wordmark size="sm" />
  </div>
);

export const MenuLateralContido: Story = {
  name: "Menu lateral, corpo contido (painel)",
  render: () => (
    <SidebarLayout
      brand={sidebarBrand}
      sections={sections("Painel")}
      footer={<SidebarUser user={user} items={userItems} onSignOut={() => {}} />}
      title="Painel"
      actions={
        <>
          <Button variant="ghost" size="icon-sm" aria-label="Avisos">
            <Bell />
          </Button>
          <Button size="sm" className="hidden medium:inline-flex">
            <Plus /> Criar ação
          </Button>
        </>
      }
    >
      <Dashboard />
    </SidebarLayout>
  ),
};

const columns = [
  { title: "Sem gente", tone: "warn" as const, cards: ["Panfletagem na feira", "Faixa para a assembleia", "Carona para o ato"] },
  { title: "Em andamento", tone: "ok" as const, cards: ["Mutirão da horta", "Lista de contatos do bairro"] },
  { title: "Esta semana", tone: "secondary" as const, cards: ["Assembleia do bairro", "Reunião de organização", "Roda de conversa"] },
  { title: "Feitas", tone: "secondary" as const, cards: ["Café com os vizinhos", "Pintura do muro"] },
];

function Board() {
  const [view, setView] = useState("quadro");
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="mr-auto font-condensed text-[40px] leading-[40px] font-black tracking-[-0.8px] uppercase">Ações</h1>
        <InputGroup className="w-full medium:w-72">
          <InputGroupInput placeholder="Procurar ação…" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="quadro">Quadro</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 medium:grid-cols-2 wide:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3 rounded-lg bg-muted p-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-display text-xs font-extrabold tracking-[2px] text-muted-foreground uppercase">{col.title}</span>
              <Badge variant={col.tone}>{col.cards.length}</Badge>
            </div>
            {col.cards.map((c) => (
              <Card key={c} accent={col.tone === "warn"} className="gap-2 bg-background py-4">
                <CardHeader className="px-4">
                  <CardTitle className="text-base">{c}</CardTitle>
                  <CardDescription className="text-sm">Casa Amarela</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export const MenuLateralFluido: Story = {
  name: "Menu lateral, corpo fluido (quadro)",
  render: () => (
    <SidebarLayout
      brand={sidebarBrand}
      sections={sections("Ações")}
      footer={<SidebarUser user={user} items={userItems} onSignOut={() => {}} />}
      width="fluid"
      title={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden medium:inline-flex">
              <BreadcrumbLink href="#">Comitê Casa Amarela</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden medium:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Ações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      actions={
        <Button size="sm">
          <Plus /> <span className="hidden medium:inline">Criar ação</span>
        </Button>
      }
    >
      <Board />
    </SidebarLayout>
  ),
};

// ---- Top navbar --------------------------------------------------------------

export const BarraSuperior: Story = {
  name: "Barra superior, corpo contido (painel)",
  render: () => (
    <TopNavLayout
      brand={
        <BrandBox tone="red" size="sm" className="my-2">
          Vamo virar
        </BrandBox>
      }
      links={[
        { title: "Painel", href: "#", isActive: true },
        { title: "Ações", href: "#", badge: 12 },
        { title: "Pessoas", href: "#" },
        { title: "Materiais", href: "#" },
      ]}
      actions={
        <>
          <Button variant="ghost" size="icon-sm" aria-label="Avisos">
            <Bell />
          </Button>
          <UserButton user={user} items={userItems} onSignOut={() => {}} />
        </>
      }
      footer="Vamo Virar · feito por gente da comunidade"
    >
      <Dashboard />
    </TopNavLayout>
  ),
};

// ---- Authentication ------------------------------------------------------------

const noop = () => {};
const terms = (
  <>
    Precisa de ajuda? <a href="#" className="font-bold text-primary">Fale com a organização</a>.
  </>
);

export const Entrar: Story = {
  name: "Autenticação: entrar",
  render: () => (
    <AuthLayout footer={terms}>
      <LoginForm onSubmit={noop} forgotPasswordHref="#" signUpHref="#" providers={[{ label: "Entrar com um convite", icon: <Share2 />, onClick: noop }]} />
    </AuthLayout>
  ),
};

export const EntrarCentralizado: Story = {
  name: "Autenticação: entrar (cartão)",
  render: () => (
    <AuthLayout variant="centered" footer={terms}>
      <LoginForm onSubmit={noop} forgotPasswordHref="#" signUpHref="#" error="E-mail ou senha não conferem." />
    </AuthLayout>
  ),
};

export const CriarConta: Story = {
  name: "Autenticação: criar conta",
  render: () => (
    <AuthLayout headline="Junte sua rua">
      <SignUpForm onSubmit={noop} signInHref="#" termsHref="#" privacyHref="#" />
    </AuthLayout>
  ),
};

export const EsqueciASenha: Story = {
  name: "Autenticação: esqueci a senha",
  render: () => (
    <AuthLayout variant="centered">
      <ForgotPasswordForm onSubmit={noop} signInHref="#" sent />
    </AuthLayout>
  ),
};

export const Codigo: Story = {
  name: "Autenticação: código",
  render: () => (
    <AuthLayout variant="centered">
      <VerifyCodeForm onSubmit={noop} onResend={noop} destination="ana@comitecasaamarela.org" />
    </AuthLayout>
  ),
};

export const NovaSenha: Story = {
  name: "Autenticação: nova senha",
  render: () => (
    <AuthLayout>
      <ResetPasswordForm onSubmit={noop} />
    </AuthLayout>
  ),
};
