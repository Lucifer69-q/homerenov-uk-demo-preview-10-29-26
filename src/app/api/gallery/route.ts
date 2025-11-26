import { NextResponse } from "next/server"
import { getAllImages } from "@/lib/db"

export async function GET() {
  try {
    const images = await getAllImages()

    const files = images.map((img) => ({
      url: img.dataUrl,
      pathname: img.id,
      filename: img.id,
    }))

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error listing gallery files:", error)
    return NextResponse.json({ files: [] })
  }
}
