import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, TrendingUp, Users } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"

export default function SubmitTipPage() {
  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="tips" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0 pt-24">
        {/* Back Button */}
        <Link 
          href="/tips"
          className="inline-flex items-center gap-2 text-[#1C3FA8] font-semibold mb-6 hover:text-[#E53935] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Tips
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#1C3FA8] mb-4">
            Share Your Money-Saving Tip
          </h1>
          <p className="text-lg text-[#1A237E]/70">
            Help fellow Filipinos save money by sharing your practical tips and life hacks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#C5D3FF]">
              <form className="space-y-8">
                {/* Tip Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-bold text-[#1A237E] mb-3">
                    Tip Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g., Save 30% on groceries with this simple trick"
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#C5D3FF] focus:border-[#1C3FA8] focus:outline-none text-[#1A237E] placeholder:text-[#1A237E]/40 transition-colors"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-bold text-[#1A237E] mb-3">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#C5D3FF] focus:border-[#1C3FA8] focus:outline-none text-[#1A237E] transition-colors appearance-none bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="palengke">Palengke</option>
                    <option value="energy">Energy</option>
                    <option value="commuter">Commuter</option>
                    <option value="financial">Financial</option>
                    <option value="household">Household</option>
                    <option value="food">Food & Dining</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Estimated Savings */}
                <div>
                  <label htmlFor="savings" className="block text-sm font-bold text-[#1A237E] mb-3">
                    Estimated Monthly Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1A237E] font-bold text-lg">
                      ₱
                    </span>
                    <input
                      type="number"
                      id="savings"
                      name="savings"
                      placeholder="500"
                      min="0"
                      step="50"
                      className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-[#C5D3FF] focus:border-[#1C3FA8] focus:outline-none text-[#1A237E] placeholder:text-[#1A237E]/40 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-[#1A237E]/60 mt-2">
                    Approximate amount users can save per month
                  </p>
                </div>

                {/* Tip Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-bold text-[#1A237E] mb-3">
                    Your Tip *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={8}
                    placeholder="Share your money-saving tip in detail. Include step-by-step instructions, specific examples, and any important details that will help others replicate your success."
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#C5D3FF] focus:border-[#1C3FA8] focus:outline-none text-[#1A237E] placeholder:text-[#1A237E]/40 transition-colors resize-none"
                    required
                  />
                  <p className="text-xs text-[#1A237E]/60 mt-2">
                    Minimum 100 characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#E53935] text-white px-8 py-5 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Submit Your Tip
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Guidelines & Rewards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Guidelines Card */}
            <div className="bg-[#1C3FA8] rounded-3xl p-8 shadow-sm text-white">
              <h3 className="text-2xl font-bold mb-6">Submission Guidelines</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FDD835] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#4A3B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Be Practical</h4>
                    <p className="text-sm text-white/80">
                      Share tips that are easy to implement and don't require expensive equipment or resources.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FDD835] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#4A3B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Clear Steps</h4>
                    <p className="text-sm text-white/80">
                      Provide clear, step-by-step instructions that anyone can follow easily.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FDD835] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#4A3B00]" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Quantify Savings</h4>
                    <p className="text-sm text-white/80">
                      Include specific amounts or percentages to show the real impact of your tip.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward System Card */}
            <div className="bg-[#FFFDE7] border-2 border-[#FDD835] rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#4A3B00] mb-4">Earn Rewards</h3>
              <p className="text-[#4A3B00]/80 mb-6">
                Quality tips earn you points and recognition in our community!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/60 p-4 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-[#E53935]" />
                  <div>
                    <p className="font-bold text-[#4A3B00] text-sm">+50 Points</p>
                    <p className="text-xs text-[#4A3B00]/70">Per approved tip</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 p-4 rounded-xl">
                  <Users className="w-6 h-6 text-[#E53935]" />
                  <div>
                    <p className="font-bold text-[#4A3B00] text-sm">+10 Points</p>
                    <p className="text-xs text-[#4A3B00]/70">Per 100 helpful votes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational Image */}
            <div className="rounded-3xl overflow-hidden shadow-sm relative h-64">
              <Image 
                className="object-cover" 
                alt="Filipino community helping each other"
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&auto=format&fit=crop"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3FA8]/90 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-lg italic">
                  "Together, we build a financially wiser Philippines."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
