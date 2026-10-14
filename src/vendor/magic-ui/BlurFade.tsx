// Adapted from the Muraka Dev Kit copy of Magic UI BlurFade (MIT).
// Source commit: bef38a06181a0f0651935269d814bd1bd7a3f9c7
// Original: https://github.com/magicuidesign/magicui
// Local changes: observer fallback, no-JS CSS fallback and smaller blur budget.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function BlurFade({ children, className = '', delay = 0, duration = .65 }: {
  children: ReactNode; className?: string; delay?: number; duration?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined' || reduced) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: .12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reduced])
  // The prerendered page includes a noscript override for these motion styles.
  return <motion.div ref={ref} className={'motion-reveal ' + className}
    initial={false}
    animate={reduced || visible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(4px)' }}
    transition={{ duration: reduced ? 0 : duration, delay: visible && !reduced ? delay : 0, ease: [.22, 1, .36, 1] }}>
    {children}
  </motion.div>
}
