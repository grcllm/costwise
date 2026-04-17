import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Coins, TrendingDown, CheckCircle2, Lightbulb, AlertCircle } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"

export default function StrategicRouteMappingPage() {
  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="tips" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0 pt-24">
        {/* Back Button */}
        <Link 
          href="/tips"
          className="inline-flex items-center gap-2 text-[#1C3FA8] font-semibold mb-6 hover:text-[#E53935] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tips
        </Link>

        {/* Hero Section */}
        <div className="bg-[#1C3FA8] rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MapPin className="w-40 h-40" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <span className="bg-[#E53935] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-4">
              Commuter Hack
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Strategic Route Mapping Guide
            </h1>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Master the art of efficient commuting in Metro Manila. Learn how to combine Beep card rewards with strategic UV Express routes to save ₱40 or more on your daily round trip.
            </p>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span>Save ₱800-1,200/month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-[#E53935] mb-2">₱40</div>
            <p className="text-sm text-[#1A237E]/70">Average Daily Savings</p>
          </div>
          <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-[#E53935] mb-2">30%</div>
            <p className="text-sm text-[#1A237E]/70">Reduction in Commute Cost</p>
          </div>
          <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-[#E53935] mb-2">20 min</div>
            <p className="text-sm text-[#1A237E]/70">Time Saved Per Trip</p>
          </div>
        </div>

        {/* Main Content */}
        <article className="space-y-8">
          {/* Introduction */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <h2 className="text-2xl font-black text-[#1C3FA8] mb-4">Why Route Mapping Matters</h2>
            <p className="text-[#1A237E] leading-relaxed mb-4">
              The average Filipino commuter spends ₱150-250 per day on transportation. By strategically planning your routes and leveraging available rewards programs, you can reduce this cost by 30-40% while also saving valuable time.
            </p>
            <p className="text-[#1A237E] leading-relaxed">
              This guide will teach you how to analyze your daily commute, identify cost-saving opportunities, and implement a sustainable strategy that works for your specific route.
            </p>
          </section>

          {/* Step 1 */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1C3FA8] text-white flex items-center justify-center font-black text-xl">
                1
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Map Your Current Route</h2>
                <p className="text-[#1A237E]/70">Document your existing commute patterns</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#1A237E] leading-relaxed">
                Start by tracking your current commute for one week. Note down:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1A237E]"><strong>Transportation modes:</strong> Jeepney, bus, UV Express, MRT/LRT, tricycle</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1A237E]"><strong>Exact costs:</strong> Record every fare you pay, including transfers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1A237E]"><strong>Travel times:</strong> Note departure, arrival, and waiting times</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1A237E]"><strong>Pain points:</strong> Long waits, crowded vehicles, expensive segments</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Step 2 */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1C3FA8] text-white flex items-center justify-center font-black text-xl">
                2
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Maximize Beep Card Benefits</h2>
                <p className="text-[#1A237E]/70">Unlock rewards and discounts</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#1A237E] leading-relaxed">
                The Beep card offers significant advantages beyond convenience:
              </p>
              
              <div className="bg-[#FFFDE7] border-2 border-[#FDD835] rounded-2xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-[#4A3B00] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4A3B00] mb-1">20% Discount on MRT/LRT</p>
                    <p className="text-sm text-[#4A3B00]/80">Automatic discount on all train rides compared to single journey tickets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-[#4A3B00] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4A3B00] mb-1">Points Accumulation</p>
                    <p className="text-sm text-[#4A3B00]/80">Earn 1 point per ₱25 spent, redeemable for free rides</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-[#4A3B00] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#4A3B00] mb-1">Partner Merchant Discounts</p>
                    <p className="text-sm text-[#4A3B00]/80">Additional savings at 7-Eleven, Ministop, and other establishments</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1C3FA8] text-white flex items-center justify-center font-black text-xl">
                3
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Identify UV Express Opportunities</h2>
                <p className="text-[#1A237E]/70">Find the sweet spot for premium transport</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#1A237E] leading-relaxed">
                UV Express vans are often overlooked but can be the most cost-effective option for specific route segments:
              </p>
              
              <div className="space-y-4">
                <div className="bg-[#F5F7FF] border border-[#C5D3FF] rounded-xl p-5">
                  <h4 className="font-bold text-[#1C3FA8] mb-2">When UV Express Makes Sense</h4>
                  <ul className="space-y-2 text-sm text-[#1A237E]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E53935] font-bold">•</span>
                      <span>Long-distance routes (15km+) where multiple transfers would be needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E53935] font-bold">•</span>
                      <span>Peak hours when regular transport is overcrowded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E53935] font-bold">•</span>
                      <span>Routes with limited public transport options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E53935] font-bold">•</span>
                      <span>When time savings justify the slightly higher cost</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#F5F7FF] border border-[#C5D3FF] rounded-xl p-5">
                  <h4 className="font-bold text-[#1C3FA8] mb-2">Popular Cost-Effective UV Routes</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A237E]">Fairview - Makati CBD</span>
                      <span className="font-bold text-[#E53935]">₱65</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A237E]">Alabang - BGC</span>
                      <span className="font-bold text-[#E53935]">₱50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1A237E]">Cubao - Ortigas</span>
                      <span className="font-bold text-[#E53935]">₱35</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1C3FA8] text-white flex items-center justify-center font-black text-xl">
                4
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Optimize Your Route Combination</h2>
                <p className="text-[#1A237E]/70">Mix and match for maximum savings</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#1A237E] leading-relaxed mb-4">
                The key to saving ₱40+ per day is finding the right combination of transport modes. Here's a real example:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFEBEE] border-2 border-[#E53935] rounded-2xl p-6">
                  <h4 className="font-bold text-[#E53935] mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Before: Traditional Route
                  </h4>
                  <div className="space-y-2 text-sm text-[#1A237E]">
                    <div className="flex justify-between">
                      <span>Jeepney to terminal</span>
                      <span className="font-bold">₱13</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bus to city</span>
                      <span className="font-bold">₱45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jeepney to office</span>
                      <span className="font-bold">₱13</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tricycle (last mile)</span>
                      <span className="font-bold">₱20</span>
                    </div>
                    <div className="border-t-2 border-[#E53935] pt-2 flex justify-between font-black">
                      <span>Total One-Way:</span>
                      <span className="text-[#E53935]">₱91</span>
                    </div>
                    <div className="flex justify-between font-black text-base">
                      <span>Daily Round Trip:</span>
                      <span className="text-[#E53935]">₱182</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-2xl p-6">
                  <h4 className="font-bold text-[#4CAF50] mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    After: Optimized Route
                  </h4>
                  <div className="space-y-2 text-sm text-[#1A237E]">
                    <div className="flex justify-between">
                      <span>Walk to main road</span>
                      <span className="font-bold">₱0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UV Express (direct)</span>
                      <span className="font-bold">₱65</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Walk to office</span>
                      <span className="font-bold">₱0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">-</span>
                      <span className="font-bold opacity-50">-</span>
                    </div>
                    <div className="border-t-2 border-[#4CAF50] pt-2 flex justify-between font-black">
                      <span>Total One-Way:</span>
                      <span className="text-[#4CAF50]">₱65</span>
                    </div>
                    <div className="flex justify-between font-black text-base">
                      <span>Daily Round Trip:</span>
                      <span className="text-[#4CAF50]">₱130</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFDE7] border-2 border-[#FDD835] rounded-2xl p-6 text-center">
                <p className="text-2xl font-black text-[#4A3B00] mb-2">Daily Savings: ₱52</p>
                <p className="text-sm text-[#4A3B00]/80">Monthly Savings: ₱1,144 (22 working days)</p>
                <p className="text-sm text-[#4A3B00]/80">Annual Savings: ₱13,728</p>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="bg-[#1C3FA8] rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-[#FDD835]" />
              <h2 className="text-2xl font-black">Pro Tips from Experienced Commuters</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="font-bold mb-2">Time Your Commute</h4>
                <p className="text-white/90 text-sm">Leave 30 minutes earlier or later to avoid peak hour surges and crowding. The time flexibility can save you ₱20-30 per day.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="font-bold mb-2">Join Carpool Groups</h4>
                <p className="text-white/90 text-sm">Facebook groups and company bulletin boards often have carpool arrangements. Splitting UV Express costs among 3-4 people reduces individual expenses significantly.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="font-bold mb-2">Use Route Planning Apps</h4>
                <p className="text-white/90 text-sm">Sakay.ph and Google Maps transit mode can help you discover alternative routes you never considered.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="font-bold mb-2">Track Your Actual Savings</h4>
                <p className="text-white/90 text-sm">Use a simple notebook or app to log your daily transport costs. Seeing the savings accumulate is motivating and helps you stick to your optimized route.</p>
              </div>
            </div>
          </section>

          {/* Action Steps */}
          <section className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8">
            <h2 className="text-2xl font-black text-[#1C3FA8] mb-6">Your Action Plan This Week</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E53935] text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-bold text-[#1A237E] mb-1">Monday-Tuesday: Document Current Route</p>
                  <p className="text-sm text-[#1A237E]/70">Track all costs, times, and pain points</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E53935] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-bold text-[#1A237E] mb-1">Wednesday: Research Alternatives</p>
                  <p className="text-sm text-[#1A237E]/70">Use Sakay.ph to find UV Express and combined routes</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E53935] text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-bold text-[#1A237E] mb-1">Thursday-Friday: Test New Route</p>
                  <p className="text-sm text-[#1A237E]/70">Try your optimized route and compare results</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E53935] text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <p className="font-bold text-[#1A237E] mb-1">Weekend: Calculate Savings</p>
                  <p className="text-sm text-[#1A237E]/70">Review your week and commit to the best option</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-[#FFFDE7] border-2 border-[#FDD835] rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-black text-[#4A3B00] mb-4">Start Saving Today</h3>
          <p className="text-[#4A3B00]/80 mb-6 max-w-2xl mx-auto">
            Thousands of Filipino commuters have already optimized their routes and are saving ₱800-1,200 every month. Your turn to join them!
          </p>
          <Link 
            href="/tips"
            className="inline-flex items-center gap-2 bg-[#1C3FA8] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Explore More Money-Saving Tips
          </Link>
        </div>
      </main>
    </div>
  )
}
