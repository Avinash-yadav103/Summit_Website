"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Hero() {
  // Set the event date (example: April 16, 2025)
  const eventDate = new Date("2025-04-16T09:00:00").getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white pt-16 pb-12 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.5,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-purple-900/60"></div>
      </div>

      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto shadow-strong">
          <p className="text-pink-400 mb-2 text-sm sm:text-base font-medium tracking-wider">
            IEEE Women in Engineering Presents
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            SYNEXIS
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-white/90">
            April 16, 2025 • VIRTUAL & IN-PERSON
          </p>

          <Link
            href="#register"
            className="inline-block bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 btn-hover-effect"
          >
            REGISTER NOW
          </Link>

          {/* Countdown timer */}
          <div className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="bg-purple-900/80 backdrop-blur-md w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform border border-purple-500/30">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold">{timeLeft.days}</span>
              <span className="text-xs sm:text-sm uppercase text-purple-200">Days</span>
            </div>
            <div className="bg-purple-900/80 backdrop-blur-md w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform border border-purple-500/30">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs sm:text-sm uppercase text-purple-200">Hours</span>
            </div>
            <div className="bg-purple-900/80 backdrop-blur-md w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform border border-purple-500/30">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs sm:text-sm uppercase text-purple-200">Minutes</span>
            </div>
            <div className="bg-purple-900/80 backdrop-blur-md w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform border border-purple-500/30">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs sm:text-sm uppercase text-purple-200">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

