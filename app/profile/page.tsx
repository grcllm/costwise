'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Camera, Eye, EyeOff, User as UserIcon, Shield } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { useAuth } from '@/contexts/auth-context'
import { Toast } from '@/components/ui/toast'
import { LoadingPage } from '@/components/ui'
import { useLocalStorage } from '@/hooks'

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [showToast, setShowToast] = useState(false)
  const [profileImage, setProfileImage] = useLocalStorage<string | null>('profileImage', null)
  const [profileImagePreview, setProfileImagePreview] = useLocalStorage<string | null>('profileImagePreview', null)
  const [displayName, setDisplayName] = useState('Juan dela Cruz')
  const [email, setEmail] = useState('juan.delacruz@costwise.ph')
  const [showPassword, setShowPassword] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Track initial values to detect changes
  const initialValues = useRef({
    displayName: 'Juan dela Cruz',
    email: 'juan.delacruz@costwise.ph',
    profileImage: profileImage
  })

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth?redirect=/profile')
    }
  }, [isAuthenticated, isLoading, router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setProfileImagePreview(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setProfileImage(null)
    setProfileImagePreview(null)
  }

  const hasChanges = () => {
    return (
      displayName !== initialValues.current.displayName ||
      email !== initialValues.current.email ||
      profileImage !== initialValues.current.profileImage ||
      (showChangePassword && currentPassword && newPassword && confirmPassword)
    )
  }

  const handleCancel = () => {
    // Revert all changes to initial values
    setDisplayName(initialValues.current.displayName)
    setEmail(initialValues.current.email)
    setProfileImage(initialValues.current.profileImage)
    setProfileImagePreview(null)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowChangePassword(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password change if user is trying to change password
    if (showChangePassword && (currentPassword || newPassword || confirmPassword)) {
      // Check if all password fields are filled
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields')
        return
      }
      
      // Check if new passwords match
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match')
        return
      }
      
      // Validate password criteria
      const passwordRegex = {
        minLength: /.{8,}/,
        uppercase: /[A-Z]/,
        number: /[0-9]/,
        special: /[^a-zA-Z0-9]/
      }
      
      if (!passwordRegex.minLength.test(newPassword)) {
        alert('Password must be at least 8 characters long')
        return
      }
      if (!passwordRegex.uppercase.test(newPassword)) {
        alert('Password must contain at least one uppercase letter')
        return
      }
      if (!passwordRegex.number.test(newPassword)) {
        alert('Password must contain at least one number')
        return
      }
      if (!passwordRegex.special.test(newPassword)) {
        alert('Password must contain at least one special character')
        return
      }
    }
    
    // Only show toast if there are actual changes
    if (hasChanges()) {
      // Save profile image - useLocalStorage handles persistence
      if (profileImagePreview) {
        setProfileImage(profileImagePreview)
        setProfileImagePreview(null)
      }
      
      // Update initial values after save
      initialValues.current = {
        displayName,
        email,
        profileImage
      }
      
      // Reset password fields
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowChangePassword(false)
      
      setShowToast(true)
    }
  }

  // Show loading state while checking auth
  if (isLoading) {
    return <LoadingPage text="Loading your profile..." />
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }
  
  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="profile" />

      {/* Toast Notification */}
      <Toast
        message="Your profile changes have been successfully saved."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E0E0E0]">
              {/* Profile Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group mb-4">
                  <div className="w-32 h-32 rounded-full bg-[#1C3FA8] flex items-center justify-center text-white relative overflow-hidden">
                    {(profileImagePreview || profileImage) ? (
                      <>
                        <Image
                          src={profileImagePreview || profileImage || ''}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                        {/* Remove overlay on hover */}
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <span className="text-white font-bold text-sm">Remove</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                      >
                        <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="8" r="4"/>
                          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#F5F7FF] hover:bg-[#F5F7FF] transition-colors"
                  >
                    <Camera className="w-5 h-5 text-[#1C3FA8]" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-black text-[#1C3FA8] mb-1">{displayName}</h2>
                <p className="text-sm text-[#1A237E]/60 mb-4">Financial Explorer</p>
                
                <div className="flex items-center gap-2">
                  <span className="bg-[#FDD835] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-black uppercase">
                    Level 12
                  </span>
                  <span className="bg-[#FDD835] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-black uppercase">
                    Top Saver
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E0E0E0]">
                <div className="text-center">
                  <p className="text-xs text-[#1A237E]/60 font-semibold uppercase mb-1">Modules</p>
                  <p className="text-2xl font-black text-[#1C3FA8]">13</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#1A237E]/60 font-semibold uppercase mb-1">Quizzes</p>
                  <p className="text-2xl font-black text-[#1C3FA8]">7</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-6 border-t border-[#E0E0E0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#1A237E]/60 font-semibold">Progress to Gold Badge</span>
                </div>
                <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1C3FA8] to-[#FDD835] rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Account Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E0E0E0]">
              <div className="mb-8">
                <h1 className="text-3xl font-black text-[#1C3FA8] mb-2">Account Settings</h1>
                <p className="text-[#1A237E]/60">Update your personal information and security settings.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <UserIcon className="w-5 h-5 text-[#1C3FA8]" />
                    <h3 className="text-lg font-black text-[#1C3FA8]">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[#1A237E] font-medium focus:border-[#1C3FA8] focus:outline-none focus:ring-2 focus:ring-[#1C3FA8]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[#1A237E] font-medium focus:border-[#1C3FA8] focus:outline-none focus:ring-2 focus:ring-[#1C3FA8]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-[#E0E0E0]" />

                {/* Security Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#1C3FA8]" />
                      <h3 className="text-lg font-black text-[#1C3FA8]">Security</h3>
                    </div>
                    {!showChangePassword && (
                      <button
                        type="button"
                        onClick={() => setShowChangePassword(true)}
                        className="text-[#1C3FA8] font-bold text-sm hover:underline underline-offset-4 transition-all"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                  
                  {!showChangePassword ? (
                    <div>
                      <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value="••••••••••••"
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[#1A237E] font-medium bg-[#F5F7FF] cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-[#1A237E]/60 mt-2">Last changed 3 months ago</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[#1A237E] font-medium focus:border-[#1C3FA8] focus:outline-none focus:ring-2 focus:ring-[#1C3FA8]/20 transition-all pr-12"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A237E]/40 hover:text-[#1A237E] transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                          New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[#1A237E] font-medium focus:border-[#1C3FA8] focus:outline-none focus:ring-2 focus:ring-[#1C3FA8]/20 transition-all"
                          placeholder="Enter new password"
                        />
                        <div className="text-xs space-y-1 mt-2">
                          <p className="font-semibold text-[#1A237E]">Password must contain:</p>
                          <ul className="space-y-1 ml-4">
                            <li className={`flex items-center gap-2 transition-colors ${
                              newPassword.length >= 8 ? 'text-[#4CAF50]' : 'text-[#1A237E]/60'
                            }`}>
                              {newPassword.length >= 8 ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                              )}
                              At least 8 characters
                            </li>
                            <li className={`flex items-center gap-2 transition-colors ${
                              /[A-Z]/.test(newPassword) ? 'text-[#4CAF50]' : 'text-[#1A237E]/60'
                            }`}>
                              {/[A-Z]/.test(newPassword) ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                              )}
                              One uppercase letter (A-Z)
                            </li>
                            <li className={`flex items-center gap-2 transition-colors ${
                              /[0-9]/.test(newPassword) ? 'text-[#4CAF50]' : 'text-[#1A237E]/60'
                            }`}>
                              {/[0-9]/.test(newPassword) ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="w-1 h-1 rounded-full bg-[#1C3FA8]"></span>
                              )}
                              One number (0-9)
                            </li>
                            <li className={`flex items-center gap-2 transition-colors ${
                              /[^a-zA-Z0-9]/.test(newPassword) ? 'text-[#4CAF50]' : 'text-[#1A237E]/60'
                            }`}>
                              {/[^a-zA-Z0-9]/.test(newPassword) ? (
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
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-[#1A237E]/80 uppercase mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border text-[#1A237E] font-medium focus:outline-none focus:ring-2 transition-all ${
                            confirmPassword && newPassword && confirmPassword !== newPassword
                              ? 'border-[#E53935] focus:border-[#E53935] focus:ring-[#E53935]/20'
                              : confirmPassword && newPassword && confirmPassword === newPassword
                              ? 'border-[#4CAF50] focus:border-[#4CAF50] focus:ring-[#4CAF50]/20'
                              : 'border-[#E0E0E0] focus:border-[#1C3FA8] focus:ring-[#1C3FA8]/20'
                          }`}
                          placeholder="Confirm new password"
                        />
                        {confirmPassword && newPassword && confirmPassword !== newPassword && (
                          <p className="text-xs text-[#E53935] mt-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Passwords do not match
                          </p>
                        )}
                        {confirmPassword && newPassword && confirmPassword === newPassword && (
                          <p className="text-xs text-[#4CAF50] mt-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Passwords match
                          </p>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setShowChangePassword(false)
                          setCurrentPassword('')
                          setNewPassword('')
                          setConfirmPassword('')
                        }}
                        className="text-[#1A237E]/60 font-medium text-sm hover:text-[#1A237E] transition-colors"
                      >
                        Cancel password change
                      </button>
                    </div>
                  )}
                </div>

                <hr className="border-[#E0E0E0]" />

                {/* Actions */}
                <div className="flex items-center justify-end pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 font-bold text-[#1A237E] hover:bg-[#F5F7FF] rounded-xl transition-all border border-[#E0E0E0]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!hasChanges()}
                      className="px-8 py-3 bg-[#1C3FA8] text-white font-bold rounded-xl shadow-lg hover:bg-[#1557B0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
