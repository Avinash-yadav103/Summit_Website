"use client"

import { useState } from "react"

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
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

      // Redirect to Luma events
      window.open("https://lu.ma/event/synexis-ieee-wie", "_blank")

      setSubmitMessage("Registration successful! Redirecting to complete your registration...")
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
      })
    } catch (error) {
      setSubmitMessage("There was an error processing your registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register" className="py-20 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">REGISTER NOW</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          <p className="mt-4">Secure your spot at Synexis and be part of this transformative experience</p>
        </div>

        <div className="max-w-md mx-auto bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Registration Form</h3>

            {submitMessage && (
              <div
                className={`p-3 mb-4 rounded ${submitMessage.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
              >
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="organization" className="block text-sm font-medium mb-1">
                  Organization/University
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role/Position
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "Register for Synexis"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

