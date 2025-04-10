import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Speakers from "@/components/speakers"
import Sponsors from "@/components/sponsors"
import Registration from "@/components/registration"
import Volunteer from "@/components/volunteer"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Speakers />
      {/* <Sponsors /> */}
      <Registration />
      <Volunteer />
      <Contact />
      <Footer />
    </main>
  )
}

