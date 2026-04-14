"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"

type WebProject = {
  title: string
  description: string
  tags: string[]
  link: string
  linkLabel: string
}

type MobileProject = {
  title: string
  description: string
  image: string
  tags: string[]
  playStoreLink?: string
  appStoreLink?: string
  downloadLink?: { href: string; label: string }
}

type BackendProject = {
  title: string
  description: string
  tags: string[]
  link: string
  linkLabel: string
}

const webProjects: WebProject[] = [
  {
    title: "Mobile Medical Lab",
    description: "Patient-first booking portal with streamlined scheduling and responsive design.",
    tags: ["Next.js", "Supabase", "Healthcare"],
    link: "https://www.mobilemedicallab.com",
    linkLabel: "Visit website",
  },
  {
    title: "PawsConnect",
    description: "Adoption, fundraising, and events in one friendly community platform.",
    tags: ["Next.js", "Supabase", "Pet Care"],
    link: "https://paws-connect-rho.vercel.app/",
    linkLabel: "Visit website",
  },
  {
    title: "13th Vapour Lounge",
    description: "E-commerce storefront built for a vape shop — product listings, cart, and checkout.",
    tags: ["E-Commerce", "Vape", "Retail"],
    link: "https://www.13thvapourlounge.store/",
    linkLabel: "Visit website",
  },
  {
    title: "Sweet Hives",
    description: "Online ordering platform for a café — browse coffee and snacks, place orders with ease.",
    tags: ["POS", "Café", "Ordering"],
    link: "https://brewpos.shop/",
    linkLabel: "Visit website",
  },
  {
    title: "PK2 E-Service",
    description: "Barangay document processing portal exclusive to Pasong Kawayan 2 residents.",
    tags: ["Gov Tech", "E-Service", "Documents"],
    link: "https://pasongkawayan2eservice.vercel.app/",
    linkLabel: "Visit website",
  },
]

const mobileProjects: MobileProject[] = [
  {
    title: "Mobile Medical Lab",
    description: "Book mobile lab services effortlessly through an intuitive Flutter experience.",
    image: "/assets/mockup/mobilemedicallab.png",
    tags: ["Flutter", "NestJS", "Medical"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.labstogomml.app",
    appStoreLink: "https://apps.apple.com/ph/app/mobile-medical-lab/id6523433058",
  },
  {
    title: "Celebreak",
    description: "Match with local football players and reserve pitches in minutes.",
    image: "/assets/mockup/celebreak.png",
    tags: ["Flutter", "NestJS", "Sports"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.lewisblack.celebreakOne",
    appStoreLink: "https://apps.apple.com/ph/app/celebreak/id1244710855",
  },
  {
    title: "Servebeez",
    description: "On-demand service marketplace with flexible scheduling and provider tooling.",
    image: "/assets/mockup/servebeez.png",
    tags: ["Flutter", "Supabase", "AWS"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.servebeez.customer",
    appStoreLink: "https://apps.apple.com/ph/app/servebeez-home-services/id6747769004",
  },
  {
    title: "PawsConnect Mobile",
    description: "Mobile companion for animal lovers and shelter partners.",
    image: "/assets/mockup/pawsconnect.png",
    tags: ["Flutter", "Supabase", "Mobile"],
    downloadLink: { href: "https://paws-connect-rho.vercel.app/download/app", label: "Download the app" },
  },
]

const backendProjects: BackendProject[] = [
  {
    title: "Mobile Medical Lab API",
    description: "NestJS backend delivering secure clinical data workflows and integrations.",
    tags: ["NestJS", "Swagger", "REST"],
    link: "https://api.mobilemedicallab.com/api",
    linkLabel: "Inspect the API",
  },
]

function BrowserPreview({ project }: { project: WebProject }) {
  const hostname = project.link.replace("https://", "").replace(/\/$/, "")

  return (
    <div className="overflow-hidden rounded-xl border border-muted-foreground/20">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-muted-foreground/15 bg-zinc-950 px-4 py-2.5">
        <div className="flex shrink-0 gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-zinc-900 px-3 py-1 text-center text-xs text-zinc-500">
          {hostname}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-zinc-600 transition-colors hover:text-zinc-400"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Live iframe preview */}
      <div className="relative h-[360px] overflow-hidden bg-white">
        <iframe
          src={project.link}
          title={project.title}
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "250%",
            height: "250%",
            transform: "scale(0.4)",
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-start justify-between border-t border-muted-foreground/15 bg-background/60 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-medium">{project.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="ml-4 flex shrink-0 flex-wrap justify-end gap-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileCard({ project }: { project: MobileProject }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-muted-foreground/20 bg-background/60 p-4 transition-colors hover:border-muted-foreground/40">
      <img
        src={project.image}
        alt={project.title}
        className="h-14 w-14 shrink-0 rounded-xl border border-muted-foreground/20 object-cover"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <p className="font-medium leading-tight">{project.title}</p>
        <p className="text-sm leading-snug text-muted-foreground">{project.description}</p>
        <p className="text-xs text-muted-foreground/60">{project.tags.join(" · ")}</p>
        <div className="flex flex-wrap gap-2 pt-0.5">
          {project.playStoreLink && (
            <a
              href={project.playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-muted-foreground/20 bg-muted/40 px-2.5 py-1.5 transition-colors hover:border-muted-foreground/40 hover:bg-muted/60"
            >
              <img src="https://thesvg.org/icons/android/default.svg" alt="Android" className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Google Play</span>
            </a>
          )}
          {project.appStoreLink && (
            <a
              href={project.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-muted-foreground/20 bg-muted/40 px-2.5 py-1.5 transition-colors hover:border-muted-foreground/40 hover:bg-muted/60"
            >
              <img src="https://thesvg.org/icons/apple/default.svg" alt="Apple" className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">App Store</span>
            </a>
          )}
          {project.downloadLink && (
            <a
              href={project.downloadLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/70"
            >
              {project.downloadLink.label} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function BackendCard({ project }: { project: BackendProject }) {
  const endpoint = project.link.replace("https://", "")

  return (
    <div className="overflow-hidden rounded-xl border border-muted-foreground/20">
      {/* Terminal-style header */}
      <div className="flex items-center gap-3 border-b border-muted-foreground/15 bg-zinc-950 px-4 py-2.5">
        <div className="flex shrink-0 gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-zinc-500">swagger ui</span>
      </div>

      {/* API display */}
      <div className="space-y-3 bg-zinc-950/60 px-4 py-6">
        <div className="flex items-center gap-2">
          <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
            GET
          </span>
          <span className="truncate font-mono text-sm text-zinc-300">{endpoint}</span>
        </div>
        <p className="text-xs text-zinc-500">
          Interactive API documentation with all available endpoints, schemas, and try-it-out support.
        </p>
        <div className="font-mono text-xs">
          <span className="text-zinc-500">200 OK </span>
          <span className="text-emerald-600">application/json</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-start justify-between border-t border-muted-foreground/15 bg-background/60 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-medium">{project.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{project.description}</p>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 shrink-0 text-xs font-medium text-primary transition-colors hover:text-primary/70"
        >
          {project.linkLabel} →
        </a>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold">Selected work</h2>
        <p className="text-sm text-muted-foreground">
          A concise snapshot of products shipped across mobile, web, and backend since 2022.
        </p>
      </div>

      <Tabs defaultValue="web">
        <TabsList className="h-auto gap-0 rounded-none border-b border-muted-foreground/20 bg-transparent p-0">
          {(["web", "mobile", "backend"] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-1 text-sm font-medium capitalize text-muted-foreground shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="web" className="mt-4 space-y-4">
          {webProjects.map((p) => (
            <BrowserPreview key={p.title} project={p} />
          ))}
        </TabsContent>

        <TabsContent value="mobile" className="mt-4 space-y-3">
          {mobileProjects.map((p) => (
            <MobileCard key={p.title} project={p} />
          ))}
        </TabsContent>

        <TabsContent value="backend" className="mt-4 space-y-4">
          {backendProjects.map((p) => (
            <BackendCard key={p.title} project={p} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
