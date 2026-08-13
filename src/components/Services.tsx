import { Cloud, Code2, Cpu, Globe2, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig, type ServiceIcon } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<ServiceIcon, LucideIcon> = {
  globe: Globe2,
  smartphone: Smartphone,
  code: Code2,
  cloud: Cloud,
  cpu: Cpu,
};

export function Services() {
  return (
    <section id="services" className="section-pad relative scroll-mt-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What we build"
            description="Focused capabilities for teams that need dependable digital products—without the noise."
          />
        </Reveal>

        <div className="mt-8 grid gap-3.5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delayMs={index * 60} className="h-full">
                <article className="group shine-border h-full rounded-2xl border border-fg/10 bg-navy-elevated/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:bg-navy-elevated hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan transition duration-300 group-hover:scale-110 group-hover:border-cyan/45 group-hover:bg-cyan/15 group-hover:shadow-[0_0_24px_rgba(0,209,255,0.25)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/60">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
