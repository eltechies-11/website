import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type PortfolioProps = {
  /** Use on the standalone /portfolio page */
  standalone?: boolean;
};

export function Portfolio({ standalone = false }: PortfolioProps) {
  const { work } = siteConfig;

  return (
    <section
      id={standalone ? "portfolio" : "work"}
      className={cn(
        "relative scroll-mt-24",
        standalone
          ? "pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
          : "section-pad !py-12 sm:!py-14 lg:!py-16",
      )}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={work.eyebrow}
            title={standalone ? work.pageTitle : work.title}
            description={standalone ? work.pageSupport : work.description}
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">
          {work.projects.map((project, index) => {
            const isWide = "wide" in project && project.wide;

            return (
              <Reveal
                key={project.id}
                delayMs={index * 70}
                className={cn("h-full", isWide && "lg:col-span-2")}
              >
                <article className="group shine-border flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-navy/80 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_22px_60px_rgba(0,0,0,0.4)]">
                  <div
                    className={cn(
                      "relative overflow-hidden border-b border-fg/8 bg-navy",
                      isWide ? "aspect-[2.2/1] sm:aspect-[2.6/1]" : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes={
                        isWide
                          ? "100vw"
                          : "(min-width: 1024px) 50vw, 100vw"
                      }
                      className={cn(
                        "object-cover transition duration-500 ease-out group-hover:scale-[1.03]",
                        isWide ? "object-center" : "object-top",
                      )}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent opacity-80"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                      {project.category}
                    </p>
                    <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl flex-1 text-sm leading-relaxed text-fg/65">
                      {project.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-fg/15 bg-navy-elevated px-3.5 py-2 text-sm font-medium text-fg/85 transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
