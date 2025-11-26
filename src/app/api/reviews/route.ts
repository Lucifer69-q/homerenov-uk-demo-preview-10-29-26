import { type NextRequest, NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { getReviews, addReview } from "@/lib/reviews-store"
import { reviewSchema } from "@/lib/validations"

export async function GET() {
  try {
    const reviews = await getReviews(true)
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("[VZ Framework] Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Rate limit: 3 reviews per hour per IP
    const { success, remaining, resetIn } = rateLimit(ip, 3, 60 * 60 * 1000)

    if (!success) {
      const minutes = Math.ceil(resetIn / 60000)
      return NextResponse.json(
        { error: `Too many reviews submitted. Please try again in ${minutes} minutes.` },
        { status: 429 },
      )
    }

    const body = await request.json()

    const validationResult = reviewSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      const firstError = Object.values(errors)[0]?.[0] || "Invalid data"
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { name, location, rating, text } = validationResult.data

    const review = await addReview({ name, location, rating, text, ip })

    return NextResponse.json({
      review,
      message: "Review submitted successfully and is pending approval",
      remaining,
    })
  } catch (error) {
    console.error("[VZ Framework] Error creating review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
