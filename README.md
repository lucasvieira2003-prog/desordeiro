# Desordeiro

Website institucional criado a partir da identidade e do conteúdo de https://desordeiro.com/, com recursos reais do Muraka Dev Kit.

## Arquitetura

O repositório de destino continha apenas um README. Esta implementação usa React 19, TypeScript estrito, Vite 6, Tailwind 4 e CSS autoral com tokens da marca. Saída estática em `dist`, sem backend, segredos ou banco. Fotos, brasão e fonte Sora são locais. Os dados do formulário são enviados apenas ao WhatsApp quando o visitante decide continuar.

## Desenvolvimento

Node 22 ou superior:

```sh
npm ci
npm run dev
npm run test
npm run build
npm run preview
```

## Cloudflare Pages + GitHub

Após aprovar a revisão, conectar este repositório ao Cloudflare Pages:

- Framework: Vite
- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Versão do Node: `22`
- Branch de produção: `main`, somente após aprovação e merge
- Sem variáveis secretas necessárias

`wrangler.jsonc` também declara `pages_build_output_dir`. Não foi criado projeto Cloudflare, nem feito deploy ou alteração de domínio. A branch `feat/muraka-desordeiro` é destinada à revisão.

**Antes da produção:** confirmar telefone/WhatsApp, preços, serviços e autorizações de imagem com o responsável. Remover o `noindex,nofollow` em `index.html` e o `X-Robots-Tag` de `public/_headers` apenas ao aprovar a indexação do domínio final. Definir canonical/og:url/og:image com o domínio aprovado. O telefone foi extraído do rodapé original; não foi feito contato nem comprovado que recebe WhatsApp.

## Revisão sem publicar

`node scripts/package-review.mjs` depois do build gera `desordeiro-preview.html` com JS, CSS, fonte e imagens embutidos. Baixe e abra no navegador para explorar a versão. Esse arquivo é apenas para revisão; a implantação utiliza `dist`.

## Kit, origem e validação

Consulte [docs/MURAKA-APPLIED.md](docs/MURAKA-APPLIED.md) e [docs/VALIDATION.md](docs/VALIDATION.md). O workflow do GitHub executa os testes e o build em pushes e PRs, sem deploy automático.
