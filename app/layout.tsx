import type { Metadata } from "next"
import { Toaster } from "sonner"
import { NextAuthSessionProvider } from "@/providers/session-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "CostWise - Inflation Awareness for Filipinos",
  description: "Understand inflation, purchasing power, and practical budgeting",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="font-sans antialiased">
        <NextAuthSessionProvider>
          {children}
          <Toaster richColors position="top-right" />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
