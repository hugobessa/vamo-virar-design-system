import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../shadcn/chart";

const meta: Meta = {
  title: "shadcn/Gráficos",
  parameters: {
    layout: "padded",
    docs: { description: { component: "Gráficos do shadcn/ui (recharts). As cores seguem a bandeira (azul, verde, amarelo) e depois o vermelho e o roxo da campanha: `var(--chart-1)` a `var(--chart-5)`." } },
  },
  decorators: [(Story) => <div className="grid max-w-[640px] gap-4"><Story /></div>],
};
export default meta;
type Story = StoryObj;

const months = [
  { mes: "Mai", confirmadas: 86, convites: 120 },
  { mes: "Jun", confirmadas: 105, convites: 140 },
  { mes: "Jul", confirmadas: 137, convites: 160 },
  { mes: "Ago", confirmadas: 173, convites: 190 },
  { mes: "Set", confirmadas: 209, convites: 230 },
  { mes: "Out", confirmadas: 264, convites: 280 },
];

const config = {
  confirmadas: { label: "Confirmadas", color: "var(--chart-1)" },
  convites: { label: "Convites", color: "var(--chart-2)" },
} satisfies ChartConfig;

export const Barras: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Presenças por mês</CardTitle>
        <CardDescription>Maio a outubro</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="min-h-[220px] w-full">
          <BarChart data={months} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="confirmadas" fill="var(--color-confirmadas)" radius={4} />
            <Bar dataKey="convites" fill="var(--color-convites)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};

export const AreaELinha: Story = {
  render: () => (
    <>
      <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
        <AreaChart data={months} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area dataKey="convites" type="natural" fill="var(--color-convites)" fillOpacity={0.3} stroke="var(--color-convites)" stackId="a" />
          <Area dataKey="confirmadas" type="natural" fill="var(--color-confirmadas)" fillOpacity={0.4} stroke="var(--color-confirmadas)" stackId="a" />
        </AreaChart>
      </ChartContainer>
      <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
        <LineChart data={months} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="confirmadas" type="monotone" stroke="var(--color-confirmadas)" strokeWidth={3} dot={false} />
        </LineChart>
      </ChartContainer>
    </>
  ),
};

const bairros = [
  { bairro: "casa", pessoas: 48, fill: "var(--color-casa)" },
  { bairro: "boa", pessoas: 31, fill: "var(--color-boa)" },
  { bairro: "encruzilhada", pessoas: 23, fill: "var(--color-encruzilhada)" },
  { bairro: "torre", pessoas: 17, fill: "var(--color-torre)" },
  { bairro: "varzea", pessoas: 12, fill: "var(--color-varzea)" },
];

const pieConfig = {
  pessoas: { label: "Pessoas" },
  casa: { label: "Casa Amarela", color: "var(--chart-1)" },
  boa: { label: "Boa Viagem", color: "var(--chart-2)" },
  encruzilhada: { label: "Encruzilhada", color: "var(--chart-3)" },
  torre: { label: "Torre", color: "var(--chart-4)" },
  varzea: { label: "Várzea", color: "var(--chart-5)" },
} satisfies ChartConfig;

export const Pizza: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Pessoas por bairro</CardTitle>
        <CardDescription>Comitê Casa Amarela</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={bairros} dataKey="pessoas" nameKey="bairro" innerRadius={60} strokeWidth={4} stroke="var(--background)" />
            <ChartLegend content={<ChartLegendContent nameKey="bairro" className="flex-wrap gap-2" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};
