import { Award, Clock, Users, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Award,
    color: "text-accent bg-accent/10",
    title: "Professional Quality",
    description: "Industry-leading digital printing equipment and premium materials ensure exceptional results.",
  },
  {
    icon: Clock,
    color: "text-secondary bg-secondary/10",
    title: "Fast Turnaround",
    description: "Quick production times on marketing materials and corporate print jobs without compromising quality.",
  },
  {
    icon: Users,
    color: "text-primary bg-primary/10",
    title: "Strong B2B Relationships",
    description: "A reliable mid-tier printing partner built on trust, consistently delivering for Jamaican businesses.",
  },
  {
    icon: Sparkles,
    color: "text-yellow bg-yellow/10",
    title: "Competitive Pricing",
    description: "High-margin custom packaging and print solutions at prices that work for SMEs and growing brands.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section id="about" className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose Robinson{"'"}s Printworks
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mt-4 text-pretty">
            We combine cutting-edge digital printing with personalized service to deliver outstanding visual
            communications and packaging.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={i} className="text-center">
                <div className={`inline-flex p-4 rounded-full ${b.color} mb-5`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{b.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
