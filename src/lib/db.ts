import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "database")

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR)
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true })
    }
}

export async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, filename)

    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data)
    } catch {
        // File doesn't exist, return default
        return defaultValue
    }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, filename)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

// For images, we'll store them as base64 in JSON
export async function saveImage(filename: string, buffer: Buffer): Promise<string> {
    await ensureDataDir()

    const images = await readJsonFile<Record<string, string>>("gallery-images.json", {})
    const base64 = buffer.toString("base64")
    const ext = filename.split(".").pop()?.toLowerCase() || "jpg"
    const mimeType =
        ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "gif" ? "image/gif" : "image/jpeg"

    const id = `img_${Date.now()}_${Math.random().toString(36).substring(7)}`
    images[id] = `data:${mimeType};base64,${base64}`

    await writeJsonFile("gallery-images.json", images)

    return id
}

export async function getImage(id: string): Promise<string | null> {
    const images = await readJsonFile<Record<string, string>>("gallery-images.json", {})
    return images[id] || null
}

export async function deleteImage(id: string): Promise<boolean> {
    const images = await readJsonFile<Record<string, string>>("gallery-images.json", {})
    if (images[id]) {
        delete images[id]
        await writeJsonFile("gallery-images.json", images)
        return true
    }
    return false
}

export async function getAllImages(): Promise<Array<{ id: string; dataUrl: string }>> {
    const images = await readJsonFile<Record<string, string>>("gallery-images.json", {})
    return Object.entries(images).map(([id, dataUrl]) => ({ id, dataUrl }))
}
