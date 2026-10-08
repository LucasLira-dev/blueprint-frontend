# Blueprint Frontend

Frontend do Blueprint, uma aplicação web para criar, explorar e gerenciar planos de estudo personalizados com suporte a autenticação, dashboard, favoritos, conteúdo de aprofundamento (deep learning) com quiz, histórico de conversas e administração.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

## Sobre o projeto

O Blueprint conecta uma interface moderna com um backend de IA para transformar temas e objetivos em planos de estudo bem estruturados. A experiência inclui:

Repositório do backend: https://github.com/LucasLira-dev/blueprint-backend

- landing page com apresentação do produto;
- autenticação com Better Auth (e-mail/senha, Google e GitHub OAuth);
- criação de planos de estudo via **chat com streaming (SSE)** e **seletor de modelo de IA**;
- visualização de planos com PDF, vídeos do YouTube e livros do Google Books;
- favoritos, visibilidade pública/privada e gerenciamento de conta;
- **conteúdo de aprofundamento (deep learning)** por plano, gerado em 5 etapas com streaming, incluindo **quiz de fixação**;
- **histórico de conversas** — reabertura de planos anteriores pela sidebar;
- painel administrativo para usuários com papel de administrador;
- integração com a API do backend para geração de conteúdo e recursos.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 (config via `@theme` em `app/globals.css`)
- Better Auth (cliente React + plugin `adminClient`)
- TanStack Query
- Base UI + shadcn/ui (style `base-nova`)
- Zod
- Sonner (toasts)
- Lucide React
- react-markdown + remark-gfm + rehype-highlight (markdown com syntax highlighting)

## Estrutura do projeto

```bash
blueprint-frontend/
├── app/                     # App Router do Next.js (na raiz, sem pasta src/)
│   ├── (auth)/              # telas de login e cadastro
│   ├── (dashboard)/         # dashboard autenticado
│   │   ├── plans/           # meus planos, novo plano (chat), detalhes, deep learning
│   │   ├── explore/         # planos públicos e favoritos
│   │   ├── deepLearning/    # lista de conteúdos de aprofundamento
│   │   ├── conversations/   # reabertura de conversas (histórico)
│   │   ├── settings/        # configurações da conta
│   │   └── admin/           # painel administrativo
│   ├── globals.css          # estilos globais e tema "Ocean Deep"
│   ├── layout.tsx           # layout raiz (fonts, metadata)
│   └── page.tsx             # landing page
├── components/              # componentes reutilizáveis
│   ├── auth/                # formulários e fluxos de autenticação
│   ├── chat/                # chat gerador de planos (streaming)
│   ├── deep-learning/       # tópicos, quiz, cards e diálogos
│   ├── explore/             # exploração de planos e favoritos
│   ├── plans/               # gerenciamento de planos e detalhes
│   ├── admin/               # painel de administração
│   ├── settings/            # configurações do usuário
│   ├── sidebar/             # navegação lateral
│   └── ui/                  # componentes de interface base (Base UI)
├── hooks/                   # hooks customizados (useChat, usePlans, useDeepLearning…)
├── lib/                     # clientes HTTP e auth, schemas e utilitários
├── services/                # serviços da aplicação (planos, chat, admin…)
├── constants/               # constantes (modelos disponíveis, textos da landing)
├── types/                   # tipos do frontend
├── public/                  # assets públicos
├── components.json          # configuração do shadcn/ui
├── next.config.ts           # configuração do Next.js (imagens remotas)
├── package.json             # scripts e dependências
├── tsconfig.json            # config TypeScript
├── eslint.config.mjs        # lint config (ESLint 9 flat)
├── DESIGN.md                # design system "Painel de Vidro"
├── PRODUCT.md               # definição de produto
└── README.md                # documentação do frontend
```

## Rotas

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | público | Landing page (o CTA muda conforme a sessão) |
| `/login` | público | Login por e-mail/senha e OAuth |
| `/register` | público | Cadastro com confirmação de senha |
| `/plans` | logado | Meus planos (busca, visibilidade) |
| `/plans/new` | logado | Chat de geração de plano (streaming + seletor de modelo) |
| `/plans/[id]` | logado | Detalhes do plano (PDF, vídeos, livros, deep learning) |
| `/plans/[id]/deep-learning` | logado | Módulo de aprofundamento (tópicos + quiz) |
| `/explore` | logado | Planos públicos e drawer de favoritos |
| `/deepLearning` | logado | Lista de conteúdos de aprofundamento do usuário |
| `/conversations/[threadId]` | logado | Reabre o histórico de uma conversa |
| `/settings` | logado | Conta: logout, apagar planos, apagar conta |
| `/plans/user/[userId]` | admin | Planos de um usuário (acessado pelo painel admin) |
| `/admin` | admin | Lista/deleta usuários e planos |

> A proteção de rotas é feita **no cliente** (`authClient.useSession()` + redirect). Não há `middleware.ts`.

## Requisitos

Antes de iniciar, tenha instalado:

- Node.js 20+
- npm
- backend do projeto em execução em paralelo

> Este frontend depende da API do backend em `blueprint-backend` e do repositório oficial em https://github.com/LucasLira-dev/blueprint-backend para autenticação e geração de planos.

## Variáveis de ambiente

No diretório do frontend, crie ou ajuste o arquivo `.env` com os valores abaixo:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Descrição

- `NEXT_PUBLIC_BETTER_AUTH_URL`: URL base da API backend, usada pelo cliente de autenticação e chamadas HTTP. **Obrigatória** — o cliente de auth lança erro em runtime se não estiver definida.
- `NEXT_PUBLIC_FRONTEND_URL`: URL pública do frontend, usada em redirects e callbacks de autenticação. Fallback: `http://localhost:3000`.

## Como rodar

### 1) Instale as dependências

```bash
cd blueprint-frontend
npm install
```

### 2) Inicie o backend

A aplicação depende do backend localizado em `blueprint-backend`.

```bash
cd ../blueprint-backend
npm install
npm run start:dev
```

### 3) Inicie o frontend

Em outro terminal:

```bash
cd ../blueprint-frontend
npm run dev
```

Acesse:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Scripts disponíveis

```bash
npm run dev      # inicia o ambiente de desenvolvimento
npm run build    # gera a build de produção
npm run start    # inicia a build de produção
npm run lint     # executa o ESLint
```

## Fluxo principal da aplicação

1. o usuário acessa a landing page e decide entrar ou criar um plano;
2. o sistema autentica com Better Auth (e-mail/senha, Google ou GitHub);
3. o usuário acessa o dashboard e cria um plano pelo chat, escolhendo o modelo de IA (Gemini, Groq ou OpenRouter) — a geração chega via streaming (SSE), com limite de 5 gerações/hora;
4. no plano, baixa o PDF e acessa vídeos e livros relacionados;
5. pode gerar o conteúdo de **deep learning** do plano (pesquisa, tópicos e quiz) e fazer o quiz de fixação;
6. favorite planos, altere visibilidade e gerencie sua conta nas configurações;
7. reabre conversas anteriores pela seção "Conversas" da sidebar;
8. usuários administradores acessam o painel para gerenciar usuários e planos.

## Observações importantes

- O frontend não funciona de forma isolada sem o backend.
- A autenticação e as chamadas de API dependem da variável `NEXT_PUBLIC_BETTER_AUTH_URL`.
- Caso a porta do backend mude, ajuste as variáveis de ambiente e confirme que o frontend está apontando para a mesma base.
- O modelo de IA selecionado no chat é persistido em `localStorage` (`blueprint:selectedModel`).
- A interface usa tema único escuro "Ocean Deep", sem toggle de tema, e todo o conteúdo está em português (pt-BR).
- Limites de rate limit do backend aparecem como toasts: geração de plano (limite diário) e deep learning (5/hora).

## Contribuição

1. crie uma branch para a funcionalidade ou correção;
2. desenvolva a alteração e teste localmente;
3. abra um pull request descrevendo o objetivo e o impacto da mudança.

## Licença

Consulte a licença do repositório principal antes de distribuir ou reutilizar o projeto.
