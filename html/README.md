# Desordeiro — Studio Pro / HTML independente

`index.html` é a landing page completa. Inclui CSS, JavaScript, imagens WebP e fontes WOFF em data URLs. Pode ser baixado e aberto diretamente no navegador, sem React, npm ou servidor.

Direção: Minimal absoluto, tema claro, dourado/champagne, mesh gradient, Archivo Black + Archivo, botões glass e liquid morph CSS com intensidade configurada em 0.9.

## Cloudflare Pages

Após aprovação:

- Repositório: lucasvieira2003-prog/desordeiro
- Branch de revisão: feat/studio-pro-html
- Framework: nenhum
- Comando de build: deixar vazio
- Diretório estático: html
- Nenhuma variável de ambiente ou segredo necessário

Não foi criado projeto Pages, deploy, merge ou configuração de domínio. A versão está com noindex para revisão; definir metadados do domínio final e liberar indexação só ao aprovar a publicação.

## Verificação de desenvolvimento

Os verificadores usam as ferramentas de desenvolvimento já existentes no repositório; a página final não precisa delas:

```sh
npm ci
node scripts/typecheck-html.mjs
node scripts/validate-html.mjs
node scripts/build-html.mjs
```

O último comando valida e copia o HTML para dist-html/index.html. Pode ser utilizado como alternativa ao diretório html.

Leia docs/studio-pro/IMPLEMENTATION.md para fontes, testes, limitações e diferenças em relação à prévia do kit.
