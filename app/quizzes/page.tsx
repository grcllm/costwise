'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Play, ChevronRight, Award, Coins, Building2, PiggyBank, Bitcoin, X, Lock, Sparkles } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { SectionHeader, StatCard, ContentCard } from "@/components/ui"
import { useAuth } from "@/contexts/auth-context"

export default function QuizzesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [pendingQuizSlug, setPendingQuizSlug] = useState<string>("")

  const handleStartQuiz = (quizSlug: string) => {
    if (!isAuthenticated) {
      setPendingQuizSlug(quizSlug)
      setShowAuthModal(true)
    } else {
      router.push(`/quizzes/${quizSlug}`)
    }
  }

  const handleSignIn = () => {
    router.push(`/auth?redirect=/quizzes/${pendingQuizSlug}`)
  }

  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen pb-20 md:pb-0">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="quizzes" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pt-24">
        <SectionHeader
          title="Test Your Knowledge"
          subtitle="Test your understanding of inflation and purchasing power with our interactive quizzes."
        />

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quiz Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-[#C5D3FF] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#FFFDE7] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Level 4
                  </span>
                  <span className="bg-[#FDD835] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    92% AVG SCORE
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#1C3FA8] mb-2">
                  Budgeting Mastery
                </h3>
                <p className="text-sm text-[#1A237E] opacity-70 mb-6 leading-relaxed">
                  Perfect the art of the 50/30/20 rule and advanced expense tracking techniques.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative">
                    <Image 
                      alt="User" 
                      className="object-cover"
                      src="https://i.pravatar.cc/150?img=1"
                      fill
                      sizes="32px"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative">
                    <Image 
                      alt="User" 
                      className="object-cover"
                      src="https://i.pravatar.cc/150?img=2"
                      fill
                      sizes="32px"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-[#C5D3FF] text-[10px] font-bold text-[#1C3FA8]">
                    +12k
                  </div>
                </div>
                <button 
                  onClick={() => handleStartQuiz('budgeting-mastery')}
                  className="bg-[#E53935] text-white font-bold py-2.5 px-6 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Start Quiz
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Quiz Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-[#C5D3FF] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#FFFDE7] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Level 2
                  </span>
                  <span className="bg-[#FDD835] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    78% AVG SCORE
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#1C3FA8] mb-2">
                  Inflation Impact
                </h3>
                <p className="text-sm text-[#1A237E] opacity-70 mb-6 leading-relaxed">
                  Understand how inflation affects your daily expenses and purchasing power in the Philippines.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative">
                    <Image 
                      alt="User" 
                      className="object-cover"
                      src="https://i.pravatar.cc/150?img=3"
                      fill
                      sizes="32px"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative">
                    <Image 
                      alt="User" 
                      className="object-cover"
                      src="https://i.pravatar.cc/150?img=4"
                      fill
                      sizes="32px"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-[#C5D3FF] text-[10px] font-bold text-[#1C3FA8]">
                    +8k
                  </div>
                </div>
                <button 
                  onClick={() => handleStartQuiz('inflation-impact')}
                  className="bg-[#E53935] text-white font-bold py-2.5 px-6 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                >
                  Start Quiz
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Global Rank Card */}
          <div className="bg-[#1C3FA8] text-white rounded-3xl p-8 border border-[#1C3FA8] shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Award className="w-24 h-24" strokeWidth={1} />
            </div>
            <div className="z-10">
              <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">
                Global Rank
              </p>
              <h2 className="text-6xl font-black text-[#FDD835] mb-4">#124</h2>
              <div className="h-1.5 w-full bg-[#C5D3FF]/30 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-[#FDD835] w-3/4 rounded-full"></div>
              </div>
              <p className="text-xs font-medium px-4">
                Top 5% of all CostWise users globally. Keep it up!
              </p>
            </div>
          </div>
        </section>

        {/* Recent Performance */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-[#1C3FA8]">Recent Performance</h2>
            <button onClick={() => setShowComingSoonModal(true)} className="text-[#E53935] font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={Coins}
              title="Tax Efficiency"
              subtitle="Completed 2 days ago"
              value={850}
              badge="pts"
            />
            <StatCard
              icon={Building2}
              title="Estate Planning"
              subtitle="Completed 5 days ago"
              value={920}
              badge="pts"
            />
            <StatCard
              icon={PiggyBank}
              title="Emergency Funds"
              subtitle="Completed 1 week ago"
              value={740}
              badge="pts"
            />
          </div>
        </section>

        {/* New Module Banner */}
        <section className="mt-12 bg-[#FFFDE7] rounded-[2rem] p-8 md:p-12 relative overflow-hidden border border-[#FDD835]">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-[#FDD835] text-[#4A3B00] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              New Module
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C3FA8] mb-4">
              Philippine Inflation Trends
            </h2>
            <p className="text-[#1A237E] text-lg mb-8 leading-relaxed">
              Explore historical inflation data in the Philippines and learn how to adapt your budget to changing economic conditions.
            </p>
            <div className="bg-gray-300 text-gray-500 font-bold py-4 px-10 rounded-2xl inline-block cursor-not-allowed opacity-60">
              Coming Soon
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FDD835] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-10 right-10 hidden md:block">
            <Bitcoin className="w-32 h-32 text-[#FDD835]/40" strokeWidth={1.5} />
          </div>
        </section>
      </main>

      {/* Auth Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-[#FDD835]" />
              </div>
              
              <h3 className="text-2xl font-black text-[#1C3FA8] mb-2">
                Sign In Required
              </h3>
              
              <p className="text-[#1A237E]/70 mb-6">
                Create an account or sign in to track your quiz progress, earn badges, and compete on the leaderboard!
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-[#1C3FA8] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0D2B6B] transition-all"
                >
                  Sign In to Continue
                </button>
                
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-xs text-[#1A237E]/60 mt-4">
                Don't have an account? Sign up takes less than a minute!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFFDE7] rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#FDD835]" />
              </div>
              
              <h3 className="text-2xl font-black text-[#1C3FA8] mb-2">
                Coming Soon
              </h3>
              
              <p className="text-[#1A237E]/70 mb-6">
                The detailed performance history is currently being developed. Check back soon!
              </p>

              <button
                onClick={() => setShowComingSoonModal(false)}
                className="w-full bg-[#1C3FA8] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0D2B6B] transition-all"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
