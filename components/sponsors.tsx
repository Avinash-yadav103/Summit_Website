import Image from "next/image"

export default function Sponsors() {
  const sponsors = [
    { id: 1, name: "Google", tier: "Platinum", logo: "/sponsor-google.png" },
    { id: 2, name: "Microsoft", tier: "Platinum", logo: "/sponsor-microsoft.png" },
    { id: 3, name: "IBM", tier: "Gold", logo: "/sponsor-ibm.png" },
    { id: 4, name: "Intel", tier: "Gold", logo: "/sponsor-intel.png" },
    { id: 5, name: "Amazon", tier: "Silver", logo: "/sponsor-amazon.png" },
    { id: 6, name: "Cisco", tier: "Silver", logo: "/sponsor-cisco.png" },
  ]

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = []
    }
    acc[sponsor.tier].push(sponsor)
    return acc
  }, {})

  return (
    <section id="sponsors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">OUR SPONSORS</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">We thank our sponsors for making Synexis possible</p>
        </div>

        {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
          <div key={tier} className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8">{tier} Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {tierSponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full h-32 flex items-center justify-center"
                >
                  <div className="relative h-20 w-full">
                    <Image
                      src={sponsor.logo || "/placeholder.svg"}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <h3 className="text-xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-gray-600 mb-6">
            Interested in sponsoring Synexis? Contact us to learn about our sponsorship packages.
          </p>
          <a
            href="mailto:sponsorship@ieeewie.org"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Contact for Sponsorship
          </a>
        </div>
      </div>
    </section>
  )
}

