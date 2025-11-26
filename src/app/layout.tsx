import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Home Renov | Quality Interior Renovations in Rugby & Surroundings",
    description:
        "Professional interior renovations - painting, flooring, bathroom renovations and interior repairs. We work clean, fast and right in Rugby, Daventry, Coventry, and Northampton.",
    icons: {
        icon: [
            {
                url: "/icon-32x32.png",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

export const viewport: Viewport = {
    themeColor: "#c93030",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}
