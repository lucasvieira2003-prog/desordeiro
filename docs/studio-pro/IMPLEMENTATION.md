# Desordeiro — HTML de revisão com referências dark/light

## Resultado

A composição usa as duas referências de agência e a referência de preços enviadas pelo usuário. O hero ficou centralizado, com fonte em escala menor, preto/grafite, branco quente e dourado. A abertura inclui uma escultura de contornos vetoriais própria. O conteúdo transita para o claro, com soluções, manifesto, processo e equipe em composições editoriais. O final retorna ao escuro para planos, FAQ e contato.

O header mede 68px no desktop e 64px no mobile. A regra da classe icon-button estava tornando o menu visível também no desktop; uma regra específica do header agora oculta esse botão acima do breakpoint mobile. O header alterna sua tonalidade conforme a seção em leitura.

Os planos passaram de linhas para três cartões de vidro escuro, com título grande parcialmente atrás, preço em destaque, lista de serviços e CTA. Os valores R$4.000, R$7.500 e R$12.000 por mês e seus serviços foram preservados. O plano intermediário ganha CTA claro, sem alegações de ser o mais vendido ou recomendado.

## Identidade, conteúdo e originalidade

- Archivo Black + Archivo locais/licenciadas e fontes fallback.
- Dourado como acento, sem reproduzir o vermelho ou roxo das referências.
- Escultura SVG autoral, construída por projeção de seções de uma superfície toroidal. Não é um shader, vídeo, render 3D em tempo real ou imagem copiada.
- Efeitos de movimento usam transformações CSS, entrada de conteúdo e rolagem. Sem bolhas claras permanentes, fundo mesh global ou deformação de botões.
- Conteúdo comercial, pessoas e contatos da versão anterior mantidos. Nenhuma estatística, case ou depoimento inventado.
- Nenhum arquivo do Muraka Dev Kit foi escrito ou alterado.

O kit foi consultado no commit 4a987c5e94085895295433696aca683f115466c0: Creative Engine, caso Desordeiro, Layout Library, Motion Engine, Creative QA e Studio Pro. A composição final foi adaptada às referências mais recentes; não é uma cópia literal do preset inicial.

## Funcionamento

Quatro soluções com abas e teclado, menu mobile, detalhes da equipe em dialog, formulário validado que prepara mensagem para WhatsApp, FAQs nativas, telefone e Instagram. A rolagem controla progresso, deslocamento discreto do visual, leitura do manifesto e indicação do processo. A estrutura sticky do processo se torna leitura linear no mobile.

Preferência por movimento reduzido, pausa manual, suspensão com aba oculta e pausa fora da viewport estão preservadas. O SVG é um elemento decorativo sem impacto na leitura assistiva. A página não armazena dados do formulário, envia mensagens automaticamente ou faz pedidos a CDNs.

## Tecnologia e assets

Um único HTML, cerca de 451 KB, contém CSS, JavaScript, SVG, fotos WebP e fontes WOFF. Sem novas dependências de runtime; sem React, Motion, GSAP ou WebGL na página final. Esbuild, TypeScript e JSDOM existentes são ferramentas de desenvolvimento. Fontes de google/fonts/ofl/archivo e google/fonts/ofl/archivoblack sob SIL OFL, com licenças completas embutidas no HTML.

## Validação executada

- node scripts/typecheck-html.mjs — checkJs do JavaScript embutido: aprovado.
- node scripts/validate-html.mjs — sintaxe CSS/JS, fontes/imagens embutidas, âncoras, título, abas/teclado, menu, dialogs/cancel/foco, formulário inválido/válido, mensagem de WhatsApp, objetivo por serviço, perfis, pausa, reduced-motion, progresso/processo e limpeza de observers: aprovado.
- Verificações adicionais via DOM/CSS do JSDOM: header desktop de 68px, menu desktop oculto, hero alinhado ao centro, escultura decorativa presente, conteúdo claro na área correta e três planos com preços/CTAs/serviços: aprovado.
- node scripts/build-html.mjs — validação e cópia estática para dist-html/index.html: aprovado.
- Asset da escultura visualizado individualmente. Métricas de Archivo Black calculadas para a maior palavra do hero nas larguras 320/375/390/768/1024/1440.

## Limitações

JSDOM não renderiza a página como navegador e não valida overflow ou recortes reais. A inspeção visual desktop/mobile, transparência dos cartões e performance de animação seguem pendentes, porque o ambiente não dispõe do executável Chromium. Não foram produzidos screenshots da nova página nem scores Lighthouse. O teste de dialog usa adaptação da API e não prova seu visual nativo.

O site permanece em revisão, sem deploy, merge, DNS ou envio de mensagem. Antes da publicação, conferir a versão em navegador, confirmar preços/telefone e definir os metadados do domínio final e a liberação de indexação.
