import { z } from "zod"

export const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must be less than 50 characters"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  text: z.string().min(10, "Review must be at least 10 characters").max(500, "Review must be less than 500 characters"),
})

export type ReviewFormData = z.infer<typeof reviewSchema>

export const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
