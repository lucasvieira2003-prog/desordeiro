# Aplicação real do Muraka Dev Kit

## Auditoria de origem

- Destino `lucasvieira2003-prog/desordeiro`, base `e69ed78a5a01fbc99729a34040adfe2fbb285b77`: apenas README, sem site ou stack.
- Site de referência consultado em 14/10/2026: WordPress, Elementor, WooCommerce e plugins de carrinho/pesquisa carregados mesmo na página institucional. A nova implementação cobre a experiência institucional; não migra loja, catálogo, checkout ou conteúdo administrativo.
- Identidade confirmada nos arquivos CSS/imagens: preto, dourado `#FFE6AB`, cobre `#E5A25C`, Sora e brasão D coroado.
- Problemas encontrados na referência: CTAs de planos com `href="#"`, link `wa.me/seu-numero`, e-mail fictício ofuscado e contador de audiência sem fonte verificável. Esses elementos não foram reproduzidos.
- Preços e nomes da equipe vieram do site original; revisão comercial final continua necessária. A nova redação é uma proposta editorial baseada nos serviços apresentados.

## Fontes do kit consultadas

Repositório `lucasvieira2003-prog/muraka-dev-kit`, commit `bef38a06181a0f0651935269d814bd1bd7a3f9c7`.

Lidos: `FRONTEND_GUIDELINES.md`, `docs/WORKFLOW.md`, `docs/LIBRARIES.md`, `docs/THIRD_PARTY.md` e as seis especialidades em `skills/` (frontend-audit, premium-ui, animation-engineer, app-architect, performance-expert, qa-engineer).

| Recurso reutilizado | Uso concreto | Adaptação |
|---|---|---|
| Starter Vite + React + TypeScript + Tailwind | Base de projeto e checagem estática | Apenas dependências usadas em produção, configuração e lockfile próprios |
| Button.tsx | CTA consistente e ações dos planos | Paleta dourada, hover/focus e dimensões mobile |
| Tabs.tsx | Exploração de quatro objetivos de negócio | Rótulo acessível contextual, conteúdo próprio e teclado preservado |
| Modal.tsx | Formulário comercial e detalhes da equipe | Estilo da marca; Escape, restauração e contenção de foco preservados |
| Reveal.tsx + Magic UI BlurFade | Entrada dos títulos e etapas | Motion, blur de 4px, fallback sem IntersectionObserver, stagger e movimento reduzido |
| Accordion.tsx | Perguntas práticas de contratação | Conteúdo da marca, disclosure nativo acessível |

A revisão expressiva importa a adaptação de Magic UI BlurFade existente no kit e Motion 12.43.0 (versão efetiva do lockfile), para entradas de conteúdo. A licença MIT de Magic UI está preservada em src/vendor/magic-ui/LICENSE.md. Não foram importados shadcn ou React Bits. O Studio foi consultado como referência para superfícies e motion; ele não foi incorporado ao site e o repositório do kit permanece intacto.

## Decisões de experiência

- Hierarquia editorial com navegação, soluções, método, equipe, planos e contato.
- Mensagem principal e slogan preservados; fotos e brasão reais, sem imagens genéricas.
- Formulário sem coleta em servidor: valida nome e prepara mensagem no WhatsApp.
- Sem contadores inventados, depoimentos, métricas ou promessas de resultado garantido.
- Mobile com menu expansível, abas em duas colunas, planos empilhados e ajuste até 320px; conformidade visual ainda depende de revisão em navegador.

## Ativos e licenças

Fotos e brasão obtidos dos URLs presentes na página original, convertidos para WebP; autorização de uso deve ser confirmada pelo proprietário antes da publicação. Fonte Sora variável de `google/fonts/ofl/sora`, com SIL Open Font License incluída em `public/assets/Sora-OFL.txt`. Ícones Lucide via pacote `lucide-react` (ISC). React/React DOM/Vite/Tailwind/TypeScript seguem suas licenças distribuídas nos pacotes. Componentes autorais do Muraka Dev Kit reutilizados no projeto do mesmo proprietário; o kit não declara licença pública no conteúdo consultado.

## Revisão expressiva

- Referências adicionais consultadas: starter/src/vendor/magic-ui/BlurFade.tsx, starter/src/vendor/react-bits/BlurText.tsx, starter/src/styles.css e starter/src/studio/config.ts. BlurText foi avaliado, mas não importado.
- AmbientBackdrop e ServiceScene são implementações próprias deste projeto: luzes CSS, radar, camadas e fluxos SVG. Não são apresentados como componentes prontos do kit.
- Cada solução recebe uma cor de luz: dourado, lavanda, verde suave e azul. A identidade geral continua preta, cobre e dourada.
- Botões com acabamento de vidro, reflexo em hover/focus, bordas internas e fallback de fundo. Planos em marfim criam contraste; a estrutura aprovada de processo foi preservada.
- Controle acessível de pausa para fundos, prefers-reduced-motion, prefers-reduced-transparency, pausa por IntersectionObserver/visibilidade e fallback sem observer. Sem canvas, WebGL ou loop JavaScript de renderização.
- O destaque que segue o cursor altera variáveis CSS apenas em eventos de ponteiro fino; toque não depende desse efeito.
