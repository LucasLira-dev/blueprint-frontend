# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Autodidatas gerais (pt-BR): pessoas estudando por conta própria — novas habilidades, tecnologia, hobbies, idiomas. Chegam com um tema ou objetivo em mente e querem sair com um plano de estudos utilizável, sem montar cronograma nem garimpar materiais manualmente.

## Product Purpose

O Blueprint transforma um tema/objetivo em um plano de estudos estruturado gerado por IA: syllabus semanal gerado em streaming, top-10 vídeos do YouTube (YouTube Data API) e top-10 livros do Google Books (Google Books API) anexados ao plano, exportação em PDF, favoritos e exploração de planos públicos. Sucesso: o usuário vai de uma frase a um plano completo e baixável em minutos.

## Positioning

Simplicidade guiada: menos fricção que conversar com um chatbot genérico — um fluxo guiado do objetivo ao PDF pronto, com materiais curados incluídos. O mecanismo é o pipeline guiado (uma frase → plano + vídeos + livros + PDF), não a conversa aberta.

## Operating Context

- Projeto pessoal/portfólio do dono; sem meta de lançamento público definida hoje.
- Frontend Next.js 16 dependente do backend `blueprint-backend` (repositório separado, roda em localhost:3001 em dev); não funciona isolado.
- A curadoria de vídeos e livros acontece no backend; o frontend consome a API.
- Toda a UI e a voz do produto são em português brasileiro.

## Capabilities and Constraints

Confirmado no código:

- Auth Better Auth: login/cadastro com email/senha e social login.
- Papéis: `user` | `admin`; painel admin lista/exclui usuários, vê detalhes e exclui planos.
- Criação de plano via chat com streaming em tempo real (moderação, busca de vídeos e livros visíveis ao usuário).
- Plano = `topic`, `syllabus`, `pdfUrl`, `visibility` (`PUBLIC`|`PRIVATE`), `videos[]`, `books[]`.
- Favoritos apenas em planos públicos, com contagem total; exploração pública de planos de outros usuários.
- Configurações de conta: excluir conta e excluir todos os planos.
- Terminologia canônica: "planos", "blueprints", "favoritos", "explorar".

Fato explicitamente não decidido: se o produto terá expansão de público/idioma no futuro.

## Brand Commitments

- Nome "Blueprint" e logo existente (`public/logo.png`) em uso no header e footer.
- Voz pt-BR direta e informal (ex.: "Do objetivo ao domínio, em três telas.").

## Evidence on Hand

- Screenshots reais do produto usados na landing: `public/image1.png`–`public/image4.png`.
- Logo em `public/logo.png`; favicon em `app/favicon.ico`.
- Não há depoimentos, métricas, clientes, imprensa nem cases reais — nada disso pode ser inventado em trabalho futuro.

## Product Principles

1. Guiado acima de aberto: nenhum passo deixa o usuário diante de uma tela vazia; o fluxo conduz do objetivo à saída completa.
2. Uma frase basta: mínima fricção de entrada; o sistema faz o trabalho pesado de estruturação.
3. Plano completo é a barra: só está pronto quando tem syllabus, vídeos, livros e PDF baixável.
4. Aprender em público: compartilhar e favoritar planos são cidadãos de primeira classe.
5. Escopo honesto: polimento real nos fluxos que existem; nunca fingir funcionalidade ou conteúdo.
