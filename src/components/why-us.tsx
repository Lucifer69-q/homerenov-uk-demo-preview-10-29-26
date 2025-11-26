import { CheckCircle } from "lucide-react"

const reasons = [
  "Specialized exclusively in interiors",
  "We respect agreed timelines",
  "We work clean and protect furniture and flooring",
  "Clear and transparent communication throughout the project",
  "Warranty for all work performed",
]

export function WhyUs() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Quality Work You Can Trust
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We take pride in delivering exceptional interior renovation services that exceed expectations. Our
              commitment to quality and customer satisfaction sets us apart.
            </p>

            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src="/painter-wall.png"
                  alt="Professional painting work"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src="/finished-renovated-bathroom-with-tiles.jpg"
                  alt="Finished bathroom renovation"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
