"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validation-schemas"

type AuthMode = "signin" | "signup"

interface AuthFormProps {
  mode: AuthMode
  onSubmit: (data: LoginInput | RegisterInput) => Promise<void>
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValue, setPasswordValue] = useState("")

  const schema = mode === "signin" ? loginSchema : registerSchema
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput | RegisterInput>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: LoginInput | RegisterInput) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Juan Dela Cruz"
              className="pl-10"
              aria-invalid={!!errors.email}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="juan@example.com"
            className="pl-10"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...register("password", {
              onChange: (e) => setPasswordValue(e.target.value)
            })}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        )}
        {mode === "signup" && (
          <div className="text-xs space-y-1 mt-2">
            <p className="font-semibold text-[#1A237E]">Password must contain:</p>
            <ul className="space-y-1 ml-4">
              <li className={`flex items-center gap-2 transition-colors ${
                passwordValue.length >= 8 ? 'text-[#4CAF50]' : 'text-muted-foreground'
              }`}>
                {passwordValue.length >= 8 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                )}
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 transition-colors ${
                /[A-Z]/.test(passwordValue) ? 'text-[#4CAF50]' : 'text-muted-foreground'
              }`}>
                {/[A-Z]/.test(passwordValue) ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                )}
                One uppercase letter (A-Z)
              </li>
              <li className={`flex items-center gap-2 transition-colors ${
                /[0-9]/.test(passwordValue) ? 'text-[#4CAF50]' : 'text-muted-foreground'
              }`}>
                {/[0-9]/.test(passwordValue) ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                )}
                One number (0-9)
              </li>
              <li className={`flex items-center gap-2 transition-colors ${
                /[^a-zA-Z0-9]/.test(passwordValue) ? 'text-[#4CAF50]' : 'text-muted-foreground'
              }`}>
                {/[^a-zA-Z0-9]/.test(passwordValue) ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                )}
                One special character (!@#$%^&*)
              </li>
            </ul>
          </div>
        )}
      </div>

      {mode === "signin" && (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-input" />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
      )}

      {mode === "signup" && (
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : mode === "signin" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  )
}
