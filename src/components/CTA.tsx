import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteConfig;

  return (
    <section className="relative py-10 sm:py-12" aria-label="Call to action">
      <Container>
        <Reveal>
          <div className="cta-panel relative overflow-hidden rounded-3xl border border-fg/10 px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              className="animate-pulse-glow pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="animate-float pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-blue/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-3 text-pretty text-base text-fg/65 sm:text-lg">
                {cta.description}
              </p>
              <div className="mt-7 flex justify-center">
                <Button href={cta.button.href} size="lg">
                  {cta.button.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
