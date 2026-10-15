import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {transformSync} from 'esbuild'
import {JSDOM,VirtualConsole} from 'jsdom'
const html=readFileSync('html/index.html','utf8')
const errors=[],observations=[],media=[]
const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>errors.push(e.message))
const dom=new JSDOM(html,{url:'https://review.example/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole,beforeParse(window){
 window.matchMedia=query=>{const value={media:query,matches:false,listeners:[],addEventListener(_,cb){this.listeners.push(cb)},removeEventListener(){},addListener(){},removeListener(){},dispatch(value){this.matches=value;this.listeners.forEach(cb=>cb({matches:value}))}};media.push(value);return value}
 window.IntersectionObserver=class{constructor(cb){this.callback=cb;this.disconnected=false;observations.push(this)}observe(el){this.elements??=[];this.elements.push(el)}unobserve(){}disconnect(){this.disconnected=true}}
 window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')}
 window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new window.Event('close'))}
}})
const {window}=dom,doc=window.document
const click=el=>{assert.ok(el);el.click()}
const key=(el,name,shift=false)=>el.dispatchEvent(new window.KeyboardEvent('keydown',{key:name,shiftKey:shift,bubbles:true,cancelable:true}))
const set=(el,value)=>{el.value=value;el.dispatchEvent(new window.Event('input',{bubbles:true}))}
try{
assert.equal(errors.length,0,errors.join('\n'))
assert.equal(doc.querySelectorAll('h1').length,1)
assert.match(doc.querySelector('h1').textContent,/Marcas extraordinárias.*não seguem fórmulas\./)
assert.ok(doc.querySelector('meta[name=robots]').content.includes('noindex'))
for(const link of doc.querySelectorAll('a[href^="#"]'))assert.ok(doc.getElementById(link.hash.slice(1)),`Missing ${link.hash}`)
for(const image of doc.images){assert.match(image.src,/^data:image\/webp;base64,/);assert.ok(image.alt!==null)}
assert.equal(doc.querySelectorAll('script[src],link[rel=stylesheet],video').length,0)
const css=doc.querySelector('style').textContent,js=doc.querySelector('#site-script').textContent
assert.match(css,/prefers-reduced-motion/);assert.match(css,/@keyframes liquid-morph/);assert.match(css,/--motion-intensity:\.9/);assert.match(css,/backdrop-filter/)
transformSync(css,{loader:'css'});transformSync(js,{loader:'js'})
const tabs=[...doc.querySelectorAll('[role=tab]')],panels=[...doc.querySelectorAll('[role=tabpanel]')]
assert.equal(tabs.length,4)
for(let i=0;i<4;i++){click(tabs[i]);assert.equal(panels.filter(p=>!p.hidden).length,1);assert.equal(tabs[i].getAttribute('aria-selected'),'true');assert.equal(panels[i].hidden,false)}
key(tabs[3],'Home');assert.equal(doc.activeElement,tabs[0]);key(tabs[0],'ArrowDown');assert.equal(doc.activeElement,tabs[1]);key(tabs[1],'End');assert.equal(doc.activeElement,tabs[3]);
const menu=doc.querySelector('.menu-toggle');click(menu);assert.equal(menu.getAttribute('aria-expanded'),'true');key(menu,'Escape');assert.equal(menu.getAttribute('aria-expanded'),'false')
click(menu);click(doc.querySelector('.nav a'));assert.equal(menu.getAttribute('aria-expanded'),'false')
const contact=doc.querySelector('#contact-dialog'),form=doc.querySelector('#contact-form'),name=doc.querySelector('#contact-name'),company=doc.querySelector('#company')
const cta=doc.querySelector('.hero [data-contact]');cta.focus();click(cta);assert.equal(contact.open,true);assert.equal(doc.body.style.overflow,'hidden')
const close=contact.querySelector('[data-close]'),submit=contact.querySelector('button[type=submit]')
assert.equal(doc.activeElement,close);key(close,'Tab',true);assert.equal(doc.activeElement,submit);key(submit,'Tab');assert.equal(doc.activeElement,close)
form.addEventListener('submit',event=>event.preventDefault())
set(name,' ');form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));assert.equal(name.checkValidity(),false)
set(name,'Lucas');set(company,'Muraka');assert.equal(form.checkValidity(),true)
form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));assert.match(doc.querySelector('#whatsapp-message').value,/Lucas.*Muraka/)
assert.equal(form.action,'https://wa.me/5551997120145');assert.equal(form.target,'_blank')
contact.dispatchEvent(new window.Event('cancel',{cancelable:true}));assert.equal(contact.open,false);assert.equal(doc.activeElement,cta);assert.equal(doc.body.style.overflow,'')
click(tabs[2]);click(panels[2].querySelector('[data-contact]'));assert.equal(doc.querySelector('#contact-goal').value,'Melhorar meu site');click(close)
for(const person of doc.querySelectorAll('[data-person]')){person.focus();click(person);assert.equal(doc.querySelector('#team-dialog').open,true);assert.equal(doc.querySelector('#team-title').textContent,person.dataset.name);assert.ok(doc.querySelector('#team-bio').textContent.length>50);click(doc.querySelector('#team-dialog [data-close]'));assert.equal(doc.activeElement,person)}
const pause=doc.querySelector('.motion-toggle');click(pause);assert.equal(doc.documentElement.dataset.motion,'off');assert.equal(pause.getAttribute('aria-pressed'),'true');click(pause);assert.equal(pause.getAttribute('aria-pressed'),'false')
const reduced=media.find(m=>m.media.includes('prefers-reduced-motion'));reduced.dispatch(true);assert.equal(doc.documentElement.dataset.motion,'off');reduced.dispatch(false)
const reveal=observations[0];reveal.callback([{target:reveal.elements[0],isIntersecting:true}]);assert.ok(reveal.elements[0].classList.contains('is-visible'))
Object.defineProperty(doc.documentElement,'scrollHeight',{configurable:true,value:4000});Object.defineProperty(window,'scrollY',{configurable:true,value:700});
const steps=[...doc.querySelectorAll('.process-step')];steps.forEach((step,i)=>step.getBoundingClientRect=()=>({top:(i-2)*150+window.innerHeight*.35}));
window.dispatchEvent(new window.Event('scroll'));await new Promise(r=>setTimeout(r,50));assert.equal(doc.querySelector('#step-number').textContent,'03');assert.ok(Number(doc.documentElement.style.getPropertyValue('--scroll-progress'))>0)
window.dispatchEvent(new window.Event('pagehide'));assert.ok(observations.every(o=>o.disconnected))
assert.equal(errors.length,0,errors.join('\n'))
console.log('PASS: standalone assets, CSS/JS syntax, title, anchors, 4 tabs and keyboard, mobile menu state, dialogs/cancel/focus trap/restoration, invalid/valid form, prepared WhatsApp message, service goals, team profiles, reduced-motion, pause, reveal, scroll progress/process and observer cleanup.')
console.log('Layout, native dialog rendering and overflow need browser QA; JSDOM does not render CSS.')
}finally{window.close()}
