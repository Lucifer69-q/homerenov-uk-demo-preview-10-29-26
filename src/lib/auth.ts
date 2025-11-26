import { cookies } from "next/headers"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function verifyAdminSession(): Promise<boolean> {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    return session?.value === "authenticated"
}

export function verifyCredentials(username: string, password: string): boolean {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
