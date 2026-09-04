import { Blocks, Infinity as InfinityIcon, Webhook, type LucideIcon } from "lucide-react";

export type TechIcon = { type: "image"; src: string } | { type: "lucide"; Icon: LucideIcon }

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

/** For practices and products with no brand mark on thesvg.org. */
function lucide(Icon: LucideIcon): TechIcon {
  return { type: "lucide", Icon }
}

/**
 * Tech that is necessarily present whenever the key is used. Projects declare
 * only their headline framework, so without this a Flutter app never resolves
 * to Dart and a Next.js app never resolves to React.
 *
 * Keep entries factual, not aspirational: Flutter is written in Dart, Supabase
 * *is* Postgres. Tools that are merely likely (Docker, Figma) belong in a
 * project's own `techStack`, not here.
 */
const TECH_IMPLIES: Record<string, string[]> = {
  FlutterFlow: ["Flutter"],
  Flutter: ["Dart"],
  "Next.js": ["React", "TypeScript", "Node.js"],
  "React Native": ["React"],
  React: ["JavaScript"],
  NestJS: ["TypeScript", "Node.js", "REST APIs"],
  Prisma: ["TypeScript", "Node.js"],
  "Node.js": ["JavaScript"],
  TypeScript: ["JavaScript"],
  Supabase: ["PostgreSQL"],
  NeonDB: ["PostgreSQL"],
  Codemagic: ["CI/CD"],
}

/**
 * Expands a declared stack with everything those choices imply, transitively
 * (Next.js → TypeScript → JavaScript). Cycle-safe.
 */
export function expandTechStack(names: string[]): Set<string> {
  const out = new Set<string>()
  const queue = [...names]
  while (queue.length) {
    const name = queue.pop() as string
    if (out.has(name)) continue
    out.add(name)
    const implied = TECH_IMPLIES[name]
    if (implied) queue.push(...implied)
  }
  return out
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
      { name: "FlutterFlow", years: "2 years", description: "Visual builder for Flutter apps, generating real Dart code for handoff and customisation", icon: lucide(Blocks) },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "NestJS", years: "4 years", description: "Progressive Node.js framework for building efficient and scalable server-side applications", icon: img("nestjs") },
      { name: "Node.js", years: "4 years", description: "JavaScript runtime for building fast, event-driven server-side applications and tooling", icon: img("nodedotjs") },
      { name: "REST APIs", years: "4 years", description: "Resource-oriented HTTP API design — versioning, status codes, pagination, and auth", icon: lucide(Webhook) },
      { name: "Prisma", years: "3 years", description: "Next-generation ORM for Node.js and TypeScript with type-safe database access", icon: img("prisma") },
    ],
  },
  {
    name: "Database & Backend Services",
    items: [
      { name: "Supabase", years: "4 years", description: "Open source Firebase alternative with Postgres database, authentication, and real-time subscriptions", icon: img("supabase") },
      { name: "Firebase", years: "4 years", description: "Google's platform for mobile and web app development with real-time database and hosting", icon: img("firebase") },
      { name: "NeonDB", years: "2 years", description: "Serverless Postgres with branching, autoscaling, and instant provisioning for modern apps", icon: img("neon") },
      { name: "PostgreSQL", years: "4 years", description: "Open-source relational database system with advanced features", icon: img("postgresql") },
      { name: "MySQL", years: "4 years", description: "Popular open-source relational database management system", icon: img("mysql", "light") },
      { name: "MongoDB", years: "4 years", description: "NoSQL document database for building scalable applications", icon: img("mongodb") },
   
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "AWS", years: "1 year 2 months", description: "Amazon Web Services cloud computing platform for scalable infrastructure and services", icon: img("aws") },
      { name: "DynamoDB", years: "1 year 2 months", description: "Fully managed NoSQL key-value and document database for high-performance applications at any scale", icon: img("aws-amazon-dynamodb") },
      { name: "Lambda", years: "1 year 2 months", description: "Serverless compute service for running code in response to events without provisioning servers", icon: img("aws-aws-lambda") },
      { name: "API Gateway", years: "1 year 2 months", description: "Fully managed service for creating, publishing, and securing REST and WebSocket APIs at scale", icon: img("aws-amazon-api-gateway") },
      { name: "S3", years: "1 year 2 months", description: "Object storage service offering industry-leading scalability, durability, and availability", icon: img("aws-amazon-simple-storage-service") },
      { name: "SQS", years: "1 year 2 months", description: "Fully managed message queuing service for decoupling and scaling microservices and distributed systems", icon: img("aws-amazon-simple-queue-service") },
      { name: "SNS", years: "1 year 2 months", description: "Fully managed pub/sub messaging service for application-to-application and application-to-person communication", icon: img("aws-amazon-simple-notification-service") },
      { name: "EventBridge", years: "1 year 2 months", description: "Serverless event bus service for building event-driven applications at scale", icon: img("aws-amazon-eventbridge") },
      { name: "Cognito", years: "1 year 2 months", description: "Managed authentication, authorization, and user management for web and mobile applications", icon: img("aws-amazon-cognito") },
      { name: "CloudFront", years: "1 year 2 months", description: "Global content delivery network for fast, secure delivery of data, videos, and APIs", icon: img("aws-amazon-cloudfront") },
      { name: "RDS", years: "1 year 2 months", description: "Managed relational database service supporting Postgres, MySQL, and other popular engines", icon: img("aws-amazon-rds") },
      { name: "Step Functions", years: "1 year 2 months", description: "Serverless orchestration service for coordinating multi-step workflows across AWS services", icon: img("aws-aws-step-functions") },
      { name: "Secrets Manager", years: "1 year 2 months", description: "Managed service for securely storing, rotating, and retrieving credentials and API keys", icon: img("aws-aws-secrets-manager") },
      { name: "CloudWatch", years: "1 year 2 months", description: "Monitoring and observability service for logs, metrics, and alarms across AWS resources", icon: img("aws-amazon-cloudwatch") },
      { name: "Docker", years: "4 years", description: "Containerization platform for building, shipping, and running applications", icon: img("docker") },
      { name: "Google Cloud", years: "4 years", description: "Google's cloud platform for compute, storage, and managed services at scale", icon: img("googlecloud") },
      { name: "Cloud Run", years: "4 years", description: "Fully managed serverless platform for deploying containerized applications", icon: img("gcp-cloud-run") },
      { name: "Cloudflare", years: "2 years", description: "Edge network for DNS, CDN, DDoS protection, and serverless functions close to users", icon: img("cloudflare") },
      { name: "Git", years: "4 years", description: "Distributed version control — branching, rebasing, and history that survives a team", icon: img("git") },
      { name: "GitHub", years: "4 years", description: "Version control and collaboration platform for software development teams", icon: img("github") },
      { name: "CI/CD", years: "4 years", description: "Automated build, test, and release pipelines so shipping is routine rather than an event", icon: lucide(InfinityIcon) },
      { name: "Vite", years: "4 years", description: "Fast frontend build tool with instant server start and lightning-fast HMR", icon: img("vite") },
      { name: "Codemagic", years: "2 years", description: "CI/CD platform for automating builds, testing, and App Store and Play Store releases", icon: img("codemagic") },
    ],
  },
  {
    name: "Payments & Communications",
    items: [
      { name: "Stripe", years: "4 years", description: "Payment processing platform for online businesses and e-commerce applications", icon: img("stripe") },
      { name: "Twilio", years: "4 years", description: "Communications platform for SMS, voice, and video messaging integration", icon: img("twilio") },
      { name: "SendGrid", years: "4 years", description: "Cloud-based email delivery service for transactional and marketing emails", icon: img("azure-sendgrid-accounts") },
      { name: "Resend", years: "4 years", description: "Email delivery service for developers", icon: img("resend") },

    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Figma", years: "4 years", description: "Collaborative interface design tool for creating user interfaces and prototypes", icon: img("figma") },
      { name: "VS Code", years: "4 years", description: "Lightweight but powerful source code editor with extensive extension support", icon: img("visual-studio-code") },
      { name: "Postman", years: "4 years", description: "API development and testing tool for building and debugging REST APIs", icon: img("postman") },
      {name: 'Claude Code', years: '1 year', description: 'AI-powered code assistant for generating and understanding code snippets', icon: img('claude-code')},
      { name: "Swagger", years: "3 years", description: "API documentation tool for designing, building, and documenting REST APIs", icon: img("swagger") },
      { name: "Google Analytics", years: "2 years", description: "Web analytics platform for tracking traffic, conversions, and user behavior", icon: img("google-analytics") },
    ],
  },
]

export const stackFlat = stack.flatMap((c) => c.items)
