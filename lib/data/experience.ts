export type ExperienceEntry = {
  company: string
  role: string
  location: string
  period: string
  current?: boolean
  logo?: string
  accent?: string
  responsibilities: string[]
  tech: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: "LabsToGo",
    role: "Full Stack Developer",
    location: "Virginia, USA",
    period: "May 2024 - Present",
    current: true,
    logo: "/assets/logos/mobilemedicallab-logo.webp",
    accent: "var(--chart-1)",
    responsibilities: [
      "Developed Flutter mobile apps for iOS and Android for on-demand medical lab bookings",
      "Built responsive booking web apps with Next.js across desktop and mobile",
      "Designed and maintained REST APIs with NestJS powering both clients",
      "Integrated Firebase Auth, Stripe, Twilio, and SendGrid for auth, payments, SMS, and email",
      "Set up CI/CD with Codemagic and published to the App Store and Google Play",
    ],
    tech: ["Flutter", "Next.js", "NestJS", "Firebase", "Stripe", "Twilio", "Codemagic"],
  },
  {
    company: "Servebeez",
    role: "Web Developer Intern",
    location: "Cavite, PH",
    period: "Feb 2026 - May 2026",
    logo: "/assets/logos/servebeez-logo.webp",
    accent: "var(--chart-3)",
    responsibilities: [
      "Developed responsive web applications using modern JavaScript frameworks",
      "Improved website SEO through technical and on-page optimization",
      "Integrated Google Analytics and ad scripts for campaign tracking and conversions",
      "Optimized performance by reducing load times and improving frontend-backend communication",
    ],
    tech: ["JavaScript", "SEO", "Google Analytics"],
  },
  {
    company: "Celebreak",
    role: "Flutter Developer",
    location: "Barcelona, Spain",
    period: "Nov 2024 - Feb 2025",
    logo: "/assets/logos/celebreak-logo.webp",
    accent: "var(--chart-2)",
    responsibilities: [
      "Contributed to TownSquare, a Flutter app focused on community engagement",
      "Built and maintained reusable UI components with responsive design principles",
      "Improved app performance and UI responsiveness across Android and iOS",
    ],
    tech: ["Flutter"],
  },
  {
    company: "Avyan Global",
    role: "Flutter Developer",
    location: "Nueva Ecija, PH",
    period: "Jun 2022 - Mar 2024",
    accent: "var(--chart-4)",
    responsibilities: [
      "Developed blockchain-enabled Flutter apps integrating decentralized tech and REST APIs",
      "Implemented efficient state management for real-time blockchain transactions",
      "Designed and integrated REST APIs connecting mobile apps with backend services",
    ],
    tech: ["Flutter", "REST API"],
  },
]
