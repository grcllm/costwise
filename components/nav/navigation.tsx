import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Bell, Menu, X, LogOut, Coins } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { useLocalStorage } from "@/hooks"

interface NavigationProps {
  activeLink?: 'home' | 'learn' | 'simulator' | 'quizzes' | 'tips' | 'profile'
  showAuthButtons?: boolean
  showUserActions?: boolean
  isLoggedIn?: boolean
  isLoading?: boolean
}

export function Navigation({ activeLink, showAuthButtons = true, showUserActions = false, isLoggedIn = false, isLoading = false }: NavigationProps) {
  const router = useRouter()
  const { refreshAuth } = useAuth()
  const [profileImage] = useLocalStorage<string | null>('profileImage', null)
  const [profileImagePreview] = useLocalStorage<string | null>('profileImagePreview', null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // If isLoggedIn is true, override to show user actions
  const displayUserActions = isLoggedIn || showUserActions;
  const displayAuthButtons = !isLoggedIn && showAuthButtons;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.notification-container')) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      await refreshAuth()
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-sm border-b border-[hsl(var(--border))]">
      <nav className="flex justify-between items-center px-6 md:px-12 h-16 max-w-7xl mx-auto">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - Left Side */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(prev => !prev);
            }}
            className="md:hidden text-[#1C3FA8] p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href={isLoggedIn ? "/home" : "/"} className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-[#FDD835]" />
            <span className="text-xl font-black text-[hsl(var(--primary))] tracking-tighter">
              CostWise
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href={isLoggedIn ? "/home" : "/"} 
            className={`font-semibold tracking-tight transition-colors duration-200 ${
              activeLink === 'home' 
                ? 'text-[#1C3FA8] border-b-2 border-[#E53935] pb-1' 
                : 'text-[#1A237E] hover:text-[#E53935]'
            }`}
          >
            {isLoggedIn ? "Dashboard" : "Home"}
          </Link>
          <Link 
            href="/learn" 
            className={`font-semibold tracking-tight transition-colors duration-200 ${
              activeLink === 'learn' 
                ? 'text-[#1C3FA8] border-b-2 border-[#E53935] pb-1' 
                : 'text-[#1A237E] hover:text-[#E53935]'
            }`}
          >
            Learn
          </Link>
          <Link 
            href="/simulator" 
            className={`font-semibold tracking-tight transition-colors duration-200 ${
              activeLink === 'simulator' 
                ? 'text-[#1C3FA8] border-b-2 border-[#E53935] pb-1' 
                : 'text-[#1A237E] hover:text-[#E53935]'
            }`}
          >
            Simulator
          </Link>
          <Link 
            href="/quizzes" 
            className={`font-semibold tracking-tight transition-colors duration-200 ${
              activeLink === 'quizzes' 
                ? 'text-[#1C3FA8] border-b-2 border-[#E53935] pb-1' 
                : 'text-[#1A237E] hover:text-[#E53935]'
            }`}
          >
            Quizzes
          </Link>
          <Link 
            href="/tips" 
            className={`font-semibold tracking-tight transition-colors duration-200 ${
              activeLink === 'tips' 
                ? 'text-[#1C3FA8] border-b-2 border-[#E53935] pb-1' 
                : 'text-[#1A237E] hover:text-[#E53935]'
            }`}
          >
            Tips
          </Link>
        </div>

        {/* Right: Auth Buttons or User Actions */}
        <div className="flex items-center gap-4">
          {displayUserActions ? (
            <>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))] rounded-full transition-colors relative notification-container"
                >
                  <Bell className="h-5 w-5" />
                  {/* Notification Badge */}
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#E53935] rounded-full"></span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[hsl(var(--border))] z-50 notification-container">
                    <div className="p-4 border-b border-[hsl(var(--border))]">
                      <h3 className="font-bold text-[#1C3FA8]">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {/* Notification Items */}
                      {/* Unread notification - has blue dot and light blue background */}
                      <div className="p-4 hover:bg-[#E3F2FD] transition-colors border-b border-[hsl(var(--border))] cursor-pointer bg-[#F5F7FF] relative">
                        <div className="absolute left-2 top-7 w-2 h-2 bg-[#1C3FA8] rounded-full"></div>
                        <div className="flex gap-3 ml-3">
                          <div className="w-10 h-10 rounded-full bg-[#1C3FA8] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1A237E]">Quiz Completed!</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">You scored 85% on &quot;Understanding Inflation&quot;</p>
                            <p className="text-xs text-[#1C3FA8] mt-1 font-semibold">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Unread notification */}
                      <div className="p-4 hover:bg-[#E3F2FD] transition-colors border-b border-[hsl(var(--border))] cursor-pointer bg-[#F5F7FF] relative">
                        <div className="absolute left-2 top-7 w-2 h-2 bg-[#1C3FA8] rounded-full"></div>
                        <div className="flex gap-3 ml-3">
                          <div className="w-10 h-10 rounded-full bg-[#FDD835] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-[#4A3B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1A237E]">New Module Available</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">Check out &quot;Smart Budgeting Strategies&quot;</p>
                            <p className="text-xs text-[#1C3FA8] mt-1 font-semibold">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Read notification - no blue dot, white background */}
                      <div className="p-4 hover:bg-[#F5F7FF] transition-colors border-b border-[hsl(var(--border))] cursor-pointer">
                        <div className="flex gap-3 ml-5">
                          <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1A237E]/80">Tip of the Day</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">Save ₱500 monthly with these energy hacks</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Read notification */}
                      <div className="p-4 hover:bg-[#F5F7FF] transition-colors cursor-pointer">
                        <div className="flex gap-3 ml-5">
                          <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1A237E]/80">Achievement Unlocked!</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">You&apos;ve earned the &quot;Budget Master&quot; badge</p>
                            <p className="text-xs text-[#1A237E]/60 mt-1">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-[hsl(var(--border))] text-center">
                      <button className="text-sm font-semibold text-[#1C3FA8] hover:underline">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative group">
                <Link href="/profile" className="h-10 w-10 rounded-full overflow-hidden border-2 border-[hsl(var(--primary))]/20 block">
                  {(profileImagePreview || profileImage) ? (
                    <div className="w-full h-full relative">
                      <Image
                        src={profileImagePreview || profileImage || ''}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#1C3FA8] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                      </svg>
                    </div>
                  )}
                </Link>
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[hsl(var(--border))] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-3 text-sm hover:bg-[hsl(var(--muted))] transition-colors">
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-[hsl(var(--destructive))] hover:bg-[hsl(var(--muted))] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : displayAuthButtons ? (
            <>
              <Link href="/auth" className="hidden md:block px-5 py-2 text-sm font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 transition-all active:scale-95">
                Sign In
              </Link>
              <Link href="/auth?mode=signup" className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all">
                Get Started
              </Link>
            </>
          ) : null}
        </div>
      </nav>

      {/* Mobile Menu Sidebar - Slide from left - Only on mobile */}
      <div 
        className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl z-[60] transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-between p-6 h-full overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-3">
            <Link 
              href={isLoggedIn ? "/home" : "/"} 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base py-2 transition-all block relative ${
                activeLink === 'home' 
                  ? 'text-[#1C3FA8] pl-3 bg-[#E3F2FD]/30' 
                  : 'text-[#1A237E] hover:text-[#E53935] pl-3'
              }`}
            >
              {activeLink === 'home' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E53935] rounded-r"></span>}
              {isLoggedIn ? "Dashboard" : "Home"}
            </Link>
            <Link 
              href="/learn" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base py-2 transition-all block relative ${
                activeLink === 'learn' 
                  ? 'text-[#1C3FA8] pl-3 bg-[#E3F2FD]/30' 
                  : 'text-[#1A237E] hover:text-[#E53935] pl-3'
              }`}
            >
              {activeLink === 'learn' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E53935] rounded-r"></span>}
              Learn
            </Link>
            <Link 
              href="/simulator" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base py-2 transition-all block relative ${
                activeLink === 'simulator' 
                  ? 'text-[#1C3FA8] pl-3 bg-[#E3F2FD]/30' 
                  : 'text-[#1A237E] hover:text-[#E53935] pl-3'
              }`}
            >
              {activeLink === 'simulator' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E53935] rounded-r"></span>}
              Simulator
            </Link>
            <Link 
              href="/quizzes" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base py-2 transition-all block relative ${
                activeLink === 'quizzes' 
                  ? 'text-[#1C3FA8] pl-3 bg-[#E3F2FD]/30' 
                  : 'text-[#1A237E] hover:text-[#E53935] pl-3'
              }`}
            >
              {activeLink === 'quizzes' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E53935] rounded-r"></span>}
              Quizzes
            </Link>
            <Link 
              href="/tips" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base py-2 transition-all block relative ${
                activeLink === 'tips' 
                  ? 'text-[#1C3FA8] pl-3 bg-[#E3F2FD]/30' 
                  : 'text-[#1A237E] hover:text-[#E53935] pl-3'
              }`}
            >
              {activeLink === 'tips' && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E53935] rounded-r"></span>}
              Tips
            </Link>

            {displayUserActions && (
              <>
                <hr className="border-gray-200 my-3" />
                <Link 
                  href="/profile" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-semibold text-base py-2 text-[#1A237E] hover:text-[#E53935] pl-3 transition-colors block"
                >
                  My Profile
                </Link>
              </>
            )}

            {displayAuthButtons && (
              <>
                <hr className="border-gray-200 my-3" />
                <Link 
                  href="/auth?mode=signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#1C3FA8] text-white px-6 py-3 rounded-lg text-center font-bold shadow-md hover:opacity-90 transition-all block"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Logout at bottom */}
          {displayUserActions && (
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                className="font-semibold text-base py-2 text-[#E53935] hover:text-[#C62828] pl-3 transition-colors flex items-center gap-2 w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when menu is open - closes menu on click - Only on mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[59]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
