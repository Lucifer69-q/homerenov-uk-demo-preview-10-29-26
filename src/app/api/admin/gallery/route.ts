import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth"
import { getAllImages, deleteImage } from "@/lib/db"

export async function GET() {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const images = await getAllImages()

    const files = images.map((img) => ({
      url: img.dataUrl,
      pathname: img.id,
      filename: img.id,
      id: img.id,
    }))

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error listing files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
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
      return NextResponse.json({ error: "No ID provided" }, { status: 400 })
    }

    const success = await deleteImage(id)
    if (!success) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
