import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-navy py-12 sm:py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Image
                src={siteConfig.assets.logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                <span>EL</span>
                <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
                  techies
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {siteConfig.footer.blurb}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
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
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-white/35">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
