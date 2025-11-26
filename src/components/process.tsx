import { MessageSquare, FileText, Hammer, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Contact & Quote",
    description: "Send us photos or schedule an on-site visit for measurements and discussions.",
  },
  {
    icon: FileText,
    title: "Plan & Price",
    description: "We propose solutions, help you choose materials and give you a clear quote with no hidden costs.",
  },
  {
    icon: Hammer,
    title: "Execution",
    description: "We handle the work according to agreed timelines, work clean and keep you updated at every stage.",
  },
  {
    icon: CheckCircle,
    title: "Handover & Warranty",
    description: "We check the work together, make any touch-ups and provide warranty for the work performed.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Our Simple Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From initial contact to project completion, we make the renovation process smooth and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
