"use client"

import { projects, type Project } from "@/lib/data/projects"
import { stackFlat, type TechItem } from "@/lib/data/stack"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"
import Link from "next/link"
import { useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

type Category = "MOBILE" | "FRONTEND" | "BACKEND" | "INFRASTRUCTURE" | "TOOLS"

type Tech = { name: string; category: Category; usage: string }

// "Usage" is the portfolio narrative (how I actually use it), distinct from
// the factual `description` in lib/data/stack.ts — kept local since it's
// showcase copy, not shared tech metadata.
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
    name: "NestJS",
    category: "BACKEND",
    usage: "REST APIs and backend services — modular architecture, auth guards, and background jobs running in production.",
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
    category: "BACKEND",
    usage: "The relational database underneath most projects — schemas, migrations, and queries built to scale.",
  },
  {
    name: "AWS",
    category: "INFRASTRUCTURE",
    usage: "Cloud infrastructure for services that outgrow a managed backend — compute, storage, queues, and event-driven workflows.",
  },
  {
    name: "Docker",
    category: "INFRASTRUCTURE",
    usage: "Consistent environments from local development through deployment — every backend ships as a container.",
  },
  {
    name: "GitHub",
    category: "INFRASTRUCTURE",
    usage: "Version control and CI/CD — every project ships through pull requests and automated pipelines.",
  },
  {
    name: "Figma",
    category: "TOOLS",
    usage: "Interface design and prototyping — where every product starts before a line of code is written.",
  },
  {
    name: "Stripe",
    category: "TOOLS",
    usage: "Payments — checkout flows, subscriptions, and webhooks for apps that need to charge real customers.",
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

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, scale: 0.92, filter: "blur(6px)", transition: { duration: 0.25, ease: EASE } },
}

function GridTile({ tech, onSelect }: { tech: Tech; onSelect: (name: string) => void }) {
  const item = iconByName.get(tech.name)

  return (
    <motion.button
      type="button"
      variants={tileVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(tech.name)}
      aria-label={tech.name}
      className="group flex flex-col items-center gap-3 py-4"
    >
      {/* This icon carries a layoutId shared with the hero icon in TechDetail —
          Motion animates the position/size change directly, no manual tweening. */}
      <motion.span
        layoutId={`tech-icon-${tech.name}`}
        whileHover={{ scale: 1.14 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
      >
        <TechIconView item={item} />
      </motion.span>
      <span className="font-mono text-[11px] tracking-wide text-foreground/50 transition-colors group-hover:text-foreground">
        {tech.name}
      </span>
    </motion.button>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group flex items-center gap-4">
      {project.image && (
        <div className="h-20 w-32 shrink-0 overflow-hidden shadow-md shadow-black/10">
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground transition-colors group-hover:text-primary">{project.title}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/50">{project.architecture}</p>
      </div>
    </Link>
  )
}

function TechDetail({ tech, onBack, reduced }: { tech: Tech; onBack: () => void; reduced: boolean }) {
  const item = iconByName.get(tech.name)
  const usedIn = projects.filter((p) => p.techStack.includes(tech.name))
  const heroProject = usedIn[0]
  const heroShot = heroProject?.screenshots?.app?.[0] ?? heroProject?.image

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
    >
      <button
        type="button"
        onClick={onBack}
        className="col-span-full flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground"
      >
        ← ALL TECHNOLOGIES
      </button>

      <div className="relative flex h-56 items-center justify-center md:h-[420px]">
        <span
          aria-hidden
          className="absolute h-56 w-56 rounded-full bg-primary/[0.07] blur-[80px] md:h-80 md:w-80"
        />

        {heroShot && (
          <motion.img
            initial={reduced ? undefined : { opacity: 0, scale: 0.9, x: 20 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, x: 20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            src={heroShot}
            alt=""
            className="absolute right-2 top-2 h-32 w-auto -rotate-6 rounded-2xl object-cover shadow-2xl shadow-black/20 md:right-4 md:top-6 md:h-48"
          />
        )}

        <motion.span
          layoutId={`tech-icon-${tech.name}`}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="relative flex h-24 w-24 items-center justify-center md:h-32 md:w-32"
        >
          <TechIconView item={item} />
        </motion.span>
      </div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-primary">{tech.category}</p>
        <h3 className="mt-2 text-5xl font-semibold tracking-tight text-foreground">{tech.name}</h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/60">{tech.usage}</p>

        {usedIn.length > 0 && (
          <div className="mt-10">
            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/30">
              USED IN {usedIn.length} PROJECT{usedIn.length > 1 ? "S" : ""}
            </p>
            <div className="mt-5 flex flex-col gap-6">
              {usedIn.slice(0, 3).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function TechStackSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const reduced = useReducedMotion() ?? false
  const tech = selected ? techByName.get(selected) : undefined

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <div className="hidden md:block text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-primary">TECH STACK</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Technologies I build with
        </h2>
      </div>

      <div className="relative mt-16">
        <AnimatePresence mode="popLayout">
          {tech ? (
            <TechDetail key="detail" tech={tech} onBack={() => setSelected(null)} reduced={reduced} />
          ) : (
            <motion.div
              key="grid"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-10"
            >
              {TECHS.map((t) => (
                <GridTile key={t.name} tech={t} onSelect={setSelected} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function ClosingCTA() {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative flex flex-col items-center gap-6 px-6 py-28 text-center"
    >
      <p className="max-w-lg text-3xl font-semibold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
        The stack is only
        <br />
        the start.
      </p>
      <p className="max-w-sm text-muted-foreground">Have something worth building?</p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Let&apos;s talk →
      </Link>
    </motion.div>
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
