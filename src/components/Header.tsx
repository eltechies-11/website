"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "services", "about", "approach", "process", "careers", "contact"];
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
          if (["#home", "#services", "#about", "#careers", "#contact"].includes(href)) {
            setActive(href);
          } else if (href === "#approach" || href === "#process") {
            setActive("#about");
          }
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-white/8 bg-navy/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.25rem]">
        <a
          href="#home"
          className="group relative flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          onClick={closeMenu}
        >
          <Image
            src={siteConfig.assets.logo}
            alt={`${siteConfig.name} logo`}
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10 transition group-hover:ring-cyan/40 sm:h-11 sm:w-11"
            priority
          />
          <span className="ml-3 text-[1.05rem] font-semibold tracking-tight text-white">
            <span className="text-white">EL</span>
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
                active === item.href
                  ? "text-cyan"
                  : "text-white/70 hover:text-white",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button href="#contact" size="md" className="ml-2 lg:ml-3">
            Let&apos;s Talk
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white transition hover:border-cyan/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden border-t border-white/8 bg-navy/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out",
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
                active === item.href
                  ? "bg-white/5 text-cyan"
                  : "text-white/80 hover:bg-white/5 hover:text-white",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button
            href="#contact"
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
