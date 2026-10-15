# Desordeiro — HTML independente

`index.html` é a landing page completa: HTML, CSS, JavaScript, fontes Archivo/Archivo Black e fotografias locais embutidas. Pode ser aberta diretamente no navegador.

## Direção atual

Hero centralizado sobre fundo escuro e escultura vetorial original de contornos; header de 68px no desktop/64px no mobile; transição dark → claro; conteúdo editorial claro; planos em três cartões de vidro escuro; FAQ, contato e rodapé no escuro. Dourado permanece como acento da marca.

Os layouts enviados pelo usuário são referências de composição, sem copiar marcas, imagens ou código de templates.

## Cloudflare Pages após aprovação

- Repositório: lucasvieira2003-prog/desordeiro
- Branch de revisão: feat/studio-pro-html
- Framework: nenhum
- Comando de build: vazio
- Diretório estático: html
- Sem segredos ou variáveis de ambiente

A versão permanece com noindex. Não foi feito deploy, merge ou alteração de domínio.

## Validação

```sh
npm ci
node scripts/typecheck-html.mjs
node scripts/validate-html.mjs
node scripts/build-html.mjs
```

As dependências já existentes no repositório servem apenas para os verificadores. A página entregue não precisa de React, npm ou bibliotecas externas. O build opcional copia o arquivo para dist-html/index.html.

Detalhes em docs/studio-pro/IMPLEMENTATION.md. Layout e overflow ainda precisam de conferência visual em navegador.
