# @vamo-virar/design-system

Design system do [Vamo Virar](https://github.com/hugobessa/vamo-virar): cores,
tipografia, espaçamento e movimento (tokens), as marcas da campanha (caixas,
estrela, bandeira, logotipo) e os componentes de interface, em três formas:

- **React Native** (`@vamo-virar/design-system`): para o app (Expo); também
  roda no navegador via `react-native-web`.
- **Web** (`@vamo-virar/design-system/web`): os mesmos componentes no estilo
  [shadcn/ui](https://ui.shadcn.com) (primitivos Radix + Tailwind CSS), sem
  React Native. Veja [Versão web (shadcn/ui)](#versão-web-shadcnui).
- **shadcn/ui completo** (`@vamo-virar/design-system/shadcn/<nome>`): todos os
  componentes do shadcn/ui, com a mesma API, no estilo da campanha. Veja
  [Componentes shadcn/ui](#componentes-shadcnui).

A identidade segue a campanha: vermelho como cor da marca, com as cores da
bandeira como detalhe. Como o vermelho também significa "perigo", ele nunca é
o fundo de um botão de ação: a ação principal é azul, a de destaque é amarela.

## Instalação

```sh
npm install @vamo-virar/design-system
```

Dependências que um projeto React Native precisa ter (peer dependencies; na
versão web basta `react` e `react-dom`):

- `react` 19 e `react-native` (no navegador, `react-native-web` e `react-dom`)
- `react-native-safe-area-context` (usado por `Screen`)
- `expo-haptics` (opcional): a vibração leve dos botões no celular. Na web o
  pacote usa `haptics.web.js`, que não faz nada; bundlers que resolvem
  extensões `.web.js` (Metro, Expo, o Storybook de React Native Web) escolhem
  esse arquivo sozinhos.

Em projetos React Native/Expo, o Metro lê o código-fonte TypeScript (campo
`react-native`); os demais bundlers usam o ESM compilado em `dist/`.

## Uso (React Native)

```tsx
import { Body, Button, Card, Display, Heading } from "@vamo-virar/design-system";

function Exemplo() {
  return (
    <Card>
      <Display size="h2" tone="brand">Vamo virar</Display>
      <Heading>Próxima ação</Heading>
      <Body muted>Sábado, 9h, na praça.</Body>
      <Button label="Confirmar" haptic="confirm" onPress={() => {}} />
    </Card>
  );
}
```

O que o pacote exporta:

| Módulo | Conteúdo |
| --- | --- |
| tokens | `palette`, `themes` (claro e escuro), tipo `Theme`. Também em `@vamo-virar/design-system/tokens`, sem React. |
| theme | `useTheme`, `space`, `radius`, `touch`, `shear`, `motion`, `fonts`, `type`, `useReducedMotion`, `SchemeOverride`, `ReducedMotionOverride` |
| layout | `useLayout`, `breakpoints`, `columns`, `WidthOverride`, `SidebarShown`, `useSidebarFits` |
| brand | `BrandBox`, `Star`, `StarBurst`, `Flag`, `FlagStripe`, `Wordmark`, `Display`, `Eyebrow` |
| kit | `Screen`, `Title`, `Heading`, `Body`, `Button`, `Field`, `FormSection`, `Card`, `Chip`, `Segmented`, `Banner`, `Progress`, `useToast`, `EmptyState`, `Collapsible`, `Stats`, `Sheet`, `Columns`, `Grid`, `MenuItem` e outros |

### Fontes

As fontes do guia (Transducer e Gotham) ainda não têm licença; na web o
pacote usa Barlow Condensed, Archivo e Montserrat do Google Fonts como
substitutas (veja `.storybook/preview-head.html` para o `<link>`). No celular,
o sistema usa a fonte padrão até as fontes serem incluídas no app.

### Tema e movimento

`useTheme()` segue o tema do sistema; `SchemeOverride` força claro ou escuro
numa parte da árvore. Toda animação respeita a preferência de menos movimento
do sistema, e `ReducedMotionOverride` a simula.

## Versão web (shadcn/ui)

`@vamo-virar/design-system/web` tem todos os componentes e marcas da versão
React Native, escritos como componentes shadcn/ui: primitivos
[Radix](https://www.radix-ui.com) (abas, painel, seção recolhível, barra de
progresso, rótulo), Tailwind CSS v4, variantes com `cva` e `cn()` para juntar
classes. Não importa nada de React Native: basta `react` e `react-dom`.

### Estilos

Escolha uma das duas formas, uma vez só no app:

**Com Tailwind no projeto** (recomendado): importe o tema depois do Tailwind e
aponte o `@source` para o pacote, para o Tailwind gerar as classes dos
componentes junto com as suas.

```css
@import "tailwindcss";
@import "@vamo-virar/design-system/web/theme.css";
@source "../node_modules/@vamo-virar/design-system/dist";
```

**Sem Tailwind**: importe o CSS já compilado (inclui o reset do Tailwind).

```ts
import "@vamo-virar/design-system/web/styles.css";
```

As fontes vêm do Google Fonts; adicione o `<link>` de
`.storybook/preview-head.html` ao `<head>` da página.

### Uso

```tsx
import { Body, Button, Card, Chip, Display, Heading } from "@vamo-virar/design-system/web";

function Exemplo() {
  return (
    <Card>
      <Display size="h2" tone="brand">Vamo virar</Display>
      <Heading>Próxima ação</Heading>
      <Body muted>Sábado, 9h, na praça.</Body>
      <Chip tone="ok">Você pode ir</Chip>
      <Button onClick={() => {}}>Confirmar</Button>
      <Button variant="secondary" asChild>
        <a href="/convite">Entrar com um convite</a>
      </Button>
    </Card>
  );
}
```

Os componentes que usam estado trazem `"use client"`, então funcionam no App
Router do Next.js.

### Diferenças da versão React Native

Os nomes dos componentes e das props são os mesmos, com as convenções da web
onde elas existem:

| React Native | Web |
| --- | --- |
| `<Button label="Salvar" kind="accent" compact onPress={…} />` | `<Button variant="accent" size="compact" onClick={…}>Salvar</Button>`; `asChild` para links |
| `ButtonFace` (visual de botão num link) | `<Button asChild><a …/></Button>` |
| `label`/`text` em `Chip`, `Banner`, `MenuItem` | `children` |
| `Card onPress` | `Card onClick` (ou `asChild` em volta de um link) |
| `Sheet visible onClose` | `Sheet open onOpenChange` (ou `trigger`); `SheetClose` fecha por dentro |
| `Collapsible` | o mesmo, com `open`/`onOpenChange`/`defaultOpen` do Radix |
| `Segmented` | o mesmo; painéis opcionais com `SegmentedContent` |
| `Field` com `multiline` | o mesmo; também `Input`, `Textarea` e `Label` soltos |
| `useLayout()`, `WidthOverride`, `SidebarShown` | CSS: variantes `medium:` (600px) e `wide:` (900px) do Tailwind |
| `Grid columns={layout.listColumns}` | `Grid` (1 coluna, 2 a partir de `wide:`) ou `columns={n}` |
| `useTheme()`, `SchemeOverride` | variáveis CSS; a classe `.dark`/`.light` força o tema numa parte da página |
| `ReducedMotionOverride` | o mesmo, junto com `data-reduced-motion="true"` para o CSS |
| `haptic`, `onRefresh`, `bottomInset` | não existem na web |

### Cores no Tailwind

O tema preenche as variáveis do shadcn/ui (`--background`, `--primary`,
`--muted-foreground`, `--destructive`, `--ring`…), então componentes que você
adicionar com `npx shadcn add` já saem com as cores da marca. O amarelo de
destaque se chama `highlight`, porque no shadcn `accent` é o fundo discreto de
hover. Outras classes da marca: `bg-brand`, `text-brand`, `bg-surface`,
`bg-chip`, `text-ok`, `text-warn`, `bg-brand-green`, `bg-highlight`, as cores
fixas da campanha (`bg-vv-red`, `bg-vv-blue`, `bg-vv-yellow`, `bg-vv-green`…)
e as fontes `font-condensed` e `font-display`.

Em CSS próprio, use as variáveis sem prefixo (`var(--primary)`,
`var(--border)`) ou as da marca (`var(--vv-primary-depth)`): elas mudam com o
tema em cada elemento, as `--color-*` do Tailwind não.

O teste `src/web/web.test.ts` confere que `theme.css` tem os mesmos valores de
`src/tokens.ts`; ao mudar uma cor, mude nos dois.

## Componentes shadcn/ui

Todos os componentes do [shadcn/ui](https://ui.shadcn.com/docs/components),
um arquivo por componente, como o `@/components/ui/<nome>` do shadcn. Os nomes,
as partes e as props são os do shadcn, então a documentação e os exemplos
(blocks) de lá valem aqui: basta trocar o caminho do import.

```tsx
import { Button } from "@vamo-virar/design-system/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@vamo-virar/design-system/shadcn/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@vamo-virar/design-system/shadcn/dialog";
```

Os estilos são os mesmos da versão web (veja [Estilos](#estilos)): o
`theme.css` com o `@source` apontando para `dist`, ou o `styles.css` compilado.

Componentes: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`,
`badge`, `breadcrumb`, `button`, `button-group`, `calendar`, `card`,
`carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`,
`dialog`, `drawer`, `dropdown-menu`, `empty`, `field`, `form`, `hover-card`,
`input`, `input-group`, `input-otp`, `item`, `kbd`, `label`, `menubar`,
`native-select`, `navigation-menu`, `pagination`, `popover`, `progress`,
`radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`,
`sidebar`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`,
`tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`, e o hook
`use-mobile`. Combobox e seletor de data são padrões montados com esses
componentes (há exemplos no Storybook); a tabela de dados do shadcn é a `table`
com `@tanstack/react-table`. O antigo `toast` do shadcn foi substituído pelo
`sonner`.

### Dependências opcionais

Os componentes que usam Radix já vêm com o pacote. Estes precisam de uma
biblioteca a mais, instalada só por quem usar o componente:

| Componente | Instale |
| --- | --- |
| `calendar` | `react-day-picker` (9.x) |
| `carousel` | `embla-carousel-react` |
| `chart` | `recharts` (3.x) |
| `command` | `cmdk` |
| `drawer` | `vaul` |
| `form` | `react-hook-form` |
| `input-otp` | `input-otp` |
| `resizable` | `react-resizable-panels` (3.x) |
| `sonner` | `sonner` |

### O que muda em relação ao shadcn padrão

- **Cores**: as variáveis do shadcn vêm dos tokens da campanha. `primary` é o
  azul; vermelho nunca é fundo de ação.
- **Botão**: `default` (azul) e o extra `accent` (amarelo) têm a borda de
  profundidade de 3px e afundam ao pressionar, como no app; `destructive` é
  contorno em vermelho escuro, e `outline` também tem a borda. Tamanhos com
  alvo de toque maior: 48px (`default`), 40px (`sm`), 56px (`lg`).
- **Campos** (`input`, `select`, `textarea`, `input-otp`, `input-group`): 48px
  de altura, texto de 17px e anel azul no foco, como o `Field` do app.
- **Marca**: `Badge variant="brand"` é a etiqueta inclinada vermelha da
  campanha; `Card accent` e `Item variant="accent"` ganham a borda vermelha à
  esquerda; `EmptyMedia variant="icon"` é uma caixa amarela inclinada; o item
  ativo da `sidebar` tem a borda vermelha; o `progress` é a barra inclinada
  verde; `FieldLegend` tem a barrinha vermelha do `FormSection`.
- **Tipografia**: títulos da `accordion`, do `calendar` e cabeçalhos de
  `table`, menus e grupos da `sidebar` usam a fonte de display em maiúsculas,
  como o `GroupHeading` do app. A `accordion` usa o "+" azul que vira "×",
  como o `Collapsible`.
- **Gráficos**: `--chart-1` a `--chart-5` são azul, verde e amarelo da
  bandeira, depois o vermelho e o roxo da campanha.
- **Textos** em português (rótulos de leitores de tela, `calendar` em pt-BR
  por padrão; passe `locale` para trocar).
- **Movimento**: animações respeitam a preferência de menos movimento
  (`motion-off:`), e a `sidebar` tem 280px, a mesma largura do app.
- **Tema escuro**: como no shadcn, a classe `.dark` vai no `<html>`, para que
  diálogos e menus (renderizados no fim do `<body>`) também fiquem escuros.

## Storybook

Publicado em https://hugobessa.github.io/vamo-virar-design-system/ a cada
push na `main` (workflow `Storybook`, via GitHub Pages).

```sh
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # versão estática em dist-storybook
```

A barra de ferramentas troca o tema (claro/escuro) e simula a preferência de
menos movimento. Os componentes da versão web ficam na seção "Web", e os do
shadcn/ui na seção "shadcn". As telas do app, montadas com estes componentes, continuam
no Storybook do [repositório do app](https://github.com/hugobessa/vamo-virar),
em "Telas", como exemplos de uso.

## Desenvolvimento

```sh
npm run typecheck
npm test          # contraste das cores (WCAG) e tema da versão web
npm run build     # gera dist/ (inclui dist/web/styles.css)
```

## Publicação no npm

1. Atualize `version` no `package.json` (`npm version patch|minor|major`).
2. Envie a tag: `git push --follow-tags`.
3. O workflow `Publish` confere se a tag bate com a versão e publica no npm
   com [trusted publishing](https://docs.npmjs.com/trusted-publishers): o
   npm confia no workflow `publish.yml` rodando no ambiente `npm` do GitHub,
   então não há token guardado no repositório, e o pacote sai com
   atestado de procedência (provenance).

## Licença

MIT
