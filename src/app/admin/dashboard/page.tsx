"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
    Upload,
    Trash2,
    LogOut,
    Star,
    Check,
    X,
    Loader2,
    ImageIcon,
    MessageSquare,
    FileText,
    Phone,
    Mail,
    PhoneIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GalleryFile {
    url: string
    pathname: string
    filename: string
    uploadedAt: string
    size: number
}

interface Review {
    id: string
    name: string
    location: string
    rating: number
    text: string
    ip: string
    createdAt: string
    approved: boolean
}

interface Quote {
    id: string
    name: string
    email: string
    phone: string
    message: string
    ip: string
    createdAt: string
    status: "new" | "contacted" | "completed" | "archived"
}

interface Social {
    id: string
    name: string
    href: string
    order: string
}

export default function AdminDashboard() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [quotes, setQuotes] = useState<Quote[]>([]) // Added quotes state
    const [isUploading, setIsUploading] = useState(false)
    const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const fetchData = useCallback(async () => {
        try {
            console.log("[VZ Framework] Admin dashboard: Fetching data...")

            const [galleryRes, reviewsRes, quotesRes] = await Promise.all([
                fetch("/api/admin/gallery"),
                fetch("/api/admin/reviews"),
                fetch("/api/admin/quotes"),
            ])

            console.log("[VZ Framework] Admin dashboard: Gallery status:", galleryRes.status)
            console.log("[VZ Framework] Admin dashboard: Reviews status:", reviewsRes.status)
            console.log("[VZ Framework] Admin dashboard: Quotes status:", quotesRes.status)

            if (!galleryRes.ok || !reviewsRes.ok) {
                router.push("/admin")
                return
            }

            const galleryData = await galleryRes.json()
            const reviewsData = await reviewsRes.json()
            const quotesData = quotesRes.ok ? await quotesRes.json() : { quotes: [] }

            console.log("[VZ Framework] Admin dashboard: Quotes data:", quotesData)

            setGalleryFiles(galleryData.files || [])
            setReviews(reviewsData.reviews || [])
            setQuotes(quotesData.quotes || [])
        } catch (error) {
            console.log("[VZ Framework] Admin dashboard: Error fetching data:", error)
            router.push("/admin")
        } finally {
            setIsLoading(false)
        }
    }, [router])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" })
        router.push("/admin")
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files?.length) return

        setIsUploading(true)
        setUploadMessage(null)

        try {
            for (const file of Array.from(files)) {
                const formData = new FormData()
                formData.append("file", file)

                const response = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.error || "Upload failed")
                }
            }

            setUploadMessage({ type: "success", text: `${files.length} file(s) uploaded successfully` })
            fetchData()
        } catch (error) {
            setUploadMessage({ type: "error", text: error instanceof Error ? error.message : "Upload failed" })
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    const handleDeleteImage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return

        try {
            const response = await fetch("/api/admin/gallery", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!response.ok) throw new Error("Delete failed")

            setGalleryFiles(galleryFiles.filter((f) => f.filename !== id))
        } catch {
            alert("Failed to delete image")
        }
    }

    const handleApproveReview = async (id: string) => {
        try {
            const response = await fetch("/api/admin/reviews", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action: "approve" }),
            })

            if (!response.ok) throw new Error("Approve failed")

            setReviews(reviews.map((r) => (r.id === id ? { ...r, approved: true } : r)))
        } catch {
            alert("Failed to approve review")
        }
    }

    const handleDeleteReview = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return

        try {
            const response = await fetch("/api/admin/reviews", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!response.ok) throw new Error("Delete failed")

            setReviews(reviews.filter((r) => r.id !== id))
        } catch {
            alert("Failed to delete review")
        }
    }

    const handleUpdateQuoteStatus = async (id: string, status: Quote["status"]) => {
        try {
            const response = await fetch("/api/admin/quotes", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            })

            if (!response.ok) throw new Error("Update failed")

            setQuotes(quotes.map((q) => (q.id === id ? { ...q, status } : q)))
        } catch {
            alert("Failed to update quote status")
        }
    }

    const handleDeleteQuote = async (id: string) => {
        if (!confirm("Are you sure you want to delete this quote request?")) return

        try {
            const response = await fetch("/api/admin/quotes", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!response.ok) throw new Error("Delete failed")

            setQuotes(quotes.filter((q) => q.id !== id))
        } catch {
            alert("Failed to delete quote")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    const pendingReviews = reviews.filter((r) => !r.approved)
    const approvedReviews = reviews.filter((r) => r.approved)
    const newQuotes = quotes.filter((q) => q.status === "new")

    const getStatusColor = (status: Quote["status"]) => {
        switch (status) {
            case "new":
                return "bg-blue-500"
            case "contacted":
                return "bg-yellow-500"
            case "completed":
                return "bg-green-500"
            case "archived":
                return "bg-gray-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="min-h-screen bg-secondary/30">
            <header className="bg-background border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">H</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-foreground">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Manage gallery, reviews, and quotes</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs defaultValue="gallery" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="gallery" className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Gallery ({galleryFiles.length})
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Reviews ({reviews.length})
                            {pendingReviews.length > 0 && (
                                <Badge variant="destructive" className="ml-1">
                                    {pendingReviews.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="quotes" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Quotes ({quotes.length})
                            {newQuotes.length > 0 && (
                                <Badge variant="destructive" className="ml-1">
                                    {newQuotes.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="socials" className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4" />
                            Socials
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gallery">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gallery Management</CardTitle>
                                <CardDescription>
                                    Upload and manage images that appear on the main page gallery section.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <label className="block">
                                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                                            {isUploading ? (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Uploading...</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                    <Upload className="w-8 h-8" />
                                                    <span>Click or drag to upload images</span>
                                                    <span className="text-xs">JPEG, PNG, WebP, GIF (max 5MB)</span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleUpload}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                    </label>
                                    {uploadMessage && (
                                        <div
                                            className={`mt-3 p-3 rounded-lg text-sm ${uploadMessage.type === "success"
                                                ? "bg-green-500/10 text-green-500 dark:bg-green-500/20"
                                                : "bg-red-500/10 text-red-500 dark:bg-red-500/20"
                                                }`}
                                        >
                                            {uploadMessage.text}
                                        </div>
                                    )}
                                </div>

                                {galleryFiles.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No images uploaded yet</p>
                                        <p className="text-sm">Upload images to display in the gallery section</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {galleryFiles.map((file) => (
                                            <div key={file.url} className="relative group aspect-square rounded-lg overflow-hidden">
                                                <Image src={file.url || "/placeholder.svg"} alt={file.filename} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(file.filename)}>
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                                    <p className="text-white text-xs truncate">{file.filename}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <div className="space-y-6">
                            {pendingReviews.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            Pending Reviews
                                            <Badge variant="destructive">{pendingReviews.length}</Badge>
                                        </CardTitle>
                                        <CardDescription>Reviews waiting for approval before appearing on the website.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {pendingReviews.map((review) => (
                                                <div key={review.id} className="p-4 bg-secondary/50 rounded-lg border border-border">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                <span className="font-medium text-foreground">{review.name}</span>
                                                                <span className="text-muted-foreground">-</span>
                                                                <span className="text-muted-foreground">{review.location}</span>
                                                                <div className="flex gap-0.5 ml-2">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`w-4 h-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className="text-foreground">{review.text}</p>
                                                            <p className="text-xs text-muted-foreground mt-2">
                                                                Submitted: {new Date(review.createdAt).toLocaleDateString()} | IP: {review.ip}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" onClick={() => handleApproveReview(review.id)}>
                                                                <Check className="w-4 h-4 mr-1" />
                                                                Approve
                                                            </Button>
                                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteReview(review.id)}>
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Approved Reviews ({approvedReviews.length})</CardTitle>
                                    <CardDescription>Reviews currently displayed on the website.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {approvedReviews.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>No approved reviews yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {approvedReviews.map((review) => (
                                                <div key={review.id} className="p-4 bg-secondary/30 rounded-lg border border-border">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                <span className="font-medium text-foreground">{review.name}</span>
                                                                <span className="text-muted-foreground">-</span>
                                                                <span className="text-muted-foreground">{review.location}</span>
                                                                <div className="flex gap-0.5 ml-2">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`w-4 h-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted"}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <Badge variant="secondary" className="ml-2">
                                                                    Approved
                                                                </Badge>
                                                            </div>
                                                            <p className="text-foreground">{review.text}</p>
                                                        </div>
                                                        <Button size="sm" variant="ghost" onClick={() => handleDeleteReview(review.id)}>
                                                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="quotes">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Quote Requests
                                    {newQuotes.length > 0 && <Badge variant="destructive">{newQuotes.length} new</Badge>}
                                </CardTitle>
                                <CardDescription>Manage quote requests from potential customers.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {quotes.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No quote requests yet</p>
                                        <p className="text-sm">Quote requests from the contact form will appear here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {quotes
                                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                            .map((quote) => (
                                                <div
                                                    key={quote.id}
                                                    className={`p-4 rounded-lg border border-border ${quote.status === "new" ? "bg-blue-500/5 border-blue-500/20" : "bg-secondary/30"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                                <span className="font-semibold text-foreground text-lg">{quote.name}</span>
                                                                <Badge className={`${getStatusColor(quote.status)} text-white`}>
                                                                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 text-sm">
                                                                <a
                                                                    href={`mailto:${quote.email}`}
                                                                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                                                                >
                                                                    <Mail className="w-4 h-4" />
                                                                    {quote.email}
                                                                </a>
                                                                <a
                                                                    href={`tel:${quote.phone}`}
                                                                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                                                                >
                                                                    <Phone className="w-4 h-4" />
                                                                    {quote.phone}
                                                                </a>
                                                            </div>
                                                            <p className="text-foreground whitespace-pre-wrap">{quote.message}</p>
                                                            <p className="text-xs text-muted-foreground mt-3">
                                                                Submitted: {new Date(quote.createdAt).toLocaleString()} | IP: {quote.ip}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <Select
                                                                value={quote.status}
                                                                onValueChange={(value) => handleUpdateQuoteStatus(quote.id, value as Quote["status"])}
                                                            >
                                                                <SelectTrigger className="w-32">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="new">New</SelectItem>
                                                                    <SelectItem value="contacted">Contacted</SelectItem>
                                                                    <SelectItem value="completed">Completed</SelectItem>
                                                                    <SelectItem value="archived">Archived</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="text-muted-foreground hover:text-destructive"
                                                                onClick={() => handleDeleteQuote(quote.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="socials">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Social Links
                                </CardTitle>
                                <CardDescription>Manage website footer social links.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <PhoneIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>Social Link</p>
                                    <p className="text-sm">This feature has not been implemented yet.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
