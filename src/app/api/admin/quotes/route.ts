import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth"
import { getQuotes, updateQuoteStatus, deleteQuote } from "@/lib/quotes-store"

export async function GET() {
  console.log("[VZ Framework] Admin quotes GET request received")

  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    console.log("[VZ Framework] Admin quotes: Unauthorized")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    console.log("[VZ Framework] Fetching quotes from store...")
    const quotes = await getQuotes()
    console.log("[VZ Framework] Admin fetched quotes:", quotes.length)
    return NextResponse.json({ quotes })
  } catch (error) {
    console.error("[VZ Framework] Error fetching quotes:", error)
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
    }

    const validStatuses = ["new", "contacted", "completed", "archived"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const success = await updateQuoteStatus(id, status)

    if (!success) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[VZ Framework] Error updating quote:", error)
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const success = await deleteQuote(id)

    if (!success) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[VZ Framework] Error deleting quote:", error)
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
  }
}
