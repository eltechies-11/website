import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projectAccents: Record<(typeof siteConfig.work.projects)[number]["id"], string> = {
  "northline-ops": "bg-gradient-to-br from-cyan/30 via-blue/20 to-transparent",
  "haven-care": "bg-gradient-to-br from-blue/35 via-cyan/15 to-transparent",
  ledgerly: "bg-gradient-to-br from-cyan/20 via-blue/30 to-transparent",
  "orbit-insights": "bg-gradient-to-br from-blue/25 via-cyan/25 to-transparent",
};

export function Portfolio() {
  const { work } = siteConfig;

  return (
    <section id="work" className="section-pad relative scroll-mt-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={work.eyebrow}
            title={work.title}
            description={work.description}
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">
          {work.projects.map((project, index) => (
            <Reveal key={project.id} delayMs={index * 70} className="h-full">
              <article className="group shine-border flex h-full flex-col overflow-hidden rounded-2xl border border-fg/10 bg-navy/80 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_22px_60px_rgba(0,0,0,0.4)]">
                <div
                  className={`relative min-h-[8.5rem] overflow-hidden sm:min-h-[10rem] ${projectAccents[project.id]}`}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,209,255,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(30,64,175,0.28),transparent_50%)] transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-full" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-fg/10 bg-navy/50 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-cyan-soft backdrop-blur-sm">
                    {project.category}
                  </div>
                  <p className="absolute bottom-5 left-5 right-5 text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    {project.title}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fg/40">
                    {project.client}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg/65">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-cyan-soft/90">
                    {project.outcome}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-fg/10 bg-navy-elevated px-2.5 py-1 text-xs text-fg/55 transition group-hover:border-cyan/20 group-hover:text-fg/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
