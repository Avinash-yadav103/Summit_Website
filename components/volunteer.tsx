"use client"

import { useState } from "react"

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage("Thank you for your interest in volunteering! We will contact you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        motivation: "",
      })
    } catch (error) {
      setSubmitMessage("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="volunteer" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full text-purple-50"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <polygon points="0,0 100,0 100,100" opacity="0.5"></polygon>
        </svg>
        <svg
          className="absolute left-0 bottom-0 h-full text-pink-50 transform rotate-180"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <polygon points="0,0 100,0 100,100" opacity="0.5"></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">BECOME A VOLUNTEER</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Join our team and help make Synexis a success</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="glass-card p-8 rounded-2xl shadow-soft">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-900">Why Volunteer?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  Network with industry professionals and like-minded peers
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  Gain valuable experience in event management and organization
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  Receive exclusive volunteer benefits, including free event access
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  Be part of an inspiring community of women in engineering
                </span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-2xl shadow-strong">
            <h3 className="text-xl font-bold mb-6 text-center text-purple-900">Volunteer Application</h3>

            {submitMessage && (
              <div
                className={`p-4 mb-6 rounded-lg text-sm ${submitMessage.includes("error") ? "bg-red-100 text-red-700 border border-red-200" : "bg-green-100 text-green-700 border border-green-200"}`}
              >
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="volunteer-name" className="block text-sm font-medium mb-1 text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="volunteer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="volunteer-email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="volunteer-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-1 text-gray-700">
                  Previous Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  placeholder="Tell us about any previous volunteering or event experience"
                ></textarea>
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium mb-1 text-gray-700">
                  Why do you want to volunteer? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  placeholder="Tell us why you're interested in volunteering"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none disabled:hover:shadow-none"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

