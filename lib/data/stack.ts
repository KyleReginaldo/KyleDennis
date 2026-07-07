import {
  Boxes,
  Database,
  FolderTree,
  GitBranch,
  LayoutGrid,
  Navigation,
  Network,
  Puzzle,
  ShieldCheck,
  Share2,
  Waves,
  type LucideIcon,
} from "lucide-react"

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

function img(slug: string): TechIcon {
  return { type: "image", src: `https://thesvg.org/icons/${slug}/default.svg` }
}
function lucide(Icon: LucideIcon): TechIcon {
  return { type: "lucide", Icon }
}

export function proficiencyFromYears(years: string): { label: string; value: number } {
  const n = parseFloat(years)
  if (isNaN(n) || years.includes("month")) return { label: "Familiar", value: 40 }
  if (n >= 3) return { label: "Expert", value: 90 }
  if (n >= 2) return { label: "Advanced", value: 75 }
  if (n >= 1) return { label: "Intermediate", value: 60 }
  return { label: "Familiar", value: 40 }
}

export const stack: TechCategory[] = [
  {
    name: "Mobile",
    items: [
      { name: "Flutter", years: "4 years", description: "Cross-platform framework for building beautiful native apps", icon: img("flutter") },
      { name: "Dart", years: "4 years", description: "Client-optimized language for building fast apps on any platform", icon: img("dart") },
      { name: "Android", years: "4 years", description: "Native platform target shipped through Flutter", icon: img("android") },
      { name: "iOS", years: "4 years", description: "Native platform target shipped through Flutter", icon: img("apple") },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Firebase", years: "3 years", description: "Realtime database, auth, and hosting for mobile and web", icon: img("firebase") },
      { name: "Supabase", years: "3 years", description: "Open source Postgres backend with auth and realtime", icon: img("supabase") },
      { name: "REST API", years: "3 years", description: "Designing and consuming RESTful services", icon: lucide(Network) },
      { name: "GraphQL", years: "2 years", description: "Query language for flexible API data fetching", icon: img("graphql") },
      { name: "Node.js", years: "3 years", description: "JavaScript runtime powering NestJS services", icon: img("nodejs") },
    ],
  },
  {
    name: "Cloud",
    items: [
      { name: "Google Cloud Platform", years: "3 years", description: "Cloud infrastructure for production services", icon: img("google-cloud") },
      { name: "Cloud Functions", years: "2 years", description: "Serverless functions for backend logic", icon: img("gcp-cloud-functions") },
      { name: "Cloud Storage", years: "2 years", description: "Object storage for media and app assets", icon: img("gcp-cloud-storage") },
      { name: "Authentication", years: "3 years", description: "Secure auth flows via Firebase & Supabase", icon: lucide(ShieldCheck) },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "Codemagic", years: "2 years", description: "CI/CD tailored for Flutter release pipelines", icon: img("codemagic") },
      { name: "GitHub Actions", years: "2 years", description: "Automated build, test, and deploy workflows", icon: img("github-actions") },
      { name: "Git", years: "4 years", description: "Version control for every project", icon: img("git") },
      { name: "Fastlane", years: "2 years", description: "Automated App Store & Play Store releases", icon: img("fastlane") },
    ],
  },
  {
    name: "Payments",
    items: [
      { name: "Stripe", years: "3 years", description: "Payment processing for online businesses", icon: img("stripe") },
    ],
  },
  {
    name: "Communications",
    items: [
      { name: "Twilio", years: "3 years", description: "SMS, voice, and video messaging integration", icon: img("twilio") },
      { name: "SendGrid", years: "3 years", description: "Transactional and marketing email delivery", icon: img("azure-sendgrid-accounts") },
    ],
  },
  {
    name: "Maps",
    items: [
      { name: "Google Maps", years: "2 years", description: "Map rendering, geocoding, and directions", icon: img("google-maps") },
      { name: "Location Services", years: "2 years", description: "Realtime and background location tracking", icon: lucide(Navigation) },
    ],
  },
  {
    name: "Architecture",
    items: [
      { name: "Clean Architecture", years: "3 years", description: "Layered, testable, framework-independent design", icon: lucide(LayoutGrid) },
      { name: "MVVM", years: "3 years", description: "Model-View-ViewModel separation of concerns", icon: lucide(Share2) },
      { name: "Bloc", years: "4 years", description: "Predictable state management for Flutter", icon: lucide(Boxes) },
      { name: "Provider", years: "4 years", description: "Lightweight dependency & state provider pattern", icon: lucide(GitBranch) },
      { name: "Riverpod", years: "3 years", description: "Compile-safe, reactive state management", icon: lucide(Waves) },
      { name: "Dependency Injection", years: "3 years", description: "Decoupled, testable service composition", icon: lucide(Puzzle) },
      { name: "Repository Pattern", years: "3 years", description: "Abstracting data sources behind a clean interface", icon: lucide(Database) },
      { name: "Feature-first Architecture", years: "3 years", description: "Organizing code by feature for scale", icon: lucide(FolderTree) },
    ],
  },
]

export const stackFlat = stack.flatMap((c) => c.items)
