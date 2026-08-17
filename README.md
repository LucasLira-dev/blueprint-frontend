# Blueprint Frontend

Frontend do Blueprint, uma aplicação web para criar, explorar e gerenciar planos de estudo personalizados com suporte a autenticação, dashboard, favoritos e administração.

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
- autenticação com Better Auth;
- criação e visualização de planos de estudo;
- favoritos, visibilidade pública/privada e gerenciamento de conta;
- painel administrativo para usuários com papel de administrador;
- integração com a API do backend para geração de conteúdo e recursos.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- TanStack Query
- Zod
- Sonner
- Lucide React
- shadcn/ui-inspired component system

## Estrutura do projeto

```bash
blueprint-frontend/
├── app/                     # App Router do Next.js
│   ├── (auth)/              # telas de login e cadastro
│   ├── (dashboard)/         # dashboard, planos, configurações e admin
│   ├── globals.css          # estilos globais
│   ├── layout.tsx           # layout raiz
│   └── page.tsx             # landing page
├── components/              # componentes reutilizáveis
│   ├── auth/                # formulários e fluxos de autenticação
│   ├── chat/                # chats/assistentes
│   ├── explore/             # exploração de planos
│   ├── plans/               # gerenciamento de planos
│   ├── settings/            # configurações do usuário
│   ├── sidebar/             # navegação lateral
│   └── ui/                  # componentes de interface base
├── hooks/                   # hooks customizados
├── lib/                     # clientes HTTP, auth e utilitários
├── services/                # serviços da aplicação
├── types/                   # tipos do frontend
├── public/                  # assets públicos
├── .env                     # variáveis locais do ambiente
├── components.json          # configuração do shadcn/ui
├── next.config.ts           # configuração do Next.js
├── package.json             # scripts e dependências
├── tsconfig.json            # config TypeScript
├── eslint.config.mjs        # lint config
└── README.md                # documentação do frontend
```

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

- `NEXT_PUBLIC_BETTER_AUTH_URL`: URL base da API backend, usada pelo cliente de autenticação e chamadas HTTP.
- `NEXT_PUBLIC_FRONTEND_URL`: URL pública do frontend, usada em redirects e callbacks de autenticação.

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
2. o sistema autentica com Better Auth;
3. o usuário acessa o dashboard e cria ou explora planos;
4. o frontend consulta a API do backend para geração, listagem e detalhes;
5. o usuário pode salvar como favorito, alterar visibilidade e gerenciar preferências;
6. usuários administradores acessam recursos extras do painel administrativo.

## Observações importantes

- O frontend não funciona de forma isolada sem o backend.
- A autenticação e as chamadas de API dependem da variável `NEXT_PUBLIC_BETTER_AUTH_URL`.
- Caso a porta do backend mude, ajuste as variáveis de ambiente e confirme que o frontend está apontando para a mesma base.

## Contribuição

1. crie uma branch para a funcionalidade ou correção;
2. desenvolva a alteração e teste localmente;
3. abra um pull request descrevendo o objetivo e o impacto da mudança.

## Licença

Consulte a licença do repositório principal antes de distribuir ou reutilizar o projeto.
