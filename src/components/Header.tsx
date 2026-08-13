"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

function sectionFromHashHref(href: string) {
  if (!href.includes("#")) return "";
  return `#${href.split("#")[1] ?? ""}`;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const onCareers = pathname === "/careers";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (onCareers) return;

    const sectionIds = [
      "home",
      "services",
      "work",
      "testimonials",
      "about",
      "approach",
      "process",
      "contact",
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          const href = `#${visible.target.id}`;
          if (["#home", "#services", "#work", "#about", "#contact"].includes(href)) {
            setActiveSection(href);
          } else if (href === "#testimonials") {
            setActiveSection("#work");
          } else if (href === "#approach" || href === "#process") {
            setActiveSection("#about");
          }
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onCareers]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/careers") return onCareers;
    if (onCareers) return false;
    return sectionFromHashHref(href) === activeSection;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-fg/8 bg-navy/85 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.25rem]">
        <a
          href="/#home"
          className="group relative flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          onClick={closeMenu}
        >
          <BrandLogo priority className="transition duration-300 group-hover:scale-[1.03]" />
          <span className="ml-3 text-xl font-semibold leading-none tracking-tight text-fg sm:text-2xl">
            <span className="text-fg">EL</span>
            <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
              techies
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy lg:px-3",
                isActive(item.href) ? "text-cyan" : "text-fg/70 hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle className="ml-1 lg:ml-2" />
          <Button href="/#contact" size="md" className="ml-1 lg:ml-2">
            Let&apos;s Talk
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-fg/10 text-fg transition hover:border-cyan/40 hover:bg-fg/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-fg/8 bg-navy/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              tabIndex={open ? 0 : -1}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                isActive(item.href)
                  ? "bg-fg/5 text-cyan"
                  : "text-fg/80 hover:bg-fg/5 hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button
            href="/#contact"
            size="lg"
            className="mt-2 w-full"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            Let&apos;s Talk
          </Button>
        </nav>
      </div>
    </header>
  );
}
