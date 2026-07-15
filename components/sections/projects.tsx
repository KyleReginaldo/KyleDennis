"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { projectCategories, projects, type Project, type ScreenshotSlide } from "@/lib/data/projects"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  ArrowRight,
  Blocks,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Github,
  Globe,
  ListChecks,
  Rocket,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

const APP_STORE_ICON = "https://thesvg.org/icons/ios/default.svg"
const PLAY_STORE_ICON = "https://thesvg.org/icons/android/default.svg"

function ProjectIcon({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted p-2",
        className
      )}
    >
      {project.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-contain" />
      ) : (
        <span className="text-lg font-bold text-foreground/20">{project.title.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  )
}

function ShippedSurfaces({ links, minItems = 1 }: { links: Project["links"]; minItems?: number }) {
  const items: { icon: React.ReactNode; label: string }[] = []
  if (links.live) items.push({ icon: <Globe className="h-3.5 w-3.5" />, label: "Web" })
  if (links.appStore)
    items.push({
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src={APP_STORE_ICON} alt="" className="h-3.5 w-3.5" />,
      label: "iOS",
    })
  if (links.playStore)
    items.push({
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src={PLAY_STORE_ICON} alt="" className="h-3.5 w-3.5" />,
      label: "Android",
    })
  if (links.api) items.push({ icon: <Blocks className="h-3.5 w-3.5" />, label: "API" })

  if (items.length < minItems) return null

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
      {items.map(({ icon, label }) => (
        <span key={label} className="inline-flex items-center gap-1">
          {icon} {label}
        </span>
      ))}
    </div>
  )
}

function ProjectBanner({ project }: { project: Project }) {
  const hasVideo = Boolean(project.video)
  const accent = project.accent ?? "#0071e3"

  return (
    <div className={cn("relative h-52 w-full overflow-hidden sm:h-60", hasVideo ? "bg-neutral-900" : "bg-muted")}>
      {hasVideo ? (
        <>
          <HeroVideoDialog
            trigger="corner"
            triggerLabel="Trailer"
            videoSrc={`https://www.youtube-nocookie.com/embed/${project.video}?autoplay=1&rel=0&modestbranding=1`}
            thumbnailSrc={`https://img.youtube.com/vi/${project.video}/hqdefault.jpg`}
            thumbnailAlt={`${project.title} video thumbnail`}
            className="absolute inset-0 h-full w-full"
            thumbnailClassName="h-full w-full rounded-none border-0 object-cover shadow-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-t from-black/85 via-black/20 to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(155deg, ${accent}33 0%, ${accent}12 60%, transparent 100%)`,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <ProjectIcon project={project} className={cn("h-12 w-12", hasVideo && "border-white/20 bg-white/10")} />
          <div className="min-w-0">
            <DialogTitle className={hasVideo ? "text-white" : undefined}>{project.title}</DialogTitle>
            <DialogDescription className={hasVideo ? "text-white/70" : undefined}>
              {project.tagline}
            </DialogDescription>
          </div>
        </div>
        <div className="pointer-events-auto">
          <ProjectLinks project={project} compact light={hasVideo} />
        </div>
      </div>
    </div>
  )
}

function ProjectLinks({ project, compact, light }: { project: Project; compact?: boolean; light?: boolean }) {
  const size = compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
  const primary = light
    ? "bg-white text-neutral-900 hover:opacity-90"
    : "bg-foreground text-background hover:opacity-85"
  const secondary = light
    ? "border border-white/30 text-white hover:bg-white/10"
    : "border border-muted-foreground/25 hover:bg-muted/40"
  return (
    <div className="flex flex-wrap gap-2">
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("inline-flex items-center gap-1.5 rounded-full font-medium transition-opacity", primary, size)}
        >
          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
        </a>
      )}
      {project.links.playStore && (
        <a
          href={project.links.playStore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("inline-flex items-center gap-1.5 rounded-full font-medium transition-colors", secondary, size)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLAY_STORE_ICON} alt="" className="h-3.5 w-3.5" /> Play Store
        </a>
      )}
      {project.links.appStore && (
        <a
          href={project.links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("inline-flex items-center gap-1.5 rounded-full font-medium transition-colors", secondary, size)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={APP_STORE_ICON} alt="" className={cn("h-3.5 w-3.5", light && "invert")} /> App Store
        </a>
      )}
      {project.links.download && (
        <a
          href={project.links.download}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("inline-flex items-center gap-1.5 rounded-full font-medium transition-colors", secondary, size)}
        >
          <Download className="h-3.5 w-3.5" /> Download
        </a>
      )}
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("inline-flex items-center gap-1.5 rounded-full font-medium transition-colors", secondary, size)}
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      )}
    </div>
  )
}

function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen()
        }
      }}
      className="group flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/50 sm:gap-5 sm:px-6"
    >
      <ProjectIcon project={project} className="h-14 w-14 sm:h-16 sm:w-16" />

      <div className="min-w-0 flex-1">
        {project.featured && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/60">
            <Rocket className="h-3 w-3" /> Flagship
          </span>
        )}
        <h3 className="truncate text-base font-semibold sm:text-lg">{project.title}</h3>
        <p className="truncate text-sm text-muted-foreground">{project.tagline}</p>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
    </motion.div>
  )
}

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const chapterVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

function ScreenshotRow({
  kind,
  label,
  title,
  slides,
}: {
  kind: "web" | "app"
  label: string
  title: string
  slides?: ScreenshotSlide[] | string[]
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    // Attached as a native listener (not React's onWheel) so preventDefault actually
    // works — React registers wheel handlers as passive by default, which silently
    // ignores preventDefault and lets the vertical scroll bleed into the sheet.
    function onWheel(e: WheelEvent) {
      if (!el || el.scrollWidth <= el.clientWidth) return
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  if (!slides || slides.length === 0) return null

  function scroll(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{label}</p>
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${title} screenshots left`}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label={`Scroll ${title} screenshots right`}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x"
      >
        {kind === "app"
          ? (slides as string[]).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${title} app screenshot`}
                className="h-[300px] w-auto shrink-0 snap-start rounded-[2rem] object-contain sm:h-[380px]"
              />
            ))
          : (slides as ScreenshotSlide[]).map((slide) => (
              <div
                key={slide.src}
                className="flex w-[min(75vw,340px)] shrink-0 snap-start flex-col gap-3"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {slide.eyebrow}
                  </p>
                  <h5 className="mt-1 text-sm font-semibold leading-snug">{slide.headline}</h5>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border">
                  <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-1.5">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.headline}
                    className="h-[180px] w-full object-cover object-top sm:h-[200px]"
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

function CaseStudyDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <Dialog open={!!project} onOpenChange={(v: boolean) => !v && onClose()}>
      {project && (
        <DialogContent
          onPointerDownOutside={(e) => {
            if (e.target instanceof Element && e.target.closest("[data-hero-video-dialog]")) {
              e.preventDefault()
            }
          }}
          className="top-0 right-0 left-auto h-full max-h-full w-full translate-x-0 translate-y-0 rounded-none border-l border-t-0 border-r-0 border-b-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 sm:max-w-xl lg:max-w-2xl"
        >
          <DialogHeader className="gap-0 p-0">
            <ProjectBanner project={project} />
          </DialogHeader>

          <motion.div
            variants={reduceMotion ? undefined : panelVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "visible"}
            className="flex min-w-0 flex-col gap-5 px-6 pb-6"
          >

            <motion.div variants={reduceMotion ? undefined : chapterVariants}>
              <ShippedSurfaces links={project.links} />
            </motion.div>

            <motion.div variants={reduceMotion ? undefined : chapterVariants} className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </motion.div>

            {(project.screenshots?.web?.length || project.screenshots?.app?.length) && (
              <motion.div variants={reduceMotion ? undefined : chapterVariants} className="flex flex-col gap-5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Screenshots
                </h4>
                <ScreenshotRow kind="web" label="Web" title={project.title} slides={project.screenshots?.web} />
                <ScreenshotRow kind="app" label="App" title={project.title} slides={project.screenshots?.app} />
              </motion.div>
            )}

            <motion.section variants={reduceMotion ? undefined : chapterVariants}>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Problem
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">{project.problem}</p>
            </motion.section>

            <motion.section variants={reduceMotion ? undefined : chapterVariants}>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                <ListChecks className="h-3.5 w-3.5" /> Responsibilities
              </h4>
              <ul className="space-y-1.5">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {r}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={reduceMotion ? undefined : chapterVariants}>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                <Blocks className="h-3.5 w-3.5" /> Architecture
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">{project.architecture}</p>
            </motion.section>

            <motion.section variants={reduceMotion ? undefined : chapterVariants}>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                <AlertTriangle className="h-3.5 w-3.5" /> Challenges
              </h4>
              <ul className="space-y-1.5">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={reduceMotion ? undefined : chapterVariants}>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                <CheckCircle2 className="h-3.5 w-3.5" /> Results
              </h4>
              <ul className="space-y-1.5">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </motion.section>
          </motion.div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All")
  const [selected, setSelected] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  )

  return (
    <section id="projects" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Featured Work</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Products shipped end to end.</h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            {projects.length} real apps and platforms built and shipped, from architecture to release, all live in production.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {["All", ...projectCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "border-transparent text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 -z-0 rounded-full bg-foreground"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectRow key={project.id} project={project} onOpen={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
