"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function Registration() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to Luma events
      window.open("https://lu.ma/event/synexis-ieee-wie", "_blank");

      setSubmitMessage("Registration successful! Redirecting to complete your registration...");
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
      });
    } catch (error) {
      setSubmitMessage("There was an error processing your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="register"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-purple-900 to-purple-800 text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 300 + 50 + "px",
              height: Math.random() * 300 + 50 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3,
              filter: "blur(50px)",
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">REGISTER NOW</h2>
          <div className="w-16 sm:w-20 h-1 bg-pink-500 mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base">
            Secure your spot at Synexis and be part of this transformative experience
          </p>
        </div>

        <div className="max-w-md mx-auto glass rounded-2xl shadow-strong overflow-hidden border border-white/10">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Register for Synexis</h3>

            <p className="text-center text-white/80 mb-6">
              Join us for this exciting event bringing together industry leaders, academics, and students.
            </p>

            {/* Primary Luma Registration Button */}
            <a
              href="https://lu.ma/c5b5g6va"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 text-center mb-6"
            >
              Register on Luma
            </a>

            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-purple-900/50 backdrop-blur-sm text-white/70 rounded">or</span>
              </div>
            </div> */}

            {/* <button
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center mb-4 backdrop-blur-sm border border-white/10"
            >
              {showForm ? "Hide Registration Form" : "Show Alternative Registration Form"}
            </button> */}

            {showForm && (
              <>
                {submitMessage && (
                  <div
                    className={`p-4 mb-4 rounded-lg text-sm sm:text-base ${submitMessage.includes("error") ? "bg-red-500/20 text-red-100 border border-red-500/30" : "bg-green-500/20 text-green-100 border border-green-500/30"}`}
                  >
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-white/90">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-white/90">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium mb-1 text-white/90">
                      Organization/University
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                      placeholder="Your organization or university"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-1 text-white/90">
                      Role/Position
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                      placeholder="Your role or position"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none disabled:hover:shadow-none"
                  >
                    {isSubmitting ? "Processing..." : "Submit Registration"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

