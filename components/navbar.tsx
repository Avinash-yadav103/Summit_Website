"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Synexis Logo" width={40} height={40} className="mr-2" />
              <span className="text-2xl font-bold text-pink-500">Synexis</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="#speakers" className="hover:text-pink-500 transition-colors">
              Speakers
            </Link>
            <Link href="#sponsors" className="hover:text-pink-500 transition-colors">
              Sponsors
            </Link>
            <Link href="#register" className="hover:text-pink-500 transition-colors">
              Register
            </Link>
            <Link href="#volunteer" className="hover:text-pink-500 transition-colors">
              Volunteer
            </Link>
            <Link href="#contact" className="hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
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
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/" className="block hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="#about" className="block hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="#speakers" className="block hover:text-pink-500 transition-colors">
              Speakers
            </Link>
            <Link href="#sponsors" className="block hover:text-pink-500 transition-colors">
              Sponsors
            </Link>
            <Link href="#register" className="block hover:text-pink-500 transition-colors">
              Register
            </Link>
            <Link href="#volunteer" className="block hover:text-pink-500 transition-colors">
              Volunteer
            </Link>
            <Link href="#contact" className="block hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

