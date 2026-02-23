import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Spanish Town, St. Catherine, Jamaica" },
  { icon: Phone, label: "Phone", value: "+1 (876) XXX-XXXX" },
  { icon: Mail, label: "Email", value: "info@robinsonsprintworks.com" },
  { icon: Clock, label: "Hours", value: "Mon-Fri 8am-6pm | Sat 9am-4pm" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get in Touch
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-pretty">
            Ready to elevate your brand with professional printing and packaging? Contact us for a free quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-14">
          <div className="flex flex-col gap-5">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-muted p-5 rounded-lg"
                >
                  <div className="bg-secondary/10 text-secondary p-3 rounded-lg shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-bold text-foreground mb-6">Request a Quote</h3>
            <form className="flex flex-col gap-4">
              <Input placeholder="Your Name" className="h-12 bg-background border-border" />
              <Input type="email" placeholder="Your Email" className="h-12 bg-background border-border" />
              <Input type="tel" placeholder="Phone Number" className="h-12 bg-background border-border" />
              <Textarea
                placeholder="Tell us about your project (packaging, signage, marketing materials, etc.)..."
                className="min-h-32 bg-background border-border"
              />
              <Button className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold uppercase tracking-wider rounded-sm">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
