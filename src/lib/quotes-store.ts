import { readJsonFile, writeJsonFile } from "./db"

export interface Quote {
  id: string
  name: string
  email: string
  phone: string
  message: string
  ip: string
  createdAt: string
  status: "new" | "contacted" | "completed" | "archived"
}

const QUOTES_FILE = "quotes.json"

export async function getQuotes(): Promise<Quote[]> {
  return readJsonFile<Quote[]>(QUOTES_FILE, [])
}

export async function addQuote(quote: Omit<Quote, "id" | "createdAt" | "status">): Promise<Quote> {
  const quotes = await readJsonFile<Quote[]>(QUOTES_FILE, [])

  const newQuote: Quote = {
    ...quote,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  }

  quotes.push(newQuote)
  await writeJsonFile(QUOTES_FILE, quotes)

  return newQuote
}

export async function updateQuoteStatus(id: string, status: Quote["status"]): Promise<boolean> {
  const quotes = await readJsonFile<Quote[]>(QUOTES_FILE, [])
  const quote = quotes.find((q) => q.id === id)

  if (quote) {
    quote.status = status
    await writeJsonFile(QUOTES_FILE, quotes)
    return true
  }
  return false
}

export async function deleteQuote(id: string): Promise<boolean> {
  const quotes = await readJsonFile<Quote[]>(QUOTES_FILE, [])
  const index = quotes.findIndex((q) => q.id === id)

  if (index !== -1) {
    quotes.splice(index, 1)
    await writeJsonFile(QUOTES_FILE, quotes)
    return true
  }
  return false
}
