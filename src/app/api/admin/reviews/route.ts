import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth"
import { getReviews, approveReview, deleteReview } from "@/lib/reviews-store"

export async function GET() {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const reviews = await getReviews(false)
  console.log("[VZ Framework] Admin fetched reviews:", reviews.length)
  return NextResponse.json({ reviews })
}

export async function PUT(request: NextRequest) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, action } = await request.json()

    if (action === "approve") {
      const success = await approveReview(id)
      if (success) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[VZ Framework] Error updating review:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const success = await deleteReview(id)

    if (success) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  } catch (error) {
    console.error("[VZ Framework] Error deleting review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
