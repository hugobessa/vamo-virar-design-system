import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { BrandBox, Button, Display, Eyebrow, Flag, FlagStripe, Star, StarBurst, Wordmark, type BoxSize, type BoxTone } from "../../web";

const meta: Meta = {
  title: "Web/Marca",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const tones: BoxTone[] = ["red", "green", "yellow", "blue", "white"];
const sizes: BoxSize[] = ["sm", "md", "lg", "xl"];

export const Caixas: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-6">
        {tones.map((t) => (
          <BrandBox key={t} tone={t}>{t}</BrandBox>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6">
        {sizes.map((s) => (
          <BrandBox key={s} size={s}>{s}</BrandBox>
        ))}
      </div>
    </div>
  ),
};

export const Marca: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <Wordmark size="sm" />
      <Wordmark size="md" />
      <Wordmark size="lg" />
    </div>
  ),
};

export const Detalhes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Flag />
        <Flag width={80} />
        <Star />
        <Star size={40} />
      </div>
      <FlagStripe />
      <FlagStripe width={120} height={4} />
    </div>
  ),
};

export const Titulos: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Eyebrow>Comunidade</Eyebrow>
      <Display tone="brand">Vamo virar</Display>
      <Display size="h2">Próximas ações</Display>
      <Display tone="brand" size="display" skewed>Vamo virar</Display>
      <div className="bg-vv-red p-6">
        <Display tone="onBrand" size="h2" skewed>Junte sua rua</Display>
      </div>
    </div>
  ),
};

function Burst() {
  const [n, setN] = useState(0);
  return (
    <div className="flex flex-col items-start gap-2 pt-16">
      <Button onClick={() => setN((x) => x + 1)}>Confirmar presença</Button>
      <div className="w-[220px]">
        <StarBurst trigger={n} />
      </div>
    </div>
  );
}

export const Estrelas: Story = { render: () => <Burst /> };
