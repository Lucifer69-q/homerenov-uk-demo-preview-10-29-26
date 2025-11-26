import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Reviews } from "@/components/reviews"
import { Process } from "@/components/process"
import { Coverage } from "@/components/coverage"
import { FAQ } from "@/components/faq"
import { WhyUs } from "@/components/why-us"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Process />
      <Coverage />
      <FAQ />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  )
}
