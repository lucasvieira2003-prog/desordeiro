import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://preview.example/'})
for (const k of ['window','document','HTMLElement','HTMLButtonElement','HTMLInputElement','Node','MutationObserver','getComputedStyle']) globalThis[k]=k==='getComputedStyle'?dom.window.getComputedStyle.bind(dom.window):dom.window[k]
Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true})
globalThis.IS_REACT_ACT_ENVIRONMENT=true
const result=await build({entryPoints:['src/App.tsx'],bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic',external:['react','react-dom','react/jsx-runtime','lucide-react','motion/react']})
const {writeFileSync,unlinkSync}=await import('node:fs')
const testModule=new URL('../.qa-app.mjs',import.meta.url)
writeFileSync(testModule,result.outputFiles[0].text)
const {default:App}=await import(testModule.href)
const React=await import('react')
const {render,screen,fireEvent,cleanup,act}=await import('@testing-library/react')
const {default:userEvent}=await import('@testing-library/user-event')
const user=userEvent.setup({document:dom.window.document})
try{
render(React.createElement(App))
assert.equal(screen.getAllByRole('heading',{level:1}).length,1)
const tabs=screen.getAllByRole('tab'); assert.equal(tabs.length,4)
await user.click(tabs[1]); assert.equal(tabs[1].getAttribute('aria-selected'),'true'); assert.match(screen.getByRole('tabpanel').textContent,/Ser lembrado/)
await user.keyboard('{ArrowRight}');assert.equal(document.activeElement.id,'tab-digital')
await user.keyboard('{End}');assert.equal(document.activeElement.id,'tab-dados')
await user.keyboard('{Home}');assert.equal(document.activeElement.id,'tab-performance')
await user.click(screen.getByRole('button',{name:'Conheça Felipe Santos'}))
assert.match(screen.getByRole('dialog').textContent,/V4 Company/)
await user.keyboard('{Escape}');assert.equal(screen.queryByRole('dialog'),null)
assert.equal(document.activeElement.getAttribute('aria-label'),'Conheça Felipe Santos')
await user.click(screen.getByRole('button',{name:/Quero projetar/}))
assert.ok(screen.getByRole('dialog'))
const input=screen.getByLabelText('Seu nome');assert.equal(input.checkValidity(),false)
await user.type(input,'Lucas');await user.type(screen.getByPlaceholderText('Nome do seu negócio'),'Muraka')
const form=input.closest('form');assert.equal(form.checkValidity(),true)
assert.match(form.elements.namedItem('text').value,/Lucas.*Muraka/)
assert.equal(form.action,'https://wa.me/5551997120145')
assert.equal(form.target,'_blank')
screen.getByRole('button',{name:'Fechar modal'}).focus();
await user.keyboard('{Shift>}{Tab}{/Shift}');assert.match(document.activeElement.textContent,/Continuar no WhatsApp/)
await user.keyboard('{Tab}');assert.equal(document.activeElement.getAttribute('aria-label'),'Fechar modal')
await user.keyboard('{Escape}')
const menu=screen.getByRole('button',{name:'Abrir menu'});await user.click(menu);assert.equal(menu.getAttribute('aria-expanded'),'true')
await user.click(screen.getByRole('link',{name:'Soluções'}));assert.equal(menu.getAttribute('aria-expanded'),'false')
const pause=screen.getByRole('button',{name:'Pausar animações de fundo'})
await user.click(pause);assert.equal(document.querySelector('.site-shell').dataset.motion,'paused')
assert.equal(pause.getAttribute('aria-pressed'),'true')
await user.click(screen.getByRole('button',{name:'Retomar animações de fundo'}))
assert.equal(document.querySelector('.site-shell').dataset.motion,'active')
for(const [index,kind] of ['performance','marca','digital','dados'].entries()) {
 await user.click(tabs[index])
 assert.equal(screen.getAllByRole('tabpanel').length,1)
 assert.equal(screen.getByRole('tabpanel').querySelector('.service-visual').dataset.kind,kind)
 assert.equal(screen.getByRole('tabpanel').querySelector('.service-visual').getAttribute('aria-hidden'),'true')
}
for(const a of document.querySelectorAll('a[href^="#"]'))assert.ok(document.getElementById(a.hash.slice(1)),`Missing anchor ${a.hash}`)
for(const img of document.querySelectorAll('img'))assert.ok(existsSync('public'+img.getAttribute('src')),`Missing image ${img.src}`)
for(const link of document.querySelectorAll('a[href]'))assert.notEqual(link.getAttribute('href'),'#')
const css=readFileSync('src/styles.css','utf8')+readFileSync('src/effects.css','utf8');assert.match(css,/prefers-reduced-motion/)
assert.match(css,/:focus-visible/)
const html=readFileSync('index.html','utf8');assert.match(html,/noindex,nofollow/)
for(const name of readdirSync('public/assets'))assert.ok(readFileSync('public/assets/'+name).length>0,`Empty asset ${name}`)
// Observer and background lifecycle are exercised separately from the no-IO fallback above.
cleanup()
const observations=[]
globalThis.IntersectionObserver=class {
 constructor(callback){this.callback=callback;this.disconnected=false;observations.push(this)}
 observe(element){this.element=element}
 disconnect(){this.disconnected=true}
}
Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'})
render(React.createElement(App))
const backdrop=document.querySelector('.hero-atmosphere')
const observer=observations.find(o=>o.element===backdrop)
assert.ok(observer)
await act(()=>observer.callback([{isIntersecting:true}]))
assert.ok(backdrop.classList.contains('is-running'))
await act(()=>observer.callback([{isIntersecting:false}]))
assert.equal(backdrop.classList.contains('is-running'),false)
await act(()=>observer.callback([{isIntersecting:true}]))
Object.defineProperty(document,'visibilityState',{configurable:true,value:'hidden'})
fireEvent(document,new dom.window.Event('visibilitychange'))
assert.equal(backdrop.classList.contains('is-running'),false)
Object.defineProperty(document,'visibilityState',{configurable:true,value:'visible'})
fireEvent(document,new dom.window.Event('visibilitychange'))
assert.ok(backdrop.classList.contains('is-running'))
cleanup()
assert.ok(observations.every(o=>o.disconnected),'Observers must disconnect on unmount')
console.log('PASS: background pause toggle, 4 decorative scenes, visibility/intersection lifecycle and observer cleanup.');
console.log('PASS: semantic structure, 4 service tabs, keyboard arrows/Home/End, team modal, Escape, focus restoration, form validity, WhatsApp message, focus trap, menu state, anchors, local images, reduced motion and review noindex.')
}finally{cleanup();unlinkSync(testModule)}
