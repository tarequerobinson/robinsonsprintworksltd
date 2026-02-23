import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { CarouselSection } from "@/components/carousel-section"
import { DigitalSignageSection } from "@/components/digital-signage-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { TargetMarketsSection } from "@/components/target-markets-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CarouselSection />
      <DigitalSignageSection />
      <WhyChooseUsSection />
      <TargetMarketsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
