"use client"

import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { projects, type Project } from "@/lib/data/projects"
import { stackFlat, type TechItem } from "@/lib/data/stack"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

const GRID_BG =
  "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)"

type Category = "FRONTEND" | "MOBILE" | "BACKEND" | "INFRASTRUCTURE" | "INTEGRATIONS"

type Tech = {
  name: string
  tier: "inner" | "middle" | "outer"
  category: Category
  tagline: string
}

const TECHS: Tech[] = [
  { name: "Next.js", tier: "inner", category: "FRONTEND", tagline: "WEB APPLICATIONS" },
  { name: "React", tier: "middle", category: "FRONTEND", tagline: "USER INTERFACES" },
  { name: "TypeScript", tier: "middle", category: "FRONTEND", tagline: "TYPED FOUNDATIONS" },
  { name: "Flutter", tier: "inner", category: "MOBILE", tagline: "CROSS-PLATFORM APPS" },
  { name: "Dart", tier: "outer", category: "MOBILE", tagline: "CLIENT-OPTIMIZED LANG" },
  { name: "Firebase", tier: "middle", category: "MOBILE", tagline: "MOBILE BACKENDS" },
  { name: "NestJS", tier: "inner", category: "BACKEND", tagline: "BACKEND SYSTEMS" },
  { name: "Supabase", tier: "middle", category: "BACKEND", tagline: "DATA & AUTH" },
  { name: "PostgreSQL", tier: "middle", category: "BACKEND", tagline: "RELATIONAL DATA" },
  { name: "AWS", tier: "inner", category: "INFRASTRUCTURE", tagline: "CLOUD INFRASTRUCTURE" },
  { name: "Docker", tier: "middle", category: "INFRASTRUCTURE", tagline: "CONTAINERIZATION" },
  { name: "GitHub", tier: "outer", category: "INFRASTRUCTURE", tagline: "VERSION CONTROL" },
  { name: "Stripe", tier: "outer", category: "INTEGRATIONS", tagline: "PAYMENTS" },
]

// The scroll narrative advances through every tech in the orbit, in order.
const FOCUS_SEQUENCE = TECHS.map((t) => t.name)

const CATEGORY_LABEL: Record<Category, { index: string; layer: string }> = {
  FRONTEND: { index: "01", layer: "THE INTERFACE LAYER" },
  MOBILE: { index: "02", layer: "THE APPLICATION LAYER" },
  BACKEND: { index: "03", layer: "THE SYSTEM LAYER" },
  INFRASTRUCTURE: { index: "04", layer: "THE FOUNDATION LAYER" },
  INTEGRATIONS: { index: "05", layer: "THE INTEGRATION LAYER" },
}

const RING = {
  inner: { radius: 90, duration: 26, icon: 44 },
  middle: { radius: 150, duration: 38, icon: 36 },
  outer: { radius: 210, duration: 50, icon: 30 },
}

const iconByName = new Map(stackFlat.map((i) => [i.name, i] as const))
const techByName = new Map(TECHS.map((t) => [t.name, t] as const))

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mq.matches)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return isDesktop
}

function TechIconView({ item }: { item?: TechItem }) {
  if (!item) return null
  if (item.icon.type === "image") return <img src={item.icon.src} alt="" className="h-full w-full object-contain" />
  const Icon = item.icon.Icon
  return <Icon className="h-full w-full" />
}

function TechNode({ name, active, onActivate }: { name: string; active: boolean; onActivate: (name: string | null) => void }) {
  const item = iconByName.get(name)

  // While active, this tech's real node lives in the centered clone (see Orbit) —
  // sharing layoutId with it so motion animates the flight from ring to center.
  if (active) return <span aria-hidden className="block h-full w-full" />

  return (
    <motion.button
      layoutId={`tech-${name}`}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      type="button"
      aria-label={name}
      aria-pressed={active}
      onClick={() => onActivate(name)}
      onFocus={() => onActivate(name)}
      onMouseEnter={() => onActivate(name)}
      className="flex h-full w-full items-center justify-center rounded-full border border-black/10 bg-white p-2.5 opacity-60 shadow-sm transition-opacity duration-300 hover:opacity-100"
    >
      <TechIconView item={item} />
    </motion.button>
  )
}

function Orbit({
  activeName,
  onActivate,
  reduced,
  isDesktop,
}: {
  activeName: string | null
  onActivate: (name: string | null) => void
  reduced: boolean
  isDesktop: boolean
}) {
  const scale = isDesktop ? 1 : 0.6

  return (
    <div className="relative h-[480px] w-[480px] max-w-[88vw] shrink-0 md:h-[560px] md:w-[560px]">
      {(["outer", "middle", "inner"] as const).map((tier) => (
        <OrbitingCircles
          key={tier}
          radius={RING[tier].radius * scale}
          duration={RING[tier].duration}
          iconSize={RING[tier].icon * scale}
          reverse={tier === "middle"}
          paused={reduced}
          className="border-none bg-transparent"
        >
          {TECHS.filter((t) => t.tier === tier).map((t) => (
            <TechNode key={t.name} name={t.name} active={activeName === t.name} onActivate={onActivate} />
          ))}
        </OrbitingCircles>
      ))}

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <AnimatePresence mode="popLayout">
          {activeName ? (
            <motion.button
              key={activeName}
              layoutId={`tech-${activeName}`}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              type="button"
              onClick={() => onActivate(null)}
              aria-label={`${activeName} — click to deselect`}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-white p-3 shadow-lg shadow-black/10 md:h-20 md:w-20"
            >
              <TechIconView item={iconByName.get(activeName)} />
            </motion.button>
          ) : (
            <motion.div
              key="stack-hub"
              layout
              className="grid h-14 w-14 place-items-center rounded-full border border-black/10 bg-white md:h-16 md:w-16"
            >
              <span className="font-mono text-[9px] tracking-widest text-foreground/50">STACK</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ProjectRef({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group relative block text-sm">
      <span className="text-foreground/70 underline decoration-black/20 underline-offset-4 transition-colors group-hover:text-foreground group-hover:decoration-black/50">
        {project.title}
      </span>

      {project.image && (
        <span className="pointer-events-none absolute bottom-full left-0 mb-2 w-40 origin-bottom-left scale-95 overflow-hidden rounded-xl border border-black/10 bg-white opacity-0 shadow-lg shadow-black/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
          <img src={project.image} alt="" className="block h-24 w-full object-cover object-top" />
        </span>
      )}
    </Link>
  )
}

function FocusPanel({ activeName }: { activeName: string | null }) {
  const tech = activeName ? techByName.get(activeName) : undefined
  const item = activeName ? iconByName.get(activeName) : undefined
  const usedIn = activeName ? projects.filter((p) => p.techStack.includes(activeName)) : []

  if (!tech) {
    return (
      <div className="max-w-sm text-center md:text-left">
        <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/40">TECH STACK</p>
        <p className="mt-2 text-lg text-foreground/60">One connected ecosystem — scroll to explore.</p>
      </div>
    )
  }

  const label = CATEGORY_LABEL[tech.category]

  return (
    <motion.div
      key={tech.name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="max-w-sm text-center md:text-left"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-primary">
        {label.index} / {tech.category} — {label.layer}
      </p>
      <div className="mt-3 flex items-center justify-center gap-2.5 md:justify-start">
        <span className="h-6 w-6 shrink-0">
          <TechIconView item={item} />
        </span>
        <h3 className="text-3xl font-semibold tracking-tight text-foreground">{tech.name}</h3>
      </div>
      <p className="mt-1.5 font-mono text-[11px] tracking-[0.15em] text-foreground/40">{tech.tagline}</p>
      {item?.description && <p className="mt-4 text-sm leading-relaxed text-foreground/60">{item.description}</p>}

      {usedIn.length > 0 && (
        <div className="mt-6 border-t border-black/10 pt-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/30">USED IN</p>
          <div className="mt-3 flex flex-col items-center gap-2 md:items-start">
            {usedIn.slice(0, 3).map((p) => (
              <ProjectRef key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function OrbitStage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false
  const isDesktop = useIsDesktop()
  const [manualActive, setManualActive] = useState<string | null>(null)
  const [scrollActiveIndex, setScrollActiveIndex] = useState(-1)

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setManualActive(null)
    const slot = Math.floor(progress * (FOCUS_SEQUENCE.length + 1)) - 1
    setScrollActiveIndex(Math.max(-1, Math.min(FOCUS_SEQUENCE.length - 1, slot)))
  })

  const activeName = manualActive ?? (scrollActiveIndex >= 0 ? FOCUS_SEQUENCE[scrollActiveIndex] : null)

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${(FOCUS_SEQUENCE.length + 1) * 80}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6 md:flex-row md:gap-16">
        <motion.div
          aria-hidden
          style={reduced ? undefined : { y: bgY }}
          className="absolute inset-0 -z-10 opacity-100 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_45%,black,transparent)]"
        >
          <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, backgroundSize: "64px 64px" }} />
        </motion.div>

        <Orbit activeName={activeName} onActivate={setManualActive} reduced={reduced} isDesktop={isDesktop} />
        <div className="min-h-[200px] w-full max-w-sm">
          <FocusPanel activeName={activeName} />
        </div>
      </div>
    </div>
  )
}

function ClosingCTA() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-28 text-center">
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
    </div>
  )
}

export function ServicesTechOrbit() {
  return (
    <div className="relative bg-white">
      <OrbitStage />
      <ClosingCTA />
    </div>
  )
}
