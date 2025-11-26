import { MapPin } from "lucide-react"

const areas = ["Rugby", "Daventry", "Coventry", "Northampton"]

export function Coverage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Areas We Cover</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer interior renovation services in the following areas and surrounding localities upon request.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 hover:border-primary/50 transition-colors"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">{area}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8">
          And other localities in the surrounding area, upon request.
        </p>
      </div>
    </section>
  )
}
