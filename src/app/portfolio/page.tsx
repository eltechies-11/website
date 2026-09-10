import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { Portfolio } from "@/components/Portfolio";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description: siteConfig.work.pageSupport,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: `Portfolio | ${siteConfig.name}`,
    description: siteConfig.work.pageSupport,
    url: `${siteConfig.url}/portfolio`,
  },
};

export default function PortfolioPage() {
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
        <Portfolio standalone />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
