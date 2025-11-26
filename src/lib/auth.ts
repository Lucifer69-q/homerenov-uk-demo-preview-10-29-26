import { cookies } from "next/headers"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "hexadream2024" // In production, use environment variables

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  return session?.value === "authenticated"
}

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
