import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Reusable tag/badge component for labels and categories
 * Used for: quiz levels, tip categories, status indicators
 */
export function Tag({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: TagProps) {
  const variants = {
    primary: 'bg-[#1C3FA8] text-white',
    secondary: 'bg-[#FFFDE7] text-[#4A3B00]',
    accent: 'bg-[#FDD835] text-[#4A3B00]',
    success: 'bg-[#4CAF50] text-white',
    warning: 'bg-[#E53935] text-white',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-block rounded-full font-black uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
