import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisible(true)
        observer.unobserve(element)
      }
    }, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={['mk-reveal', visible && 'is-visible'].filter(Boolean).join(' ')}>{children}</div>
}
