const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

export function rateLimit(
  ip: string,
  limit = 3,
  windowMs: number = 60 * 60 * 1000, // 1 hour
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return { success: true, remaining: limit - 1, resetIn: windowMs }
  }

  if (record.count >= limit) {
    const resetIn = windowMs - (now - record.lastReset)
    return { success: false, remaining: 0, resetIn }
  }

  record.count++
  return { success: true, remaining: limit - record.count, resetIn: windowMs - (now - record.lastReset) }
}
