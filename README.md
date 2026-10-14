# @vamo-virar/design-system

Design system do [Vamo Virar](https://github.com/hugobessa/vamo-virar): cores,
tipografia, espaçamento e movimento (tokens), as marcas da campanha (caixas,
estrela, bandeira, logotipo) e os componentes de interface. Tudo é escrito em
React Native e funciona no navegador via `react-native-web`.

A identidade segue a campanha: vermelho como cor da marca, com as cores da
bandeira como detalhe. Como o vermelho também significa "perigo", ele nunca é
o fundo de um botão de ação: a ação principal é azul, a de destaque é amarela.

## Instalação

```sh
npm install @vamo-virar/design-system
```

Dependências que o projeto precisa ter (peer dependencies):

- `react` 19 e `react-native` (no navegador, `react-native-web` e `react-dom`)
- `react-native-safe-area-context` (usado por `Screen`)
- `expo-haptics` (opcional): a vibração leve dos botões no celular. Na web o
  pacote usa `haptics.web.js`, que não faz nada; bundlers que resolvem
  extensões `.web.js` (Metro, Expo, o Storybook de React Native Web) escolhem
  esse arquivo sozinhos.

Em projetos React Native/Expo, o Metro lê o código-fonte TypeScript (campo
`react-native`); os demais bundlers usam o ESM compilado em `dist/`.

## Uso

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

## Storybook

Publicado em https://hugobessa.github.io/vamo-virar-design-system/ a cada
push na `main` (workflow `Storybook`, via GitHub Pages).

```sh
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # versão estática em dist-storybook
```

A barra de ferramentas troca o tema (claro/escuro) e simula a preferência de
menos movimento. As telas do app, montadas com estes componentes, continuam
no Storybook do [repositório do app](https://github.com/hugobessa/vamo-virar),
em "Telas", como exemplos de uso.

## Desenvolvimento

```sh
npm run typecheck
npm test          # contraste das cores (WCAG)
npm run build     # gera dist/
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
