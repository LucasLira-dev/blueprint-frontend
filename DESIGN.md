---
name: Blueprint
description: Planos de estudo gerados por IA em um oceano profundo de foco — uma frase vira plano completo com vídeos, livros e PDF.
colors:
  azul-abissal: "oklch(0.18 0.04 195)"
  agua-profunda: "oklch(0.24 0.05 195)"
  agua-suspensa: "oklch(0.28 0.04 195)"
  agua-media: "oklch(0.30 0.06 195)"
  agua-rasa: "oklch(0.32 0.06 195)"
  linha-borda: "oklch(0.38 0.05 195)"
  bruma: "oklch(0.72 0.04 195)"
  espuma: "oklch(0.98 0.01 195)"
  turquesa-neon: "oklch(0.60 0.28 182)"
  luz-turquesa: "oklch(0.75 0.25 175)"
  coral-alerta: "oklch(0.62 0.22 25)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "16px"
  md: "18px"
  lg: "20px"
  xl: "24px"
  xxl: "28px"
  xxxl: "32px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
  feature-gap: "128px"
components:
  button-primary:
    backgroundColor: "{colors.turquesa-neon}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  button-cta-hero:
    backgroundColor: "{colors.turquesa-neon}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-pill:
    backgroundColor: "{colors.agua-media}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card-plan:
    backgroundColor: "{colors.agua-profunda}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.xl}"
  input-field:
    backgroundColor: "{colors.agua-profunda}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.sm}"
    height: "48px"
  chat-composer:
    backgroundColor: "{colors.agua-media}"
    textColor: "{colors.espuma}"
    rounded: "{rounded.xxl}"
    padding: "12px 16px"
  avatar-initials:
    backgroundColor: "oklch(0.60 0.28 182 / 0.2)"
    textColor: "{colors.turquesa-neon}"
    rounded: "{rounded.pill}"
    height: "32px"
---

# Design System: Blueprint

## Overview

**Creative North Star: "Mergulho nas Profundezas"**

A interface é um oceano noturno: fundos azul-esverdeados profundos onde a luz é escassa e, por isso, preciosa. O único ciano vivo — Turquesa Neon — existe para guiar o olhar do mergulhador: aparece em ações primárias, links e estados ativos, nunca como decoração. Tudo o mais é camada de água: superfícies tonais que se distinguem por profundidade (mais claro = mais perto da superfície = mais interativo), não por sombras chamativas.

O caráter emocional é **calmo e concentrado**: alto contraste só onde importa, ritmo generoso entre seções, movimento breve e discreto (entradas de 600ms, transições de 200–300ms). A densidade é confortável, nunca densa — o usuário está estudando, e distração é o inimigo. O acabamento lembra equipamento de mergulho sério: vidro fosco (glass panels), bordas finas de 1px, cantos arredondados generosos.

Anti-referência confirmada: **nunca parecer um dashboard SaaS genérico** — nada de roxo/azul-padrão, grades de cards idênticos sem hierarquia, gradientes genéricos de IA ou glow espalhado sem propósito.

**Key Characteristics:**
- Paleta escura com matiz oceânico constante (hue ~195 em todos os neutros)
- Um único acento ciano, usado com raridade deliberada
- Profundidade por camadas tonais + vidro fosco, não por sombras decorativas
- Cantos muito arredondados (16–32px) e pills completos para ações pequenas
- Tipografia DM Sans no corpo, Space Grotesk reservada a títulos de página
- Movimento curto, funcional e discreto

## Colors

Paleta de um só mundo: azuis-esverdeados profundos em oito degraus de profundidade, um ciano elétrico como única fonte de luz, e um coral para alertas.

### Primary
- **Turquesa Neon** (oklch(0.60 0.28 182)): o acento único do sistema. CTAs primários (gradiente), links, item de navegação ativo (`bg-primary/10 text-primary`), avatar de iniciais (`bg-primary/20`), foco de inputs (`ring-2 ring-primary`), scrollbar no hover. Sua raridade é o ponto.
- **Luz Turquesa** (oklch(0.75 0.25 175)): extremidade clara do gradiente primário e cor dos glows radiais atrás de screenshots na landing (`--primary-glow`). Nunca usada isolada como preenchimento.

### Neutral
- **Azul-Abissal** (oklch(0.18 0.04 195)): fundo da aplicação inteira. O ponto mais profundo do oceano.
- **Água Profunda** (oklch(0.24 0.05 195)): cartões, sidebar, superfícies de primeira camada.
- **Água Suspensa** (oklch(0.28 0.04 195)): popover, muted, fundo de scrollbars.
- **Água Média** (oklch(0.30 0.06 195)): superfície elevada, compositor do chat, inputs secundários, chips/pills, botão secondary.
- **Água Rasa** (oklch(0.32 0.06 195)): accent sutil, hovers de superfície elevada.
- **Linha-Borda** (oklch(0.38 0.05 195)): todas as bordas de 1px; em cartões usa-se `/60` de opacidade.
- **Bruma** (oklch(0.72 0.04 195)): texto secundário, placeholders, labels apagados — a névoa entre camadas.
- **Espuma** (oklch(0.98 0.01 195)): texto principal, ícones sobre turquesa.

### Semantic
- **Coral Alerta** (oklch(0.62 0.22 25)): destrutivo — exclusões de conta/planos/usuários, erros de formulário (mensagens usam `text-red-400`, bordas de zona de risco `border-destructive/20`).

### Named Rules
**A Regra da Luz Rara.** Turquesa Neon ocupa no máximo ~10% de qualquer tela: ação primária, estado ativo, link. Se tudo brilha, nada guia.

**A Regra do Fundo Molhado.** Nenhum neutro acinza puro: todo fundo, borda e texto secundário carrega o matiz 195 do oceano. Preto puro só em scrims de overlay (`bg-black/60`) e sombras.

## Typography

**Display Font:** Space Grotesk (fallback ui-sans-serif/system-ui)
**Body Font:** DM Sans (fallback ui-sans-serif/system-ui)

**Character:** DM Sans é humana e silenciosa — lê-se por horas sem cansar. Space Grotesk entra só em títulos de página (admin, configurações) com tracking negativo agressivo (-0.035em): traço técnico, quase de planta baixa, conectando ao nome Blueprint.

### Hierarchy
- **Display** (Space Grotesk 500, ~30px app / até 72px na hero, line-height 0.98, letter-spacing -0.035em): título da página dentro do app (`.text-display`). A hero da landing ainda usa DM Sans com tracking-tight — tratar como dívida, não como exceção a replicar.
- **Headline** (DM Sans 500, clamp(36px→48px) na landing, line-height 1.15, tracking -0.025em): títulos de seção da landing ("Como funciona", "Recursos").
- **Title** (DM Sans 600, 16px): tópicos de cartões, nomes de itens, logo wordmark.
- **Body** (DM Sans 400, 16px, line-height 1.625): parágrafos e descrições; textos de apoio podem descer a 14px.
- **Label** (DM Sans 500, 14px): botões, itens de navegação, labels de formulário (labels acima do campo, `text-sm font-medium mb-2`).

### Named Rules
**A Regra do Traço Firme.** Tracking negativo é privilégio de títulos grandes (-0.025em a -0.035em); corpo e labels nunca comprimem letras.

## Layout

Dois mundos espaciais. **Landing:** coluna central `max-w-6xl` com padding lateral 16/24px, hero em tela cheia centralizada (`min-h-dvh`), seções com respiro vertical de 96px, features em grade de 3 colunas (gap 24px) e passos em fileiras alternadas separadas por 128px. **App autenticado:** shell fixo com sidebar de 256px à esquerda (drawer sobre scrim `bg-black/60 backdrop-blur-sm` abaixo de 1024px) e conteúdo fluido; listas de planos limitadas a `max-w-5xl`.

Thumbnails e mídia sempre em proporção 16:9 (`aspect-video`) com recorte `overflow-hidden`. Breakpoints padrão Tailwind: 640 / 768 / 1024px — mobile-first, sidebar some antes de 1024px.

## Elevation & Depth

Sistema híbrido com base tonal: a profundidade primária vem das camadas de água (abissal → profunda → suspensa → média → rasa) e de bordas de 1px. O vidro fosco (`backdrop-blur(12px)` sobre `color-mix(in oklab, var(--surface) 70%, transparent)`) marca superfícies flutuantes fixas: header fixo da landing e painéis de conteúdo (cards de recursos, zonas de configurações). Sombras existem em apenas dois sabores e ambos são eventos, não estado permanente.

### Shadow Vocabulary
- **Glow Assinatura** (`box-shadow: 0 24px 80px -24px oklch(0.60 0.28 182 / 0.45)`): halo difuso ciano exclusivamente sob o botão primário em gradiente. É a assinatura luminosa do produto.
- **Estrutural** (`box-shadow: 0 10px 40px -16px oklch(0 0 0 / 0.6)`): sombra preta suave que aparece no hover de cartões e screenshots, junto com micro-elevação (`translateY(-1px)` ou `-translate-y-1`).

### Named Rules
**A Regra do Glow Assinatura.** Luz turquesa difusa só sob ações primárias. Hover pode acender bordas (`hover:border-primary/50`, `hover:border-primary/30`), nunca acender glows novos.

## Shapes

Linguagem de cantos muito abertos, derivada de uma base de 20px (`--radius: 1.25rem`): 16px (sm) em inputs e submits, 18px (md) implícito, 20px (lg) em botões, 24px (xl) em cartões e itens de navegação, 28px (xxl) em composers e painéis de vidro, 32px (xxxl) disponível para modais. Ações pequenas e chips viram pills completos (9999px). Bordas são sempre de 1px sólida — divisores estruturais em opacidade total, contorno de cartões em `/60`. Mídia é recortada pelo contêiner (`overflow-hidden` + zoom interno de 105% no hover). Os screenshots da landing ficam em molduras de janela com três bolinhas de semáforo — a única citação skeuomórfica do sistema.

## Components

### Buttons
- **Shape:** cantons arredondados de 20px (lg); CTAs de marketing e ações inline podem ser pills (9999px). Alturas compactas: 32px default, 24–36px nas variações.
- **Primary:** gradiente turquesa (`linear-gradient(100deg, oklch(0.55 0.28 185) → oklch(0.65 0.25 180) 55% → oklch(0.75 0.22 175))`) com Glow Assinatura; hover levanta 1px e ilumina 6%. Texto Espuma.
- **Secondary/Ghost:** fundo Água Média/transparente, texto claro, hover para Água Suspensa. Destrutivo usa Coral Alerta a 10–20% de fundo, nunca preenchido.
- **Focus:** anel de 3px a 50% do Turquesa Neon (`focus-visible:ring-3 ring-ring/50`).

### Chips
- **Style:** pill completo, fundo Água Média, texto 12px medium, ícone lucide 14px ao lado (Globe/Lock).
- **State:** alternam rótulo e ícone conforme visibilidade do plano; hover escurece 80%.

### Cards / Containers
- **Corner Style:** 24px (xl).
- **Background:** Água Profunda; painéis de vidro usam o treatment glass (blur + 70% de superfície).
- **Shadow Strategy:** flat em repouso; no hover ganham Estrutural + borda turquesa a 50% + zoom de thumbnail.
- **Border:** 1px Linha-Borda a 60%; painéis de zona sensível (excluir conta) trocam para `border-destructive/20`.
- **Internal Padding:** 16px (cartões compactos) a 24–32px (painéis de vidro).

### Inputs / Fields
- **Style:** fundo Água Profunda, borda 1px Linha-Borda, raio 16px, altura ~48px, padding horizontal 16px.
- **Focus:** anel 2px Turquesa Neon com borda transparente — o campo "acende".
- **Error / Disabled:** erro em texto red-400 abaixo do campo; desabilitado a 50% com cursor bloqueado.
- **Composer do chat:** variante maior — Água Média, raio 28px, textarea transparente sem borda, botão enviar circular de 32px em turquesa no canto.

### Navigation
- Sidebar fixa de 256px em Água Profunda com borda direita; itens de 40px, raio 24px, texto 14px medium Bruma → hover Água Suspensa; ativo em `bg-primary/10 text-primary` com ícone 16px. Header da landing fixo em vidro fosco com logo 32–48px + wordmark 600.

### Signature Component: Painel de Vidro (glass-panel)
O tratamento que unifica landing e app: superfície translúcida (`color-mix(in oklab, var(--surface) 70%, transparent)`), blur de 12px, borda inferior/direita de 1px. Aparece no header fixo, nos cards de recursos, nas zonas de configurações e no painel admin. É o "vidro do equipamento de mergulho": protege o conteúdo sem esconder o oceano atrás.

## Do's and Don'ts

### Do:
- **Do** resolver profundidade primeiro por camadas tonais (abissal → rasa) e borda de 1px; sombra é evento de hover, não estado de repouso.
- **Do** reservar o gradiente turquesa + glow para a ação primária de cada tela — exatamente uma por contexto.
- **Do** usar pills (9999px) para ações pequenas e chips; raio mínimo de 16px em qualquer superfície interativa.
- **Do** manter todos os neutros no matiz 195; seleção de texto também (`oklch(0.60 0.28 182 / 0.3)`).
- **Do** animar entradas com fade-up de 600ms ease-out e interações de 200–300ms; hero pode entrar com GSAP slide/fade.

### Don't:
- **Don't** introduzir roxo, azul-padrão de framework ou gradientes genéricos de IA — anti-referência confirmada: dashboard SaaS genérico.
- **Don't** espalhar glow turquesa por títulos, bordas grandes ou fundos inteiros — vira neon cyberpunk e mata a Regra da Luz Rara.
- **Don't** usar cinza/preto puro em fundos, bordas ou textos secundários; preto só em scrims e sombras.
- **Don't** criar cartões idênticos em grade sem hierarquia; cada lista tem um elemento dominante ou variação clara.
- **Don't** aplicar tracking negativo fora de títulos grandes, nem fontes terceiras além do par DM Sans + Space Grotesk.
