import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-20 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <Image
        src="/images/hero-printing-press.jpg"
        alt="Professional printing press in action"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary-foreground leading-none mb-6">
            VISUALIZE.
            <br />
            INNOVATE.
            <br />
            PRINT.
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 font-light">
            Your Partner in Visual Communications &amp; Packaging
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/80 text-base font-bold uppercase tracking-wider h-14 px-10 rounded-sm"
          >
            Explore Services
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
