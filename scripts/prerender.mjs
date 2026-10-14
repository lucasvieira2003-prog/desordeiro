import { build } from 'esbuild'
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
const url=new URL('../.qa-app.mjs',import.meta.url)
const result=await build({entryPoints:['src/App.tsx'],bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic',external:['react','react-dom','react/jsx-runtime','lucide-react']})
writeFileSync(url,result.outputFiles[0].text)
try{
const {default:App}=await import(url.href)
const markup=renderToString(React.createElement(App))
const html=readFileSync('dist/index.html','utf8').replace('<div id="root"></div>',`<div id="root">${markup}</div>`).replace('</head>','<noscript><style>.mk-reveal{opacity:1;transform:none}</style></noscript></head>')
writeFileSync('dist/index.html',html)
console.log('Static HTML generated for content indexing and initial rendering.')
}finally{unlinkSync(url)}
