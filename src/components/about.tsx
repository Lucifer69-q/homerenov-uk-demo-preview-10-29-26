import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function About() {
  const highlights = [
    "Specialized exclusively in interiors",
    "We respect agreed timelines",
    "We work clean and protect furniture and flooring",
    "Clear and transparent communication",
    "Warranty for all work performed",
  ]

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/professional-renovation-team-working-on-interior.jpg"
                alt="Our team at work"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden sm:block">
              <p className="text-4xl font-bold">5+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Your Trusted Partner for Interior Renovations
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We are a team specialized in interior renovations: painting, flooring installation, complete bathroom
              renovations and finishes. We work clean, respect deadlines and offer advice for choosing materials that
              fit your budget.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We primarily serve the Rugby area and surroundings, focusing on professionalism, clear communication and
              attention to detail.
            </p>

            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
