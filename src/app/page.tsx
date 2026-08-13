import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <SiteAtmosphere />
      <Header />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <About />
        <Approach />
        <Process />
        <CTA />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
