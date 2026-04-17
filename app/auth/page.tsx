"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Coins, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validation-schemas"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"

function AuthPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshAuth } = useAuth()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check for mode query parameter on mount
  useEffect(() => {
    const modeParam = searchParams.get('mode')
    if (modeParam === 'signup') {
      setMode('signup')
    }
  }, [searchParams])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput | RegisterInput>({
    resolver: zodResolver(mode === "signin" ? loginSchema : registerSchema),
  })

  // Clear form when switching modes
  useEffect(() => {
    reset()
    setShowPassword(false)
  }, [mode, reset])

  const onSubmit = async (data: LoginInput | RegisterInput) => {
    if (mode === "signup") {
      setIsLoading(true)
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          toast.error(result.error || 'Failed to create account')
          return
        }

        toast.success('Account created! Please sign in.')
        
        // Switch to sign in mode and pre-fill email
        setMode('signin')
        reset({ email: data.email, password: '' })
      } catch (error) {
        console.error('[Auth Page] Signup error:', error)
        toast.error('Failed to create account. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      console.log('[Auth Page] signIn result:', result)

      if (result?.error) {
        console.log('[Auth Page] Error:', result.error)
        toast.error("Invalid email or password")
        return
      }

      console.log('[Auth Page] Login successful, refreshing auth...')
      
      // Refresh auth context immediately
      await refreshAuth()
      
      toast.success("Welcome back!")
      
      // Wait a bit for toast to show, then redirect
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Navigate to home
      router.push("/home")
    } catch (error) {
      console.log('[Auth Page] Exception:', error)
      toast.error(error instanceof Error ? error.message : "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/home" })
    } catch (error) {
      toast.error("Failed to sign in with Google")
    }
  }

  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
      {/* Left Hero Section (Brand Anchor) - Hidden on mobile */}
      <section className="hidden md:flex relative w-full md:w-1/2 lg:w-3/5 min-h-screen items-center justify-center bg-[#1C3FA8]">
        <div className="absolute inset-0 z-0">
          <Image 
            className="w-full h-full object-cover opacity-35" 
            alt="Philippine peso coins and financial planning concept"
            src={mode === "signin" 
              ? "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&auto=format&fit=crop"
            }
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C3FA8]/75 via-[#003e6b]/65 to-[#1C3FA8]/75 z-10"></div>
        
        <div className="relative z-20 px-6 md:px-8 lg:px-16 xl:px-24 text-white max-w-2xl py-8 md:py-0">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FDD835] rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="text-[#1C3FA8] w-6 h-6 md:w-7 md:h-7 font-bold" strokeWidth={3} />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-lg">CostWise</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl">
            {mode === "signin" ? (
              <>
                Master Inflation, <br/>
                <span className="text-[#FDD835] drop-shadow-lg">Secure Your Future.</span>
              </>
            ) : (
              <>
                Understand Inflation, <br/>
                <span className="text-[#FDD835] drop-shadow-lg">Protect Your Money.</span>
              </>
            )}
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-md mb-6 md:mb-10 leading-relaxed drop-shadow-lg">
            {mode === "signin" 
              ? "Welcome back! Continue learning how to protect your purchasing power and make informed financial decisions."
              : "Learn how rising prices affect your money and discover strategies to grow your wealth faster than inflation."
            }
          </p>
          

        </div>
      </section>

      {/* Right Form Section */}
      <section className="w-full md:w-1/2 lg:w-2/5 min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-20 relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on mobile */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#FDD835] rounded-xl flex items-center justify-center shadow-lg">
              <Coins className="text-[#1C3FA8] w-7 h-7 font-bold" strokeWidth={3} />
            </div>
            <span className="text-3xl font-black tracking-tighter text-[#1C3FA8]">CostWise</span>
          </div>

          {/* Tabs */}
          <div className="flex w-full mb-10 border-b-2 border-[#E0E0E0]">
            <button 
              onClick={() => setMode("signin")}
              className={`flex-1 py-3 text-sm font-bold transition-all relative ${
                mode === "signin" 
                  ? "text-[#1C3FA8]" 
                  : "text-[#9E9E9E] hover:text-[#1C3FA8]"
              }`}
            >
              Sign In
              {mode === "signin" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1C3FA8]"></span>
              )}
            </button>
            <button 
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 text-sm font-bold transition-all relative ${
                mode === "signup" 
                  ? "text-[#1C3FA8]" 
                  : "text-[#9E9E9E] hover:text-[#1C3FA8]"
              }`}
            >
              Sign Up
              {mode === "signup" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1C3FA8]"></span>
              )}
            </button>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-[#1A237E] mb-2">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-[#444653]">
              {mode === "signin" 
                ? "Log in to manage your budget and savings." 
                : "Start your financial literacy journey today."}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {mode === "signin" ? (
              <>
                {/* Demo Credentials Note */}
                <div className="bg-[#FFFDE7] border border-[#FDD835] rounded-lg p-3">
                  <p className="text-xs text-[#4A3B00]"><span className="font-bold">Demo:</span> demo@costwise.ph / DemoPass1!</p>
                </div>

                {/* Sign In Fields */}
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-[#1A237E] uppercase tracking-wider">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs font-bold text-[#E53935] hover:underline">
                      Forgot?
                    </Link>
                  </div>
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
                </div>
              </>
            ) : (
              <>
                {/* Sign Up Fields */}
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

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A237E] ml-1 uppercase tracking-wider">
                    Password
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
              </>
            )}

            <button 
              className="w-full py-3.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transform active:scale-[0.98] transition-all uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>



        </div>
      </section>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1C3FA8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1A237E] font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
}
