import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CursorEffect from "@/components/cursor-effect";
import AnimatedBackground from "@/components/animated-background";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synexis - IEEE WIE Event",
  description: "IEEE Women in Engineering presents Synexis, a premier event for women in engineering and technology.",
  generator: 'avinashyadav.me'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Loader />
        <AnimatedBackground 
          variant="particles"
          colorScheme="purple"
          speed="slow"
          density="high"
          opacity={1.15}
        />
        {children}
        <CursorEffect />
      </body>
    </html>
  )
}