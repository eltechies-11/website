import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="relative scroll-mt-24 bg-navy-soft py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={process.eyebrow} title={process.title} />
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 80}>
              <li className="relative">
                <p className="font-mono text-sm font-semibold tracking-wider text-cyan">
                  {step.number}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
