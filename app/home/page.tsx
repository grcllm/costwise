'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calculator, Trophy, Lightbulb, ChevronRight, TrendingUp, CheckCircle2 } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { useAuth } from '@/contexts/auth-context'
import { LoadingPage, StatCard, ContentCard } from "@/components/ui"
import { useLocalStorage } from '@/hooks'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [profileImage] = useLocalStorage<string | null>('profileImage', null)
  const [profileImagePreview] = useLocalStorage<string | null>('profileImagePreview', null)

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth?redirect=/home')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return <LoadingPage text="Loading your dashboard..." />
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="bg-[#F5F7FF] min-h-screen">
      {/* Top Navigation Bar - Logged In */}
      <NavigationWrapper activeLink="home" />

      <main className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        {/* Personalized Welcome Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C3FA8] mb-2 tracking-tight">
            Mabuhay, Juan!
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to continue learning about inflation and purchasing power?
          </p>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Progress & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1C3FA8] to-[#0D2B6B] rounded-3xl p-8 text-white shadow-lg">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 inline-block backdrop-blur-sm">
                      IN PROGRESS
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Mastering Inflation & Buying Power
                    </h2>
                    <p className="text-white/90 text-sm md:text-base">
                      Learn how inflation impacts your daily expenses and savings.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center ml-4">
                    <p className="text-3xl font-extrabold leading-none">65%</p>
                    <p className="text-[10px] font-bold mt-1 uppercase tracking-wide">Complete</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-[#FDD835] w-[65%] rounded-full shadow-[0_0_12px_rgba(253,216,53,0.6)]"></div>
                </div>
                
                <Link 
                  href="/learn/purchasing-power"
                  className="inline-flex items-center gap-2 bg-[#E53935] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#C62828] transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  Resume Lesson
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FDD835]/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex flex-wrap gap-4">
              <StatCard
                icon={Trophy}
                title="Quizzes Completed"
                value={24}
                subtitle="+12% this week"
                className="flex-1 min-w-[280px]"
              />
              <StatCard
                icon={Lightbulb}
                title="Saved Resources"
                value={15}
                className="flex-1 min-w-[280px]"
                onClick={() => window.location.href = '/tips'}
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-[#1C3FA8] mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="bg-[#E8F5E9] p-2.5 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Completed "Budgeting Mastery" Quiz</p>
                    <p className="text-sm text-gray-500 mt-0.5">Scored 87% • 2 hours ago</p>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="bg-[#FFF9C4] p-2.5 rounded-xl">
                    <Lightbulb className="h-5 w-5 text-[#FDD835]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Saved "Strategic Route Mapping" Tip</p>
                    <p className="text-sm text-gray-500 mt-0.5">Yesterday at 3:45 PM</p>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#C5D3FF] p-2.5 rounded-xl">
                    <BookOpen className="h-5 w-5 text-[#1C3FA8]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Started "Purchasing Power" Module</p>
                    <p className="text-sm text-gray-500 mt-0.5">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-[#1C3FA8] mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  href="/simulator" 
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#1C3FA8] transition-all group hover:shadow-md"
                >
                  <div className="bg-[#F5F7FF] p-3 rounded-xl group-hover:bg-[#1C3FA8] transition-colors">
                    <Calculator className="h-6 w-6 text-[#1C3FA8] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center group-hover:text-[#1C3FA8] transition-colors">Simulator</span>
                </Link>

                <Link 
                  href="/quizzes" 
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#1C3FA8] transition-all group hover:shadow-md"
                >
                  <div className="bg-[#F5F7FF] p-3 rounded-xl group-hover:bg-[#1C3FA8] transition-colors">
                    <Trophy className="h-6 w-6 text-[#1C3FA8] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center group-hover:text-[#1C3FA8] transition-colors">Quizzes</span>
                </Link>

                <Link 
                  href="/learn" 
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#1C3FA8] transition-all group hover:shadow-md"
                >
                  <div className="bg-[#F5F7FF] p-3 rounded-xl group-hover:bg-[#1C3FA8] transition-colors">
                    <BookOpen className="h-6 w-6 text-[#1C3FA8] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center group-hover:text-[#1C3FA8] transition-colors">Learn</span>
                </Link>

                <Link 
                  href="/tips" 
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#1C3FA8] transition-all group hover:shadow-md"
                >
                  <div className="bg-[#F5F7FF] p-3 rounded-xl group-hover:bg-[#1C3FA8] transition-colors">
                    <Lightbulb className="h-6 w-6 text-[#1C3FA8] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center group-hover:text-[#1C3FA8] transition-colors">Tips</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* Tip of the Day Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#FFF9C4] p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-[#FDD835]" />
                </div>
                <h3 className="font-bold text-lg text-[#1C3FA8]">Tip of the Day</h3>
              </div>
              
              <div className="bg-[#FFFDE7] border-l-4 border-[#FDD835] p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">50/30/20 Budgeting Rule</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Allocate 50% of your income to needs, 30% to wants, and 20% to savings. 
                  This simple rule helps protect your purchasing power against inflation.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {/* User's profile photo */}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-[#1C3FA8] overflow-hidden relative">
                    {(profileImagePreview || profileImage) ? (
                      <Image
                        src={profileImagePreview || profileImage || ''}
                        alt="Your profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Your profile"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  {/* Other users who liked */}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-600 overflow-hidden relative">
                    <Image
                      src="https://i.pravatar.cc/150?img=1"
                      alt="User"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-600 overflow-hidden relative">
                    <Image
                      src="https://i.pravatar.cc/150?img=2"
                      alt="User"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  1,204 likes
                </p>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg text-[#1C3FA8] mb-4">Learning Progress</h3>
              
              <div className="space-y-4">
                {/* Module 1 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">Purchasing Power</p>
                    <span className="text-xs font-bold text-[#1C3FA8]">65%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1C3FA8] w-[65%] rounded-full"></div>
                  </div>
                </div>

                {/* Module 2 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">Budgeting Mastery</p>
                    <span className="text-xs font-bold text-[#4CAF50]">100%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4CAF50] w-full rounded-full"></div>
                  </div>
                </div>

                {/* Module 3 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">CPI Explained</p>
                    <span className="text-xs font-bold text-[#1C3FA8]">40%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1C3FA8] w-[40%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <Link 
                href="/learn" 
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#1C3FA8] text-white font-bold py-3 rounded-xl hover:bg-[#0D2B6B] transition-colors"
              >
                View All Modules
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Upcoming Quiz Reminder */}
            <div className="bg-[#EEF2FF] rounded-3xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg text-[#1C3FA8] mb-2">Ready to test your knowledge?</h3>
              <p className="text-sm text-gray-600 mb-4">
                See if you've mastered the concept of Purchasing Power.
              </p>
              <Link 
                href="/quizzes/purchasing-power"
                className="inline-flex items-center gap-2 bg-[#1C3FA8] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0D2B6B] transition-colors text-sm"
              >
                Test Your Knowledge
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 w-full py-3 px-6 mt-16">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <p className="text-gray-600 text-xs">
            © 2026 <span className="font-semibold text-[#1C3FA8]">CostWise</span> Philippines
          </p>
        </div>
      </footer>
    </div>
  )
}
