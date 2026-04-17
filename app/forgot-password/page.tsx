"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, ArrowLeft, Coins } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Link from "next/link"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [resetLink, setResetLink] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Failed to send reset link')
        return
      }

      // Store reset link if in development mode
      if (result.resetLink) {
        setResetLink(result.resetLink)
      }
      
      setEmailSent(true)
      toast.success("Password reset instructions sent!")
    } catch (error) {
      console.error('[Forgot Password] Error:', error)
      toast.error("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyResetLink = () => {
    if (resetLink) {
      navigator.clipboard.writeText(resetLink)
      toast.success("Reset link copied to clipboard!")
    }
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
            Reset Your <br/>
            <span className="text-[#FDD835] drop-shadow-lg">Password.</span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-md leading-relaxed drop-shadow-lg">
            Don't worry! It happens to the best of us. Enter your email and we'll send you a link to reset your password.
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

          {!emailSent ? (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-[#1A237E] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-[#444653]">
                  Provide your email and we'll help you regain access to your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A237E] ml-1 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#747684] group-focus-within:text-[#1C3FA8] transition-colors h-5 w-5" />
                    <input 
                      {...register("email")}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-[#C5D3FF] rounded-2xl focus:ring-2 focus:ring-[#1C3FA8] focus:border-transparent outline-none transition-all placeholder:text-[#C4C5D5] font-medium" 
                      placeholder="juandelacruz@email.ph" 
                      type="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#E53935] font-semibold ml-1">{errors.email.message}</p>
                  )}
                </div>

                <button 
                  className="w-full py-3.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform active:scale-[0.98] transition-all uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-extrabold text-[#1A237E] mb-3">
                  Check Your Email
                </h2>
                
                <p className="text-[#444653] mb-2">
                  We've sent a password reset link to:
                </p>
                
                <p className="text-[#1C3FA8] font-bold mb-8">
                  {getValues("email")}
                </p>
                
                <div className="bg-[#FDD835]/10 border border-[#FDD835]/30 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-[#1A237E] mb-2">
                    <span className="font-bold">Development Mode:</span> Your reset link is ready!
                  </p>
                  {resetLink ? (
                    <>
                      <div className="bg-white rounded-lg p-3 mb-3 border border-[#C5D3FF]">
                        <p className="text-xs text-[#444653] break-all font-mono">{resetLink}</p>
                      </div>
                      <button
                        onClick={copyResetLink}
                        className="w-full py-2 bg-[#1C3FA8] hover:bg-[#1C3FA8]/90 text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        Copy Reset Link
                      </button>
                    </>
                  ) : (
                    <p className="text-xs text-[#444653]">
                      In production, this would be sent via email.
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => {
                    setEmailSent(false)
                    setResetLink(null)
                  }}
                  className="w-full py-3.5 bg-white border-2 border-[#1C3FA8] text-[#1C3FA8] font-bold rounded-2xl hover:bg-[#F5F7FF] transition-all uppercase tracking-wide text-sm mb-4"
                >
                  Resend Email
                </button>

                <Link 
                  href="/auth"
                  className="block w-full py-3.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform active:scale-[0.98] transition-all uppercase tracking-wide text-sm text-center"
                >
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
