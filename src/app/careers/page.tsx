import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { CareersPageContent } from "@/components/CareersPageContent";

export const metadata: Metadata = {
  title: "Careers",
  description: siteConfig.careers.pageSupport,
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: `Careers | ${siteConfig.name}`,
    description: siteConfig.careers.pageSupport,
    url: `${siteConfig.url}/careers`,
  },
};

export default function CareersPage() {
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
        <CareersPageContent />
      </main>
      <Footer />
    </>
  );
}
