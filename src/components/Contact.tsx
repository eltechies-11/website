import { Mail } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/InquiryForm";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 bg-navy-soft py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={siteConfig.contact.eyebrow}
              title={siteConfig.contact.title}
              description={siteConfig.contact.description}
            />

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-3 rounded-lg text-white transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-navy text-cyan transition group-hover:border-cyan/30">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-white/45">
                    Sales
                  </span>
                  <span className="text-base font-medium">{siteConfig.contact.email}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <InquiryForm
              type="sales"
              idPrefix="sales"
              fallbackEmail={siteConfig.contact.email}
              submitLabel="Send Message"
              messagePlaceholder="Tell us about your project, timeline, or question."
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
