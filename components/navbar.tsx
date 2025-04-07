"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-2 rounded-full overflow-hidden shadow-lg transition-transform group-hover:scale-110">
                <Image src="/logo.png" alt="Synexis Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-bold text-pink-500 group-hover:text-pink-400 transition-colors">
                Synexis
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              About
            </Link>
            <Link
              href="#speakers"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Speakers
            </Link>
            <Link
              href="#sponsors"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Sponsors
            </Link>
            <Link
              href="#register"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Register
            </Link>
            <Link
              href="#volunteer"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Volunteer
            </Link>
            <Link
              href="#contact"
              className="text-white hover:text-pink-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all"
            >
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn glass-dark rounded-lg p-4 mt-2 shadow-lg">
            <Link href="/" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="#about" className="block py-2 text-white hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="#speakers" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Speakers
            </Link>
            <Link href="#sponsors" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Sponsors
            </Link>
            <Link href="#register" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Register
            </Link>
            <Link href="#volunteer" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Volunteer
            </Link>
            <Link href="#contact" className="block py-2 text-white hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

