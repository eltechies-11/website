import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="section-pad relative scroll-mt-24">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            <div className="mt-5 space-y-3.5 text-base leading-relaxed text-fg/65 sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <aside className="relative overflow-hidden rounded-2xl border border-fg/10 bg-navy/80 p-6 sm:p-7">
              <div
                className="animate-pulse-glow pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan/15 blur-3xl"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                Mission
              </p>
              <p className="mt-3 text-xl font-medium leading-snug tracking-tight text-fg sm:text-2xl">
                {about.mission}
              </p>
              <div
                className="mt-6 h-px w-16 bg-gradient-to-r from-cyan to-blue"
                aria-hidden="true"
              />
              <p className="mt-5 text-sm leading-relaxed text-fg/55">
                {siteConfig.tagline}
              </p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
