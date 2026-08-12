import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { hero, name, tagline, assets } = siteConfig;

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-navy pt-16 sm:pt-[4.25rem]"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,209,255,0.12),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,64,175,0.18),transparent_40%)]" />
      </div>

      <Container className="relative pb-10 pt-14 sm:pb-12 sm:pt-16 lg:pt-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-cyan sm:text-[0.8125rem]">
            {hero.eyebrow}
          </p>

          <p className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            <span className="text-white">EL</span>
            <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
              techies
            </span>
          </p>

          <h1 className="text-balance text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl lg:text-[2.15rem] lg:leading-snug">
            {hero.headline}
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            {hero.support}
          </p>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-white/45">
            {tagline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative w-full border-y border-white/8">
        <Image
          src={assets.heroBanner}
          alt={`${name} brand banner with network mesh, digital cityscape, and core service areas`}
          width={1024}
          height={408}
          priority
          sizes="100vw"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
