"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    key: "hero",
    image: "/images/hero-printing-press.jpg",
    imageAlt: "Professional printing press in action",
    headline: ["VISUALIZE.", "INNOVATE.", "PRINT."],
    subtext: "Your Partner in Visual Communications & Packaging",
    cta: { label: "Explore Services", href: "/services" },
  },
  {
    key: "customize",
    image: "/images/hero-customize.jpg",
    imageAlt: "Preview your custom shirt design",
    headline: ["DESIGN.", "PREVIEW.", "ORDER."],
    subtext: "See your artwork on any garment before you buy — then order in minutes.",
    cta: { label: "Customize Now", href: "/customize" },
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)

  const goTo = (idx) => {
    if (animating || idx === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 300)
  }

  const next = () => goTo((current + 1) % slides.length)
  const prev = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => clearInterval(intervalRef.current)
  }, [current, animating])

  const slide = slides[current]

  return (
    <section className="relative pt-20 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        key={slide.key}
        src={slide.image}
        alt={slide.imageAlt}
        fill
        className="object-cover"
        priority
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease" }}
      />
      <div className="absolute inset-0 bg-primary/70" />

      {/* Content */}
      <div
        className="relative z-10 container mx-auto px-6 py-24"
        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary-foreground leading-none mb-6">
            {slide.headline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-light">
            {slide.subtext}
          </p>
          <div className="flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/80 text-base font-bold uppercase tracking-wider h-14 px-10 rounded-sm"
            >
              <Link href={slide.cta.href}>{slide.cta.label}</Link>
            </Button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 ml-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary-foreground"
                      : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}