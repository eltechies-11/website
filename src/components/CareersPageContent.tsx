import { Briefcase, Clock3, MapPin, Wallet } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/InquiryForm";

export function CareersPageContent() {
  const opening = siteConfig.careers.openings[0];

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={siteConfig.careers.eyebrow}
              title={siteConfig.careers.pageTitle}
              description={siteConfig.careers.pageSupport}
            />
          </Reveal>
        </Container>
      </section>

      <section className="section-pad relative pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-7">
              {siteConfig.careers.openings.map((role, index) => (
                <Reveal key={role.id} delayMs={index * 60}>
                  <article
                    id={role.id}
                    className="scroll-mt-28 rounded-2xl border border-fg/10 bg-navy-elevated/60 p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
                        {role.type}
                      </span>
                      <span className="rounded-md border border-fg/10 bg-fg/5 px-2.5 py-1 text-xs font-medium text-fg/70">
                        Open
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                      {role.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-fg/70">{role.summary}</p>

                    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                      <MetaItem icon={Wallet} label="Compensation" value={role.compensation} />
                      <MetaItem icon={Clock3} label="Commitment" value={role.commitment} />
                      <MetaItem icon={MapPin} label="Location" value={role.location} />
                      <MetaItem icon={Briefcase} label="Model" value="Freelance · Commission only" />
                    </dl>

                    <div className="mt-8 space-y-4 border-t border-fg/10 pt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-fg/50">
                        About the role
                      </h3>
                      {role.description.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-fg/70">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-fg/50">
                          What you’ll do
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {role.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="relative pl-4 text-sm leading-relaxed text-fg/70 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-fg/50">
                          Ideal for
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {role.idealFor.map((item) => (
                            <li
                              key={item}
                              className="relative pl-4 text-sm leading-relaxed text-fg/70 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-8 rounded-xl border border-amber-500/25 bg-amber-400/10 px-4 py-3 text-sm leading-relaxed text-fg/80">
                      Important: this is a freelance, flexible, commission-based role. There is no
                      fixed or upfront salary—earnings depend on closed business.
                    </p>

                    <a
                      href="#apply"
                      className="mt-6 inline-flex text-sm font-semibold text-cyan underline-offset-2 hover:underline"
                    >
                      Apply for this role →
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="lg:col-span-5">
              <Reveal delayMs={100}>
                <div
                  id="apply"
                  className="scroll-mt-28 sticky top-24 rounded-2xl border border-fg/10 bg-navy-elevated/60 p-5 sm:p-6"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-fg">
                    Apply now
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg/55">
                    Select the role, share a short note, and optionally attach your resume. We’ll
                    reply at{" "}
                    <a
                      href={`mailto:${siteConfig.careers.email}`}
                      className="font-medium text-cyan underline-offset-2 hover:underline"
                    >
                      {siteConfig.careers.email}
                    </a>
                    .
                  </p>
                  <div className="mt-5">
                    <InquiryForm
                      type="career"
                      idPrefix="career"
                      fallbackEmail={siteConfig.careers.email}
                      submitLabel="Submit Application"
                      messagePlaceholder="Share your sales background, markets you know, and why this freelance commission model fits you."
                      defaultRole={opening?.applyRoleValue}
                      className="border-fg/8 bg-navy/60"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-fg/8 bg-navy/40 px-3.5 py-3">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-fg/40">
        <Icon className="h-3.5 w-3.5 text-cyan" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-snug text-fg/85">{value}</dd>
    </div>
  );
}
