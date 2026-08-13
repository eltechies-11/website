import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { hero, name, assets } = siteConfig;

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-16 sm:pt-[4.25rem]"
      aria-label="Hero"
    >
      <div className="hero-banner-shell relative w-full overflow-hidden">
        <Image
          src={assets.heroBanner}
          alt={`${name} — Two minds. One vision. Infinite possibilities.`}
          width={3840}
          height={2560}
          priority
          unoptimized
          sizes="100vw"
          className="banner-for-dark animate-banner-in h-auto w-full object-contain object-center"
        />
        <Image
          src={assets.heroBannerLight}
          alt=""
          width={1536}
          height={1024}
          priority
          unoptimized
          sizes="100vw"
          aria-hidden
          className="banner-for-light animate-banner-in h-auto w-full object-contain object-center"
        />
      </div>

      <Container className="relative pb-9 pt-6 sm:pb-11 sm:pt-8">
        <div className="mx-auto max-w-2xl text-center sm:max-w-3xl">
          <p className="animate-fade-up stagger-1 mb-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            {hero.eyebrow}
          </p>
          <h1 className="animate-fade-up stagger-2 text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-[2.25rem] lg:leading-snug">
            {hero.headline}
          </h1>
          <p className="animate-fade-up stagger-3 mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-fg/68 sm:text-lg">
            {hero.support}
          </p>
          <div className="animate-fade-up stagger-3 mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
    </section>
  );
}
