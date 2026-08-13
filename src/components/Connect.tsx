"use client";

import Link from "next/link";
import { BriefcaseBusiness, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/InquiryForm";

export function Connect() {
  return (
    <section id="contact" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.contact.eyebrow}
          title={siteConfig.contact.title}
          description={siteConfig.contact.description}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-fg/10 bg-navy-elevated/60 p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  Project inquiry
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">
                  Tell us what you’re building. We’ll reply with next steps, not a sales script.
                </p>

                <div className="mt-6 space-y-3 border-t border-fg/10 pt-5 text-sm text-fg/70">
                  <p>
                    Prefer email?{" "}
                    <a
                      href={`mailto:${siteConfig.emails.sales}`}
                      className="font-medium text-cyan underline-offset-2 hover:underline"
                    >
                      {siteConfig.emails.sales}
                    </a>
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg/45">
                      Call or WhatsApp
                    </p>
                    {siteConfig.phones.map((phone) => (
                      <div key={phone.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <a
                          href={`tel:${phone.tel}`}
                          className="font-medium text-fg transition hover:text-cyan"
                        >
                          {phone.display}
                        </a>
                        <a
                          href={`https://wa.me/${phone.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-cyan underline-offset-2 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </div>
                    ))}
                  </div>
                  <p>
                    <span className="text-fg/45">Based in </span>
                    <span className="text-fg">{siteConfig.location.display}</span>
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-fg/10 bg-navy/40 p-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
                      <BriefcaseBusiness className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-fg">Looking for a role?</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg/55">
                        See open positions and apply on our careers page.
                      </p>
                      <Link
                        href="/careers"
                        className="mt-2 inline-flex text-sm font-semibold text-cyan underline-offset-2 hover:underline"
                      >
                        View careers →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={80} className="lg:col-span-7">
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
