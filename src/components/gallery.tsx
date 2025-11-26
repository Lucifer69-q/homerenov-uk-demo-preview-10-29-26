"use client"

import Image from "next/image"
import useSWR from "swr"

interface GalleryImage {
  url: string
  pathname: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function Gallery() {
  const { data, error, isLoading } = useSWR<{ files: GalleryImage[] }>("/api/gallery", fetcher)

  const defaultImages = [
    "/modern-white-living-room-interior.jpg",
    "/newly-installed-laminate-flooring-bedroom.jpg",
    "/renovated-modern-bathroom-tiles.jpg",
    "/painted-bedroom-fresh-walls.jpg",
    "/installed-wooden-flooring-dining-room.jpg",
    "/renovated-bathroom-modern-fixtures.jpg",
  ]

  const images = data?.files?.length ? data.files.map((f) => f.url) : defaultImages

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            See Our Completed Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our portfolio of completed interior renovations and see the quality of our work.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {defaultImages.map((src, index) => (
              <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Project ${index + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, index) => (
              <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden group">
                {src.startsWith("data:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Project ${index + 1}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Project ${index + 1}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-muted-foreground mt-8">
          On request, we can send you more photos and videos of our work directly on WhatsApp.
        </p>
      </div>
    </section>
  )
}
