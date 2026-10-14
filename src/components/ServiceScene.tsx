import type { LucideIcon } from 'lucide-react'
import { AmbientBackdrop, followLight, resetLight } from './AmbientBackdrop'

export function ServiceScene({ kind, word, icon: Icon }: { kind: string; word: string; icon: LucideIcon }) {
  return <div className="service-visual" data-kind={kind} aria-hidden="true" onPointerMove={followLight} onPointerLeave={resetLight}>
    <AmbientBackdrop className="solution-atmosphere"/>
    <div className="scene-index"><span>DESORDEIRO®</span><span>EM MOVIMENTO ↗</span></div>
    <div className="signal-scene">
      <svg className="signal-network" viewBox="0 0 600 400" fill="none">
        <g className="network-lines"><path d="M-60 300C100 300 140 60 300 60S490 300 660 300"/><path d="M-60 100C100 100 160 340 300 340S490 100 660 100"/><path d="M0 210H600"/><circle cx="300" cy="200" r="150"/><circle cx="300" cy="200" r="100"/></g>
        <g className="network-flows"><path d="M-60 300C100 300 140 60 300 60S490 300 660 300"/><path d="M-60 100C100 100 160 340 300 340S490 100 660 100"/><circle cx="300" cy="200" r="150"/></g>
        <g className="network-nodes"><circle cx="130" cy="210" r="4"/><circle cx="300" cy="60" r="4"/><circle cx="470" cy="210" r="4"/><circle cx="300" cy="340" r="4"/></g>
      </svg>
      <div className="radar-sweep"/>
      <div className="scene-orbit orbit-a"><i/></div><div className="scene-orbit orbit-b"><i/></div>
      <div className="scene-layers"><i/><i/><i/></div>
      <div className="signal-core"><Icon strokeWidth={.85}/></div>
      <div className="scene-label"><span>{word}</span><small>ESTRATÉGIA + EXECUÇÃO</small></div>
    </div>
    <div className="scene-bottom"><span className="scene-meter"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></span><span>IDEIAS QUE GERAM MOVIMENTO</span></div>
  </div>
}
