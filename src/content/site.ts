export const siteConfig = {
  name: "ELtechies",
  legalName: "ELtechies",
  tagline: "Two minds. One vision. Infinite possibilities.",
  domain: "eltechies.com",
  url: "https://eltechies.com",
  emails: {
    sales: "sales@eltechies.com",
    career: "career@eltechies.com",
  },
  description:
    "ELtechies is an IT startup that designs and builds web applications, mobile apps, and custom software for teams that need clear thinking and reliable delivery.",
  shortDescription:
    "Web, mobile, and custom software development for modern teams.",
  assets: {
    logo: "/images/logo.png",
    heroBanner: "/images/hero-banner.png",
    ogImage: "/images/hero-banner.png",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Web · Mobile · Custom Software",
    headline: "Software built carefully for the way you work.",
    support:
      "We design and develop web platforms, mobile apps, and custom software—helping teams turn ideas into reliable digital products.",
    primaryCta: { label: "Let's Talk", href: "#contact" },
    secondaryCta: { label: "Explore Services", href: "#services" },
  },
  services: [
    {
      id: "web",
      title: "Web Development",
      description:
        "Fast, accessible websites and web apps with clean architecture and maintainable code.",
      icon: "globe" as const,
    },
    {
      id: "app",
      title: "App Development",
      description:
        "Mobile experiences that feel native, stay performant, and support real user workflows.",
      icon: "smartphone" as const,
    },
    {
      id: "software",
      title: "Custom Software Development",
      description:
        "Purpose-built systems tailored to your processes—without unnecessary complexity.",
      icon: "code" as const,
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      description:
        "Deployment, environments, and tooling that keep releases predictable and infrastructure steady.",
      icon: "cloud" as const,
    },
    {
      id: "ai",
      title: "AI / ML Solutions",
      description:
        "Practical automation and intelligence layered into products where they create clear value.",
      icon: "cpu" as const,
    },
  ],
  about: {
    eyebrow: "About ELtechies",
    title: "A focused technology partner for thoughtful product work.",
    paragraphs: [
      "ELtechies is a new IT startup built around a simple idea: good software comes from clear requirements, careful engineering, and honest communication.",
      "We help startups and growing teams design, build, and ship digital products—preferring solutions that stay understandable long after launch.",
    ],
    mission:
      "To turn ambitious ideas into dependable software through craft, clarity, and long-term thinking.",
  },
  approach: {
    eyebrow: "Why work with us",
    title: "How we approach every engagement.",
    items: [
      {
        title: "Clear engineering",
        description:
          "We favor readable architecture, sensible defaults, and code that future you can maintain.",
      },
      {
        title: "User-focused design",
        description:
          "Interfaces are planned around real tasks—so products feel intuitive, not decorative.",
      },
      {
        title: "Transparent communication",
        description:
          "You always know what we’re building, why it matters, and what comes next.",
      },
      {
        title: "Built to scale",
        description:
          "We design for today’s scope while leaving room for tomorrow’s growth.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "A simple path from idea to release.",
    steps: [
      {
        number: "01",
        title: "Understand",
        description:
          "We learn your goals, constraints, and users before writing a line of code.",
      },
      {
        number: "02",
        title: "Plan",
        description:
          "Scope, milestones, and technical direction are agreed in plain language.",
      },
      {
        number: "03",
        title: "Build",
        description:
          "We ship in focused iterations with regular demos and feedback loops.",
      },
      {
        number: "04",
        title: "Launch & support",
        description:
          "We help you release confidently and stay available for what comes after.",
      },
    ],
  },
  cta: {
    title: "Have an idea or project in mind?",
    description:
      "Let’s discuss how we can turn it into a reliable digital product.",
    button: { label: "Start a Conversation", href: "#contact" },
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you’re building.",
    description:
      "Share a short note about your project. Our sales team will reply as soon as we can.",
    email: "sales@eltechies.com",
  },
  careers: {
    eyebrow: "Careers",
    title: "Build with us.",
    description:
      "Interested in joining ELtechies? Tell us about yourself and the kind of work you’re looking for.",
    email: "career@eltechies.com",
  },
  footer: {
    blurb:
      "ELtechies builds web, mobile, and custom software with clarity and care.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type ServiceIcon = (typeof siteConfig.services)[number]["icon"];
export type InquiryType = "sales" | "career";
