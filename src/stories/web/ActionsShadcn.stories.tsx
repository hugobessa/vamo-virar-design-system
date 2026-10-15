import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Bold, ChevronDown, Heart, Italic, Megaphone, Plus, Share2, Underline } from "lucide-react";
import { Badge } from "../../shadcn/badge";
import { Button } from "../../shadcn/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../../shadcn/button-group";
import { Kbd, KbdGroup } from "../../shadcn/kbd";
import { Spinner } from "../../shadcn/spinner";
import { Toggle } from "../../shadcn/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../shadcn/toggle-group";

const meta: Meta = {
  title: "Web/Botões e ações",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componentes do shadcn/ui no estilo da campanha. Importe cada um de `@vamo-virar/design-system/shadcn/<nome>`; a API é a mesma do shadcn. Vermelho nunca é fundo de ação: `default` é azul, `accent` é amarelo e `destructive` é contorno vermelho escuro.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Botoes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Confirmar presença</Button>
        <Button variant="accent">Entrar com convite</Button>
        <Button variant="outline">Ver detalhes</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Sair da comunidade</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Pequeno</Button>
        <Button>Padrão</Button>
        <Button size="lg">Grande</Button>
        <Button size="icon-sm" variant="outline" aria-label="Curtir">
          <Heart />
        </Button>
        <Button size="icon" aria-label="Criar">
          <Plus />
        </Button>
        <Button size="icon-lg" variant="accent" aria-label="Divulgar">
          <Megaphone />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>
          <Spinner /> Enviando
        </Button>
        <Button disabled>Desativado</Button>
        <Button variant="outline" disabled>
          Desativado
        </Button>
        <Button asChild variant="outline">
          <a href="#convite">Link com visual de botão</a>
        </Button>
      </div>
    </div>
  ),
};

export const GrupoDeBotoes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <ButtonGroup>
        <Button variant="outline">Arquivar</Button>
        <Button variant="outline">Denunciar</Button>
        <Button variant="outline" aria-label="Mais">
          <ChevronDown />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Recife</ButtonGroupText>
        <Button variant="outline">Trocar cidade</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Confirmar</Button>
        <ButtonGroupSeparator />
        <Button aria-label="Compartilhar">
          <Share2 />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const Alternancia: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex gap-2">
        <Toggle aria-label="Negrito">
          <Bold />
        </Toggle>
        <Toggle variant="outline" aria-label="Itálico" defaultPressed>
          <Italic />
        </Toggle>
      </div>
      <ToggleGroup type="single" defaultValue="semana" variant="outline">
        <ToggleGroupItem value="dia">Dia</ToggleGroupItem>
        <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
        <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" spacing={2}>
        <ToggleGroupItem value="b" aria-label="Negrito">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="i" aria-label="Itálico">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="u" aria-label="Sublinhado">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Etiquetas: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Nova</Badge>
        <Badge variant="secondary">Rascunho</Badge>
        <Badge variant="outline">Online</Badge>
        <Badge variant="destructive">Cancelada</Badge>
        <Badge variant="ok">Você pode ir</Badge>
        <Badge variant="warn">Faltam 3</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 py-2">
        <Badge variant="brand">Vamo virar</Badge>
        <Badge variant="brand">Recife</Badge>
      </div>
    </div>
  ),
};

export const TeclasEAguarde: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <p className="text-[15px]">
        Procure com{" "}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        e feche com <Kbd>Esc</Kbd>.
      </p>
      <div className="flex items-center gap-4 text-primary">
        <Spinner />
        <Spinner className="size-8" />
        <span className="text-[15px] text-muted-foreground">Sincronizando…</span>
      </div>
    </div>
  ),
};
