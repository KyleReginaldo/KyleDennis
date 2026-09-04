"use client"

import { projects, type Project } from "@/lib/data/projects"
import { expandTechStack, stackFlat, type TechItem } from "@/lib/data/stack"
import Link from "next/link"
import { useState } from "react"

type Category = "MOBILE" | "FRONTEND" | "BACKEND" | "DATABASE" | "INFRASTRUCTURE" | "TOOLS"

type Tech = { name: string; category: Category; usage: string }

// "Usage" is the portfolio narrative (how I actually use it), distinct from
// the factual `description` in lib/data/stack.ts — kept local since it's
// showcase copy, not shared tech metadata.
//
// Every `name` must match an entry in stack.ts, or the tile renders without an
// icon. Ordered by category so the flat grid groups related tech visually.
const TECHS: Tech[] = [
  {
    name: "Flutter",
    category: "MOBILE",
    usage:
      "Production mobile apps — scalable architecture, state management, API integrations, payments, push notifications, and CI/CD releases to the App Store and Play Store.",
  },
  {
    name: "Dart",
    category: "MOBILE",
    usage: "The typed, null-safe language behind every Flutter build, compiled straight to native code on both platforms.",
  },
  {
    name: "FlutterFlow",
    category: "MOBILE",
    usage: "Visual-first Flutter builds for rapid prototyping and client demos, exported to real Dart code when a project graduates to custom development.",
  },
  {
    name: "Next.js",
    category: "FRONTEND",
    usage: "Marketing sites, dashboards, and full-stack web apps — server rendering and API routes in one framework.",
  },
  {
    name: "React",
    category: "FRONTEND",
    usage: "Component-driven interfaces underneath every Next.js build — state, hooks, and reusable UI.",
  },
  {
    name: "TypeScript",
    category: "FRONTEND",
    usage: "The default across the stack — typed contracts between frontend, backend, and database that catch bugs before they ship.",
  },
  {
    name: "Vite",
    category: "FRONTEND",
    usage: "Build tooling for frontends that don't need a full framework — instant dev server start and fast HMR.",
  },
  {
    name: "NestJS",
    category: "BACKEND",
    usage: "REST APIs and backend services — modular architecture, auth guards, and background jobs running in production.",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    usage: "The runtime under every backend service and build script — async I/O, streams, and the npm ecosystem.",
  },
  {
    name: "REST APIs",
    category: "BACKEND",
    usage: "The contract between every app and its backend — versioned resources, predictable status codes, pagination, and token auth.",
  },
  {
    name: "Supabase",
    category: "BACKEND",
    usage: "Postgres, auth, storage, and realtime subscriptions — a backend that ships fast without managing infrastructure.",
  },
  {
    name: "Firebase",
    category: "BACKEND",
    usage: "Auth, push notifications, and realtime data for mobile apps that need a managed backend out of the box.",
  },
  {
    name: "PostgreSQL",
    category: "DATABASE",
    usage: "The relational database underneath most projects — schemas, migrations, and queries built to scale.",
  },
  {
    name: "MySQL",
    category: "DATABASE",
    usage: "Relational storage for projects and legacy systems already standardised on the MySQL engine.",
  },
  {
    name: "NeonDB",
    category: "DATABASE",
    usage: "Serverless Postgres with database branching — a throwaway copy of production data per pull request.",
  },
  {
    name: "AWS",
    category: "INFRASTRUCTURE",
    usage: "Cloud infrastructure for services that outgrow a managed backend — compute, storage, queues, and event-driven workflows.",
  },
  {
    name: "Google Cloud",
    category: "INFRASTRUCTURE",
    usage: "Containerised services on Cloud Run and the managed pieces around them, deployed without running servers.",
  },
  {
    name: "Cloudflare",
    category: "INFRASTRUCTURE",
    usage: "DNS, CDN, and edge caching in front of production — faster first paint and a shield against traffic nobody invited.",
  },
  {
    name: "Docker",
    category: "INFRASTRUCTURE",
    usage: "Consistent environments from local development through deployment — every backend ships as a container.",
  },
  {
    name: "Git",
    category: "INFRASTRUCTURE",
    usage: "Version control on every project — feature branches, readable history, and a way back from any mistake.",
  },
  {
    name: "GitHub",
    category: "INFRASTRUCTURE",
    usage: "Where the code lives and reviews happen — pull requests, issues, and Actions wired into deployment.",
  },
  {
    name: "CI/CD",
    category: "INFRASTRUCTURE",
    usage: "Automated build, test, and release pipelines so shipping is a routine push rather than a manual ceremony.",
  },
  {
    name: "Codemagic",
    category: "INFRASTRUCTURE",
    usage: "Mobile release automation — signed Flutter builds delivered straight to TestFlight and the Play Console.",
  },
  {
    name: "Stripe",
    category: "TOOLS",
    usage: "Payments — checkout flows, subscriptions, and webhooks for apps that need to charge real customers.",
  },
  {
    name: "Claude Code",
    category: "TOOLS",
    usage: "AI pair programming in the terminal — refactors, test scaffolding, and unfamiliar codebases explored fast.",
  },
]

const iconByName = new Map(stackFlat.map((i) => [i.name, i] as const))
const techByName = new Map(TECHS.map((t) => [t.name, t] as const))

function TechIconView({ item }: { item?: TechItem }) {
  if (!item) return null
  if (item.icon.type === "image") return <img src={item.icon.src} alt="" className="h-full w-full object-contain" />
  const Icon = item.icon.Icon
  return <Icon className="h-full w-full" />
}

function GridTile({ tech, onSelect }: { tech: Tech; onSelect: (name: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tech.name)}
      aria-label={tech.name}
      className="group flex flex-col items-center gap-3 py-4"
    >
      <span className="flex h-14 w-14 items-center justify-center transition-transform duration-200 group-hover:scale-110 md:h-16 md:w-16">
        <TechIconView item={iconByName.get(tech.name)} />
      </span>
      <span className="font-mono text-sm tracking-wide text-foreground/70 transition-colors group-hover:text-foreground">
        {tech.name}
      </span>
    </button>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group flex items-center gap-3">
      {project.image && (
        <div className="h-14 w-24 shrink-0 overflow-hidden shadow-sm shadow-black/10">
          <img src={project.image} alt="" className="h-full w-full object-cover object-top" />
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-base font-medium text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-foreground/70">{project.architecture}</p>
      </div>
    </Link>
  )
}

function TechDetail({ tech, onBack }: { tech: Tech; onBack: () => void }) {
  const usedIn = projects.filter((p) => expandTechStack(p.techStack).has(tech.name))

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-sm tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
      >
        ← ALL TECHNOLOGIES
      </button>

      <div className="mt-6 flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <TechIconView item={iconByName.get(tech.name)} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-[0.3em] text-primary">{tech.category}</p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{tech.name}</h3>
        </div>
      </div>

      <p className="mt-5 text-base leading-relaxed text-foreground/75">{tech.usage}</p>

      {usedIn.length > 0 && (
        <div className="mt-8 border-t border-foreground/10 pt-6">
          <p className="font-mono text-xs tracking-[0.2em] text-foreground/50">
            USED IN {usedIn.length} PROJECT{usedIn.length > 1 ? "S" : ""}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {usedIn.slice(0, 4).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TechStackSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const tech = selected ? techByName.get(selected) : undefined

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <div className="hidden text-center md:block">
        <p className="font-mono text-xs tracking-[0.3em] text-primary">TECH STACK</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Technologies I build with
        </h2>
      </div>

      <div className="relative mt-16">
        {tech ? (
          <TechDetail tech={tech} onBack={() => setSelected(null)} />
        ) : (
          <div className="grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-10 lg:grid-cols-5">
            {TECHS.map((t) => (
              <GridTile key={t.name} tech={t} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <div className="relative flex flex-col items-center gap-6 px-6 py-28 text-center">
      <p className="max-w-lg text-3xl font-semibold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
        The stack is only
        <br />
        the start.
      </p>
      <p className="max-w-sm text-lg text-muted-foreground">Have something worth building?</p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-85"
      >
        Let&apos;s talk →
      </Link>
    </div>
  )
}

export function ServicesTechOrbit() {
  return (
    <div className="relative bg-white">
      <TechStackSection />
      <ClosingCTA />
    </div>
  )
}
