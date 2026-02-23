import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Package, Layers, Printer, Lightbulb } from "lucide-react"

const services = [
  {
    icon: Package,
    color: "text-accent bg-accent/10",
    title: "Packaging Design & Production",
    image: "/images/portfolio-packaging.jpg",
  },
  {
    icon: Layers,
    color: "text-secondary bg-secondary/10",
    title: "Commercial Printing",
    image: "/images/portfolio-commercial.jpg",
  },
  {
    icon: Printer,
    color: "text-primary bg-primary/10",
    title: "Large Format Printing",
    image: "/images/portfolio-largeformat.jpg",
  },
  {
    icon: Lightbulb,
    color: "text-yellow bg-yellow/10",
    title: "Creative & Digital Services",
    image: "/images/portfolio-creative.jpg",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Comprehensive Solutions
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group overflow-hidden border border-border hover:shadow-xl transition-all bg-background"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 text-center">
                  <div className={`inline-flex p-3 rounded-full ${service.color} mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{service.title}</h3>
                  <a
                    href="#contact"
                    className="text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
