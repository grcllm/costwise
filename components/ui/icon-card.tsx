import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconCardProps {
  icon: LucideIcon
  iconBgColor?: string
  iconColor?: string
  title: string
  description: string
  className?: string
  onClick?: () => void
}

/**
 * Reusable icon card component
 * Used for: feature cards, quick actions, category cards
 */
export function IconCard({
  icon: Icon,
  iconBgColor = 'bg-[#F5F7FF]',
  iconColor = 'text-[#1C3FA8]',
  title,
  description,
  className,
  onClick,
}: IconCardProps) {
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        'bg-white border border-[#C5D3FF] p-6 rounded-2xl transition-shadow',
        onClick && 'hover:shadow-md cursor-pointer',
        className
      )}
    >
      <div className={cn('mb-4', iconBgColor, 'p-3 rounded-xl inline-flex')}>
        <Icon className={cn('w-6 h-6', iconColor)} />
      </div>
      <h4 className="font-bold text-[#1C3FA8] mb-2">{title}</h4>
      <p className="text-sm text-[#1A237E]/70">{description}</p>
    </Component>
  )
}
