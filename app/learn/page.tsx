"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, HelpCircle, TrendingUp, ChevronRight, Building2, Package, Shield, X, Sparkles } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { SectionHeader } from "@/components/ui"
import { useState } from "react"

// This is now a Server Component - no 'use client' needed
export default function LearnPage() {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="learn" />

      <main className="max-w-7xl mx-auto px-6 py-8 pb-32 pt-24">
        <SectionHeader
          title="Educational Hub"
          subtitle="Master the mechanics of inflation and protect your purchasing power with our deep-dive modules."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Hero Module: What is Inflation? */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-[#C5D3FF] overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FFFDE7] text-[#4A3B00] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                    Foundation Module
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#1C3FA8] mb-4">
                    What is Inflation?
                  </h2>
                  <p className="text-[#1A237E] opacity-75 mb-6">
                    Inflation is the rate at which the general level of prices for goods and services is rising. When inflation strikes, each unit of currency buys fewer goods.
                  </p>
                </div>
                <Link 
                  href="/learn/what-is-inflation"
                  className="w-fit px-6 py-3 bg-[#E53935] text-white font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-1/2 min-h-[300px] bg-slate-100 relative">
                <Image 
                  alt="Inflation concept" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 right-4 bg-[#FDD835] text-[#4A3B00] px-4 py-2 rounded-full font-black text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  TRENDING
                </div>
              </div>
            </div>
          </div>

          {/* Side Card: Quick Quiz */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#FFFDE7] rounded-2xl border border-[#FDD835] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#FDD835] rounded-xl flex items-center justify-center mb-6">
                <HelpCircle className="text-[#4A3B00] w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A237E] mb-2">
                Check Your Knowledge
              </h3>
              <p className="text-[#1A237E] opacity-70 mb-6">
                Test your understanding of basic economic principles with this 5-minute refresher.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#FDD835]/30">
                <span className="text-sm font-semibold">Active Quizzes</span>
                <span className="text-sm font-bold text-[#1C3FA8]">12 Available</span>
              </div>
              <Link 
                href="/quizzes"
                className="block w-full py-3 border-2 border-[#1C3FA8] text-[#1C3FA8] font-bold rounded-xl hover:bg-[#1C3FA8] hover:text-white transition-all text-center"
              >
                Take Quiz
              </Link>
            </div>
          </div>

          {/* Module Card: Purchasing Power */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-[#C5D3FF] overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <Image 
                alt="Purchasing Power" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&auto=format&fit=crop"
                width={800}
                height={192}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">Purchasing Power</h3>
                <p className="text-sm text-[#1A237E] opacity-70 mb-4">
                  Learn how the value of your money changes over time and how to hedge against currency devaluation.
                </p>
              </div>
              <Link href="/learn/purchasing-power" className="text-[#E53935] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Module <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Module Card: CPI Explained */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-[#C5D3FF] overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <Image 
                alt="CPI Data" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
                width={800}
                height={192}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1C3FA8] mb-2">CPI Explained</h3>
                <p className="text-sm text-[#1A237E] opacity-70 mb-4">
                  Understand the Consumer Price Index (CPI) and how government agencies track the cost of living.
                </p>
              </div>
              <Link href="/learn/cpi-explained" className="text-[#E53935] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Module <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Aid: Inflation Calculator Promo */}
          <div className="col-span-12 lg:col-span-4 bg-[#1C3FA8] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Simulator Pro</h3>
              <p className="opacity-80 mb-8">
                Calculate how inflation affects your specific savings goals over 5, 10, or 20 years.
              </p>
              <Link 
                href="/simulator"
                className="inline-block bg-[#FDD835] text-[#4A3B00] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                Try Simulator
              </Link>
            </div>
            <div className="absolute -bottom-8 -right-8 text-white/10 rotate-12">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Secondary Section: Advanced Topics */}
        <section className="mt-16">
          <h2 className="text-2xl font-black text-[#1C3FA8] mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#E53935] rounded-full"></span>
            Advanced Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <button onClick={() => setShowComingSoonModal(true)} className="bg-white rounded-2xl border border-[#C5D3FF] p-6 hover:shadow-lg transition-shadow group cursor-pointer text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#1C3FA8] to-[#0D1F54] p-4 rounded-xl text-white group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A237E] text-lg mb-1">Central Bank Policy</h4>
                  <p className="text-sm text-[#1A237E] opacity-70">Interest rates and monetary supply.</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-[#1C3FA8] to-transparent rounded-full"></div>
            </button>
            
            {/* Card 2 */}
            <button onClick={() => setShowComingSoonModal(true)} className="bg-white rounded-2xl border border-[#C5D3FF] p-6 hover:shadow-lg transition-shadow group cursor-pointer text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#FDD835] to-[#F9A825] p-4 rounded-xl text-[#4A3B00] group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A237E] text-lg mb-1">Supply Chain Impact</h4>
                  <p className="text-sm text-[#1A237E] opacity-70">Global logistics and cost push inflation.</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-[#FDD835] to-transparent rounded-full"></div>
            </button>
            
            {/* Card 3 */}
            <button onClick={() => setShowComingSoonModal(true)} className="bg-white rounded-2xl border border-[#C5D3FF] p-6 hover:shadow-lg transition-shadow group cursor-pointer text-left">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#E53935] to-[#C62828] p-4 rounded-xl text-white group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A237E] text-lg mb-1">Protecting Your Pesos</h4>
                  <p className="text-sm text-[#1A237E] opacity-70">Strategies to maintain value against inflation.</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-[#E53935] to-transparent rounded-full"></div>
            </button>
          </div>
        </section>
      </main>

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
                This advanced learning module is currently being developed. Check back soon for more in-depth content on this topic!
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
