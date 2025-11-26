import { type NextRequest, NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { addQuote } from "@/lib/quotes-store"
import { quoteSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  console.log("[VZ Framework] Quote POST request received")

  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    console.log("[VZ Framework] Quote request from IP:", ip)

    // Rate limit: 5 quotes per hour per IP
    const { success, resetIn } = rateLimit(`quote-${ip}`, 5, 60 * 60 * 1000)

    if (!success) {
      const minutes = Math.ceil(resetIn / 60000)
      console.log("[VZ Framework] Quote rate limited for IP:", ip)
      return NextResponse.json({ error: `Too many requests. Please try again in ${minutes} minutes.` }, { status: 429 })
    }

    const body = await request.json()
    console.log("[VZ Framework] Quote request body:", body)

    // Use Zod validation
    const validationResult = quoteSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0] || "Invalid data"
      console.log("[VZ Framework] Quote validation error:", errors)
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { name, email, phone, message } = validationResult.data

    console.log("[VZ Framework] Adding quote to store...")
    const quote = await addQuote({ name, email, phone, message, ip })
    console.log("[VZ Framework] Quote added successfully:", quote.id)

    return NextResponse.json({
      quote,
      message: "Quote request submitted successfully. We will contact you shortly.",
    })
  } catch (error) {
    console.error("[VZ Framework] Error creating quote:", error)
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 })
  }
}
