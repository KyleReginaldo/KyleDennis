import {
  ClipboardList,
  Cloud,
  Code2,
  Layers,
  Lightbulb,
  Rocket,
  ServerCog,
  TestTube2,
  Wrench,
  type LucideIcon,
} from "lucide-react"

export type ProcessStep = {
  title: string
  description: string
  icon: LucideIcon
}

export const process: ProcessStep[] = [
  {
    title: "Discovery",
    description: "Understand the product goals, users, and constraints before writing a line of code.",
    icon: Lightbulb,
  },
  {
    title: "Planning",
    description: "Break the product into milestones, define scope, and choose the right architecture up front.",
    icon: ClipboardList,
  },
  {
    title: "UI Development",
    description: "Translate designs into pixel-perfect, responsive Flutter UI with smooth micro-interactions.",
    icon: Code2,
  },
  {
    title: "Architecture",
    description: "Set up a scalable, feature-first structure with clean separation between UI, logic, and data.",
    icon: Layers,
  },
  {
    title: "Backend Integration",
    description: "Wire up APIs, authentication, and realtime data so the app works with production data.",
    icon: ServerCog,
  },
  {
    title: "Testing",
    description: "Verify flows end-to-end across devices, catching edge cases before release.",
    icon: TestTube2,
  },
  {
    title: "CI/CD",
    description: "Automate builds, tests, and releases so shipping updates is fast and repeatable.",
    icon: Cloud,
  },
  {
    title: "Deployment",
    description: "Ship to the App Store and Google Play with proper versioning and release notes.",
    icon: Rocket,
  },
  {
    title: "Maintenance",
    description: "Monitor, fix, and iterate post-launch based on real user feedback and metrics.",
    icon: Wrench,
  },
]
