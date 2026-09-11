export const siteConfig = {
  name: "ELtechies",
  legalName: "ELtechies",
  tagline: "Two minds. One vision. Infinite possibilities.",
  domain: "eltechies.com",
  url: "https://eltechies.com",
  emails: {
    sales: "sales@eltechies.com",
    career: "careers@eltechies.com",
  },
  phones: [
    {
      label: "Enquiry",
      display: "+91 82003 70741",
      tel: "+918200370741",
      whatsapp: "918200370741",
    },
    {
      label: "Enquiry",
      display: "+91 81602 37836",
      tel: "+918160237836",
      whatsapp: "918160237836",
    },
  ],
  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    display: "Ahmedabad, Gujarat",
  },
  description:
    "ELtechies is an IT startup that designs and builds web applications, mobile apps, and custom software for teams that need clear thinking and reliable delivery.",
  shortDescription:
    "Web, mobile, and custom software development for modern teams.",
  assets: {
    logo: "/images/logo-mark.png",
    logoLight: "/images/logo-mark-light.png",
    heroBanner: "/images/hero-banner-4k.png",
    heroBannerLight: "/images/hero-banner-light-4k.png",
    ogImage: "/images/hero-banner-4k.png",
  },
  nav: [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/#about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "Web · Mobile · Custom Software",
    headline: "Software built carefully for the way you work.",
    support:
      "We design and develop web platforms, mobile apps, and custom software—helping teams turn ideas into reliable digital products.",
    primaryCta: { label: "Let's Talk", href: "/#contact" },
    secondaryCta: { label: "View Portfolio", href: "/portfolio" },
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
  work: {
    eyebrow: "Portfolio",
    title: "Products we've designed and shipped.",
    description:
      "A selection of live mobile apps and web experiences—from sports platforms and social products to wellness and personal development.",
    pageTitle: "Products we've designed and shipped.",
    pageSupport:
      "Browse live apps and websites we've built—open any project for the website or store listing.",
    projects: [
      {
        id: "racquet-heroes",
        title: "Racquet Heroes",
        category: "Mobile App · Website",
        summary:
          "An all-in-one scoring and tournament platform for badminton, tennis, pickleball, padel, table tennis, and squash—live score sharing, custom draws, scheduling, and match analytics.",
        image: "/images/portfolio/racquet-heroes-phones.jpg",
        imageAlt:
          "Racquet Heroes app screens for live scoring, tournaments, custom draws, and match analytics",
        wide: true,
        links: [
          { label: "Website", href: "https://racquetheroes.com/" },
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.racquetheroes.racquetheroes",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/us/app/racquet-heroes-score-share/id6473603119",
          },
        ],
      },
      {
        id: "intrsting",
        title: "Intrsting",
        category: "Mobile App · Website",
        summary:
          "A social connection platform built for intentional meetups—replacing endless swipes with real conversations, scheduling, and purpose-led matching.",
        image: "/images/portfolio/intrsting-web.jpg",
        imageAlt:
          "Intrsting website hero with yellow brand backdrop and connection messaging",
        links: [
          { label: "Website", href: "https://intrsting.com/" },
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.app.intrsting",
          },
        ],
      },
      {
        id: "soothify",
        title: "Soothify",
        category: "Mobile App · Website",
        summary:
          "Daily affirmations, manifestation journeys, and guided audio tracks that help people rewire limiting beliefs and build calmer, more intentional routines.",
        image: "/images/portfolio/soothify-web.jpg",
        imageAlt:
          "Soothify marketing site with app mockups and download calls to action",
        links: [
          { label: "Website", href: "https://soothify.app/" },
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.soothify.app",
          },
        ],
      },
      {
        id: "inspire-idp",
        title: "Inspire IDP",
        category: "Mobile App",
        summary:
          "An individual development companion for athletes and coaches—SMART goals, progress tracking, role-based workflows, and focused skill improvement.",
        image: "/images/portfolio/inspireidp-phones.jpg",
        imageAlt:
          "Inspire IDP app screens showing goals, progress charts, and athlete-coach roles",
        wide: true,
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.inspireidp.app",
          },
        ],
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What partners say after we ship.",
    description:
      "Feedback from founders and operators we’ve worked with—focused on delivery, communication, and software that stays usable.",
    items: [
      {
        id: "ananya",
        quote:
          "ELtechies didn’t just build screens—they helped us define the workflow first. The operations portal finally matches how our team actually works day to day.",
        name: "Ananya Mehta",
        role: "Head of Operations",
        company: "Northline Logistics",
      },
      {
        id: "daniel",
        quote:
          "Clear updates, sensible trade-offs, and a mobile app our patients could use without training. That’s rare. We felt like we had a product partner, not a ticket queue.",
        name: "Daniel Okonkwo",
        role: "Product Lead",
        company: "Haven Care Clinics",
      },
      {
        id: "priya",
        quote:
          "Our billing process used to live in someone’s head. Now it’s documented in software we understand. Launch was calm, and support after go-live has been solid.",
        name: "Priya Shah",
        role: "Finance Director",
        company: "Ledgerly Finance",
      },
      {
        id: "marcus",
        quote:
          "They kept the AI work practical. We got alerts that store managers trust—and a dashboard that doesn’t need a weekly explanation from IT.",
        name: "Marcus Ellison",
        role: "VP Retail Systems",
        company: "Orbit Retail Group",
      },
    ],
  },
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
    description: "Four clear stages—so you always know where we are and what’s next.",
    steps: [
      {
        number: "01",
        title: "Understand",
        description:
          "We learn your goals, constraints, and users before writing a line of code.",
        icon: "search" as const,
      },
      {
        number: "02",
        title: "Plan",
        description:
          "Scope, milestones, and technical direction are agreed in plain language.",
        icon: "map" as const,
      },
      {
        number: "03",
        title: "Build",
        description:
          "We ship in focused iterations with regular demos and feedback loops.",
        icon: "code" as const,
      },
      {
        number: "04",
        title: "Launch & support",
        description:
          "We help you release confidently and stay available for what comes after.",
        icon: "rocket" as const,
      },
    ],
  },
  cta: {
    title: "Have an idea or project in mind?",
    description:
      "Let’s discuss how we can turn it into a reliable digital product.",
    button: { label: "Start a Conversation", href: "/#contact" },
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
      "We’re a lean IT startup. Right now we’re hiring hungry closers who want flexibility and uncapped earning potential.",
    email: "careers@eltechies.com",
    pageTitle: "Careers at ELtechies",
    pageSupport:
      "Browse open roles and apply with your resume. We’re transparent about how each role works—including pay model and expectations.",
    roleOptions: [
      {
        value: "BDE (Freelance) — Commission-based",
        label: "BDE (Freelance) — Commission-based",
      },
      {
        value: "Other / General application",
        label: "Other / General application",
      },
    ],
    openings: [
      {
        id: "bde-freelance",
        title: "Business Development Executive (BDE)",
        type: "Freelance",
        compensation: "Commission-based (no fixed / upfront salary)",
        location: "Remote-friendly · Ahmedabad, Gujarat",
        commitment: "Flexible hours",
        summary:
          "Help ELtechies win web, mobile, and custom software projects. You own outreach, discovery conversations, and closing—while we deliver the work.",
        description: [
          "ELtechies is looking for a freelance Business Development Executive to bring in qualified leads and close software projects. This is not a salaried role.",
          "You work on a commission-based model with flexible hours—ideal if you’re self-driven, comfortable with sales conversations, and want earnings tied to results rather than a fixed monthly paycheck.",
          "There is no upfront / fixed salary. Compensation is performance-linked commission on closed business, agreed clearly before you start.",
        ],
        responsibilities: [
          "Identify and reach out to startups and businesses that need web, app, or custom software work",
          "Run discovery calls, understand requirements, and qualify opportunities",
          "Coordinate with the ELtechies team on proposals and next steps",
          "Follow up professionally and help close deals",
        ],
        idealFor: [
          "People with sales / BDE / client-facing experience (fresher hustlers welcome if you’re coachable)",
          "Strong communication in English / Hindi / Gujarati",
          "Comfortable working freelance with flexible timing",
          "Motivated by commission and ownership, not a fixed salary",
        ],
        applyRoleValue: "BDE (Freelance) — Commission-based",
      },
    ],
  },
  footer: {
    blurb:
      "ELtechies builds web, mobile, and custom software with clarity and care.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type ServiceIcon = (typeof siteConfig.services)[number]["icon"];
export type InquiryType = "sales" | "career";
