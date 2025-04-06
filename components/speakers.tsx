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
    <section id="speakers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">SPEAKERS</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Meet our distinguished speakers who will share their insights and expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                <p className="text-pink-600 mb-3">{speaker.role}</p>
                <p className="text-gray-600 text-sm">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">More speakers to be announced soon!</p>
        </div>
      </div>
    </section>
  )
}

