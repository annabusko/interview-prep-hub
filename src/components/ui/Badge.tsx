import type { ReactNode } from 'react'

export function Badge({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <span
      className={['rounded-md px-2 py-1 text-xs font-medium', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
