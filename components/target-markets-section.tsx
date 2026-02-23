import { Building2, ShoppingBag, Factory, GraduationCap, Store, Users } from "lucide-react"

const markets = [
  { icon: Building2, title: "SMEs", description: "Branded packaging, marketing collateral, and corporate print solutions" },
  { icon: ShoppingBag, title: "Retailers", description: "Product packaging, labels, stickers, and in-store signage" },
  { icon: Factory, title: "Manufacturers", description: "Custom packaging boxes, compliance labels, and bulk printing" },
  { icon: GraduationCap, title: "Institutions", description: "Educational materials, banners, posters, and promotional prints" },
  { icon: Store, title: "Businesses", description: "Vehicle wraps, vinyl banners, wall wraps, and storefront signage" },
  { icon: Users, title: "Individuals", description: "Personal branding, custom prints, and special occasion materials" },
]

export function TargetMarketsSection() {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Who We Serve
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {markets.map((market, index) => {
            const Icon = market.icon
            return (
              <div
                key={index}
                className="flex items-start gap-4 bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{market.title}</h3>
                  <p className="text-sm text-muted-foreground">{market.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
