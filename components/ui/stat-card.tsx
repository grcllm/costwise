import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  iconBgColor?: string
  iconColor?: string
  title: string
  value: string | number
  subtitle?: string
  badge?: string
  className?: string
  onClick?: () => void
}

/**
 * Reusable stat card component
 * Used in: /home, /quizzes, /profile
 */
export function StatCard({
  icon: Icon,
  iconBgColor = 'bg-[#FFFDE7]',
  iconColor = 'text-[#4A3B00]',
  title,
  value,
  subtitle,
  badge,
  className,
  onClick,
}: StatCardProps) {
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl p-5 border border-[#C5D3FF] flex items-center gap-4',
        onClick && 'hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
    >
      <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', iconBgColor)}>
        <Icon className={cn('w-7 h-7', iconColor)} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#1C3FA8]">{title}</h4>
        {subtitle && <p className="text-xs text-[#1A237E] opacity-60">{subtitle}</p>}
      </div>
      <div className="text-right">
        <span className="text-xl font-black text-[#1C3FA8]">{value}</span>
        {badge && <p className="text-[10px] font-bold text-[#E53935]">{badge}</p>}
      </div>
    </Component>
  )
}
