import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      className={['mk-button', 'mk-button--' + variant, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
