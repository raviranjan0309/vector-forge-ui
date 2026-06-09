import type { Metadata, Viewport } from "next"
import { Playfair_Display, Roboto, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "VectorForge — AI Strategy & Use-Case Intelligence Platform",
  description:
    "From problem to production AI, conversationally. Define a business problem, source or generate data with Exa, and orchestrate AutoGluon and AutoRAG pipelines through a single agentic workspace.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfair.variable} ${mono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
