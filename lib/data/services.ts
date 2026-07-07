import {
  Cloud,
  Cpu,
  Layers,
  Paintbrush,
  Plug,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
}

export const services: Service[] = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform Flutter applications with native-like performance.",
    points: ["Single codebase for iOS & Android", "Pixel-perfect, responsive UI", "Smooth 60fps interactions"],
  },
  {
    icon: Layers,
    title: "Flutter Architecture",
    description:
      "Scalable architecture using Bloc, Provider, Riverpod, Clean Architecture, and feature-first development.",
    points: ["Feature-first project structure", "Testable, decoupled layers", "Built for teams to scale"],
  },
  {
    icon: Paintbrush,
    title: "UI Implementation",
    description: "Pixel-perfect UI from Figma with responsive layouts and smooth animations.",
    points: ["Figma-to-Flutter fidelity", "Responsive across devices", "Micro-interactions & motion"],
  },
  {
    icon: Plug,
    title: "Backend Integration",
    description: "REST APIs, GraphQL, Firebase, Supabase, authentication, push notifications, realtime database.",
    points: ["REST & GraphQL APIs", "Auth & push notifications", "Realtime data sync"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Google Cloud Platform, CI/CD, Codemagic, GitHub Actions, Fastlane, App Store & Play Store deployment.",
    points: ["Automated CI/CD pipelines", "Store-ready release management", "Cloud infrastructure on GCP"],
  },
  {
    icon: Cpu,
    title: "App Performance",
    description: "Performance optimization, state management, memory optimization, and rendering optimization.",
    points: ["Startup & rendering profiling", "Memory-conscious state management", "Built for scale"],
  },
]
