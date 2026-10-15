# Desordeiro — implementação do Studio Pro em HTML

## Destino e estado de origem

O repositório Desordeiro contém a versão anterior React 19 + TypeScript + Vite. O HTML independente mais recente fornecido pelo usuário foi materializado e comparado à versão de revisão: os bytes coincidiam. O novo destino é html/index.html, em branch própria. Nenhum arquivo do Muraka Dev Kit foi escrito ou alterado. A implementação React anterior permanece na branch-base para comparação.

## Contrato visual implementado

- Hero minimalista, com título exato “Marcas extraordinárias não seguem fórmulas.”, descrição “Estratégia, criatividade e tecnologia para um novo patamar de presença.” e CTA “Vamos criar juntos”.
- Archivo Black nos títulos e Archivo no corpo, com fallbacks. Fontes de google/fonts/ofl/archivo e google/fonts/ofl/archivoblack, sob SIL OFL. Versões WOFF reduzidas a Latin/Português e pontuação; licenças completas embutidas no HTML.
- Tema claro, com fundos contínuos marfim, luzes champagne/douradas e lavanda discreta. Sem faixas de seção ou divisórias externas duras.
- Hero tipográfico, soluções com navegação editorial, manifesto ligado ao scroll, processo com coluna sticky no desktop, retratos da equipe e planos em linhas. Composições diferentes, preservando conteúdo real.
- Superfícies e botões em vidro, com raio 32px, reflexo de hover/focus, fallback de fundo e suporte a transparência reduzida.
- Mesh gradient e liquid morph reais em CSS: border-radius orgânico, transformações e variação de escala. Intensidade 0.9 vinculada à amplitude das transformações. É um parâmetro de arte, não uma medida física.
- Rolagem natural suave em âncoras; barra de progresso; deslocamento discreto das formas; leitura do manifesto e etapa ativa do processo guiadas pela posição real de scroll. Um requestAnimationFrame por evento de scroll/resize, sem loop contínuo JS e sem capturar/alterar wheel ou toque.
- prefers-reduced-motion, pausa manual, suspensão com aba oculta e observer para formas fora da viewport. Mobile evita o sticky do processo e mantém leitura linear.

## Recursos do kit consultados

Commit 4a987c5e94085895295433696aca683f115466c0 de lucasvieira2003-prog/muraka-dev-kit.

Consultados: Creative Engine (creative-direction/README.md, desordeiro-case-study.md, starter/src/creative/model.ts), Layout Library (layouts/README.md, HeroLayouts.tsx), Motion Engine, Creative QA, docs/STUDIO_PRO.md, HeroPreview.tsx e hero-preview.css.

O hero minimal, a composição editorial e os tratamentos de mesh/glass/morph servem de referência. O HTML/CSS/JS final foi adaptado para a marca e não importa o Studio, templates comerciais, shaders ou a aplicação React do kit.

## Comportamento funcional

Quatro soluções com abas e ArrowUp/Down/Left/Right/Home/End; menu mobile expansível com Escape; detalhes da equipe em dialog nativo; formulário com validação que prepara a mensagem de WhatsApp; foco contido/restaurado; FAQs nativas; Instagram e telefone reais extraídos da versão anterior. Nenhuma mensagem foi enviada e nenhum dado é armazenado. Preços e telefone ainda exigem confirmação comercial antes de publicar.

## Dependências

Nenhuma dependência de runtime adicionada. Sem React, Motion, GSAP, WebGL, Lenis, shaders, trackers ou fontes externas na página entregue. Fontes e imagens estão embutidas. Esbuild, TypeScript e JSDOM existentes são usados apenas nos verificadores de desenvolvimento.

## Testes executados

- node scripts/typecheck-html.mjs — TypeScript checkJs aplicado ao JavaScript do HTML: aprovado.
- node scripts/validate-html.mjs — sintaxe CSS/JS, assets embutidos, metadados, âncoras, quatro abas/teclado, menu, dialogs/cancel/foco, formulário inválido/válido, mensagem de WhatsApp, seleção de objetivo, perfis, pausa, movimento reduzido, reveal, estado de processo/progresso e limpeza de observers: aprovado.
- node scripts/build-html.mjs — HTML completo, validação de sintaxe e cópia estática: aprovado.
- Tamanho do HTML ~366 KB, com fontes e imagens. Payload comprimido estimado ~248 KB; não é medição de rede, Lighthouse ou Core Web Vitals.
- Largura tipográfica da maior palavra do hero calculada com as métricas reais de Archivo Black para 320/375/390/768/1024/1440; cabe na largura prevista. Isso não substitui QA de overflow.

## Capturas e limitações

A captura Playwright foi tentada, mas o executável Chromium não está instalado no ambiente; tampouco há navegador de sistema disponível. Não foram gerados screenshots desktop/mobile. JSDOM não renderiza CSS: o teste de dialog usa uma adaptação da API e não valida o visual nativo. Overflow, recortes, efeitos de vidro e performance de animação precisam ser conferidos em navegador antes da publicação. Não há aprovação visual automática nem scores inventados.

## Diferenças frente à prévia do kit

A prévia do Studio é demonstrativa. Aqui, o conteúdo é da Desordeiro; CTAs e formulário têm destinos reais. O hero minimal foi combinado com mesh/morph de fundo sem deformar botões e textos. A rolagem foi implementada além da demonstração CSS do kit. O brasão aparece como assinatura discreta, com retratos reais da equipe. Não foram usados números, avaliações ou depoimentos ilustrativos. Não há vídeo obrigatório nem simulação de shader.
