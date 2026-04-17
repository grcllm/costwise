'use client'

import { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-top-5 duration-300">
      <div className="bg-white border border-[#4CAF50] rounded-xl shadow-lg p-4 flex items-center gap-3 min-w-[320px]">
        <div className="bg-[#4CAF50] p-1.5 rounded-full">
          <CheckCircle2 className="h-5 w-5 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-900 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
