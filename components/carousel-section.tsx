"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const slides = [
  {
    title: "Custom Branded Packaging",
    description:
      "Professional packaging boxes and labels designed to make your products stand out on any shelf.",
    image: "/images/portfolio-packaging.jpg",
  },
  {
    title: "Large Format Signage",
    description:
      "Vinyl banners, wall wraps, and storefront signage that commands attention.",
    image: "/images/portfolio-largeformat.jpg",
  },
  {
    title: "Marketing Collateral",
    description:
      "Flyers, brochures, business cards, and promotional materials with fast turnaround.",
    image: "/images/portfolio-commercial.jpg",
  },
  {
    title: "Creative Design Services",
    description:
      "Brand identity, logo design, and creative concepts to elevate your visual communications.",
    image: "/images/portfolio-creative.jpg",
  },
]

export function CarouselSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="portfolio" className="py-20 px-6 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Work
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </div>

        <div className="relative mt-14 rounded-lg overflow-hidden shadow-xl">
          <div className="relative aspect-[16/7]">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-10 md:px-16 max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
                  {slides[current].title}
                </h3>
                <p className="text-primary-foreground/90 text-lg">
                  {slides[current].description}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={prev}
            size="icon"
            variant="ghost"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 text-primary-foreground backdrop-blur"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={next}
            size="icon"
            variant="ghost"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 text-primary-foreground backdrop-blur"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-8 bg-secondary"
                    : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
