import type { ReactNode } from 'react'
import { BlurFade } from '../vendor/magic-ui/BlurFade'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <BlurFade delay={delay}>{children}</BlurFade>
}
