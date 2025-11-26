"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "#about", label: "About Us" },
        { href: "#services", label: "Services" },
        { href: "#gallery", label: "Gallery" },
        { href: "#reviews", label: "Reviews" },
        { href: "#process", label: "Process" },
        { href: "#faq", label: "FAQ" },
        { href: "#contact", label: "Contact" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">H</span>
                        </div>
                        <span className="font-bold text-xl text-foreground">Home Renov</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <Button variant="outline" size="sm" asChild>
                            <a href="tel:+447748039135" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call Now
                            </a>
                        </Button>
                        <Button size="sm" asChild>
                            <a href="#contact">Get a Quote</a>
                        </Button>
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 pt-3 border-t border-border">
                                <Button variant="outline" size="sm" asChild>
                                    <a href="tel:+447748039135" className="flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call Now
                                    </a>
                                </Button>
                                <Button size="sm" asChild>
                                    <a href="#contact">Get a Quote</a>
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
