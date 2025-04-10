import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CursorEffect from "@/components/cursor-effect";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synexis - IEEE WIE Event",
  description: "IEEE Women in Engineering presents Synexis, a premier event for women in engineering and technology.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <CursorEffect />
      </body>
    </html>
  )
}

import './globals.css'