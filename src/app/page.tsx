import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Approach />
        <Process />
        <CTA />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
