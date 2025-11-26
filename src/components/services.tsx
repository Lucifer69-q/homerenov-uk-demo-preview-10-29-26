import { Paintbrush, LayoutGrid, Bath, Wrench, DoorOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Paintbrush,
    title: "Painting & Wall Finishes",
    description:
      "Plaster, emulsion, crack repairs, wall straightening, decorative paints and wallpaper installation. We help you choose the right colors and materials for your home.",
  },
  {
    icon: LayoutGrid,
    title: "Flooring & Skirting Installation",
    description:
      "Installation of laminate, SPC and other floating flooring types, plus skirting boards and transitions. We work precisely and leave the space clean at the end.",
  },
  {
    icon: Bath,
    title: "Bathroom Renovations",
    description:
      "Removal of old finishes, wall preparation, tile and grout installation, plaster and final finishes. We can collaborate with plumbers for sanitary fixture installation if needed.",
  },
  {
    icon: Wrench,
    title: "Interior Repairs & Drywall",
    description:
      "Drywall walls, false ceilings, pipe concealment, corner straightening, repairs after leaks or cracks. We handle the details so everything looks new again.",
  },
  {
    icon: DoorOpen,
    title: "Other Interior Services",
    description:
      "Interior door replacement, minor finish repairs, silicone work, skirting boards, thresholds and other detailed work for your home interior.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Complete Interior Renovation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From painting to complete bathroom renovations, we offer comprehensive interior renovation services tailored
            to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
