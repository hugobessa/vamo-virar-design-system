import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { BellButton, Body, Button, Collapsible, Field, MenuItem, MoreButton, ReadOnly, Sheet } from "../../web";

const meta: Meta = {
  title: "Web/Painéis e menus",
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="flex max-w-[420px] flex-col gap-3"><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const Painel: Story = {
  render: () => (
    <Sheet title="Nova ação" description="Conte o que vai acontecer e quantas pessoas precisa." trigger={<Button>Criar uma ação</Button>}>
      <Field label="Título" placeholder="Ex.: Mutirão da horta" />
      <Field label="Quantas pessoas" type="number" defaultValue={6} />
      <Button>Criar</Button>
    </Sheet>
  ),
};

function MenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <BellButton count={3} label="Notificações" />
      <BellButton count={0} label="Notificações" />
      <MoreButton label="Mais opções" onClick={() => setOpen(true)} />
      <Sheet open={open} onOpenChange={setOpen}>
        <MenuItem onClick={() => setOpen(false)}>Editar ação</MenuItem>
        <MenuItem onClick={() => setOpen(false)}>Compartilhar</MenuItem>
        <MenuItem danger onClick={() => setOpen(false)}>Cancelar ação</MenuItem>
      </Sheet>
    </div>
  );
}

export const Menu: Story = { render: () => <MenuDemo /> };

export const Secao: Story = {
  render: () => (
    <Collapsible title="Avançado">
      <Body>Conteúdo que entra deslizando quando a seção abre.</Body>
    </Collapsible>
  ),
};

export const SomenteLeitura: Story = {
  render: () => (
    <ReadOnly.Provider value>
      <Body muted>Comunidade desativada: só o que tem `allowReadOnly` continua ligado.</Body>
      <Field label="Nome" defaultValue="Horta da Vila" />
      <Button>Salvar</Button>
      <Button variant="secondary" allowReadOnly>Ver membros</Button>
      <MenuItem>Editar</MenuItem>
    </ReadOnly.Provider>
  ),
};
