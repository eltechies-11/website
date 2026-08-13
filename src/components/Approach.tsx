import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Approach() {
  const { approach } = siteConfig;

  return (
    <section id="approach" className="section-pad relative scroll-mt-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={approach.eyebrow} title={approach.title} />
        </Reveal>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
          {approach.items.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 70}>
              <div className="group relative pl-5 before:absolute before:left-0 before:top-1 before:h-10 before:w-px before:bg-gradient-to-b before:from-cyan before:to-blue before:transition before:duration-300 group-hover:before:shadow-[0_0_12px_rgba(0,209,255,0.6)]">
                <h3 className="text-lg font-semibold tracking-tight text-fg transition group-hover:text-cyan-soft">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60 sm:text-[0.9375rem]">
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
