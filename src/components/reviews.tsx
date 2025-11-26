"use client"

import { useState, useEffect, useCallback } from "react"
import useSWR, { mutate } from "swr"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star, Quote, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { reviewSchema, type ReviewFormData } from "@/lib/validations"

interface Review {
    id: string
    name: string
    location: string
    rating: number
    text: string
    createdAt: string
    approved: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function Reviews() {
    const { data, isLoading } = useSWR<{ reviews: Review[] }>("/api/reviews", fetcher)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [selectedRating, setSelectedRating] = useState(5)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            name: "",
            location: "",
            rating: 5,
            text: "",
        },
    })

    const defaultReviews: Review[] = [
        {
            id: "1",
            name: "Maria",
            location: "Rugby",
            rating: 5,
            text: "Very pleased with the result. They worked clean, finished on time and helped me choose the colors. The attention to detail was exceptional and the team was professional throughout the entire process.",
            createdAt: new Date().toISOString(),
            approved: true,
        },
        {
            id: "2",
            name: "Andrew",
            location: "Daventry",
            rating: 5,
            text: "Fast execution at a fair price. I recommend for painting and flooring installation.",
            createdAt: new Date().toISOString(),
            approved: true,
        },
        {
            id: "3",
            name: "Joanna",
            location: "Coventry",
            rating: 5,
            text: "They completely redid the bathroom and we are very happy with the quality. Communication was very good from start to finish. Would definitely hire them again for future projects.",
            createdAt: new Date().toISOString(),
            approved: true,
        },
        {
            id: "4",
            name: "Michael",
            location: "Northampton",
            rating: 5,
            text: "Outstanding work on our kitchen renovation. Professional team!",
            createdAt: new Date().toISOString(),
            approved: true,
        },
        {
            id: "5",
            name: "Sarah",
            location: "Leicester",
            rating: 5,
            text: "The team transformed our living room completely. From the initial consultation to the final touches, everything was handled with care and professionalism. Highly recommend their services to anyone looking for quality renovation work.",
            createdAt: new Date().toISOString(),
            approved: true,
        },
    ]

    const reviews = data?.reviews?.length ? data.reviews : defaultReviews

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, [reviews.length])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }, [reviews.length])

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(nextSlide, 5000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    const onSubmit = async (formData: ReviewFormData) => {
        setMessage(null)

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, rating: selectedRating }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit review")
            }

            setMessage({ type: "success", text: "Thank you! Your review has been submitted and is pending approval." })
            reset()
            setSelectedRating(5)
            mutate("/api/reviews")
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to submit review" })
        }
    }

    return (
        <section id="reviews" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">What Our Clients Say</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Read reviews from our satisfied customers and see why they trust us with their renovation projects.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="pt-6">
                                    <div className="h-24 bg-muted rounded" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {reviews.map((review) => (
                            <Card key={review.id} className="border-border">
                                <CardContent className="pt-6">
                                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-foreground mb-4 leading-relaxed">{`"${review.text}"`}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary font-semibold">{review.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{review.name}</p>
                                            <p className="text-sm text-muted-foreground">{review.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="max-w-xl mx-auto">
                    <Card className="border-border">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Leave a Review</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            {...register("name")}
                                            placeholder="John"
                                            className={errors.name ? "border-red-500" : ""}
                                        />
                                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            {...register("location")}
                                            placeholder="Rugby"
                                            className={errors.location ? "border-red-500" : ""}
                                        />
                                        {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Rating</Label>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => setSelectedRating(star)} className="p-1">
                                                <Star
                                                    className={`w-6 h-6 ${star <= selectedRating ? "text-primary fill-primary" : "text-muted"}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="text">Your Review</Label>
                                    <Textarea
                                        id="text"
                                        {...register("text")}
                                        placeholder="Share your experience... (minimum 10 characters)"
                                        rows={4}
                                        className={errors.text ? "border-red-500" : ""}
                                    />
                                    {errors.text && <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>}
                                </div>
                                {message && (
                                    <div
                                        className={`p-3 rounded-lg text-sm ${message.type === "success"
                                                ? "bg-green-500/10 text-green-500 dark:bg-green-500/20"
                                                : "bg-red-500/10 text-red-500 dark:bg-red-500/20"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                )}
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Review"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
