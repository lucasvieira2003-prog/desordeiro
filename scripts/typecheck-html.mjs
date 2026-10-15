import {readFileSync,writeFileSync,unlinkSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
const js=readFileSync('html/index.html','utf8').match(/<script id="site-script">([\s\S]*?)<\/script>/)?.[1]
if(!js)throw Error('Inline JavaScript missing')
const file=new URL('../.html-typecheck.js',import.meta.url)
writeFileSync(file,js)
let status=1
try{const result=spawnSync(process.execPath,[new URL('../node_modules/typescript/bin/tsc',import.meta.url).pathname,'--allowJs','--checkJs','--noEmit','--skipLibCheck','--target','ES2022','--module','ESNext','--lib','ES2022,DOM',file.pathname],{stdio:'inherit'});status=result.status??1}finally{unlinkSync(file)}
process.exitCode=status
