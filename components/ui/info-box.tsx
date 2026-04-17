import { ReactNode } from 'react'
import { Info, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoBoxProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  className?: string
}

/**
 * Reusable info/alert box component
 * Used for tips, warnings, and informational messages
 */
export function InfoBox({
  children,
  variant = 'info',
  title,
  className,
}: InfoBoxProps) {
  const variants = {
    info: {
      container: 'bg-[#FFFDE7] border-[#FDD835]/30',
      icon: Info,
      iconColor: 'text-[#705d00]',
      textColor: 'text-[#4A3B00]',
    },
    success: {
      container: 'bg-[#E8F5E9] border-[#4CAF50]/30',
      icon: CheckCircle2,
      iconColor: 'text-[#2E7D32]',
      textColor: 'text-[#1B5E20]',
    },
    warning: {
      container: 'bg-[#FFF3E0] border-[#FF9800]/30',
      icon: AlertTriangle,
      iconColor: 'text-[#E65100]',
      textColor: 'text-[#E65100]',
    },
    error: {
      container: 'bg-[#FFEBEE] border-[#E53935]/30',
      icon: AlertCircle,
      iconColor: 'text-[#C62828]',
      textColor: 'text-[#B71C1C]',
    },
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={cn('p-4 rounded-2xl border', config.container, className)}>
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)} />
        <div className={cn('text-sm leading-relaxed', config.textColor)}>
          {title && <p className="font-bold mb-1">{title}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}
