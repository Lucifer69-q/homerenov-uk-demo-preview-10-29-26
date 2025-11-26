import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">H</span>
                            </div>
                            <span className="font-bold text-xl">Home Renov</span>
                        </Link>
                        <p className="text-background/70 mb-4 max-w-sm">
                            Professional interior renovation services in Rugby and surrounding areas. Painting, flooring, bathroom
                            renovations and more.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="text-background/70 hover:text-background transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="text-background/70 hover:text-background transition-colors">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#gallery" className="text-background/70 hover:text-background transition-colors">
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a href="#reviews" className="text-background/70 hover:text-background transition-colors">
                                    Reviews
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-background/70 hover:text-background transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Socials</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=61584147638102" className="text-background/70 hover:text-background transition-colors">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/homerenovuk/" className="text-background/70 hover:text-background transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@homerenovuk" className="text-background/70 hover:text-background transition-colors">
                                    Tiktok
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-background/70">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+447748039135" className="hover:text-background transition-colors">
                                    +44 7748 039135
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-background/70">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:support@homerenov.co.uk" className="hover:text-background transition-colors">
                                    support@homerenov.co.uk
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-background/70">
                                <MapPin className="w-4 h-4" />
                                <span>Rugby, UK</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} Home Renov. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
