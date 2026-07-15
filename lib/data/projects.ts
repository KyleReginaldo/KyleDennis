export type ProjectLinks = {
  live?: string
  api?: string
  github?: string
  playStore?: string
  appStore?: string
  download?: string
}

export type ScreenshotSlide = { src: string; eyebrow: string; headline: string }

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  image?: string
  logo?: string
  accent?: string
  featured?: boolean
  video?: string
  screenshots?: {
    web?: ScreenshotSlide[]
    app?: string[]
  }
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
    image: "/assets/mockup/mobilemedicallab2.png",
    logo: "/assets/logos/mobilemedicallab-logo.webp",
    featured: true,
    video: "dnsmtvF6HzE",
    screenshots: {
      web: [
        {
          src: "/assets/mockup/mobilemedicallab2.png",
          eyebrow: "Book in minutes",
          headline: "Mobile lab testing, right at home",
        },
        {
          src: "/assets/mockup/mobilemedicallab3.png",
          eyebrow: "Pick your test",
          headline: "Every collection type, one simple menu",
        },
        {
          src: "/assets/mockup/mobilemedicallab4.png",
          eyebrow: "Trusted since 2008",
          headline: "Meet the certified team behind every visit",
        },
        {
          src: "/assets/mockup/mobilemedicallab5.png",
          eyebrow: "Three easy steps",
          headline: "Book, get visited, get results — that's it",
        },
      ],
      app: [
        "/assets/mockup/mobilemedicallab6.webp",
        "/assets/mockup/mobilemedicallab7.webp",
        "/assets/mockup/mobilemedicallab8.webp",
        "/assets/mockup/mobilemedicallab9.webp",
        "/assets/mockup/mobilemedicallab10.webp",
      ],
    },
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
    image: "/assets/mockup/celebreak.webp",
    logo: "/assets/logos/celebreak-logo.webp",
    accent: "#0f3d2e",
    video: "Xvl9YcHm-co",
    screenshots: {
      app: [
        "/assets/mockup/celebreak2.webp",
        "/assets/mockup/celebreak3.webp",
        "/assets/mockup/celebreak4.webp",
        "/assets/mockup/celebreak5.webp",
        "/assets/mockup/celebreak6.webp",
      ],
    },
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
    image: "/assets/mockup/servebeez.webp",
    logo: "/assets/logos/servebeez-logo.webp",
    accent: "#2f6fed",
    video: "qu1ligL38gc",
    screenshots: {
      app: [
        "/assets/mockup/servebeez2.webp",
        "/assets/mockup/servebeez3.webp",
        "/assets/mockup/servebeez4.webp",
        "/assets/mockup/servebeez5.webp",
        "/assets/mockup/servebeez6.webp",
      ],
    },
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
    logo: "/assets/logos/pawsconnect-logo.png",
    accent: "#f97316",
    screenshots: {
      web: [
        {
          src: "/assets/mockup/pawsconnect2.png",
          eyebrow: "Find a companion",
          headline: "Browse adoptable pets and fundraisers",
        },
        {
          src: "/assets/mockup/pawsconnect3.png",
          eyebrow: "Meet the animals",
          headline: "See every shelter pet up for adoption",
        },
        {
          src: "/assets/mockup/pawsconnect4.png",
          eyebrow: "Our Mission",
          headline: "Connecting animal lovers with shelters",
        },
        {
          src: "/assets/mockup/pawsconnect5.png",
          eyebrow: "Our Vision",
          headline: "A world where every pet finds a loving home",
        },
      ],
    },
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
    logo: "/assets/logos/vapourlounge-logo.jpg",
    accent: "#111111",
    screenshots: {
      web: [
        {
          src: "/assets/mockup/vapourlounge2.png",
          eyebrow: "Trece Martires' #1 vape shop",
          headline: "Premium vapes, your way",
        },
        {
          src: "/assets/mockup/vapourlounge3.png",
          eyebrow: "Age-verified access",
          headline: "Sign in to keep browsing responsibly",
        },
        {
          src: "/assets/mockup/vapourlounge4.png",
          eyebrow: "12+ products and growing",
          headline: "Filter by brand, price, and category",
        },
        {
          src: "/assets/mockup/vapourlounge5.png",
          eyebrow: "Every detail, up front",
          headline: "Flavor, nicotine, and stock — all on one page",
        },
      ],
    },
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
    logo: "/assets/logos/brewpos-logo.jpg",
    accent: "#8b5e3c",
    screenshots: {
      web: [
        {
          src: "/assets/mockup/brewpos2.png",
          eyebrow: "Now you can feel the energy",
          headline: "Start your day with a great brew",
        },
        {
          src: "/assets/mockup/brewpos3.png",
          eyebrow: "42+ menu items",
          headline: "Order your favorite drink in a tap",
        },
        {
          src: "/assets/mockup/brewpos4.png",
          eyebrow: "4.9 average rating",
          headline: "Loved by regulars, one cup at a time",
        },
        {
          src: "/assets/mockup/brewpos5.png",
          eyebrow: "Visit us",
          headline: "Find the cafe and get directions instantly",
        },
      ],
    },
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
    logo: "/assets/logos/pasongkawayan-logo.png",
    accent: "#166534",
    screenshots: {
      web: [
        {
          src: "/assets/mockup/pasongkawayan2.png",
          eyebrow: "Official e-service portal",
          headline: "Barangay services at your convenience",
        },
        {
          src: "/assets/mockup/pasongkawayan3.png",
          eyebrow: "Secure sign-in",
          headline: "One account for every document request",
        },
        {
          src: "/assets/mockup/pasongkawayan4.png",
          eyebrow: "6 document types",
          headline: "Request clearances, IDs, and certificates online",
        },
        {
          src: "/assets/mockup/pasongkawayan5.png",
          eyebrow: "Got questions?",
          headline: "Answers to what residents ask most",
        },
      ],
    },
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
