import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Package, Layers, Zap } from "lucide-react"

export function DigitalSignageSection() {
  return (
    <section id="packaging" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
            <Image
              src="/images/portfolio-packaging.jpg"
              alt="Custom branded packaging solutions"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">
              Packaging Solutions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Custom Branded Packaging for Your Products
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Stand out on the shelf with professionally designed and printed packaging. From custom boxes to branded
              labels and stickers, we help Jamaican businesses present their products with impact.
            </p>
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-2.5 rounded-lg shrink-0">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-0.5">Custom Packaging Boxes</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailored packaging designed to fit and protect your products
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 text-secondary p-2.5 rounded-lg shrink-0">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-0.5">Labels &amp; Branded Stickers</h4>
                  <p className="text-sm text-muted-foreground">
                    High-quality adhesive labels for product branding and compliance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-yellow/10 text-yellow p-2.5 rounded-lg shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-0.5">Fast Turnaround</h4>
                  <p className="text-sm text-muted-foreground">
                    Competitive pricing with quick production on custom packaging orders
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold uppercase tracking-wider rounded-sm h-12 px-8"
            >
              Get a Packaging Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
