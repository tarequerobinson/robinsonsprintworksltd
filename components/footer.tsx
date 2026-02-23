import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CMYK color stripe */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-secondary" />
        <div className="flex-1 bg-yellow" />
        <div className="flex-1 bg-primary-foreground" />
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Image
              src="/images/robinsons-logo.png"
              alt="Robinson's Printworks"
              width={220}
              height={62}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-primary-foreground/70 max-w-md leading-relaxed">
              Your trusted partner for visual communications and packaging solutions. From custom packaging and labels
              to large-format branding and marketing materials, we bring your brand to life.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-primary-foreground/70">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Custom Packaging
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Large-Format Branding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Marketing Materials
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">
                  Labels &amp; Stickers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-primary-foreground/70">
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-secondary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} Robinson{"'"}s Printworks Ltd. All rights reserved. Spanish Town, St.
            Catherine, Jamaica
          </p>
        </div>
      </div>
    </footer>
  )
}
