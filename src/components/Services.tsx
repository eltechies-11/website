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
    <section id="services" className="relative scroll-mt-24 bg-navy py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What we build"
            description="Focused capabilities for teams that need dependable digital products—without the noise."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.id} delayMs={index * 70} className="h-full">
                <article className="group h-full rounded-2xl border border-white/10 bg-navy-elevated/80 p-6 transition duration-300 hover:border-cyan/25 hover:bg-navy-elevated sm:p-7">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10 text-cyan transition group-hover:border-cyan/40 group-hover:bg-cyan/15">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
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
