export type ExperienceEntry = {
  company: string
  role: string
  period: string
  logo?: string
  responsibilities: string[]
  tech: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: "Mobile Medical Lab",
    role: "Full Stack Developer",
    period: "May 2024 - Present",
    logo: "/mobilemedicallab-logo.webp",
    responsibilities: [
      "Developed and maintained the mobile app enabling users to conveniently book on-demand medical services",
      "Built a seamless booking experience across iOS and Android, plus the companion website with Next.js",
      "Collaborated with product managers and backend developers to optimize performance and user experience",
    ],
    tech: ["Flutter", "Next.js", "NestJS", "Supabase"],
  },
  {
    company: "Celebreak",
    role: "Flutter Developer",
    period: "Nov 2024 - Feb 2025",
    logo: "/celebreak-logo.webp",
    responsibilities: [
      "Contributed to TownSquare, an application fostering community interaction among users",
    ],
    tech: ["Flutter"],
  },
  {
    company: "Avyan Global",
    role: "Flutter Developer",
    period: "Jun 2022 - Mar 2024",
    responsibilities: [
      "Developed Alt Switch, a blockchain-based mobile application",
      "Gained hands-on experience with RESTful APIs and decentralized technologies",
    ],
    tech: ["Flutter", "REST API"],
  },
]
