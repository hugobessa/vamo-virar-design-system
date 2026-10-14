import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Actions, Body, Button, Card, Chip, Columns, Grid, GroupHeading, Heading, Screen, Stats, Title } from "../../web";

const meta: Meta = {
  title: "Web/Página",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const actions = [
  { title: "Mutirão da horta", when: "Sábado, 10h · Praça da Vila", chip: <Chip tone="ok">Você pode ir</Chip> },
  { title: "Assembleia do bairro", when: "Quinta, 19h30 · Salão paroquial", chip: <Chip tone="warn">Conflita com sua agenda</Chip> },
  { title: "Panfletagem na feira", when: "Domingo, 8h · Feira da Encruzilhada", chip: <Chip>Faltam 4 pessoas</Chip> },
  { title: "Reunião de organização", when: "Terça, 20h · Online", chip: <Chip tone="danger">Pedido não aceito</Chip> },
];

export const Quadro: Story = {
  render: () => (
    <Screen width="board">
      <Title>Comitê Casa Amarela</Title>
      <Stats
        items={[
          { value: 12, label: "Ações" },
          { value: 3, label: "Sem gente", tone: "warn" },
          { value: 1, label: "Atrasadas", tone: "danger" },
          { value: 4, label: "Pedidos", tone: "ok" },
        ]}
      />
      <Columns
        main={
          <>
            <GroupHeading text="Esta semana" n={actions.length} tone="brand" />
            <Grid>
              {actions.map((a) => (
                <Card key={a.title} accent onClick={() => {}}>
                  <Heading className="mt-0">{a.title}</Heading>
                  <Body muted>{a.when}</Body>
                  {a.chip}
                </Card>
              ))}
            </Grid>
          </>
        }
        aside={
          <>
            <GroupHeading text="Sobre" />
            <Body>Comitê de bairro em Casa Amarela, Recife. Reuniões às terças.</Body>
            <Actions>
              <Button>Criar uma ação</Button>
              <Button variant="secondary">Convidar pessoas</Button>
            </Actions>
          </>
        }
      />
    </Screen>
  ),
};
