"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Calendar, Lightbulb, BookOpen, AlertCircle, ChevronRight, CheckCircle2, Sparkles, TrendingDown, Coins } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { useState } from "react"

export default function WhatIsInflationModule() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="learn" />

      <main className="max-w-7xl mx-auto px-6 py-8 pb-32 pt-24">
        {/* Back Button */}
        <Link 
          href="/learn"
          className="inline-flex items-center gap-2 text-[#1C3FA8] font-bold mb-6 hover:text-[#E53935] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Educational Hub
        </Link>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1C3FA8] to-[#0D1F54] rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDD835] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E53935] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-4 py-2 bg-[#FDD835] text-[#4A3B00] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              Foundation Module
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              What is Inflation? <span className="text-[#FDD835]">Understanding the Rising Tide</span>
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Inflation is the rate at which the general level of prices for goods and services rises over time. When inflation occurs, each peso buys fewer goods and services than before.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>12 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated April 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>Beginner Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* The Simple Definition */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <div className="flex items-start gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#1C3FA8] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-black text-[#1C3FA8] mb-2">
                    The Simple Definition
                  </h2>
                  <p className="text-[#1A237E] leading-relaxed">
                    Imagine you have <span className="font-bold text-[#1C3FA8]">₱100</span> today. With inflation, that same ₱100 will buy you <span className="font-bold text-[#E53935]">less</span> next year than it does today.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFDE7] border-l-4 border-[#FDD835] p-6 rounded-lg mb-6">
                <p className="text-[#4A3B00] font-semibold mb-2">💡 Key Insight</p>
                <p className="text-[#4A3B00]">
                  Inflation means your money loses value over time. It's like a slow leak in your wallet—the money is still there, but it can't buy as much as it used to.
                </p>
              </div>

              <p className="text-[#1A237E] leading-relaxed">
                This happens because the prices of goods and services increase. When prices go up across the economy, we call this <span className="font-bold">inflation</span>.
              </p>
            </section>

            {/* Real-World Example */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Real-World Example: The Grocery Bill
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#E8F5E9] p-3 rounded-xl flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">2020: Your Weekly Grocery</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Rice (5kg), eggs (1 dozen), vegetables, cooking oil, and basic necessities = <span className="font-bold text-[#1C3FA8]">₱1,500</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FFEBEE] p-3 rounded-xl flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#E53935]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">2026: Same Grocery Items</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Exact same items, same brands, same quantities = <span className="font-bold text-[#E53935]">₱2,100</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F7FF] p-6 rounded-xl">
                <p className="text-sm font-semibold text-[#1C3FA8] mb-2">The Math:</p>
                <p className="text-sm text-[#1A237E]/80">
                  That's a <span className="font-bold text-[#E53935]">40% increase</span> in 6 years. Your ₱1,500 budget from 2020 can no longer buy the same basket of goods in 2026.
                </p>
              </div>
            </section>

            {/* What Causes Inflation */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                What Causes Inflation?
              </h2>

              <div className="space-y-6">
                {/* Cause 1 */}
                <div className="border-l-4 border-[#1C3FA8] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">1. Demand-Pull Inflation</h3>
                  <p className="text-sm text-[#1A237E]/70 mb-3">
                    When everyone wants to buy something, but there's not enough supply, prices go up.
                  </p>
                  <div className="bg-[#F5F7FF] p-4 rounded-lg text-sm">
                    <p className="font-semibold text-[#1C3FA8] mb-1">Example:</p>
                    <p className="text-[#1A237E]/80">
                      During the pandemic, face masks were in high demand but low supply. Prices skyrocketed from ₱5 to ₱50 per mask.
                    </p>
                  </div>
                </div>

                {/* Cause 2 */}
                <div className="border-l-4 border-[#E53935] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">2. Cost-Push Inflation</h3>
                  <p className="text-sm text-[#1A237E]/70 mb-3">
                    When the cost of making products increases, businesses pass those costs to consumers.
                  </p>
                  <div className="bg-[#FFF5F5] p-4 rounded-lg text-sm">
                    <p className="font-semibold text-[#E53935] mb-1">Example:</p>
                    <p className="text-[#1A237E]/80">
                      When oil prices rise, transportation costs increase. This makes everything more expensive—from vegetables to electronics.
                    </p>
                  </div>
                </div>

                {/* Cause 3 */}
                <div className="border-l-4 border-[#FDD835] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">3. Built-In Inflation</h3>
                  <p className="text-sm text-[#1A237E]/70 mb-3">
                    When workers demand higher wages to keep up with rising prices, creating a cycle.
                  </p>
                  <div className="bg-[#FFFDE7] p-4 rounded-lg text-sm">
                    <p className="font-semibold text-[#4A3B00] mb-1">Example:</p>
                    <p className="text-[#1A237E]/80">
                      Minimum wage increases → businesses raise prices → workers need higher wages again → cycle continues.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Is Inflation Always Bad? */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6">
                Is Inflation Always Bad?
              </h2>

              <p className="text-[#1A237E] leading-relaxed mb-6">
                Not necessarily! A small amount of inflation (around 2-3% per year) is actually considered healthy for the economy.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#E8F5E9] p-6 rounded-xl">
                  <h3 className="font-bold text-[#4CAF50] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Good Inflation (2-3%)
                  </h3>
                  <ul className="space-y-2 text-sm text-[#1A237E]/80">
                    <li>• Encourages spending and investment</li>
                    <li>• Businesses grow and hire more workers</li>
                    <li>• Economy stays active and healthy</li>
                  </ul>
                </div>

                <div className="bg-[#FFEBEE] p-6 rounded-xl">
                  <h3 className="font-bold text-[#E53935] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Bad Inflation (7%+)
                  </h3>
                  <ul className="space-y-2 text-sm text-[#1A237E]/80">
                    <li>• Your savings lose value quickly</li>
                    <li>• Harder to afford basic necessities</li>
                    <li>• Economic uncertainty and instability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-gradient-to-br from-[#1C3FA8] to-[#0D1F54] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-[#FDD835]" />
                Key Takeaways
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    Inflation means prices rise and your money buys less over time
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    It's caused by increased demand, higher production costs, or wage-price spirals
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    Moderate inflation (2-3%) is healthy; high inflation (7%+) is problematic
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    Understanding inflation helps you make smarter financial decisions
                  </p>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6">
                Continue Your Learning Journey
              </h2>
              <div className="space-y-4">
                <Link 
                  href="/learn/purchasing-power"
                  className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1C3FA8] p-3 rounded-xl">
                      <TrendingDown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A237E]">Purchasing Power</h3>
                      <p className="text-sm text-[#1A237E]/60">Learn how inflation affects your buying power</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#1C3FA8] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/quizzes"
                  className="flex items-center justify-between p-4 bg-[#FFFDE7] rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FDD835] p-3 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-[#4A3B00]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A237E]">Test Your Knowledge</h3>
                      <p className="text-sm text-[#1A237E]/60">Take a quiz on inflation basics</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4A3B00] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-[#C5D3FF] p-6 sticky top-24">
              <h3 className="font-bold text-[#1C3FA8] mb-4">Philippines Inflation Rate</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#F5F7FF] rounded-xl">
                  <div className="text-4xl font-black text-[#1C3FA8] mb-1">3.4%</div>
                  <div className="text-xs text-[#1A237E]/60 uppercase tracking-wider">March 2026</div>
                </div>
                <div className="text-xs text-[#1A237E]/70 leading-relaxed">
                  <p className="mb-2">
                    <span className="font-semibold">Source:</span> Philippine Statistics Authority (PSA)
                  </p>
                  <p>
                    This means prices increased by 3.4% compared to the same month last year.
                  </p>
                </div>
              </div>
            </div>

            {/* Did You Know */}
            <div className="bg-[#FFFDE7] border border-[#FDD835] rounded-2xl p-6">
              <h3 className="font-bold text-[#4A3B00] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Did You Know?
              </h3>
              <p className="text-sm text-[#4A3B00]/90 leading-relaxed">
                The highest inflation rate in Philippine history was <span className="font-bold">62.8%</span> in September 1984. Imagine prices doubling in just over a year!
              </p>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-2xl border border-[#C5D3FF] p-6">
              <h3 className="font-bold text-[#1C3FA8] mb-4">Related Tools</h3>
              <div className="space-y-3">
                <Link 
                  href="/simulator"
                  className="block p-3 bg-[#F5F7FF] rounded-lg hover:bg-[#E3F2FD] transition-colors"
                >
                  <div className="font-semibold text-[#1A237E] text-sm mb-1">Inflation Calculator</div>
                  <div className="text-xs text-[#1A237E]/60">See how inflation affects your money</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
