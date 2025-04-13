import Image from "next/image"
import ColorChangingBackground from "./color-changing-background";

export default function Speakers() {
  const speakers = [
    {
      id: 1,
      name: "Dr Sanjeen Sawhney",
      role: "Enterpreneur | Mentor",
      image: "/speaker1.png",
      bio: "FORBES-Asia Power Business Woman|4xTed Speaker|Best Women Entrepreneur Award-Zee|International Nelson Mandela Award",
    },
    {
      id: 2,
      name: "Priya Vajpeyi",
      role: "Founder@Cuerik | TedX Speaker",
      image: "/priyavajpayei.jpg",
      bio: "Product Enthusiast | Driving Brands' Success via Targeted Marketing Solutions | Skilled at Content Creation, Advertising, Lead Generation | Career Consultant 💼",
    },
    {
      id: 3,
      name: "Aditya Mani",
      role: "Founder, YOLOgram",
      image: "/adityamani.jpg",
      bio: "(Your Hologram) Share playful animated stories to Social AR & the Metaverse",
    },
    {
      id: 4,
      name: "Manveen Sharma",
      role: "Founder, Encubay | TedX Speaker",
      image: "/manveen.jpg",
      bio: "YourStory's Top 100 Emerging Leaders",
    },
    {
      id: 5,
      name: "Dr. Ranjitha B.",
      role: "Associate Professor @MNNIT Allahabad, Prayagraj, India",
      image: "/rajitha.jpg",
      bio: "IEEE Senior Member | ACM Member",
    },
  ]

  return (
    <section id="speakers" className="py-16 sm:py-20 md:py-24 relative">
      {/* Add color-changing background with different colors for variation */}
      <ColorChangingBackground 
        colors={["#d8b4fe", "#f0abfc", "#c084fc", "#f5d0fe"]} 
        opacity={0.26} 
        duration={25}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">SPEAKERS</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Meet our distinguished speakers who will share their insights and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="glass-card rounded-xl overflow-hidden shadow-strong hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-purple-800 transition-colors">{speaker.name}</h3>
                <p className="text-pink-600 mb-3 text-sm font-medium">{speaker.role}</p>
                <p className="text-gray-600 text-sm">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm sm:text-base">More speakers to be announced soon!</p>
        </div>
      </div>
    </section>
  )
}

