import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, extname } from 'node:path'
const mime={'.webp':'image/webp','.ttf':'font/ttf'}
let html=readFileSync('dist/index.html','utf8')
const data=(path)=>`data:${mime[extname(path)]};base64,${readFileSync(resolve('dist',path.replace(/^\//,''))).toString('base64')}`
html=html.replace(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/,(_,src)=>{
 let js=readFileSync(resolve('dist',src.slice(1)),'utf8')
 js=js.replace(/\/assets\/[a-z-]+\.webp/g,path=>data(path))
 return `<script type="module">${js.replace(/<\/script/gi,'<\\/script')}</script>`
})
html=html.replace(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/,(_,src)=>{
 let css=readFileSync(resolve('dist',src.slice(1)),'utf8').replace(/\/assets\/sora\.ttf/g,path=>data(path))
 return `<style>${css}</style>`
})
html=html.replace(/\/assets\/[a-z-]+\.webp/g,path=>data(path))
writeFileSync('desordeiro-preview.html',html)
console.log('Self-contained review: desordeiro-preview.html')
