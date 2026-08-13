import { MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { BrandLogo } from "@/components/BrandLogo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-fg/8 bg-navy/80 py-10 backdrop-blur-sm sm:py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <a
              href="/#home"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <BrandLogo sizes="48px" className="h-12 w-12 sm:h-12 sm:w-12" />
              <span className="text-xl font-semibold leading-none tracking-tight text-fg">
                <span>EL</span>
                <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
                  techies
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/55">
              {siteConfig.footer.blurb}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg/55">
              <MapPin className="h-4 w-4 text-cyan" aria-hidden="true" />
              {siteConfig.location.display}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fg/40">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg/70 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fg/40">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-fg/70">
              <li>
                <a
                  href={`mailto:${siteConfig.emails.sales}`}
                  className="transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  {siteConfig.emails.sales}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.emails.career}`}
                  className="transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  {siteConfig.emails.career}
                </a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone.tel} className="space-y-1.5">
                  <a
                    href={`tel:${phone.tel}`}
                    className="inline-flex items-center gap-2 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    <Phone className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                    {phone.display}
                  </a>
                  <a
                    href={`https://wa.me/${phone.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan/90 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-fg/8 pt-6 text-sm text-fg/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-fg/35">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
