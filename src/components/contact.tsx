"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { quoteSchema, type QuoteFormData } from "@/lib/validations"

export function Contact() {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    const onSubmit = async (formData: QuoteFormData) => {
        setMessage(null)
        console.log("[VZ Framework] Submitting quote form:", formData)

        try {
            const response = await fetch("/api/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            console.log("[VZ Framework] Quote response status:", response.status)
            const result = await response.json()
            console.log("[VZ Framework] Quote response body:", result)

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit quote request")
            }

            setMessage({ type: "success", text: "Thank you! We will get back to you shortly." })
            reset()
        } catch (error) {
            console.error("[VZ Framework] Quote submission error:", error)
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to submit quote request" })
        }
    }

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            value: "+44 7748 039135",
            href: "tel:+447748039135",
        },
        {
            icon: Mail,
            title: "Email",
            value: "support@homerenov.co.uk",
            href: "mailto:support@homerenov.co.uk",
        },
        {
            icon: MapPin,
            title: "Location",
            value: "Rugby, UK & Surroundings",
            href: null,
        },
    ]

    return (
        <section id="contact" className="py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        Contact Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Get a Free Quote Today</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ready to start your renovation project? Contact us for a free, no-obligation quote.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="border-border">
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="contact-name">Your Name</Label>
                                            <Input
                                                id="contact-name"
                                                {...register("name")}
                                                placeholder="John Smith"
                                                className={errors.name ? "border-red-500" : ""}
                                            />
                                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="contact-phone">Phone Number</Label>
                                            <Input
                                                id="contact-phone"
                                                type="tel"
                                                {...register("phone")}
                                                placeholder="+44 7748 039135"
                                                className={errors.phone ? "border-red-500" : ""}
                                            />
                                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-email">Email Address</Label>
                                        <Input
                                            id="contact-email"
                                            type="email"
                                            {...register("email")}
                                            placeholder="john@example.com"
                                            className={errors.email ? "border-red-500" : ""}
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="contact-message">Tell us about your project</Label>
                                        <Textarea
                                            id="contact-message"
                                            {...register("message")}
                                            placeholder="Describe your renovation project, the rooms involved, and any specific requirements... (minimum 20 characters)"
                                            rows={5}
                                            className={errors.message ? "border-red-500" : ""}
                                        />
                                        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                                    </div>
                                    {message && (
                                        <div
                                            className={`p-3 rounded-lg text-sm ${message.type === "success"
                                                    ? "bg-green-500/10 text-green-500 dark:bg-green-500/20"
                                                    : "bg-red-500/10 text-red-500 dark:bg-red-500/20"
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    )}
                                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="border-border">
                                <CardContent>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <info.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="font-medium text-foreground hover:text-primary transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="font-medium text-foreground">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="border-primary bg-primary text-primary-foreground">
                            <CardContent>
                                <h3 className="font-semibold text-lg mb-2">Quick Response</h3>
                                <p className="text-sm opacity-90 mb-4">
                                    Need an urgent quote? Call us directly and we will get back to you within 24 hours.
                                </p>
                                <Button variant="secondary" size="sm" asChild>
                                    <a href="tel:+447748039135" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call Now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
