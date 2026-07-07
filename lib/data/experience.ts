export type ExperienceEntry = {
  company: string
  role: string
  period: string
  logo: string
  responsibilities: string[]
  tech: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: "Mobile Medical Lab",
    role: "Lead Flutter & API Engineer",
    period: "2024 — Present",
    logo: "/mobilemedicallab-logo.webp",
    responsibilities: [
      "Own the Flutter app end-to-end, from architecture to release",
      "Designed and built the NestJS API used by both mobile and web",
      "Built the Next.js booking website sharing the same backend",
    ],
    tech: ["Flutter", "NestJS", "Next.js", "Supabase"],
  },
  {
    company: "Celebreak",
    role: "Flutter Developer",
    period: "2024 — 2025",
    logo: "/celebreak-logo.webp",
    responsibilities: [
      "Built and maintained the Flutter app for match-finding and pitch bookings",
      "Integrated a NestJS backend for matchmaking and reservations",
    ],
    tech: ["Flutter", "NestJS"],
  },
  {
    company: "Servebeez",
    role: "Mobile Engineer",
    period: "2024 — 2026",
    logo: "/servebeez-logo.webp",
    responsibilities: [
      "Built the customer-facing Flutter app for an on-demand services marketplace",
      "Integrated Supabase for auth, data, and realtime booking updates",
    ],
    tech: ["Flutter", "Supabase", "AWS"],
  },
]
