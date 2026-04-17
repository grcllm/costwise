"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Coins, Calculator, Info, TrendingDown } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"
import { SectionHeader, InfoBox, ContentCard } from "@/components/ui"
import { useDebounce } from "@/hooks"
import inflationData from "@/lib/api/mock-data/inflation-data.json"

export default function SimulatorPage() {
  const [amount, setAmount] = useState(10000)
  const [fromYear, setFromYear] = useState("2018")
  const [toYear, setToYear] = useState("2026")
  
  // Debounce the amount input to prevent excessive calculations
  const debouncedAmount = useDebounce(amount, 300)

  // Calculate inflation impact
  const calculatedResults = useMemo(() => {
    const from = parseInt(fromYear)
    const to = parseInt(toYear)
    
    // Get inflation rates for the period
    const relevantRates = inflationData.rates.filter(
      r => r.year > from && r.year <= to
    )
    
    // Calculate cumulative inflation
    let cumulativeInflation = 1
    relevantRates.forEach(rate => {
      cumulativeInflation *= (1 + rate.annual_rate / 100)
    })
    
    // Calculate purchasing power (inverse of inflation)
    const purchasingPower = debouncedAmount / cumulativeInflation
    const percentChange = ((purchasingPower - debouncedAmount) / debouncedAmount) * 100
    const amountNeeded = debouncedAmount * cumulativeInflation
    
    // Calculate proxy items
    // Rice: ₱2,000 per 50kg sack in 2018, ₱2,450 in 2026
    const ricePrice2018 = 2000
    const ricePrice2026 = 2450
    const riceThen = debouncedAmount / ricePrice2018
    const riceNow = purchasingPower / ricePrice2026
    
    // Jeepney: ₱9 in 2018, ₱13 in 2026
    const jeepneyPrice2018 = 9
    const jeepneyPrice2026 = 13
    const jeepneyThen = debouncedAmount / jeepneyPrice2018
    const jeepneyNow = purchasingPower / jeepneyPrice2026
    
    // Fast food meal: ₱120 in 2018, ₱175 in 2026
    const mealPrice2018 = 120
    const mealPrice2026 = 175
    const mealThen = debouncedAmount / mealPrice2018
    const mealNow = purchasingPower / mealPrice2026
    
    // Coffee: ₱150 in 2018, ₱220 in 2026
    const coffeePrice2018 = 150
    const coffeePrice2026 = 220
    const coffeeThen = debouncedAmount / coffeePrice2018
    const coffeeNow = purchasingPower / coffeePrice2026
    
    // Movie tickets: ₱200 in 2018, ₱350 in 2026
    const moviePrice2018 = 200
    const moviePrice2026 = 350
    const movieThen = debouncedAmount / moviePrice2018
    const movieNow = purchasingPower / moviePrice2026
    
    // Electricity (kWh): ₱9.80 in 2018, ₱14.00 in 2026
    const electricityPrice2018 = 9.80
    const electricityPrice2026 = 14.00
    const electricityThen = debouncedAmount / electricityPrice2018
    const electricityNow = purchasingPower / electricityPrice2026
    
    return {
      purchasingPower: Math.round(purchasingPower),
      percentChange: percentChange.toFixed(1),
      amountNeeded: Math.round(amountNeeded),
      rice: { then: riceThen.toFixed(1), now: riceNow.toFixed(1) },
      jeepney: { then: Math.round(jeepneyThen), now: Math.round(jeepneyNow) },
      meal: { then: Math.round(mealThen), now: Math.round(mealNow) },
      coffee: { then: Math.round(coffeeThen), now: Math.round(coffeeNow) },
      movie: { then: Math.round(movieThen), now: Math.round(movieNow) },
      electricity: { then: Math.round(electricityThen), now: Math.round(electricityNow) }
    }
  }, [debouncedAmount, fromYear, toYear])

  const handleCalculate = () => {
    // Trigger recalculation by forcing a re-render
    // The useMemo will automatically recalculate
  }

  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="simulator" />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-32 md:pb-8 pt-24">
        <SectionHeader
          title="Inflation Simulator"
          subtitle="Understand how the purchasing power of your Philippine Peso changes over time through actual historical data and household proxies."
        />

        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Control Panel */}
          <ContentCard className="lg:col-span-5" padding="lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#FDD835] rounded-2xl flex items-center justify-center">
                <Coins className="text-[#4A3B00] w-6 h-6" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-[#1C3FA8]">Configure Simulation</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A237E] mb-2 uppercase tracking-wider">
                  Amount (PHP)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#1C3FA8]">
                    ₱
                  </span>
                  <input 
                    className="w-full bg-[#F5F7FF] border border-[#C5D3FF] rounded-xl py-4 pl-10 pr-4 text-lg font-bold focus:ring-2 focus:ring-[#1C3FA8] focus:border-[#1C3FA8] transition-all outline-none" 
                    placeholder="10,000" 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A237E] mb-2 uppercase tracking-wider">
                    From Year
                  </label>
                  <select 
                    className="w-full bg-[#F5F7FF] border border-[#C5D3FF] rounded-xl py-3 px-4 font-semibold text-[#1A237E] outline-none focus:ring-2 focus:ring-[#1C3FA8]"
                    value={fromYear}
                    onChange={(e) => setFromYear(e.target.value)}
                  >
                    <option value="2010">2010</option>
                    <option value="2015">2015</option>
                    <option value="2018">2018 (TRAIN Law)</option>
                    <option value="2020">2020 (Pandemic Start)</option>
                    <option value="2021">2021 (Lockdowns)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A237E] mb-2 uppercase tracking-wider">
                    To Year
                  </label>
                  <select 
                    className="w-full bg-[#F5F7FF] border border-[#C5D3FF] rounded-xl py-3 px-4 font-semibold text-[#1A237E] outline-none focus:ring-2 focus:ring-[#1C3FA8]"
                    value={toYear}
                    onChange={(e) => setToYear(e.target.value)}
                  >
                    <option value="2021">2021 (Lockdowns)</option>
                    <option value="2022">2022 (Post-Pandemic)</option>
                    <option value="2023">2023 (Recovery)</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleCalculate}
                  className="w-full bg-[#E53935] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Calculate Impact</span>
                  <Calculator className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Educational Context */}
            <InfoBox variant="info" title="Did you know?">
              Inflation in the Philippines averaged around 4-6% in recent years, meaning your savings lose value if not invested.
            </InfoBox>
          </ContentCard>

          {/* Results Panel */}
          <section className="lg:col-span-7 space-y-6">
            {/* Primary Value Card */}
            <div className="bg-[#1C3FA8] text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[#C5D3FF] font-medium mb-1">
                  Purchasing power of ₱{debouncedAmount.toLocaleString()} in {toYear}:
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-6xl font-black">₱{calculatedResults.purchasingPower.toLocaleString()}</h3>
                  <span className="text-xl font-bold text-[#FDD835]">{calculatedResults.percentChange}%</span>
                </div>
                <p className="mt-6 text-sm text-[#C5D3FF]/80 leading-relaxed max-w-md">
                  To buy what ₱{debouncedAmount.toLocaleString()} bought in {fromYear}, you would need <span className="font-bold text-white">₱{calculatedResults.amountNeeded.toLocaleString()}</span> today.
                </p>
              </div>
              {/* Decorative Element */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <TrendingDown className="w-64 h-64" strokeWidth={1} />
              </div>
            </div>

            {/* Proxy Cards (The "What does it mean?" section) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rice Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Rice grains"
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Sacks of Rice</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.rice.then} Sacks</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.rice.now} Sacks</span>
                  </div>
                </div>
              </div>

              {/* Jeepney Fare Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Jeepney"
                    src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Jeepney Rides</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.jeepney.then} Trips</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.jeepney.now} Trips</span>
                  </div>
                </div>
              </div>

              {/* Fast Food Meal Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Fast food meal"
                    src="https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Value Meals</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.meal.then} Meals</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.meal.now} Meals</span>
                  </div>
                </div>
              </div>

              {/* Coffee Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Coffee cup"
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Coffee Cups</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.coffee.then} Cups</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.coffee.now} Cups</span>
                  </div>
                </div>
              </div>

              {/* Movie Tickets Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Movie theater"
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Movie Tickets</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.movie.then} Tickets</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.movie.now} Tickets</span>
                  </div>
                </div>
              </div>

              {/* Electricity Proxy */}
              <div className="bg-white border border-[#C5D3FF] rounded-3xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F5F7FF] shrink-0 relative">
                  <Image 
                    className="object-cover" 
                    alt="Electricity meter"
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop"
                    fill
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3FA8]">Electricity (kWh)</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-[#1A237E]/60 line-through">{calculatedResults.electricity.then} kWh</span>
                    <span className="text-lg font-bold text-[#E53935]">{calculatedResults.electricity.now} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Comparative Chart Section */}
        <ContentCard className="mt-12" padding="lg">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#1C3FA8]">Historical Inflation Trend</h2>
            <p className="text-[#1A237E]/60">Annual inflation rates in the Philippines ({fromYear}-{toYear})</p>
          </div>

          {/* Bar Chart with Real Data */}
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative pb-8">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-[#C5D3FF]">
              <div className="w-full border-t border-dashed border-[#C5D3FF]/50"></div>
              <div className="w-full border-t border-dashed border-[#C5D3FF]/50"></div>
              <div className="w-full border-t border-dashed border-[#C5D3FF]/50"></div>
            </div>

            {/* Dynamic Bar Chart */}
            {(() => {
              const from = parseInt(fromYear)
              const to = parseInt(toYear)
              const yearRange = []
              for (let year = from; year <= to; year++) {
                yearRange.push(year)
              }
              
              // Get inflation rates for the range
              const ratesInRange = yearRange.map(year => {
                const rateData = inflationData.rates.find(r => r.year === year)
                return {
                  year,
                  rate: rateData?.annual_rate || 0
                }
              })
              
              // Find max rate for scaling (minimum 8% for better visualization)
              const maxRate = Math.max(...ratesInRange.map(r => r.rate), 8)
              const chartHeight = 224 // 256px - 32px for labels
              
              return ratesInRange.map((data, index) => {
                const barHeight = Math.max((data.rate / maxRate) * chartHeight, 8) // minimum 8px
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-[#1C3FA8] rounded-t-lg transition-all relative group-hover:brightness-110"
                      style={{ height: `${barHeight}px` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A237E] text-white px-2 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {data.rate}%
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1A237E]">
                      {data.year}
                    </span>
                  </div>
                )
              })
            })()}
          </div>
        </ContentCard>
      </main>
    </div>
  )
}
