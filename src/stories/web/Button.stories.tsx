import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Button } from "../../web";

const meta: Meta<typeof Button> = {
  title: "Web/Botão",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Versão web (shadcn/ui: Radix + Tailwind) do botão. Não existe botão vermelho: vermelho lê como perigo. `primary` é azul, `accent` é amarelo (para fundos coloridos), `secondary` é contorno e `danger` é contorno em vermelho escuro, só para ações destrutivas. Com `asChild`, o visual vai para um link.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "accent", "secondary", "danger"] },
    size: { control: "inline-radio", options: ["default", "compact"] },
    onClick: { action: "clicado" },
  },
  args: { children: "Criar uma comunidade", variant: "primary" },
  decorators: [(Story) => <div className="max-w-[360px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Principal: Story = {};
export const Destaque: Story = {
  args: { variant: "accent", children: "Entrar com um convite" },
  decorators: [(Story) => <div className="rounded-lg bg-vv-blue p-4"><Story /></div>],
};
export const Secundario: Story = { args: { variant: "secondary", children: "Entrar com um convite" } };
export const Destrutivo: Story = { args: { variant: "danger", children: "Sair da comunidade" } };
export const Ocupado: Story = { args: { busy: true } };
export const Desativado: Story = { args: { disabled: true } };
export const Compacto: Story = { args: { size: "compact", variant: "secondary", children: "Editar" } };
export const Link: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#convite">Entrar com um convite</a>
    </Button>
  ),
};

export const Todos: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Button {...args} variant="primary">Principal</Button>
      <Button {...args} variant="accent">Destaque</Button>
      <Button {...args} variant="secondary">Secundário</Button>
      <Button {...args} variant="danger">Destrutivo</Button>
      <Button {...args} variant="primary" busy>Ocupado</Button>
      <Button {...args} variant="primary" disabled>Desativado</Button>
    </div>
  ),
};
