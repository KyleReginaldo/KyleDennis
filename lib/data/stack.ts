export type TechIcon = { type: "image"; src: string } | { type: "lucide"; Icon: import("lucide-react").LucideIcon }

export type TechItem = {
  name: string
  years: string
  description: string
  icon: TechIcon
}

export type TechCategory = {
  name: string
  items: TechItem[]
}

function img(slug: string, variant = "default"): TechIcon {
  return { type: "image", src: `https://thesvg.org/icons/${slug}/${variant}.svg` }
}

export function proficiencyFromYears(years: string): { label: string; value: number } {
  const n = parseFloat(years)
  if (isNaN(n) || years.includes("month")) return { label: "Familiar", value: 40 }
  if (n >= 4) return { label: "Expert", value: 90 }
  if (n >= 2) return { label: "Advanced", value: 75 }
  if (n >= 1) return { label: "Intermediate", value: 60 }
  return { label: "Familiar", value: 40 }
}

export const stack: TechCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", years: "4 years", description: "Typed superset of JavaScript that compiles to plain JavaScript for safer code", icon: img("typescript") },
      { name: "JavaScript", years: "4 years", description: "Dynamic programming language for web development and interactive content", icon: img("javascript") },
      { name: "Python", years: "4 years", description: "High-level programming language for automation, data analysis, and backend development", icon: img("python") },
      { name: "Dart", years: "4 years", description: "Client-optimized language for building fast apps on any platform with Flutter", icon: img("dart") },
    ],
  },
  {
    name: "Mobile & Frontend",
    items: [
      { name: "Flutter", years: "5 years", description: "Cross-platform mobile development framework for building beautiful native apps", icon: img("flutter") },
      { name: "React", years: "4 years", description: "JavaScript library for building user interfaces with component-based architecture", icon: img("react") },
      { name: "React Native", years: "4 years", description: "Framework for building native iOS and Android apps from a single JavaScript codebase using React", icon: img("reactnative", "wordmark") },
      { name: "Next.js", years: "4 years", description: "React framework for production-grade applications with hybrid static and server rendering", icon: img("nextdotjs") },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "NestJS", years: "4 years", description: "Progressive Node.js framework for building efficient and scalable server-side applications", icon: img("nestjs") },
      { name: "Prisma", years: "3 years", description: "Next-generation ORM for Node.js and TypeScript with type-safe database access", icon: img("prisma") },
    ],
  },
  {
    name: "Data & Backend Services",
    items: [
      { name: "Supabase", years: "4 years", description: "Open source Firebase alternative with Postgres database, authentication, and real-time subscriptions", icon: img("supabase") },
      { name: "Firebase", years: "4 years", description: "Google's platform for mobile and web app development with real-time database and hosting", icon: img("firebase") },
      { name: "Neon", years: "2 years", description: "Serverless Postgres with branching, autoscaling, and instant provisioning for modern apps", icon: img("neon") },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "AWS", years: "1 year 2 months", description: "Amazon Web Services cloud computing platform for scalable infrastructure and services", icon: img("aws") },
      { name: "Docker", years: "4 years", description: "Containerization platform for building, shipping, and running applications", icon: img("docker") },
      { name: "Cloud Run", years: "4 years", description: "Fully managed serverless platform for deploying containerized applications", icon: img("gcp-cloud-run") },
      { name: "GitHub", years: "4 years", description: "Version control and collaboration platform for software development teams", icon: img("github") },
      { name: "Vite", years: "4 years", description: "Fast frontend build tool with instant server start and lightning-fast HMR", icon: img("vite") },
    ],
  },
  {
    name: "Payments & Communications",
    items: [
      { name: "Stripe", years: "4 years", description: "Payment processing platform for online businesses and e-commerce applications", icon: img("stripe") },
      { name: "Twilio", years: "4 years", description: "Communications platform for SMS, voice, and video messaging integration", icon: img("twilio") },
      { name: "SendGrid", years: "4 years", description: "Cloud-based email delivery service for transactional and marketing emails", icon: img("azure-sendgrid-accounts") },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Figma", years: "4 years", description: "Collaborative interface design tool for creating user interfaces and prototypes", icon: img("figma") },
      { name: "VS Code", years: "4 years", description: "Lightweight but powerful source code editor with extensive extension support", icon: img("visual-studio-code") },
      { name: "Postman", years: "4 years", description: "API development and testing tool for building and debugging REST APIs", icon: img("postman") },
    ],
  },
]

export const stackFlat = stack.flatMap((c) => c.items)
