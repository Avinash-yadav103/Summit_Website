import Image from "next/image"

export default function Speakers() {
  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "AI Research Lead, Google",
      image: "/speaker1.jpg",
      bio: "Leading expert in artificial intelligence and machine learning with over 15 years of experience.",
    },
    {
      id: 2,
      name: "Prof. Emily Chen",
      role: "Professor of Robotics, MIT",
      image: "/speaker2.jpg",
      bio: "Award-winning researcher in robotics and automation systems.",
    },
    {
      id: 3,
      name: "Olivia Rodriguez",
      role: "CTO, TechFuture Inc.",
      image: "/speaker3.jpg",
      bio: "Technology leader with expertise in scaling engineering teams and building innovative products.",
    },
    {
      id: 4,
      name: "Dr. Maya Patel",
      role: "Quantum Computing Researcher",
      image: "/speaker4.jpg",
      bio: "Pioneer in quantum computing applications for solving complex engineering problems.",
    },
  ]

  return (
    <section id="speakers" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
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
              <div className="relative h-64 w-full overflow-hidden">
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

