import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { AtSign, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../../shadcn/button";
import { Checkbox } from "../../shadcn/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from "../../shadcn/field";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import { Input } from "../../shadcn/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "../../shadcn/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../shadcn/input-otp";
import { Label } from "../../shadcn/label";
import { NativeSelect, NativeSelectOption } from "../../shadcn/native-select";
import { RadioGroup, RadioGroupItem } from "../../shadcn/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../shadcn/select";
import { Slider } from "../../shadcn/slider";
import { Switch } from "../../shadcn/switch";
import { Textarea } from "../../shadcn/textarea";

const meta: Meta = {
  title: "Web/Formulários",
  parameters: { layout: "padded", docs: { description: { component: "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a do shadcn." } } },
  decorators: [(Story) => <div className="flex max-w-[460px] flex-col gap-4"><Story /></div>],
};
export default meta;
type Story = StoryObj;

export const Campos: Story = {
  render: () => (
    <>
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome da comunidade</Label>
        <Input id="nome" placeholder="Ex.: Horta da Vila" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="convite">Link de convite</Label>
        <Input id="convite" aria-invalid defaultValue="vamo" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="desc">Descrição</Label>
        <Textarea id="desc" placeholder="O que vai acontecer?" />
      </div>
      <Input type="file" />
      <Input disabled placeholder="Desativado" />
    </>
  ),
};

export const Escolhas: Story = {
  render: () => (
    <>
      <div className="flex items-center gap-3">
        <Checkbox id="termos" defaultChecked />
        <Label htmlFor="termos">Aceito receber avisos da comunidade</Label>
      </div>
      <RadioGroup defaultValue="sim">
        {[
          ["sim", "Posso ir"],
          ["talvez", "Talvez"],
          ["nao", "Não posso"],
        ].map(([v, l]) => (
          <div key={v} className="flex items-center gap-3">
            <RadioGroupItem value={v!} id={`r-${v}`} />
            <Label htmlFor={`r-${v}`}>{l}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex items-center gap-3">
        <Switch id="avisos" defaultChecked />
        <Label htmlFor="avisos">Notificações</Label>
      </div>
      <div className="grid gap-3">
        <Label>Quantas pessoas</Label>
        <Slider defaultValue={[6]} max={20} step={1} />
        <Slider defaultValue={[4, 12]} max={20} step={1} />
      </div>
    </>
  ),
};

export const Selecao: Story = {
  render: () => (
    <>
      <Select>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="Escolha uma cidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pernambuco</SelectLabel>
            <SelectItem value="recife">Recife</SelectItem>
            <SelectItem value="olinda">Olinda</SelectItem>
            <SelectItem value="caruaru">Caruaru</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Bahia</SelectLabel>
            <SelectItem value="salvador">Salvador</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select defaultValue="semana">
        <SelectTrigger size="sm" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dia">Hoje</SelectItem>
          <SelectItem value="semana">Esta semana</SelectItem>
          <SelectItem value="mes">Este mês</SelectItem>
        </SelectContent>
      </Select>
      <NativeSelect defaultValue="">
        <NativeSelectOption value="" disabled>
          Escolha um bairro (select nativo)
        </NativeSelectOption>
        <NativeSelectOption value="casa-amarela">Casa Amarela</NativeSelectOption>
        <NativeSelectOption value="boa-viagem">Boa Viagem</NativeSelectOption>
      </NativeSelect>
    </>
  ),
};

export const Codigo: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label>Código de verificação</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};

export const GrupoDeCampo: Story = {
  render: () => (
    <>
      <InputGroup>
        <InputGroupInput placeholder="Procurar ações…" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <AtSign />
        </InputGroupAddon>
        <InputGroupInput placeholder="usuario" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.vamovirar.app</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Escreva um recado para a comunidade" />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>0/280</InputGroupText>
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            Enviar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </>
  ),
};

export const ConjuntoDeCampos: Story = {
  render: () => (
    <form className="w-full">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Nova ação</FieldLegend>
          <FieldDescription>Conte o que vai acontecer e quantas pessoas precisa.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="titulo">Título</FieldLabel>
              <Input id="titulo" placeholder="Ex.: Mutirão da horta" />
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="local">Local</FieldLabel>
              <Input id="local" aria-invalid />
              <FieldError>Diga onde vai ser.</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator>ou</FieldSeparator>
        <FieldSet>
          <FieldLegend variant="label">Quem pode ver</FieldLegend>
          <RadioGroup defaultValue="todos">
            <FieldLabel htmlFor="v-todos">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Toda a comunidade</FieldTitle>
                  <FieldDescription>Aparece no quadro de todo mundo.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="todos" id="v-todos" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="v-org">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Só a organização</FieldTitle>
                  <FieldDescription>Para combinar antes de divulgar.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="org" id="v-org" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Criar ação</Button>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  ),
};

function FormDemo() {
  const form = useForm<{ nome: string }>({ defaultValues: { nome: "" } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="grid gap-4">
        <FormField
          control={form.control}
          name="nome"
          rules={{ required: "Diga como as pessoas vão te chamar." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Ana" {...field} />
              </FormControl>
              <FormDescription>É assim que as outras pessoas vão ver você.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}

export const FormularioComValidacao: Story = { render: () => <FormDemo /> };
