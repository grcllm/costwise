"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, TrendingDown, Coins, ShoppingCart, Calendar, Lightbulb, BookOpen, Calculator, ChevronRight, CheckCircle2, ChevronDown, Sparkles } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { useState } from "react"

export default function PurchasingPowerModule() {
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
              Purchasing Power: <span className="text-[#FDD835]">Your Peso Through the Years</span>
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Ever wondered why ₱20 used to buy a feast of snacks and now only gets you a single treat? That's the invisible force of inflation at work.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Updated March 2026</span>
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
            {/* The Pandesal Paradox */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <div className="flex items-start gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#1C3FA8] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-black text-[#1C3FA8] mb-2">
                    The Pandesal Paradox
                  </h2>
                  <p className="text-[#1A237E] leading-relaxed">
                    In the early 2000s, a student with <span className="font-bold text-[#1C3FA8]">₱20</span> could walk into a local bakery and walk out with enough <span className="italic">pandesal</span> to share with the whole barkada.
                  </p>
                </div>
              </div>

              {/* Year Comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#F5F7FF] rounded-xl p-6 border-2 border-[#1C3FA8]">
                  <div className="text-xs font-bold text-[#1C3FA8] mb-2 uppercase tracking-wider">Year 2005</div>
                  <div className="text-5xl font-black text-[#1C3FA8] mb-3">10</div>
                  <div className="text-sm text-[#1A237E] opacity-75">pieces</div>
                  <div className="text-xs text-[#1A237E] opacity-60 mt-2">A full brown bag for ₱20.</div>
                </div>
                <div className="bg-[#FFF5F5] rounded-xl p-6 border-2 border-[#E53935]">
                  <div className="text-xs font-bold text-[#E53935] mb-2 uppercase tracking-wider">Year 2026</div>
                  <div className="text-5xl font-black text-[#E53935] mb-3">3</div>
                  <div className="text-sm text-[#1A237E] opacity-75">pieces</div>
                  <div className="text-xs text-[#1A237E] opacity-60 mt-2">Barely enough for one person.</div>
                </div>
              </div>

              <p className="text-[#1A237E] leading-relaxed">
                This isn't because the pandesal grew bigger (usually, it's the opposite—hello <span className="italic">shrinkflation</span>). It's because each peso can buy fewer goods today than it could yesterday.
              </p>
            </section>

            {/* The Shrinking Peso */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-3xl font-black text-[#1C3FA8] mb-2">
                The Shrinking Peso
              </h2>
              <p className="text-sm text-[#1A237E] opacity-75 mb-6">
                The purchasing power of ₱100 relative to 2010
              </p>

              {/* Bar Chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-bold text-[#1A237E]">2010</div>
                  <div className="flex-1">
                    <div className="bg-[#1C3FA8] h-16 rounded-lg flex items-center justify-end px-4" style={{ width: '100%' }}>
                      <span className="text-white font-black text-lg">₱100.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-bold text-[#1A237E]">2018</div>
                  <div className="flex-1">
                    <div className="bg-[#6B8DD6] h-16 rounded-lg flex items-center justify-end px-4" style={{ width: '72%' }}>
                      <span className="text-white font-black text-lg">₱72.40</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-bold text-[#1A237E]">2026</div>
                  <div className="flex-1">
                    <div className="bg-[#E53935] h-16 rounded-lg flex items-center justify-end px-4" style={{ width: '56%' }}>
                      <span className="text-white font-black text-lg">₱56.10+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2">
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1C3FA8] rounded"></div>
                    <span className="text-[#1A237E] opacity-75">Base Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#E53935] rounded"></div>
                    <span className="text-[#1A237E] opacity-75">Real Value</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#1A237E] opacity-60 mt-4 italic">
                *Current data
              </p>
            </section>

            {/* Collapsible Sections */}
            <section className="space-y-4">
              {/* Nominal vs Real Value */}
              <div className="bg-[#FFFDE7] rounded-2xl border border-[#FDD835] overflow-hidden">
                <button
                  onClick={() => toggleSection('nominal')}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#FFF9C4] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FDD835] rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-[#4A3B00]" />
                    </div>
                    <span className="font-bold text-[#1A237E] text-left">
                      Nominal vs. Real Value: What's the difference?
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#1A237E] transition-transform ${openSection === 'nominal' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === 'nominal' && (
                  <div className="px-6 pb-6">
                    <div className="bg-white rounded-xl p-6">
                      <p className="text-[#1A237E] mb-4 leading-relaxed">
                        <span className="font-bold text-[#1C3FA8]">Nominal value</span> is the face value of money—the number printed on your bills. 
                        <span className="font-bold text-[#E53935]"> Real value</span> is what that money can actually buy after accounting for inflation.
                      </p>
                      <div className="bg-[#F5F7FF] rounded-lg p-4">
                        <p className="text-sm text-[#1A237E]">
                          <span className="font-bold">Example:</span> Your ₱1,000 salary increase might look good nominally, but if inflation is 5% and your raise is only 3%, your real purchasing power actually decreased by 2%.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* How is this measured */}
              <div className="bg-[#E3F2FD] rounded-2xl border border-[#90CAF9] overflow-hidden">
                <button
                  onClick={() => toggleSection('measured')}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#BBDEFB] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1C3FA8] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-[#1A237E] text-left">
                      How is this measured in the Philippines?
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#1A237E] transition-transform ${openSection === 'measured' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === 'measured' && (
                  <div className="px-6 pb-6">
                    <div className="bg-white rounded-xl p-6">
                      <p className="text-[#1A237E] mb-4 leading-relaxed">
                        The Philippine Statistics Authority (PSA) tracks purchasing power through the <span className="font-bold text-[#1C3FA8]">Consumer Price Index (CPI)</span>. 
                        They monitor prices of a "basket" of goods and services that typical Filipino families buy.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-[#1C3FA8] text-sm mb-1">Food & Beverages</div>
                            <div className="text-xs text-[#1A237E] opacity-75">Rice, meat, vegetables, and drinks</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-[#1C3FA8] text-sm mb-1">Transportation</div>
                            <div className="text-xs text-[#1A237E] opacity-75">Jeepney fares, gas prices, vehicle costs</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-[#1C3FA8] text-sm mb-1">Housing & Utilities</div>
                            <div className="text-xs text-[#1A237E] opacity-75">Rent, electricity, water bills</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Factors Affecting Purchasing Power */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-3xl font-black text-[#1C3FA8] mb-6">
                Key Factors That Affect Purchasing Power
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFFDE7] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-[#1C3FA8]">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">Inflation Rate</h3>
                    <p className="text-[#1A237E] opacity-75">
                      The primary driver of purchasing power decline. Higher inflation means faster erosion of your money's value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFFDE7] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-[#1C3FA8]">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">Supply & Demand</h3>
                    <p className="text-[#1A237E] opacity-75">
                      When demand exceeds supply, prices rise. Global events, natural disasters, and supply chain disruptions can impact this balance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFFDE7] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-[#1C3FA8]">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">Currency Strength</h3>
                    <p className="text-[#1A237E] opacity-75">
                      A weaker peso means imported goods become more expensive, reducing your purchasing power for foreign products.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFFDE7] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-[#1C3FA8]">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">Wage Growth</h3>
                    <p className="text-[#1A237E] opacity-75">
                      If wages don't keep pace with inflation, your real purchasing power decreases even if your salary increases nominally.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Protecting Your Purchasing Power */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-3xl font-black text-[#1C3FA8] mb-6">
                How to Protect Your Purchasing Power
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[#F5F7FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1C3FA8] mb-1">Invest in Assets</h4>
                    <p className="text-sm text-[#1A237E] opacity-75">
                      Stocks, real estate, and other assets often appreciate faster than inflation, preserving your wealth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1C3FA8] mb-1">Diversify Income Streams</h4>
                    <p className="text-sm text-[#1A237E] opacity-75">
                      Multiple income sources provide a buffer against purchasing power loss in any single area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1C3FA8] mb-1">Smart Shopping Habits</h4>
                    <p className="text-sm text-[#1A237E] opacity-75">
                      Buy in bulk, compare prices, and take advantage of sales to maximize what your money can buy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1C3FA8] mb-1">Negotiate Salary Increases</h4>
                    <p className="text-sm text-[#1A237E] opacity-75">
                      Regularly review your compensation to ensure it keeps pace with inflation and cost of living increases.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FF] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#1C3FA8] mb-1">Consider Inflation-Protected Securities</h4>
                    <p className="text-sm text-[#1A237E] opacity-75">
                      Treasury Inflation-Protected Securities (TIPS) and similar instruments adjust with inflation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Historical Context */}
            <section className="bg-white rounded-2xl border border-[#C5D3FF] p-8">
              <h2 className="text-3xl font-black text-[#1C3FA8] mb-6">
                Historical Perspective: Philippines
              </h2>
              <p className="text-[#1A237E] mb-6 leading-relaxed">
                The Philippines has experienced varying levels of inflation throughout its history. Understanding these 
                patterns helps us prepare for future economic changes.
              </p>
              
              <div className="bg-[#F5F7FF] rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#E53935] mb-2">50%+</div>
                    <div className="text-sm font-bold text-[#1A237E] mb-1">1984 Crisis</div>
                    <div className="text-xs text-[#1A237E] opacity-60">Hyperinflation period</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#FDD835] mb-2">3-4%</div>
                    <div className="text-sm font-bold text-[#1A237E] mb-1">2010-2019</div>
                    <div className="text-xs text-[#1A237E] opacity-60">Stable growth era</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#1C3FA8] mb-2">8.1%</div>
                    <div className="text-sm font-bold text-[#1A237E] mb-1">2022 Peak</div>
                    <div className="text-xs text-[#1A237E] opacity-60">Post-pandemic surge</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#FFFDE7] rounded-2xl border border-[#FDD835] p-6">
              <h3 className="text-xl font-bold text-[#1C3FA8] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/simulator"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1C3FA8] rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-[#1A237E]">Try Simulator</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#1C3FA8] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/quizzes"
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E53935] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-[#1A237E]">Take Quiz</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#1C3FA8] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-white rounded-2xl border border-[#C5D3FF] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-[#FDD835]" />
                <h3 className="text-xl font-bold text-[#1C3FA8]">Key Takeaways</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#1A237E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#E53935] font-bold">•</span>
                  <span>Purchasing power measures how much you can buy with your money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E53935] font-bold">•</span>
                  <span>Inflation directly reduces purchasing power over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E53935] font-bold">•</span>
                  <span>Investing in assets helps preserve wealth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E53935] font-bold">•</span>
                  <span>Wages must grow faster than inflation to maintain living standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E53935] font-bold">•</span>
                  <span>Smart financial planning is essential for long-term security</span>
                </li>
              </ul>
            </div>

            {/* Related Modules */}
            <div className="bg-white rounded-2xl border border-[#C5D3FF] p-6">
              <h3 className="text-xl font-bold text-[#1C3FA8] mb-4">Related Modules</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-[#F5F7FF] rounded-lg hover:bg-[#C5D3FF] transition-colors">
                  <div className="font-bold text-sm text-[#1C3FA8] mb-1">What is Inflation?</div>
                  <div className="text-xs text-[#1A237E] opacity-60">Foundation Module</div>
                </a>
                <a href="#" className="block p-3 bg-[#F5F7FF] rounded-lg hover:bg-[#C5D3FF] transition-colors">
                  <div className="font-bold text-sm text-[#1C3FA8] mb-1">CPI Explained</div>
                  <div className="text-xs text-[#1A237E] opacity-60">Foundation Module</div>
                </a>
                <a href="#" className="block p-3 bg-[#F5F7FF] rounded-lg hover:bg-[#C5D3FF] transition-colors">
                  <div className="font-bold text-sm text-[#1C3FA8] mb-1">Asset Protection</div>
                  <div className="text-xs text-[#1A237E] opacity-60">Advanced Module</div>
                </a>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-gradient-to-br from-[#1C3FA8] to-[#0D1F54] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Module Completion</span>
                    <span className="font-bold">33%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-[#FDD835] h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div className="text-xs opacity-80">
                  Complete 2 more modules to unlock the Advanced Learning badge!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Stitch Design */}
        <div className="mt-12 bg-[#E8EAF6] rounded-2xl p-8 border border-[#C5D3FF]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Ready to test your knowledge?</h2>
              <p className="text-[#1A237E] opacity-75">
                See if you've mastered the concept of Purchasing Power.
              </p>
            </div>
            <Link 
              href="/quizzes"
              className="flex-shrink-0 bg-[#1C3FA8] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0D1F54] transition-colors flex items-center gap-2 group"
            >
              Test Your Knowledge
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
