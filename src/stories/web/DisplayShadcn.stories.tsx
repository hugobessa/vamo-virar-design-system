import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { CalendarX2, ChevronsUpDown, MapPin, Terminal, TriangleAlert, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../shadcn/accordion";
import { Alert, AlertDescription, AlertTitle } from "../../shadcn/alert";
import { AspectRatio } from "../../shadcn/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../../shadcn/avatar";
import { Badge } from "../../shadcn/badge";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../shadcn/breadcrumb";
import { Button } from "../../shadcn/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../shadcn/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../shadcn/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../shadcn/collapsible";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../../shadcn/empty";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "../../shadcn/item";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../shadcn/pagination";
import { Progress } from "../../shadcn/progress";
import { ScrollArea } from "../../shadcn/scroll-area";
import { Separator } from "../../shadcn/separator";
import { Skeleton } from "../../shadcn/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/tabs";
import { BrandBox } from "../../web";

const meta: Meta = {
  title: "Web/Exibição",
  parameters: { layout: "padded", docs: { description: { component: "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a do shadcn." } } },
  decorators: [(Story) => <div className="flex max-w-[560px] flex-col gap-4"><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const Cartao: Story = {
  render: () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mutirão da horta</CardTitle>
          <CardDescription>Sábado, 10h · Praça da Vila</CardDescription>
          <CardAction>
            <Badge variant="ok">Você pode ir</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Progress value={75} />
          <p className="mt-2 text-sm text-muted-foreground">9 de 12 confirmadas · faltam 3</p>
        </CardContent>
        <CardFooter className="gap-3">
          <Button>Confirmar</Button>
          <Button variant="outline">Detalhes</Button>
        </CardFooter>
      </Card>
      <Card accent>
        <CardHeader>
          <CardTitle>Assembleia do bairro</CardTitle>
          <CardDescription>Quinta, 19h30 · Salão paroquial</CardDescription>
        </CardHeader>
      </Card>
    </>
  ),
};

export const Alertas: Story = {
  render: () => (
    <>
      <Alert>
        <Terminal />
        <AlertTitle>Sincronizado agora há pouco</AlertTitle>
        <AlertDescription>Os dados do seu celular estão em dia com a comunidade.</AlertDescription>
      </Alert>
      <Alert variant="ok">
        <AlertTitle>Ação criada</AlertTitle>
        <AlertDescription>Já aparece no quadro da comunidade.</AlertDescription>
      </Alert>
      <Alert variant="warn">
        <TriangleAlert />
        <AlertTitle>Faltam pessoas</AlertTitle>
        <AlertDescription>Três vagas ainda sem ninguém para sábado.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Não foi possível entrar</AlertTitle>
        <AlertDescription>O convite expirou. Peça um novo para quem convidou você.</AlertDescription>
      </Alert>
    </>
  ),
};

export const Pessoas: Story = {
  render: () => (
    <>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Ana" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="flex -space-x-2 *:ring-2 *:ring-background">
          {["MS", "RC", "LF", "+4"].map((i) => (
            <Avatar key={i}>
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      <ItemGroup className="rounded-lg border">
        {[
          ["Ana Souza", "Organização · Casa Amarela", "AS"],
          ["João Pedro", "Pediu para entrar há 2 dias", "JP"],
        ].map(([name, desc, ini], i) => (
          <div key={name}>
            {i ? <ItemSeparator /> : null}
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarFallback>{ini}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>{desc}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </ItemActions>
            </Item>
          </div>
        ))}
      </ItemGroup>
      <Item variant="accent">
        <ItemMedia variant="icon">
          <MapPin />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Panfletagem na feira</ItemTitle>
          <ItemDescription>Domingo, 8h · Feira da Encruzilhada</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="warn">Faltam 4</Badge>
        </ItemActions>
      </Item>
    </>
  ),
};

export const Tabela: Story = {
  render: () => (
    <Table>
      <TableCaption>Ações desta semana.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ação</TableHead>
          <TableHead>Quando</TableHead>
          <TableHead className="text-right">Pessoas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["Mutirão da horta", "Sáb 10h", "9/12"],
          ["Assembleia do bairro", "Qui 19h30", "24/30"],
          ["Panfletagem na feira", "Dom 8h", "2/6"],
        ].map(([a, w, p]) => (
          <TableRow key={a}>
            <TableCell className="font-bold">{a}</TableCell>
            <TableCell>{w}</TableCell>
            <TableCell className="text-right tabular-nums">{p}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">35/48</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Abas: Story = {
  render: () => (
    <Tabs defaultValue="acoes">
      <TabsList>
        <TabsTrigger value="acoes">Ações</TabsTrigger>
        <TabsTrigger value="pessoas">Pessoas</TabsTrigger>
        <TabsTrigger value="eu">Eu</TabsTrigger>
      </TabsList>
      <TabsContent value="acoes">Os próximos eventos da comunidade.</TabsContent>
      <TabsContent value="pessoas">Três pedidos esperando aprovação.</TabsContent>
      <TabsContent value="eu">Seu perfil e suas preferências.</TabsContent>
    </Tabs>
  ),
};

export const Sanfona: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>Quem vê o que eu respondo?</AccordionTrigger>
        <AccordionContent>Só o veredito sai do celular: a organização sabe se você pode ir, não a sua agenda.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Preciso de conta?</AccordionTrigger>
        <AccordionContent>Não. Um convite basta para entrar numa comunidade.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Funciona sem internet?</AccordionTrigger>
        <AccordionContent>Sim. O app sincroniza quando a rede volta.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

function ProgressDemo() {
  const [v, setV] = useState(10);
  useEffect(() => {
    const t = setTimeout(() => setV(66), 400);
    return () => clearTimeout(t);
  }, []);
  return <Progress value={v} />;
}

export const ProgressoECarregando: Story = {
  render: () => (
    <>
      <ProgressDemo />
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-28 w-full" />
    </>
  ),
};

export const Vazio: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarX2 />
        </EmptyMedia>
        <EmptyTitle>Nenhuma ação ainda</EmptyTitle>
        <EmptyDescription>Crie a primeira e convide quem pode ajudar.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Criar uma ação</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const NavegacaoEstrutural: Story = {
  render: () => (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Comunidades</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Comitê Casa Amarela</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mutirão da horta</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  ),
};

export const Carrossel: Story = {
  render: () => (
    <div className="px-14">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {(["red", "green", "yellow", "blue"] as const).map((tone, i) => (
            <CarouselItem key={tone}>
              <div className="flex aspect-square items-center justify-center rounded-lg border bg-card">
                <BrandBox tone={tone} size="lg">{`0${i + 1}`}</BrandBox>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const OutrosLayouts: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <div className="w-[280px]">
          <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-vv-red">
            <span className="font-condensed text-3xl font-black text-vv-white uppercase">16:9</span>
          </AspectRatio>
        </div>
        <div className="flex h-6 items-center gap-3 text-[15px]">
          <span>Ações</span>
          <Separator orientation="vertical" />
          <span>Pessoas</span>
          <Separator orientation="vertical" />
          <span>Eu</span>
        </div>
        <ScrollArea className="h-40 w-64 rounded-lg border">
          <div className="p-3">
            <p className="mb-2 font-display text-xs font-extrabold tracking-[2px] text-muted-foreground uppercase">Bairros</p>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="border-b py-2 text-[15px] last:border-0">
                Bairro {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
        <Collapsible open={open} onOpenChange={setOpen} className="flex w-72 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <Users className="size-4" /> 3 pedidos para entrar
            </span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Mostrar">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-lg border px-3 py-2 text-[15px]">Ana Souza</div>
          <CollapsibleContent className="flex flex-col gap-2">
            <div className="rounded-lg border px-3 py-2 text-[15px]">João Pedro</div>
            <div className="rounded-lg border px-3 py-2 text-[15px]">Maria Silva</div>
          </CollapsibleContent>
        </Collapsible>
      </>
    );
  },
};
