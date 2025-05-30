// app/components/landing/Footer.tsx
import Link from 'next/link';

const footerLinks = {
  sana: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ],
  services: [
    { name: "Farrier Booking", href: "/services/farrier" },
    { name: "Veterinary Booking", href: "/services/vet" },
    { name: "Other Services", href: "/services/other" },
  ],
  platform: [
    { name: "Horse Profiles", href: "/profiles" },
    { name: "Product Marketplace", href: "/marketplace" },
  ],
  support: [
    { name: "FAQs", href: "/support/faq" },
    { name: "Help Center", href: "/support/help" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-sana-primary text-sana-neutral-light py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* SANA Logo/Name - Column 1 */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
            <h3 className="text-2xl font-bold text-sana-accent">SANA</h3>
            <p className="text-sm mt-2 font-elmessiri text-sana-neutral-light/80">
              Nurturing Excellence in Equestrian Care.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-sana-neutral-light mb-3">SANA</h4>
            <ul className="space-y-2">
              {footerLinks.sana.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/80">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sana-neutral-light mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/80">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sana-neutral-light mb-3">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/80">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-sana-neutral-light mb-3">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/80">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sana-neutral-light/30 pt-8 text-center">
          <p className="text-sm font-elmessiri text-sana-neutral-light/70">
            © {currentYear} SANA. All rights reserved. Riyadh, Saudi Arabia.
          </p>
          <div className="mt-2">
            <Link href="/privacy" className="text-xs hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/70 mx-2">
              Privacy Policy
            </Link>
            <span className="text-sana-neutral-light/70">|</span>
            <Link href="/terms" className="text-xs hover:text-sana-accent transition-colors font-elmessiri text-sana-neutral-light/70 mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}