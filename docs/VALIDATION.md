# Validação da versão de revisão

## Executado com sucesso

- `npm run test`: teste de integração em JSDOM com o aplicativo React real. Verifica h1 único, quatro abas, alternância de conteúdo, ArrowRight/Home/End, modal da equipe, Escape, restauração de foco, contenção de Tab/Shift+Tab, validação de nome, composição da mensagem de WhatsApp, destino do formulário, menu, âncoras e presença dos assets locais.
- `npm run typecheck`: TypeScript estrito.
- `npm run build`: Vite + geração de HTML estático com conteúdo inicial renderizado. Sem avisos de assets ausentes. JS de produção ~248 KB bruto / ~77 KB gzip; CSS ~24 KB bruto / ~6 KB gzip. Não são métricas Lighthouse.
- `node scripts/package-review.mjs`: gera HTML independente com imagens, scripts, CSS e fonte embutidos, para revisão sem deploy.
- Imagens originais verificadas como arquivos válidos e convertidas para WebP. Brasão e foto de Felipe inspecionados individualmente.
- Fonte Sora variável hospedada localmente e acompanhada da licença OFL.
- Verificação do pacote: ausência de referências locais `/assets/` no HTML independente, presença do conteúdo inicial, arquivos de imagem/fonte presentes e não vazios.

## Limites da validação

Não foi possível executar navegador/QA visual neste ambiente. JSDOM valida comportamento e DOM, mas não renderiza CSS nem mede overflow. Os breakpoints foram implementados/revisados em código; não representam aprovação visual das telas.

Pendente antes da publicação: abrir a revisão e conferir 320/375/390/768/1024/1440px, toque, recortes das fotos, contraste percebido, ausência de sobreposições e overflow. A abertura real de WhatsApp e a titularidade do número não foram testadas; nenhuma mensagem foi enviada.

O site tem bloqueio de indexação para revisão. Não houve deploy, merge em main, alteração no site original ou configuração de DNS.
