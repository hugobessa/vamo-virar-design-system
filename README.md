# @vamo-virar/design-system

Design system do [Vamo Virar](https://github.com/hugobessa/vamo-virar): cores,
tipografia, espaçamento e movimento (tokens), as marcas da campanha (caixas,
estrela, bandeira, logotipo) e os componentes de interface, em duas versões:

- **React Native** (`@vamo-virar/design-system`): para o app (Expo); também
  roda no navegador via `react-native-web`.
- **Web** (`@vamo-virar/design-system/web`): os mesmos componentes no estilo
  [shadcn/ui](https://ui.shadcn.com) (primitivos Radix + Tailwind CSS), sem
  React Native. Veja [Versão web (shadcn/ui)](#versão-web-shadcnui).

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
@source "../node_modules/@vamo-virar/design-system/dist/web";
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

## Storybook

Publicado em https://hugobessa.github.io/vamo-virar-design-system/ a cada
push na `main` (workflow `Storybook`, via GitHub Pages).

```sh
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # versão estática em dist-storybook
```

A barra de ferramentas troca o tema (claro/escuro) e simula a preferência de
menos movimento. Os componentes da versão web ficam na seção "Web". As telas do app, montadas com estes componentes, continuam
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
3. O workflow `Publish` confere se a tag bate com a versão e publica com
   `npm publish --provenance`. Ele precisa do segredo `NPM_TOKEN` no
   repositório (um token de automação do npm com acesso ao escopo
   `@vamo-virar`).

## Licença

MIT
