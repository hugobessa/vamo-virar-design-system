import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { CalendarIcon, Check, ChevronsUpDown, Copy, LogOut, Settings, Share2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../shadcn/alert-dialog";
import { Avatar, AvatarFallback } from "../../shadcn/avatar";
import { Button, buttonVariants } from "../../shadcn/button";
import { Calendar } from "../../shadcn/calendar";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../../shadcn/command";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "../../shadcn/context-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../shadcn/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../shadcn/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../shadcn/hover-card";
import { Input } from "../../shadcn/input";
import { Kbd } from "../../shadcn/kbd";
import { Label } from "../../shadcn/label";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "../../shadcn/menubar";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../shadcn/sheet";
import { Toaster } from "../../shadcn/sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../shadcn/tooltip";
import { cn } from "../../web";

const meta: Meta = {
  title: "Web/Sobreposições",
  parameters: { layout: "padded", docs: { description: { component: "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a do shadcn." } } },
  decorators: [(Story) => <div className="flex flex-wrap items-start gap-3"><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const Dialogo: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Como as outras pessoas da comunidade veem você.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="d-nome">Nome</Label>
          <Input id="d-nome" defaultValue="Ana Souza" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DialogoDeAlerta: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Sair da comunidade</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair do Comitê Casa Amarela?</AlertDialogTitle>
          <AlertDialogDescription>Você deixa de ver as ações e precisa de um novo convite para voltar.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ficar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: "destructive" })}>Sair</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Paineis: Story = {
  render: () => (
    <>
      {(["right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">Painel ({side})</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Mostre só as ações que interessam.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-2 px-4 medium:px-6">
              <Label htmlFor={`bairro-${side}`}>Bairro</Label>
              <Input id={`bairro-${side}`} placeholder="Casa Amarela" />
            </div>
            <SheetFooter>
              <Button>Aplicar</Button>
              <SheetClose asChild>
                <Button variant="outline">Fechar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="accent">Gaveta (arrastável)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Você pode ir?</DrawerTitle>
            <DrawerDescription>Mutirão da horta · Sábado, 10h</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Posso ir</Button>
            <DrawerClose asChild>
              <Button variant="outline">Agora não</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  ),
};

export const Flutuantes: Story = {
  render: () => (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid gap-3">
            <p className="font-bold">Lembrete</p>
            <p className="text-[15px] text-muted-foreground">Avisar a comunidade um dia antes.</p>
            <Input defaultValue="Sexta, 18h" />
          </div>
        </PopoverContent>
      </Popover>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@anasouza</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Ana Souza</p>
              <p className="text-sm text-muted-foreground">Organiza o Comitê Casa Amarela desde 2022.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Compartilhar">
            <Share2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Compartilhar convite <Kbd>C</Kbd>
        </TooltipContent>
      </Tooltip>
    </>
  ),
};

function DropdownDemo() {
  const [avisos, setAvisos] = useState(true);
  const [ordem, setOrdem] = useState("data");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Minha conta</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel>Ana Souza</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User /> Perfil <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings /> Preferências
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share2 /> Convidar
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>WhatsApp</DropdownMenuItem>
              <DropdownMenuItem>
                <Copy /> Copiar link
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={avisos} onCheckedChange={setAvisos}>
          Receber avisos
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={ordem} onValueChange={setOrdem}>
          <DropdownMenuRadioItem value="data">Data</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vagas">Vagas</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Menus: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <DropdownDemo />
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-lg border-2 border-dashed text-[15px] text-muted-foreground">
          Clique com o botão direito
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem>
            Abrir <ContextMenuShortcut>↵</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Duplicar ação</ContextMenuItem>
          <ContextMenuCheckboxItem checked>Fixar no topo</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Cancelar ação</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Arquivo</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Nova ação <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Exportar agenda</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Imprimir</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Exibir</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked>Ações passadas</MenubarCheckboxItem>
            <MenubarCheckboxItem>Só as minhas</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
};

const bairros = ["Casa Amarela", "Boa Viagem", "Encruzilhada", "Torre", "Várzea"];

function ComandoDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4">
      <Command className="w-80 rounded-lg border shadow-md">
        <CommandInput placeholder="Procurar…" />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          <CommandGroup heading="Ações">
            <CommandItem>
              <CalendarIcon /> Criar ação
            </CommandItem>
            <CommandItem>
              <Share2 /> Convidar pessoas
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Conta">
            <CommandItem>
              <User /> Perfil <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir paleta de comandos
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="O que você quer fazer?" />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          <CommandGroup heading="Bairros">
            {bairros.map((b) => (
              <CommandItem key={b} onSelect={() => setOpen(false)}>
                {b}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export const Comando: Story = { render: () => <ComandoDemo /> };

function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[260px] justify-between font-medium">
          {value || "Escolha o bairro…"}
          <ChevronsUpDown className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Procurar bairro…" />
          <CommandList>
            <CommandEmpty>Nenhum bairro.</CommandEmpty>
            <CommandGroup>
              {bairros.map((b) => (
                <CommandItem
                  key={b}
                  value={b}
                  onSelect={(v) => {
                    setValue(v === value ? "" : v);
                    setOpen(false);
                  }}
                >
                  {b}
                  <Check className={cn("ml-auto text-primary", value === b ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const ComboboxPadrao: Story = { name: "Combobox (padrão)", render: () => <ComboboxDemo /> };

function DatePickerDemo() {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[260px] justify-start font-medium", !date && "text-muted-foreground")}>
          <CalendarIcon className="text-primary" />
          {date ? date.toLocaleDateString("pt-BR", { dateStyle: "long" }) : "Escolha a data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export const SeletorDeData: Story = { name: "Seletor de data (padrão)", render: () => <DatePickerDemo /> };

export const Notificacoes: Story = {
  render: () => (
    <>
      <Toaster position="bottom-center" />
      <Button onClick={() => toast("Resposta enviada", { description: "Só o veredito saiu do celular." })}>Mostrar aviso</Button>
      <Button variant="outline" onClick={() => toast.success("Ação criada")}>
        Sucesso
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Faltam 3 pessoas")}>
        Alerta
      </Button>
      <Button variant="destructive" onClick={() => toast.error("Não foi possível entrar")}>
        Erro
      </Button>
    </>
  ),
};
