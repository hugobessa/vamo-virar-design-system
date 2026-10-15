import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "../../shadcn/calendar";

const meta: Meta = { title: "Web/Calendário", parameters: { layout: "padded", docs: { description: { component: "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a do shadcn." } } } };
export default meta;
type Story = StoryObj;

const base = new Date(2026, 9, 14);

function Single() {
  const [date, setDate] = useState<Date | undefined>(base);
  return <Calendar mode="single" defaultMonth={base} selected={date} onSelect={setDate} className="rounded-lg border" />;
}

function Range() {
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 9, 10), to: new Date(2026, 9, 17) });
  return <Calendar mode="range" defaultMonth={base} selected={range} onSelect={setRange} numberOfMonths={2} className="rounded-lg border" />;
}

function Dropdowns() {
  const [date, setDate] = useState<Date | undefined>(base);
  return <Calendar mode="single" defaultMonth={base} selected={date} onSelect={setDate} captionLayout="dropdown" className="rounded-lg border" />;
}

export const UmDia: Story = { render: () => <Single /> };
export const Periodo: Story = { render: () => <Range /> };
export const ComMenus: Story = { render: () => <Dropdowns /> };
