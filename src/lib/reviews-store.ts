import { readJsonFile, writeJsonFile } from "./db"

export interface Review {
    id: string
    name: string
    location: string
    rating: number
    text: string
    ip: string
    createdAt: string
    approved: boolean
}

const REVIEWS_FILE = "reviews.json"

const defaultReviews: Review[] = [
    {
        id: "default-1",
        name: "Maria",
        location: "Rugby",
        rating: 5,
        text: "Very pleased with the result. They worked clean, finished on time and helped me choose the colors.",
        ip: "127.0.0.1",
        createdAt: new Date().toISOString(),
        approved: true,
    },
    {
        id: "default-2",
        name: "Andrew",
        location: "Daventry",
        rating: 5,
        text: "Fast execution at a fair price. I recommend for painting and flooring installation.",
        ip: "127.0.0.1",
        createdAt: new Date().toISOString(),
        approved: true,
    },
    {
        id: "default-3",
        name: "Joanna",
        location: "Coventry",
        rating: 5,
        text: "They completely redid the bathroom and we are very happy with the quality. Communication was very good from start to finish.",
        ip: "127.0.0.1",
        createdAt: new Date().toISOString(),
        approved: true,
    },
]

export async function getReviews(onlyApproved = true): Promise<Review[]> {
    const reviews = await readJsonFile<Review[]>(REVIEWS_FILE, defaultReviews)
    if (onlyApproved) {
        return reviews.filter((r) => r.approved)
    }
    return reviews
}

export async function addReview(review: Omit<Review, "id" | "createdAt" | "approved">): Promise<Review> {
    const reviews = await readJsonFile<Review[]>(REVIEWS_FILE, defaultReviews)

    const newReview: Review = {
        ...review,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        approved: false,
    }

    reviews.push(newReview)
    await writeJsonFile(REVIEWS_FILE, reviews)

    return newReview
}

export async function approveReview(id: string): Promise<boolean> {
    const reviews = await readJsonFile<Review[]>(REVIEWS_FILE, defaultReviews)
    const review = reviews.find((r) => r.id === id)

    if (review) {
        review.approved = true
        await writeJsonFile(REVIEWS_FILE, reviews)
        return true
    }
    return false
}

export async function deleteReview(id: string): Promise<boolean> {
    const reviews = await readJsonFile<Review[]>(REVIEWS_FILE, defaultReviews)
    const index = reviews.findIndex((r) => r.id === id)

    if (index !== -1) {
        reviews.splice(index, 1)
        await writeJsonFile(REVIEWS_FILE, reviews)
        return true
    }
    return false
}
