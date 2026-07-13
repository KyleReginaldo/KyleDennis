export type ProjectLinks = {
  live?: string
  api?: string
  github?: string
  playStore?: string
  appStore?: string
  download?: string
}

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  image?: string
  logo?: string
  accent?: string
  categories: string[]
  problem: string
  responsibilities: string[]
  techStack: string[]
  architecture: string
  challenges: string[]
  results: string[]
  links: ProjectLinks
}

export const projects: Project[] = [
  {
    id: "mobile-medical-lab",
    title: "Mobile Medical Lab",
    tagline: "Mobile lab bookings, simplified for patients and technicians.",
    description:
      "A patient-first platform for booking at-home lab tests, with a Flutter app, a Next.js booking website, and a NestJS API tying it all together.",
    image: "/assets/mockup/mobilemedicallab.png",
    categories: ["Flutter", "Full Stack", "Healthcare"],
    problem:
      "Patients needed a simple way to book at-home lab tests, and the clinic needed a reliable system to manage scheduling, results, and technician dispatch across both mobile and web.",
    responsibilities: [
      "Built the Flutter mobile app end-to-end",
      "Designed and built the NestJS API powering both clients",
      "Built the Next.js booking website",
      "Implemented account, scheduling, and results flows",
    ],
    techStack: ["Flutter", "NestJS", "Next.js", "Supabase", "Swagger"],
    architecture:
      "A Flutter mobile app and a Next.js web app share one NestJS REST API, documented with Swagger, handling bookings, accounts, and technician scheduling.",
    challenges: [
      "Keeping booking state consistent across a mobile app and a separate web app on the same backend",
      "Modeling scheduling and dispatch logic for mobile lab technicians",
    ],
    results: [
      "Live on the App Store and Google Play",
      "Live production web app at mobilemedicallab.com",
      "Backend API live with interactive Swagger documentation",
    ],
    links: {
      live: "https://www.mobilemedicallab.com",
      api: "https://api.mobilemedicallab.com/api",
      playStore: "https://play.google.com/store/apps/details?id=com.labstogomml.app",
      appStore: "https://apps.apple.com/ph/app/mobile-medical-lab/id6523433058",
    },
  },
  {
    id: "celebreak",
    title: "Celebreak",
    tagline: "Match with local football players and book pitches in minutes.",
    description:
      "A Flutter app that helps casual football players find matches and reserve pitches without juggling group chats and phone calls.",
    image: "/assets/mockup/celebreak.png",
    logo: "/celebreak-logo.webp",
    accent: "#0f3d2e",
    categories: ["Flutter", "Full Stack"],
    problem:
      "Casual football players needed an easy way to find matches and reserve pitches without relying on group chats and manual coordination.",
    responsibilities: [
      "Built and maintain the Flutter mobile app",
      "Integrated the NestJS backend for matchmaking and bookings",
    ],
    techStack: ["Flutter", "NestJS"],
    architecture:
      "A Flutter client backed by a NestJS REST API that handles matchmaking, pitch reservations, and player profiles.",
    challenges: [
      "Building real-time-feeling matchmaking UX on top of a request/response API",
      "Keeping booking state consistent across concurrent pitch reservations",
    ],
    results: ["Live on the App Store and Google Play"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.lewisblack.celebreakOne",
      appStore: "https://apps.apple.com/ph/app/celebreak/id1244710855",
    },
  },
  {
    id: "servebeez",
    title: "Servebeez",
    tagline: "On-demand home services, from booking to provider dispatch.",
    description:
      "A marketplace app connecting homeowners with vetted service providers, with flexible scheduling and realtime booking updates.",
    image: "/assets/mockup/servebeez.png",
    logo: "/servebeez-logo.webp",
    accent: "#2f6fed",
    categories: ["Flutter", "Full Stack"],
    problem:
      "Homeowners needed an easy way to book vetted service providers, and providers needed flexible scheduling and dispatch tooling.",
    responsibilities: [
      "Built the customer-facing Flutter app",
      "Integrated Supabase for auth, data, and realtime updates",
      "Worked with AWS for supporting infrastructure",
    ],
    techStack: ["Flutter", "Supabase", "AWS"],
    architecture:
      "A Flutter app backed by Supabase (Postgres, auth, realtime subscriptions) with AWS handling supporting infrastructure.",
    challenges: [
      "Designing a flexible scheduling model for on-demand service providers",
      "Handling realtime status updates across bookings",
    ],
    results: ["Live on the App Store and Google Play"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.servebeez.customer",
      appStore: "https://apps.apple.com/ph/app/servebeez-home-services/id6747769004",
    },
  },
  {
    id: "pawsconnect",
    title: "PawsConnect",
    tagline: "Adoption, fundraising, and community events for animal lovers.",
    description:
      "A platform bringing pet adoption, shelter fundraising, and community events into one place, on both web and mobile.",
    image: "/assets/mockup/pawsconnect.png",
    categories: ["Flutter", "Full Stack"],
    problem:
      "Shelters and adopters needed one place to browse adoptable pets, run fundraisers, and coordinate community events.",
    responsibilities: [
      "Built the Flutter mobile companion app",
      "Built the Next.js web platform",
      "Integrated Supabase across both clients",
    ],
    techStack: ["Flutter", "Next.js", "Supabase"],
    architecture:
      "A shared Supabase backend (Postgres, auth, storage) powers both a Next.js web app and a Flutter mobile app for adoption, fundraising, and events.",
    challenges: [
      "Keeping feature parity between the web and mobile clients",
      "Modeling adoption, fundraising, and event data in one schema",
    ],
    results: [
      "Live web app at paws-connect-rho.vercel.app",
      "Mobile app available for download",
    ],
    links: {
      live: "https://paws-connect-rho.vercel.app/",
      download: "https://paws-connect-rho.vercel.app/download/app",
    },
  },
  {
    id: "13th-vapour-lounge",
    title: "13th Vapour Lounge",
    tagline: "An e-commerce storefront built for a local vape shop.",
    description:
      "A retail storefront with product listings, cart, and checkout, built to take a local shop's sales online.",
    categories: ["Web", "E-Commerce", "UI/UX"],
    problem: "A local vape shop needed an online storefront to sell products beyond walk-in traffic.",
    responsibilities: [
      "Designed and built the e-commerce storefront",
      "Implemented product listings, cart, and checkout",
    ],
    techStack: ["Next.js", "E-Commerce"],
    architecture: "A Next.js storefront with a product catalog, cart, and checkout flow.",
    challenges: ["Building a compliant, age-gated storefront for a regulated product category"],
    results: ["Live at 13thvapourlounge.store"],
    links: { live: "https://www.13thvapourlounge.store/" },
  },
  {
    id: "sweet-hives",
    title: "Sweet Hives",
    tagline: "Online ordering for a café, without a heavyweight POS.",
    description: "A lightweight ordering platform so a café's customers can browse and order coffee and snacks online.",
    categories: ["Web", "UI/UX"],
    problem: "A café wanted online ordering for coffee and snacks without adopting a heavyweight POS system.",
    responsibilities: ["Built the ordering platform and menu browsing UI"],
    techStack: ["Next.js"],
    architecture: "A Next.js ordering app with a lightweight menu, cart, and checkout flow.",
    challenges: ["Keeping the ordering flow fast and simple for walk-up café customers"],
    results: ["Live at brewpos.shop"],
    links: { live: "https://brewpos.shop/" },
  },
  {
    id: "pk2-eservice",
    title: "PK2 E-Service",
    tagline: "Barangay document requests, moved online.",
    description:
      "A document processing portal exclusive to Pasong Kawayan 2 residents, replacing in-person queues with online requests.",
    categories: ["Web", "Gov Tech"],
    problem: "Local residents needed a way to request barangay documents online instead of queuing in person.",
    responsibilities: ["Built the document request portal exclusive to Pasong Kawayan 2 residents"],
    techStack: ["Next.js"],
    architecture: "A Next.js portal for submitting and tracking barangay document requests.",
    challenges: ["Designing an accessible flow for a non-technical, local government audience"],
    results: ["Live at pasongkawayan2eservice.vercel.app"],
    links: { live: "https://pasongkawayan2eservice.vercel.app/" },
  },
]

export const projectCategories = Array.from(
  new Set(projects.flatMap((p) => p.categories))
).sort()
