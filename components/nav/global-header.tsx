'use client';
import Link from 'next/link';

export function GlobalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/home" className="text-xl font-bold tracking-tight">
          CostWise
        </Link>

        <nav className="hidden gap-6 lg:flex">
          <Link href="/learn" className="hover:underline">Learn</Link>
          <Link href="/simulator" className="hover:underline">Simulator</Link>
          <Link href="/quizzes" className="hover:underline">Quizzes</Link>
          <Link href="/tips" className="hover:underline">Tips</Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="hover:underline">Sign In</Link>
          <Link 
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 text-sm font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
