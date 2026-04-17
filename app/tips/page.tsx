'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Grid3x3, ShoppingBasket, Zap, Bus, PiggyBank, ArrowRight, ThumbsUp, MessageCircle, Lightbulb, Refrigerator, Sun } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { SectionHeader, Tag, ContentCard } from "@/components/ui"
import { useIsMobile } from "@/hooks"

type FilterCategory = 'all' | 'palengke' | 'energy' | 'commuter' | 'budgeting'

export default function TipsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const isMobile = useIsMobile()

  const filterButtons = [
    { id: 'all' as FilterCategory, label: 'All Hacks', icon: Grid3x3 },
    { id: 'palengke' as FilterCategory, label: 'Palengke', icon: ShoppingBasket },
    { id: 'energy' as FilterCategory, label: 'Energy', icon: Zap },
    { id: 'commuter' as FilterCategory, label: 'Commuter', icon: Bus },
    { id: 'budgeting' as FilterCategory, label: 'Budgeting', icon: PiggyBank },
  ]

  const shouldShowPalengke = activeFilter === 'all' || activeFilter === 'palengke'
  const shouldShowEnergy = activeFilter === 'all' || activeFilter === 'energy'
  const shouldShowCommuter = activeFilter === 'all' || activeFilter === 'commuter'
  const shouldShowBudgeting = activeFilter === 'all' || activeFilter === 'budgeting'
  
  // Show extra cards only when specific filter is active (not in "All Hacks")
  const showPalengkeExtras = activeFilter === 'palengke'
  const showBudgetingExtras = activeFilter === 'budgeting'

  return (
    <div className="bg-[#F5F7FF] text-[#1A237E]">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="tips" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0 pt-24">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-[#1C3FA8] p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image 
              className="object-cover" 
              alt="Philippine market scene"
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop"
              fill
              sizes="100vw"
              priority
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Practical Tips Repository
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Maximize your hard-earned money with community-vetted Pinoy life hacks for every aspect of daily life.
            </p>
            <Link 
              href="/submit-tip"
              className="bg-[#E53935] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 inline-flex"
            >
              <PlusCircle className="w-5 h-5" />
              Submit a Tip
            </Link>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
          {filterButtons.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md transition-all ${
                  isActive
                    ? 'bg-[#1C3FA8] text-white'
                    : 'bg-white border border-[#C5D3FF] text-[#1A237E] hover:bg-[#FFFDE7]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Palengke Hacks Section - Big Card */}
          {shouldShowPalengke && (
            <>
              <ContentCard className="md:col-span-8 relative overflow-hidden group" padding="lg">
                <div className="absolute top-0 right-0 p-6">
                  <ShoppingBasket className="w-24 h-24 text-[#FDD835]/20" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <Tag variant="accent">Palengke Hacks</Tag>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1C3FA8]">
                  The &quot;Suki&quot; Secret Strategy
                </h3>
                <p className="text-[#1A237E]/70 mb-8 max-w-lg">
                  Master the art of &apos;tawad&apos; and build relationships with vendors to get the freshest produce at the lowest possible prices.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F5F7FF] p-5 rounded-2xl border border-transparent hover:border-[#FDD835] transition-all">
                    <div className="text-[#1C3FA8] font-bold mb-1 italic">&quot;Go at 5 AM&quot;</div>
                    <p className="text-sm opacity-80">
                      Best selection of seafood and vegetables arriving directly from the provinces.
                    </p>
                  </div>
                  <div className="bg-[#F5F7FF] p-5 rounded-2xl border border-transparent hover:border-[#FDD835] transition-all">
                    <div className="text-[#1C3FA8] font-bold mb-1 italic">&quot;The Last Hour&quot;</div>
                    <p className="text-sm opacity-80">
                      Vendors drop prices drastically near closing time to clear their perishable stocks.
                    </p>
                  </div>
                </div>
              </ContentCard>

              {/* Palengke - Seasonal Shopping - Only in Palengke filter */}
              {showPalengkeExtras && (
                <ContentCard className="md:col-span-4" padding="md">
                  <Tag variant="accent" className="mb-3">Palengke</Tag>
                  <h4 className="font-bold text-[#1C3FA8] mb-3 text-lg">Seasonal Shopping Guide</h4>
                  <p className="text-sm text-[#1A237E]/70 mb-4">
                    Buy fruits and vegetables when they&apos;re in season for the best prices and quality.
                  </p>
                  <div className="space-y-2.5 text-sm">
                    <div className="bg-[#F5F7FF] p-3 rounded-lg flex justify-between items-center">
                      <span className="text-[#1A237E] font-medium">Mango Season</span>
                      <span className="font-bold text-[#1C3FA8]">Mar-May</span>
                    </div>
                    <div className="bg-[#F5F7FF] p-3 rounded-lg flex justify-between items-center">
                      <span className="text-[#1A237E] font-medium">Tomato Season</span>
                      <span className="font-bold text-[#1C3FA8]">Dec-Feb</span>
                    </div>
                    <div className="bg-[#F5F7FF] p-3 rounded-lg flex justify-between items-center">
                      <span className="text-[#1A237E] font-medium">Pineapple Season</span>
                      <span className="font-bold text-[#1C3FA8]">Apr-Jun</span>
                    </div>
                    <div className="bg-[#F5F7FF] p-3 rounded-lg flex justify-between items-center">
                      <span className="text-[#1A237E] font-medium">Squash Season</span>
                      <span className="font-bold text-[#1C3FA8]">Oct-Dec</span>
                    </div>
                  </div>
                </ContentCard>
              )}

              {/* Palengke - Bulk Buying - Only in Palengke filter */}
              {showPalengkeExtras && (
                <ContentCard className="md:col-span-12" padding="md">
                  <Tag variant="accent" className="mb-4">Palengke</Tag>
                  <h4 className="font-bold text-[#1C3FA8] mb-2 text-lg">Bulk Buying Benefits</h4>
                  <p className="text-sm text-[#1A237E]/70 mb-4">
                    Purchase rice, dried goods, and non-perishables in bulk to save up to 30% compared to retail prices.
                  </p>
                  <div className="bg-[#F5F7FF] p-4 rounded-xl">
                    <p className="text-sm font-semibold text-[#1C3FA8] mb-1">Pro Tip:</p>
                    <p className="text-sm text-[#1A237E]/70">
                      Team up with neighbors to split bulk purchases and maximize savings while avoiding waste.
                    </p>
                  </div>
                </ContentCard>
              )}
            </>
          )}

          {/* Energy Tip - Vertical Card */}
          {shouldShowEnergy && (
            <ContentCard className={`${shouldShowPalengke ? 'md:col-span-4' : 'md:col-span-6'} bg-[#FFFDE7] border-[#FDD835] flex flex-col justify-between`} padding="lg">
              <div>
                <Tag variant="primary" className="mb-6">Energy hack</Tag>
                <h3 className="text-2xl font-bold mb-4 text-[#4A3B00]">
                  Meralco Bill Buster
                </h3>
                <p className="text-[#4A3B00]/80">
                  Small shifts in appliance usage can lead to significant monthly savings.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
                  <Zap className="text-[#E53935] w-6 h-6" />
                  <div>
                    <p className="text-sm font-bold text-[#4A3B00]">AC Maintenance</p>
                    <p className="text-xs opacity-70">Clean filters monthly to save 15% on consumption.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
                  <Zap className="text-[#E53935] w-6 h-6" />
                  <div>
                    <p className="text-sm font-bold text-[#4A3B00]">Unplug Vampires</p>
                    <p className="text-xs opacity-70">Standby power adds ₱100+ to your monthly bill.</p>
                  </div>
                </div>
              </div>
            </ContentCard>
          )}

          {/* Commuter Hack - Feature Card */}
          {shouldShowCommuter && (
            <div className="md:col-span-6 bg-white border border-[#C5D3FF] rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center group">
              <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 relative">
                <Image 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt="City traffic light trails"
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop"
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>
              <div>
                <span className="bg-[#E53935] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
                  Commuter hack
                </span>
                <h3 className="text-xl font-bold mb-2 text-[#1C3FA8]">
                  Strategic Route Mapping
                </h3>
                <p className="text-[#1A237E]/70 text-sm mb-4">
                  Combine Beep card rewards with specific UV Express routes to shave ₱40 off your daily round trip.
                </p>
                <Link 
                  href="/tips/strategic-route-mapping"
                  className="flex items-center gap-2 text-[#E53935] font-bold text-sm hover:gap-3 transition-all"
                >
                  Read full guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Community Tip - Accent Card (Budgeting) */}
          {shouldShowBudgeting && (
            <>
              <div className="md:col-span-6 bg-[#1C3FA8] rounded-3xl p-8 shadow-sm text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDD835] rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FDD835] overflow-hidden relative">
                    <Image 
                      className="object-cover" 
                      alt="User profile"
                      src="https://i.pravatar.cc/150?img=5"
                      fill
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Ana Maria S.</p>
                    <p className="text-xs text-[#C5D3FF]">Verified Wise Saver</p>
                  </div>
                </div>
                <blockquote className="text-xl font-medium leading-relaxed italic mb-6">
                  &quot;Switching to bulk-buying dry goods from local &apos;Tindahan&apos; clusters instead of malls saved me ₱2,500 every single month.&quot;
                </blockquote>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 fill-current" /> 1.2k
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" /> 84
                    </span>
                  </div>
                  <span className="text-xs text-[#C5D3FF]">Posted 2 days ago</span>
                </div>
              </div>

              {/* Budgeting - Emergency Fund - Only in Budgeting filter */}
              {showBudgetingExtras && (
                <div className="md:col-span-8 bg-white border border-[#C5D3FF] rounded-3xl p-6 shadow-sm">
                  <span className="bg-[#1C3FA8] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
                    Budgeting
                  </span>
                  <h4 className="font-bold text-[#1C3FA8] mb-2 text-lg">Build Your Emergency Fund</h4>
                  <p className="text-sm text-[#1A237E]/70 mb-4">
                    Start with ₱1,000 per month. In one year, you&apos;ll have ₱12,000 saved for unexpected expenses.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#F5F7FF] p-4 rounded-xl">
                      <p className="text-sm font-semibold text-[#1C3FA8] mb-1">Step 1: Automate</p>
                      <p className="text-xs text-[#1A237E]/70">Set up automatic transfers to savings account every payday.</p>
                    </div>
                    <div className="bg-[#F5F7FF] p-4 rounded-xl">
                      <p className="text-sm font-semibold text-[#1C3FA8] mb-1">Step 2: Separate</p>
                      <p className="text-xs text-[#1A237E]/70">Keep emergency funds in a different bank to avoid temptation.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Budgeting - 50/30/20 Rule - Only in Budgeting filter */}
              {showBudgetingExtras && (
                <div className="md:col-span-4 bg-[#FFFDE7] border border-[#FDD835] rounded-3xl p-6 shadow-sm">
                <span className="bg-[#1C3FA8] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
                  Budgeting
                </span>
                <h4 className="font-bold text-[#4A3B00] mb-2 text-lg">50/30/20 Budget Rule</h4>
                <p className="text-sm text-[#4A3B00]/80 mb-4">
                  Simple budgeting framework for Filipinos.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1C3FA8] flex items-center justify-center text-white font-bold">
                      50%
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A3B00]">Needs</p>
                      <p className="text-xs text-[#4A3B00]/70">Rent, food, utilities</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E53935] flex items-center justify-center text-white font-bold">
                      30%
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A3B00]">Wants</p>
                      <p className="text-xs text-[#4A3B00]/70">Entertainment, dining</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">
                      20%
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4A3B00]">Savings</p>
                      <p className="text-xs text-[#4A3B00]/70">Emergency fund, investments</p>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Budgeting - Digital Banking - Only in Budgeting filter */}
              {showBudgetingExtras && (
                <div className="md:col-span-12 bg-white border border-[#C5D3FF] rounded-3xl p-6 shadow-sm">
                  <span className="bg-[#1C3FA8] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
                    Budgeting
                  </span>
                  <h4 className="font-bold text-[#1C3FA8] mb-2 text-lg">Maximize Digital Banking Rewards</h4>
                  <p className="text-sm text-[#1A237E]/70 mb-4">
                    Use digital banks like GCash, Maya, or Seabank to earn higher interest rates and cashback rewards.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#F5F7FF] p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-[#1C3FA8] mb-1">4-6%</p>
                      <p className="text-xs text-[#1A237E]/70">Annual interest rate</p>
                    </div>
                    <div className="bg-[#F5F7FF] p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-[#1C3FA8] mb-1">₱0</p>
                      <p className="text-xs text-[#1A237E]/70">Maintaining balance</p>
                    </div>
                    <div className="bg-[#F5F7FF] p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-[#1C3FA8] mb-1">24/7</p>
                      <p className="text-xs text-[#1A237E]/70">Access anytime</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Energy Category - Wide */}
          {shouldShowEnergy && (
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-[#C5D3FF] p-6 rounded-2xl hover:shadow-md transition-shadow">
                <div className="text-[#FDD835] mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#1C3FA8] mb-2">LED Conversion</h4>
                <p className="text-sm text-[#1A237E]/70">
                  Swap your old fluorescent tubes for LEDs to see immediate 40% drops in lighting costs.
                </p>
              </div>
              <div className="bg-white border border-[#C5D3FF] p-6 rounded-2xl hover:shadow-md transition-shadow">
                <div className="text-[#FDD835] mb-4">
                  <Refrigerator className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#1C3FA8] mb-2">Fridge Optimization</h4>
                <p className="text-sm text-[#1A237E]/70">
                  Keep your freezer 3/4 full. A full freezer retains cold better than an empty one.
                </p>
              </div>
              <div className="bg-white border border-[#C5D3FF] p-6 rounded-2xl hover:shadow-md transition-shadow">
                <div className="text-[#FDD835] mb-4">
                  <Sun className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#1C3FA8] mb-2">DIY Solar Path</h4>
                <p className="text-sm text-[#1A237E]/70">
                  Simple guide to setting up small solar chargers for mobile devices and terrace lighting.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {!shouldShowPalengke && !shouldShowEnergy && !shouldShowCommuter && !shouldShowBudgeting && (
          <div className="text-center py-16">
            <p className="text-[#1A237E]/60 text-lg">No tips available for this category yet.</p>
          </div>
        )}

        {/* Pagination or Load More */}
        <div className="mt-16 text-center">
          <button className="bg-white border-2 border-[#1C3FA8] text-[#1C3FA8] px-10 py-3 rounded-full font-bold hover:bg-[#1C3FA8] hover:text-white transition-all">
            Load More Tips
          </button>
        </div>
      </main>
    </div>
  )
}
