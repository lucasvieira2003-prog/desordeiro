import {mkdirSync,copyFileSync,readFileSync} from 'node:fs'
import {transformSync} from 'esbuild'
const html=readFileSync('html/index.html','utf8')
const css=html.match(/<style>([\s\S]*?)<\/style>/)?.[1]
const js=html.match(/<script id="site-script">([\s\S]*?)<\/script>/)?.[1]
if(!css||!js||html.includes('@@'))throw Error('HTML incomplete')
transformSync(css,{loader:'css'});transformSync(js,{loader:'js'})
mkdirSync('dist-html',{recursive:true});copyFileSync('html/index.html','dist-html/index.html')
console.log('Standalone build: dist-html/index.html. No React, bundler or external resources are required by the page.')
