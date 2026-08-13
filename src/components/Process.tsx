import { Code2, Map, Rocket, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type ProcessIcon = (typeof siteConfig.process.steps)[number]["icon"];

const icons: Record<ProcessIcon, LucideIcon> = {
  search: Search,
  map: Map,
  code: Code2,
  rocket: Rocket,
};

export function Process() {
  const { process } = siteConfig;
  const lastIndex = process.steps.length - 1;

  return (
    <section id="process" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.08),transparent_65%)]"
        aria-hidden="true"
      />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={process.eyebrow}
            title={process.title}
            description={process.description}
          />
        </Reveal>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="mt-8 space-y-4 sm:mt-10 lg:hidden">
          {process.steps.map((step, index) => {
            const Icon = icons[step.icon];
            const isLast = index === lastIndex;
            return (
              <Reveal key={step.number} delayMs={index * 90}>
                <li className="group relative flex gap-4">
                  {!isLast ? (
                    <span
                      className="pointer-events-none absolute bottom-[-1rem] left-[1.625rem] top-[3.25rem] w-px -translate-x-1/2 bg-gradient-to-b from-cyan/45 via-cyan/25 to-blue/35"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <span className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border border-cyan/30 bg-navy-elevated text-cyan shadow-[0_0_24px_rgba(0,209,255,0.12)] transition duration-300 group-hover:scale-105 group-hover:border-cyan/55 group-hover:bg-cyan/10 group-hover:shadow-[0_0_28px_rgba(0,209,255,0.28)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <article className="min-w-0 flex-1 rounded-2xl border border-fg/10 bg-navy-elevated/70 p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan/30 group-hover:bg-navy-elevated sm:p-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan">
                        {step.number}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-cyan/30 to-transparent" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg/60">
                      {step.description}
                    </p>
                  </article>
                </li>
              </Reveal>
            );
          })}
        </ol>

        {/* Desktop: connected horizontal steps */}
        <ol className="relative mt-10 hidden lg:grid lg:grid-cols-4 lg:gap-5">
          {/* Line only between first and last icon centers — not past the last step */}
          <div
            className="process-line pointer-events-none absolute left-[12.5%] right-[12.5%] top-[1.75rem] h-px"
            aria-hidden="true"
          />
          {process.steps.map((step, index) => {
            const Icon = icons[step.icon];
            return (
              <Reveal key={step.number} delayMs={index * 100} className="h-full">
                <li className="group relative flex h-full flex-col">
                  <div className="relative z-10 mb-5 flex justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-navy text-cyan shadow-[0_0_28px_rgba(0,209,255,0.14)] transition duration-300 group-hover:scale-110 group-hover:border-cyan/60 group-hover:bg-cyan/10 group-hover:shadow-[0_0_36px_rgba(0,209,255,0.35)]">
                      <Icon
                        className="h-6 w-6 transition duration-300 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <article
                    className={cn(
                      "shine-border flex flex-1 flex-col rounded-2xl border border-fg/10 bg-navy-elevated/70 p-5 text-center transition duration-300",
                      "group-hover:-translate-y-1 group-hover:border-cyan/30 group-hover:bg-navy-elevated group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
                    )}
                  >
                    <p className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan">
                      STEP {step.number}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg/60">
                      {step.description}
                    </p>
                  </article>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
