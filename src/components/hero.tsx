import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/modern-renovated-living-room-interior-with-warm-li.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Interior Renovation Specialists
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mb-6">
            Quality Interior Renovations in Rugby & Surroundings
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
            Painting, flooring installation, bathroom renovations and interior repairs — we work clean, fast and right.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="#contact" className="flex items-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+447748039135" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
            <div>
              <p className="text-3xl font-bold text-foreground">200+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
