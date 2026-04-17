import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentCardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'elevated'
}

/**
 * Reusable content card component
 * Used throughout the app for consistent card styling
 */
export function ContentCard({
  children,
  className,
  padding = 'md',
  variant = 'default',
}: ContentCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variantClasses = {
    default: 'bg-white border border-[#C5D3FF] rounded-3xl',
    bordered: 'bg-white border-2 border-[#C5D3FF] rounded-3xl',
    elevated: 'bg-white border border-[#C5D3FF] rounded-3xl shadow-lg',
  }

  return (
    <div
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
