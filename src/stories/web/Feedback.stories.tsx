import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Banner, Body, Button, Card, Chip, EmptyState, Heading, Progress, Stats, useToast } from "../../web";

const meta: Meta = {
  title: "Web/Cartões e avisos",
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="flex max-w-[420px] flex-col gap-3"><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const Cartao: Story = {
  render: () => (
    <>
      <Card>
        <Heading>Mutirão da horta</Heading>
        <Body muted>Sábado, 10h · Praça da Vila</Body>
        <Chip tone="ok">Você pode ir</Chip>
      </Card>
      <Card accent onClick={() => {}}>
        <Heading>Assembleia do bairro</Heading>
        <Body muted>Quinta, 19h30 · Salão paroquial</Body>
        <Chip tone="warn">Conflita com sua agenda</Chip>
      </Card>
    </>
  ),
};

export const Etiquetas: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Chip>Neutra</Chip>
      <Chip tone="ok">Você pode ir</Chip>
      <Chip tone="warn">Pedido enviado</Chip>
      <Chip tone="danger">Pedido não aceito</Chip>
    </div>
  ),
};

export const Avisos: Story = {
  render: () => (
    <>
      <Banner>Sincronizado agora há pouco.</Banner>
      <Banner tone="ok">Evento criado.</Banner>
      <Banner tone="warn">Versão web de teste: os dados ficam sem proteção neste navegador.</Banner>
      <Banner tone="danger">Não foi possível entrar. Peça um novo convite.</Banner>
    </>
  ),
};

export const Numeros: Story = {
  render: () => (
    <>
      <Stats
        items={[
          { value: 12, label: "Ações" },
          { value: 3, label: "Sem gente", tone: "warn" },
          { value: 1, label: "Atrasadas", tone: "danger" },
          { value: 0, label: "Pedidos", tone: "warn" },
        ]}
      />
      <Progress value={9} max={12} label="9 de 12 confirmadas · faltam 3" />
      <Progress value={2} max={10} tone="warn" label="2 de 10 · precisa de gente" />
    </>
  ),
};

export const Vazio: Story = {
  render: () => <EmptyState title="Nenhuma ação ainda" body="Crie a primeira e convide quem pode ajudar." action="Criar uma ação" onAction={() => {}} />,
};

function ToastDemo() {
  const [toast, show] = useToast();
  return (
    <>
      <Button variant="accent" onClick={() => show("Resposta enviada. Só o veredito saiu do celular.")}>
        Mostrar confirmação
      </Button>
      {toast}
    </>
  );
}

export const Confirmacao: Story = { render: () => <ToastDemo /> };
