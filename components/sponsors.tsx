import Image from "next/image";

export default function Sponsors() {
  const sponsors = [
    { id: 1, name: "Google", tier: "Platinum", logo: "/sponsor-google.png" },
    { id: 2, name: "Microsoft", tier: "Platinum", logo: "/sponsor-microsoft.png" },
    { id: 3, name: "IBM", tier: "Gold", logo: "/sponsor-ibm.png" },
    { id: 4, name: "Intel", tier: "Gold", logo: "/sponsor-intel.png" },
    { id: 5, name: "Amazon", tier: "Silver", logo: "/sponsor-amazon.png" },
    { id: 6, name: "Cisco", tier: "Silver", logo: "/sponsor-cisco.png" },
  ];

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce<Record<string, typeof sponsors>>((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {});

  const tierColors: Record<"Platinum" | "Gold" | "Silver", string> = {
    Platinum: "from-purple-400 to-pink-400",
    Gold: "from-yellow-400 to-amber-500",
    Silver: "from-gray-300 to-gray-400",
  };

  return (
    <section id="sponsors" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">OUR SPONSORS</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">We thank our sponsors for making Synexis possible</p>
        </div>

        {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => {
          // Ensure `tier` is typed correctly
          const typedTier = tier as keyof typeof tierColors;

          return (
            <div key={tier} className="mb-12 sm:mb-16">
              <h3 className="text-xl font-bold text-center mb-8 relative">
                <span
                  className={`inline-block px-8 py-2 rounded-full bg-gradient-to-r ${tierColors[typedTier]} text-white shadow-md`}
                >
                  {tier} Sponsors
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
                {tierSponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="glass-card p-6 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 w-full h-32 flex items-center justify-center transform hover:scale-105"
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
          );
        })}

        <div className="text-center mt-12 glass-card p-8 rounded-xl max-w-2xl mx-auto shadow-soft">
          <h3 className="text-xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Interested in sponsoring Synexis? Contact us to learn about our sponsorship packages.
          </p>
          <a
            href="mailto:ieeewie@bennett.edu.in"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
          >
            Contact for Sponsorship
          </a>
        </div>
      </div>
    </section>
  );
}

