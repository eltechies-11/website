import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { cta } = siteConfig;

  return (
    <section className="relative bg-navy py-20 sm:py-24" aria-label="Call to action">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(0,209,255,0.12),rgba(30,64,175,0.18)_45%,rgba(2,8,23,0.9))] px-6 py-12 text-center sm:px-10 sm:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(0,209,255,0.2), transparent 35%), radial-gradient(circle at 80% 80%, rgba(30,64,175,0.25), transparent 40%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 text-pretty text-base text-white/65 sm:text-lg">
                {cta.description}
              </p>
              <div className="mt-8 flex justify-center">
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
