"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, TrendingUp, BarChart3, ShoppingCart, Calendar, Lightbulb, BookOpen, AlertCircle, ChevronRight, CheckCircle2, Sparkles, LineChart, Coins, PieChart } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { useState } from "react"

export default function CPIExplainedModule() {
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
              Intermediate Module
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              CPI Explained <span className="text-[#FDD835]">Understanding Consumer Prices</span>
            </h1>
            <p className="text-lg opacity-90 mb-6">
              The Consumer Price Index (CPI) is the primary measure of inflation. Learn how governments track price changes and why it matters for your wallet.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated April 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>Intermediate Level</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* What is CPI */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <div className="flex items-start gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-[#1C3FA8] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-black text-[#1C3FA8] mb-2">
                    What is the CPI?
                  </h2>
                  <p className="text-[#1A237E] leading-relaxed">
                    The Consumer Price Index (CPI) is a statistical measure that tracks the average change in prices paid by consumers for goods and services over time.
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFDE7] border-l-4 border-[#FDD835] p-6 rounded-lg mb-6">
                <p className="text-[#4A3B00] font-semibold mb-2">💡 Key Insight</p>
                <p className="text-[#4A3B00]">
                  CPI is like a thermometer for inflation. It tells us how fast prices are rising (or falling) in the economy. A higher CPI means inflation is accelerating.
                </p>
              </div>

              <p className="text-[#1A237E] leading-relaxed">
                In the Philippines, the <span className="font-bold">Philippine Statistics Authority (PSA)</span> calculates the CPI monthly. It's the official measure used by the government and central bank to monitor inflation.
              </p>
            </section>

            {/* How CPI is Calculated */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6 flex items-center gap-2">
                <LineChart className="w-6 h-6" />
                How is CPI Calculated?
              </h2>

              <p className="text-[#1A237E] leading-relaxed mb-6">
                CPI is calculated using a "basket of goods and services" that represents what an average Filipino household buys. Here's the process:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1C3FA8] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">Select a Basket of Goods</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Statisticians choose representative items: rice, eggs, transportation, utilities, healthcare, education, etc.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1C3FA8] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">Assign Weights</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Each item gets a weight based on how much the average household spends on it. Food gets more weight than luxury items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1C3FA8] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">Track Price Changes</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Prices are collected from stores, markets, and service providers across the country monthly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1C3FA8] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A237E] mb-1">Calculate the Index</h3>
                    <p className="text-sm text-[#1A237E]/70">
                      Compare current prices to a base year (usually set to 100). If CPI is 110, prices have risen 10% since the base year.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F7FF] p-6 rounded-xl">
                <p className="text-sm font-semibold text-[#1C3FA8] mb-2">Example:</p>
                <p className="text-sm text-[#1A237E]/80">
                  If the base year (2018) CPI = 100, and today's CPI = 115, it means prices have increased by 15% since 2018.
                </p>
              </div>
            </section>

            {/* CPI Basket Components */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                What's in the CPI Basket?
              </h2>

              <p className="text-[#1A237E] leading-relaxed mb-6">
                The CPI basket includes major spending categories. Here's the approximate breakdown for the Philippines:
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-lg">
                  <span className="font-semibold text-[#1A237E]">Food & Non-Alcoholic Beverages</span>
                  <span className="bg-[#E53935] text-white px-3 py-1 rounded-full text-sm font-bold">38%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-lg">
                  <span className="font-semibold text-[#1A237E]">Housing, Water & Electricity</span>
                  <span className="bg-[#1C3FA8] text-white px-3 py-1 rounded-full text-sm font-bold">25%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-lg">
                  <span className="font-semibold text-[#1A237E]">Transportation</span>
                  <span className="bg-[#FDD835] text-[#4A3B00] px-3 py-1 rounded-full text-sm font-bold">15%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-lg">
                  <span className="font-semibold text-[#1A237E]">Health & Education</span>
                  <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-bold">12%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-lg">
                  <span className="font-semibold text-[#1A237E]">Recreation & Other</span>
                  <span className="bg-[#9C27B0] text-white px-3 py-1 rounded-full text-sm font-bold">10%</span>
                </div>
              </div>

              <div className="bg-[#FFFDE7] border-l-4 border-[#FDD835] p-6 rounded-lg mt-6">
                <p className="text-[#4A3B00] font-semibold mb-2 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Why This Matters
                </p>
                <p className="text-[#4A3B00] text-sm">
                  Food takes up the largest share because most Filipino households spend the most on food. This is why food price increases have the biggest impact on overall inflation.
                </p>
              </div>
            </section>

            {/* CPI vs Inflation Rate */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6">
                CPI vs. Inflation Rate: What's the Difference?
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#E3F2FD] p-6 rounded-xl border-l-4 border-[#1C3FA8]">
                  <h3 className="font-bold text-[#1C3FA8] mb-3">CPI (Consumer Price Index)</h3>
                  <ul className="space-y-2 text-sm text-[#1A237E]/80">
                    <li>• A number that measures price levels</li>
                    <li>• Example: CPI = 115</li>
                    <li>• Shows absolute price level</li>
                    <li>• Cumulative measure</li>
                  </ul>
                </div>

                <div className="bg-[#FFF3E0] p-6 rounded-xl border-l-4 border-[#FDD835]">
                  <h3 className="font-bold text-[#4A3B00] mb-3">Inflation Rate</h3>
                  <ul className="space-y-2 text-sm text-[#1A237E]/80">
                    <li>• The percentage change in CPI</li>
                    <li>• Example: Inflation = 3.4%</li>
                    <li>• Shows how fast prices are rising</li>
                    <li>• Month-to-month or year-to-year change</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#F5F7FF] p-6 rounded-xl">
                <p className="text-sm font-semibold text-[#1C3FA8] mb-2">Simple Analogy:</p>
                <p className="text-sm text-[#1A237E]/80">
                  CPI is like your height (115 cm), while inflation rate is how fast you're growing (2 cm per year). Both are useful, but they measure different things.
                </p>
              </div>
            </section>

            {/* Why CPI Matters */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Why Does CPI Matter?
              </h2>

              <div className="space-y-4">
                <div className="border-l-4 border-[#1C3FA8] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">1. Government Policy</h3>
                  <p className="text-sm text-[#1A237E]/70">
                    The Bangko Sentral ng Pilipinas (BSP) uses CPI to decide interest rates. High CPI means they might raise rates to cool down inflation.
                  </p>
                </div>

                <div className="border-l-4 border-[#E53935] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">2. Your Purchasing Power</h3>
                  <p className="text-sm text-[#1A237E]/70">
                    Rising CPI means your money buys less. If CPI rises 5% but your salary stays the same, you're effectively earning less.
                  </p>
                </div>

                <div className="border-l-4 border-[#FDD835] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">3. Investment Decisions</h3>
                  <p className="text-sm text-[#1A237E]/70">
                    Investors watch CPI to decide where to put their money. High inflation might push them toward real estate or stocks instead of savings accounts.
                  </p>
                </div>

                <div className="border-l-4 border-[#4CAF50] pl-6">
                  <h3 className="font-bold text-[#1A237E] mb-2">4. Wage Negotiations</h3>
                  <p className="text-sm text-[#1A237E]/70">
                    Workers use CPI data to argue for salary increases. If CPI shows prices rose 4%, workers might demand a 4% raise.
                  </p>
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
                    CPI measures the average change in prices consumers pay for goods and services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    It's calculated using a basket of goods weighted by household spending patterns
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    CPI is a number; inflation rate is the percentage change in CPI
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FDD835] flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">
                    CPI influences government policy, investment decisions, and wage negotiations
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
                  href="/learn/what-is-inflation"
                  className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1C3FA8] p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A237E]">What is Inflation?</h3>
                      <p className="text-sm text-[#1A237E]/60">Review the fundamentals of inflation</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#1C3FA8] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/learn/purchasing-power"
                  className="flex items-center justify-between p-4 bg-[#F5F7FF] rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1C3FA8] p-3 rounded-xl">
                      <LineChart className="w-6 h-6 text-white" />
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
                      <p className="text-sm text-[#1A237E]/60">Take a quiz on CPI and inflation</p>
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
              <h3 className="font-bold text-[#1C3FA8] mb-4">Philippines CPI Data</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#F5F7FF] rounded-xl">
                  <div className="text-4xl font-black text-[#1C3FA8] mb-1">3.4%</div>
                  <div className="text-xs text-[#1A237E]/60 uppercase tracking-wider">Inflation Rate (Mar 2026)</div>
                </div>
                <div className="text-center p-4 bg-[#FFFDE7] rounded-xl">
                  <div className="text-3xl font-black text-[#4A3B00] mb-1">127.5</div>
                  <div className="text-xs text-[#1A237E]/60 uppercase tracking-wider">CPI (Base: 2018=100)</div>
                </div>
                <div className="text-xs text-[#1A237E]/70 leading-relaxed">
                  <p className="mb-2">
                    <span className="font-semibold">Source:</span> Philippine Statistics Authority (PSA)
                  </p>
                  <p>
                    Updated monthly on the first week of each month.
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
                The Philippines uses a base year of 2018 (CPI = 100) for its current CPI calculations. This means all current CPI values are compared to 2018 prices.
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
                  <div className="text-xs text-[#1A237E]/60">Calculate inflation impact on your savings</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
