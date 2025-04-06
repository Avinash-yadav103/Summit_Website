"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Hero() {
  // Set the event date (example: June 15, 2025)
  const eventDate = new Date("2025-06-15T09:00:00").getTime()

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
    <section className="relative h-screen flex items-center justify-center text-white pt-16">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <p className="text-pink-500 mb-2">IEEE Women in Engineering Presents</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">SYNEXIS</h1>
        <p className="text-2xl md:text-3xl mb-8">JUNE 15, 2025 • VIRTUAL & IN-PERSON</p>

        <Link
          href="#register"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
        >
          REGISTER NOW
        </Link>

        {/* Countdown timer */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="bg-purple-900 bg-opacity-80 w-24 h-24 md:w-32 md:h-32 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold">{timeLeft.days}</span>
            <span className="text-sm uppercase">Days</span>
          </div>
          <div className="bg-purple-900 bg-opacity-80 w-24 h-24 md:w-32 md:h-32 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold">{timeLeft.hours}</span>
            <span className="text-sm uppercase">Hours</span>
          </div>
          <div className="bg-purple-900 bg-opacity-80 w-24 h-24 md:w-32 md:h-32 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold">{timeLeft.minutes}</span>
            <span className="text-sm uppercase">Minutes</span>
          </div>
          <div className="bg-purple-900 bg-opacity-80 w-24 h-24 md:w-32 md:h-32 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold">{timeLeft.seconds}</span>
            <span className="text-sm uppercase">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}

