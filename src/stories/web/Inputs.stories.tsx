import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { Body, Field, FormSection, Segmented, SegmentedContent } from "../../web";

const meta: Meta<typeof Field> = {
  title: "Web/Campos",
  component: Field,
  parameters: { layout: "padded" },
  args: { label: "Nome da comunidade", placeholder: "Ex.: Horta da Vila" },
  decorators: [(Story) => <div className="max-w-[420px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Padrao: Story = {};
export const ComAjuda: Story = { args: { label: "Seu nome", help: "É assim que as outras pessoas vão ver você." } };
export const ComErro: Story = { args: { label: "Cole o link de convite", defaultValue: "vamo", error: "Esse link de convite não parece certo. Peça um novo para quem convidou você." } };
export const VariasLinhas: Story = { args: { label: "Descrição", multiline: true, placeholder: "O que vai acontecer?" } };

export const Secao: Story = {
  render: () => (
    <FormSection title="Quando e onde">
      <Field label="Data" type="date" />
      <Field label="Local" placeholder="Ex.: Praça da Vila" />
    </FormSection>
  ),
};

export const Abas: StoryObj<typeof Segmented> = {
  render: () => {
    const [v, setV] = useState<"eventos" | "pessoas" | "eu">("eventos");
    return (
      <Segmented
        value={v}
        onChange={setV}
        options={[
          { value: "eventos", label: "Eventos" },
          { value: "pessoas", label: "Pessoas", badge: 3 },
          { value: "eu", label: "Eu" },
        ]}
      >
        <SegmentedContent value="eventos"><Body>Os próximos eventos da comunidade.</Body></SegmentedContent>
        <SegmentedContent value="pessoas"><Body>Três pedidos esperando aprovação.</Body></SegmentedContent>
        <SegmentedContent value="eu"><Body>Seu perfil e suas preferências.</Body></SegmentedContent>
      </Segmented>
    );
  },
};
