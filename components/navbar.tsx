"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      // Update active section based on scroll position
      const sections = ["home", "about", "speakers", "register", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveLink(section === "home" ? "/" : `#${section}`);
          break;
        }
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

          <div className="hidden md:flex space-x-6">
            {[
              { href: "/", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#speakers", label: "Speakers" },
              { href: "#register", label: "Register" },
              { href: "#contact", label: "Contact" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  activeLink === link.href 
                    ? "text-pink-400" 
                    : "text-white hover:text-pink-300"
                }`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
                <span className="nav-link-effect absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 origin-center transition-transform duration-300 ease-out"></span>
                <span className={`absolute -inset-1 rounded-lg bg-white/5 opacity-0 transition-opacity duration-300 ${
                  activeLink === link.href ? "opacity-100" : "group-hover:opacity-100"
                }`}></span>
              </Link>
            ))}
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
            {[
              { href: "/", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#speakers", label: "Speakers" },
              { href: "#register", label: "Register" },
              { href: "#contact", label: "Contact" }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`mobile-nav-link block py-2 px-3 rounded-md transition-all duration-300 ${
                  activeLink === link.href 
                    ? "text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-l-2 border-pink-500" 
                    : "text-white hover:bg-white/5"
                }`}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

