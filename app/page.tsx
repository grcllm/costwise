import Link from "next/link"
import Image from "next/image"
import { Lightbulb, ArrowRight, HelpCircle, BarChart3 } from "lucide-react"
import { NavigationWrapper } from "@/components/nav/navigation-wrapper"

export default function LandingPage() {
  return (
    <div className="bg-[#F5F7FF] text-[#1A237E] min-h-screen">
      {/* Top Navigation Bar */}
      <NavigationWrapper activeLink="home" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pb-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#1C3FA8] mb-12 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDD835] rounded-full opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E53935] rounded-full opacity-10 -ml-20 -mb-20"></div>
          
          <div className="relative z-10 flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-[#FDD835] text-[#4A3B00] text-sm font-bold rounded-full mb-6 uppercase tracking-wider">
              Mabuhay!
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Empowering Filipinos through Financial Literacy
            </h1>
            <p className="text-lg text-[#C5D3FF] mb-10 max-w-xl">
              Master your money with our specialized tools. Learn budgeting, inflation awareness, and practical financial strategies.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/learn" className="px-8 py-4 bg-[#E53935] text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all active:scale-95">
                Start Learning
              </Link>
              <Link href="/simulator" className="px-8 py-4 bg-white text-[#1C3FA8] font-bold rounded-lg shadow-md hover:bg-[#F5F7FF] transition-all active:scale-95">
                Try Simulator
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 flex-1 hidden lg:block">
            <Image 
              className="w-full h-auto drop-shadow-2xl rounded-2xl" 
              alt="Modern high-tech 3D render of Philippine currency coins and a glass piggy bank"
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop"
              width={800}
              height={600}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Tip of the Day & Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Tip Card (Priority) */}
          <div className="md:col-span-4 bg-[#FFFDE7] border border-[#FDD835] p-8 rounded-[24px] flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Lightbulb className="text-[#FDD835] w-10 h-10 fill-current" />
            </div>
            <h3 className="text-sm font-black text-[#4A3B00] uppercase tracking-widest mb-4">
              Tip of the Day
            </h3>
            <p className="text-xl font-bold text-[#1A237E] leading-relaxed mb-6">
              "The 50/30/20 rule: Allocate 50% of your income for needs, 30% for wants, and 20% for your 'ipon' or investments."
            </p>
            <Link href="/tips" className="mt-auto flex items-center gap-2 text-[#E53935] font-bold hover:underline">
              Read more tips <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quiz CTA Card */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[24px] border border-[#C5D3FF] flex flex-col justify-between hover:shadow-xl transition-shadow group">
              <div>
                <div className="w-12 h-12 bg-[#F5F7FF] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1C3FA8] transition-colors">
                  <HelpCircle className="text-[#1C3FA8] group-hover:text-white w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#1C3FA8] mb-2">Test Your Knowledge</h4>
                <p className="text-[#444653] text-sm">
                  Challenge yourself with quizzes about Pag-IBIG, SSS, and local investments.
                </p>
              </div>
              <Link href="/quizzes" className="mt-6 text-[#E53935] font-bold flex items-center gap-2">
                Take a Quiz <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-[24px] border border-[#C5D3FF] flex flex-col justify-between hover:shadow-xl transition-shadow group">
              <div>
                <div className="w-12 h-12 bg-[#F5F7FF] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E53935] transition-colors">
                  <BarChart3 className="text-[#1C3FA8] group-hover:text-white w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#1C3FA8] mb-2">Market Simulator</h4>
                <p className="text-[#444653] text-sm">
                  Practice trading PSE stocks with virtual money before investing for real.
                </p>
              </div>
              <Link href="/simulator" className="mt-6 text-[#E53935] font-bold flex items-center gap-2">
                Open Simulator <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Learning */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#1C3FA8] mb-2">Essential Lessons</h2>
              <p className="text-[#444653]">Start your journey to financial freedom here.</p>
            </div>
            <Link href="/learn" className="hidden md:block text-[#E53935] font-bold hover:underline">
              View all modules
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lesson Card 1 */}
            <div className="bg-white rounded-[24px] border border-[#C5D3FF] overflow-hidden group">
              <div className="h-40 bg-[#C5D3FF] relative overflow-hidden">
                <Image 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Philippine peso bills neatly stacked"
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format&fit=crop"
                  width={400}
                  height={160}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
                  Beginner
                </span>
                <h5 className="text-lg font-bold text-[#1C3FA8] mt-1 mb-3">Emergency Funds 101</h5>
                <p className="text-sm text-[#444653] line-clamp-2">
                  How much should you really set aside for rainy days in the Philippines?
                </p>
              </div>
            </div>

            {/* Lesson Card 2 */}
            <div className="bg-white rounded-[24px] border border-[#C5D3FF] overflow-hidden group">
              <div className="h-40 bg-[#C5D3FF] relative overflow-hidden">
                <Image 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Stock market growth visualization"
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop"
                  width={400}
                  height={160}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
                  Intermediate
                </span>
                <h5 className="text-lg font-bold text-[#1C3FA8] mt-1 mb-3">The Power of PSE</h5>
                <p className="text-sm text-[#444653] line-clamp-2">
                  Understanding the Philippine Stock Exchange for long-term growth.
                </p>
              </div>
            </div>

            {/* Lesson Card 3 */}
            <div className="bg-white rounded-[24px] border border-[#C5D3FF] overflow-hidden group">
              <div className="h-40 bg-[#C5D3FF] relative overflow-hidden">
                <Image 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Modern family home"
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop"
                  width={400}
                  height={160}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
                  Advanced
                </span>
                <h5 className="text-lg font-bold text-[#1C3FA8] mt-1 mb-3">Pag-IBIG MP2 Guide</h5>
                <p className="text-sm text-[#444653] line-clamp-2">
                  A step-by-step guide to one of the most popular government savings schemes.
                </p>
              </div>
            </div>

            {/* Lesson Card 4 */}
            <div className="bg-white rounded-[24px] border border-[#C5D3FF] overflow-hidden group">
              <div className="h-40 bg-[#C5D3FF] relative overflow-hidden">
                <Image 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Protection and insurance concept"
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&auto=format&fit=crop"
                  width={400}
                  height={160}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-black text-[#E53935] uppercase tracking-widest">
                  Essential
                </span>
                <h5 className="text-lg font-bold text-[#1C3FA8] mt-1 mb-3">Insurance Basics</h5>
                <p className="text-sm text-[#444653] line-clamp-2">
                  Why every Filipino family needs a safety net beyond their monthly salary.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 w-full py-3 px-6 mt-16">
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <p className="text-gray-600 text-xs">
            © 2026 <span className="font-semibold text-[#1C3FA8]">CostWise</span> Philippines
          </p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#E53935] text-white rounded-full shadow-2xl flex items-center justify-center md:bottom-8 z-40 hover:scale-110 transition-transform">
        <span className="text-3xl font-bold">+</span>
      </button>
    </div>
  )
}
