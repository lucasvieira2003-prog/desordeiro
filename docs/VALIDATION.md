# Validação da versão de revisão

## Executado com sucesso

- `npm run test`: teste de integração em JSDOM com o aplicativo React real. Verifica h1 único, quatro abas, alternância de conteúdo, ArrowRight/Home/End, modal da equipe, Escape, restauração de foco, contenção de Tab/Shift+Tab, validação de nome, composição da mensagem de WhatsApp, destino do formulário, menu, âncoras e presença dos assets locais.
- Testes adicionais da revisão expressiva: quatro cenas decorativas, alternância pausa/retomada, ativação por interseção, suspensão com aba oculta, retomada com aba visível e desconexão de todos os observers no unmount.
- `npm run typecheck`: TypeScript estrito.
- `npm run build`: Vite + geração de HTML estático com conteúdo inicial renderizado. Sem avisos de assets ausentes. JS de produção ~379 KB bruto / ~120 KB gzip; CSS ~46 KB bruto / ~11 KB gzip. Não são métricas Lighthouse.
- Parsing estrito do CSS com Lightning CSS e do script embutido com esbuild; verificação de assets embutidos, estilos e controles no HTML independente.
- `node scripts/package-review.mjs`: gera HTML independente com imagens, scripts, CSS e fonte embutidos, para revisão sem deploy.
- Imagens originais verificadas como arquivos válidos e convertidas para WebP. Brasão e foto de Felipe inspecionados individualmente.
- Fonte Sora variável hospedada localmente e acompanhada da licença OFL.
- Verificação do pacote: ausência de referências locais `/assets/` no HTML independente, presença do conteúdo inicial, arquivos de imagem/fonte presentes e não vazios.

## Limites da validação

Os dois prints enviados pelo usuário foram inspecionados para orientar a revisão. Não foi possível executar navegador/QA visual da nova versão neste ambiente. JSDOM valida comportamento e DOM, mas não renderiza CSS nem mede overflow. Os breakpoints foram implementados/revisados em código; não representam aprovação visual das telas.

Pendente antes da publicação: abrir a revisão e conferir 320/375/390/768/1024/1440px, toque, recortes das fotos, contraste percebido, ausência de sobreposições e overflow. A abertura real de WhatsApp e a titularidade do número não foram testadas; nenhuma mensagem foi enviada.

O site tem bloqueio de indexação para revisão. Não houve deploy, merge em main, alteração no site original ou configuração de DNS.
