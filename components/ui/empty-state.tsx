import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/**
 * Reusable empty state component
 * Used when there's no data to display
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-16', className)}>
      {Icon && (
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#F5F7FF] flex items-center justify-center">
            <Icon className="w-10 h-10 text-[#1C3FA8]/40" />
          </div>
        </div>
      )}
      <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">{title}</h3>
      {description && (
        <p className="text-[#1A237E]/60 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
