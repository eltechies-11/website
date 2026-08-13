import { Quote } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const { testimonials } = siteConfig;

  return (
    <section
      id="testimonials"
      className="section-pad relative scroll-mt-24"
      aria-label="Testimonials"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            description={testimonials.description}
          />
        </Reveal>

        <div className="mt-8 grid gap-3.5 sm:mt-10 md:grid-cols-2">
          {testimonials.items.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 60} className="h-full">
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-navy-elevated/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/25 hover:bg-navy-elevated sm:p-6">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/10 blur-2xl transition duration-500 group-hover:bg-cyan/20"
                  aria-hidden="true"
                />
                <Quote
                  className="mb-3 h-5 w-5 text-cyan/70 transition duration-300 group-hover:scale-110 group-hover:text-cyan"
                  aria-hidden="true"
                />
                <blockquote className="relative flex-1 text-pretty text-[0.95rem] leading-relaxed text-fg/75 sm:text-base">
                  “{item.quote}”
                </blockquote>
                <figcaption className="relative mt-5 flex items-center gap-3 border-t border-fg/8 pt-4">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-sm font-semibold text-cyan transition group-hover:shadow-[0_0_20px_rgba(0,209,255,0.25)]"
                    aria-hidden="true"
                  >
                    {initials(item.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg">{item.name}</p>
                    <p className="text-sm text-fg/50">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
