import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="relative scroll-mt-24 bg-navy-soft py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} title={about.title} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/65 sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy p-7 sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan/10 blur-3xl"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                Mission
              </p>
              <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
                {about.mission}
              </p>
              <div className="mt-8 h-px w-16 bg-gradient-to-r from-cyan to-blue" aria-hidden="true" />
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                {siteConfig.tagline}
              </p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
