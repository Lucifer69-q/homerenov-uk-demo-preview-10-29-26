import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do you work only with your materials or also with client-supplied materials?",
    answer:
      "We can work with both our materials and materials purchased by you. Upon request, we handle everything: purchasing, transport and installation.",
  },
  {
    question: "Do you offer free quotes?",
    answer: "Yes, we offer free quotes. Just contact us and give us some details about the work needed.",
  },
  {
    question: "How long does a typical job take?",
    answer:
      "It depends on the size of the space and the complexity of the work. For example, a room can be done in 1-2 days, while a complete bathroom may take several days.",
  },
  {
    question: "Do you work legally / can you provide an invoice?",
    answer: "Yes, we work legally and can issue invoices for the work performed (after full company activation).",
  },
  {
    question: "How is payment made?",
    answer:
      "Usually, a deposit is paid to reserve the work, and the rest is paid at the end or in stages, depending on the project.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">Find answers to common questions about our services.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-foreground text-left hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
