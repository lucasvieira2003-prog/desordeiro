import { useEffect, useRef, useState, type PointerEvent } from 'react'

/** Pointer highlight changes CSS only; no continuous JS animation or React renders. */
export function followLight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch' || !window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}
export function resetLight(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('--spot-x')
  event.currentTarget.style.removeProperty('--spot-y')
}

/** CSS loops run only while this visual is in view and the document is visible. */
export function AmbientBackdrop({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    let inView = typeof IntersectionObserver === 'undefined'
    const update = () => setRunning(inView && document.visibilityState !== 'hidden')
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    }, { rootMargin: '40px' })
    if (ref.current) observer?.observe(ref.current)
    document.addEventListener('visibilitychange', update)
    update()
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  return <div ref={ref} className={`ambient-backdrop ${running ? 'is-running' : ''} ${className}`} aria-hidden="true">
    <div className="ambient-grid"/>
    <div className="ambient-blob blob-a"/><div className="ambient-blob blob-b"/><div className="ambient-blob blob-c"/>
    <div className="ambient-beam beam-a"/><div className="ambient-beam beam-b"/>
    <div className="ambient-dust"><i/><i/><i/><i/><i/><i/></div>
  </div>
}
