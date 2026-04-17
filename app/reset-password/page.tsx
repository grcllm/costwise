"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Lock, ArrowLeft, Coins, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validation-schemas"
import { toast } from "sonner"
import Link from "next/link"

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  
  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      toast.error("Invalid reset link")
      router.push('/auth')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      toast.error("Invalid reset token")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: data.password }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Failed to reset password')
        return
      }

      toast.success("Password reset successfully!")
      
      // Wait a bit for toast to show, then redirect
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/auth')
    } catch (error) {
      console.error('[Reset Password] Error:', error)
      toast.error("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return null
  }

  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
      {/* Left Hero Section (Brand Anchor) - Hidden on mobile */}
      <section className="hidden md:flex relative w-full md:w-1/2 lg:w-3/5 min-h-screen items-center justify-center bg-[#1C3FA8]">
        <div className="absolute inset-0 z-0">
          <Image 
            className="w-full h-full object-cover opacity-30" 
            alt="Philippine peso coins and financial planning concept"
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C3FA8]/80 via-[#003e6b]/70 to-[#1C3FA8]/80 z-10"></div>
        
        <div className="relative z-20 px-6 md:px-8 lg:px-16 xl:px-24 text-white max-w-2xl py-8 md:py-0">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FDD835] rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="text-[#1C3FA8] w-6 h-6 md:w-7 md:h-7 font-bold" strokeWidth={3} />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-lg">CostWise</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl">
            Create a New <br/>
            <span className="text-[#FDD835] drop-shadow-lg">Password.</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-md leading-relaxed drop-shadow-lg">
            Choose a strong password to secure your account and protect your financial data.
          </p>
        </div>
      </section>

      {/* Right Form Section */}
      <section className="w-full md:w-1/2 lg:w-2/5 min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8 md:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on mobile */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#FDD835] rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="text-[#1C3FA8] w-7 h-7 font-bold" strokeWidth={3} />
            </div>
            <span className="text-3xl font-black tracking-tighter text-[#1C3FA8]">CostWise</span>
          </div>

          {/* Back Button */}
          <Link 
            href="/auth" 
            className="inline-flex items-center gap-2 text-[#1C3FA8] font-semibold mb-8 hover:text-[#E53935] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Sign In
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#1A237E] mb-2">
              Reset Password
            </h2>
            <p className="text-[#444653]">
              Enter your new password below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A237E] ml-1 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] group-focus-within:text-[#1C3FA8] transition-colors h-5 w-5" />
                <input 
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-4 bg-white border border-[#C5D3FF] rounded-2xl focus:ring-2 focus:ring-[#1C3FA8] focus:border-transparent outline-none transition-all placeholder:text-[#C4C5D5] font-medium" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#747684] hover:text-[#1C3FA8] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#E53935] font-semibold ml-1">{errors.password.message}</p>
              )}
              <div className="ml-1 mt-2 space-y-1">
                <p className="text-xs text-[#444653] font-semibold">Password must contain:</p>
                <ul className="text-xs text-[#747684] space-y-0.5 ml-2">
                  <li>• At least 8 characters</li>
                  <li>• One uppercase letter</li>
                  <li>• One number</li>
                  <li>• One special character</li>
                </ul>
              </div>
            </div>

            <button 
              className="w-full py-3.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform active:scale-[0.98] transition-all uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1C3FA8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1A237E] font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
