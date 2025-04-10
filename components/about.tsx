import Link from "next/link"
import Image from "next/image"
import AnimatedBackground from "./animated-background";

export default function About() {
  return (
    <section id="about" className="py-20 relative bg-white">
      {/* Add the animated background */}
      <AnimatedBackground 
        variant="particles" 
        colorScheme="mixed" 
        opacity={0.05} 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">ABOUT SYNEXIS</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-strong transform hover:scale-[1.02] transition-transform duration-500">
              <Image src="/about-image.jpg" alt="IEEE WIE" width={600} height={400} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-60 hover:opacity-40 transition-opacity"></div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-purple-900">IEEE Women in Engineering (WIE)</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                IEEE Women in Engineering (WIE) is a global network of IEEE members and volunteers dedicated to
                promoting women engineers and scientists, and inspiring girls around the world to follow their academic
                interests in a career in engineering and science.
              </p>
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
                Synexis is our flagship event bringing together industry leaders, academics, and students to discuss the
                latest trends, challenges, and opportunities in engineering and technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="https://chat.whatsapp.com/BON5jywwjWm9LhqpUtOpJ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Join WhatsApp
                </Link>

                <Link
                  href="#register"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Register for Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

