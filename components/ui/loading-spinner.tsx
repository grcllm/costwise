import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

/**
 * Reusable loading spinner component
 * Used for loading states across the app
 */
export function LoadingSpinner({
  size = 'md',
  className,
  text,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-4',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-b-[#1C3FA8] border-t-transparent border-l-transparent border-r-transparent',
          sizes[size]
        )}
      />
      {text && <p className="text-[#1A237E]/70">{text}</p>}
    </div>
  )
}

/**
 * Full page loading component
 */
export function LoadingPage({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FF]">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}
