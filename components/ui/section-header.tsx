import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  action?: ReactNode
  className?: string
}

/**
 * Reusable section header component
 * Used for consistent section titles across pages
 */
export function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('mb-8', className)}>
      <div className="flex items-end justify-between">
        <div>
          {badge && (
            <span className="inline-block px-4 py-1.5 bg-[#FDD835] text-[#4A3B00] text-sm font-bold rounded-full mb-4 uppercase tracking-wider">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-[#1C3FA8] tracking-tight mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-[#1A237E] opacity-80 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  )
}
