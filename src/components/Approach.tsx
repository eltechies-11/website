import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Approach() {
  const { approach } = siteConfig;

  return (
    <section id="approach" className="relative scroll-mt-24 bg-navy py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={approach.eyebrow} title={approach.title} />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-12">
          {approach.items.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <div className="relative pl-5 before:absolute before:left-0 before:top-1 before:h-10 before:w-px before:bg-gradient-to-b before:from-cyan before:to-blue">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-[0.9375rem]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
