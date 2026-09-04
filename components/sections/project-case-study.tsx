"use client"

import { Badge } from "@/components/ui/badge"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { Iphone } from "@/components/ui/iphone"
import { Safari } from "@/components/ui/safari"
import type { Project, ScreenshotSlide } from "@/lib/data/projects"
import { stackFlat } from "@/lib/data/stack"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Blocks,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe,
  ListChecks,
  Share2,
} from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { useEffect, useRef, useState } from "react"

const APP_STORE_ICON = "https://thesvg.org/icons/ios/default.svg"
const PLAY_STORE_ICON = "https://thesvg.org/icons/android/default.svg"

const TECH_ICON_BY_NAME = new Map(stackFlat.map((item) => [item.name.toLowerCase(), item.icon]))

export function TechBadge({ name }: { name: string }) {
  console.log(`Rendering TechBadge for: ${name}`);
  const icon = TECH_ICON_BY_NAME.get(name.toLowerCase())
  if (!icon) {
    return (
      <Badge variant="secondary" className="text-[10px]">
        {name}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" title={name} className="p-1">
      
      {icon.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon.src} alt={name} className="h-3.5 w-3.5 object-contain" />
      ) : (
        <icon.Icon className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">{name}</span>
    </Badge>
  )
}

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
  const items: { icon: React.ReactNode; label: string; iconOnly?: boolean }[] = []
  if (links.live) items.push({ icon: <Globe className="h-3.5 w-3.5" />, label: "Web" })
  if (links.appStore)
    items.push({
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src={APP_STORE_ICON} alt="" className="h-3.5 w-3.5" />,
      label: "iOS",
      iconOnly: true,
    })
  if (links.playStore)
    items.push({
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src={PLAY_STORE_ICON} alt="" className="h-3.5 w-3.5" />,
      label: "Android",
      iconOnly: true,
    })
  if (links.api) items.push({ icon: <Blocks className="h-3.5 w-3.5" />, label: "API" })

  if (items.length < minItems) return null

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
      {items.map(({ icon, label, iconOnly }) => (
        <span key={label} className="inline-flex items-center gap-1" title={iconOnly ? label : undefined}>
          {icon}
          {!iconOnly && label}
        </span>
      ))}
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
      <ShareActions project={project} light={light} iconClassName={secondary} />
    </div>
  )
}

function ShareActions({
  project,
  light,
  iconClassName,
}: {
  project: Project
  light?: boolean
  iconClassName: string
}) {
  const [canShare, setCanShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function")
  }, [])

  function projectUrl() {
    return `${window.location.origin}/projects/${project.id}`
  }

  async function handleShare(e: React.MouseEvent) {
    e.stopPropagation()
    try {
      await navigator.share({ title: project.title, text: project.tagline, url: projectUrl() })
    } catch {
      // user dismissed the native share sheet, nothing to do
    }
  }

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation()
    await navigator.clipboard.writeText(projectUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      {canShare && (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this project"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            iconClassName
          )}
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to this project"
        className={cn("inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors", iconClassName)}
      >
        {copied ? <Check className={cn("h-3.5 w-3.5", light ? "text-white" : "text-emerald-500")} /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </>
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
  siteUrl,
}: {
  kind: "web" | "app"
  label: string
  title: string
  slides?: ScreenshotSlide[] | string[]
  siteUrl?: string
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
        data-rail={kind}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x"
      >
        {kind === "app"
          ? (slides as string[]).map((src) => (
              <div key={src} className="w-[150px] shrink-0 snap-start sm:w-[190px]">
                <Iphone src={src} className="h-auto w-full" />
              </div>
            ))
          : (slides as ScreenshotSlide[]).map((slide) => (
              <div key={slide.src} className="flex w-[min(75vw,340px)] shrink-0 snap-start flex-col gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{slide.eyebrow}</p>
                  <h5 className="mt-1 text-sm font-semibold leading-snug">{slide.headline}</h5>
                </div>
                <Safari imageSrc={slide.src} url={siteUrl} className="w-full" />
              </div>
            ))}
      </div>
    </div>
  )
}

export function ProjectBanner({ project }: { project: Project }) {
  const hasVideo = Boolean(project.video)
  // Only `video` was ever checked, so the four projects without one rendered a
  // 208px tall block of empty gradient. Fall back to the project's own hero
  // image, and when there is neither, drop the fixed height so the banner
  // collapses to its caption instead of reserving space for nothing.
  const hasImage = !hasVideo && Boolean(project.image)
  const hasMedia = hasVideo || hasImage
  const accent = project.accent ?? "#0071e3"

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        hasMedia && "h-52 sm:h-60",
        hasVideo ? "bg-neutral-900" : "bg-muted",
      )}
    >
      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
      )}
      {hasImage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-t from-black/85 via-black/25 to-transparent"
        />
      )}
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
      ) : hasImage ? null : (
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
          <ProjectIcon project={project} className={cn("h-12 w-12", hasMedia && "border-white/20 bg-white/10")} />
          <div className="min-w-0">
            <h2 className={cn("text-lg font-semibold sm:text-xl", hasMedia ? "text-white" : undefined)}>
              {project.title}
            </h2>
            <p className={cn("text-sm", hasMedia ? "text-white/70" : "text-muted-foreground")}>{project.tagline}</p>
          </div>
        </div>
        <div className="pointer-events-auto">
          <ProjectLinks project={project} compact light={hasMedia} />
        </div>
      </div>
    </div>
  )
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()
  const siteUrl = project.links.live ? project.links.live.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : undefined

  return (
    <>
      <ProjectBanner project={project} />

      <motion.div
        variants={reduceMotion ? undefined : panelVariants}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? false : "visible"}
        className="flex min-w-0 flex-col gap-5 px-6 pb-6 pt-5"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <motion.div variants={reduceMotion ? undefined : chapterVariants}>
            <ShippedSurfaces links={project.links} />
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : chapterVariants} className="flex flex-wrap gap-1.5">
            {project.techStack.map((t) => {
              console.log(t);
              return (
                <TechBadge key={t} name={t} />
              )
            })}
          </motion.div>
        </div>

        {(project.screenshots?.web?.length || project.screenshots?.app?.length) && (
          <motion.div variants={reduceMotion ? undefined : chapterVariants} className="flex flex-col gap-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Screenshots</h4>
            <ScreenshotRow kind="web" label="Web" title={project.title} slides={project.screenshots?.web} siteUrl={siteUrl} />
            <ScreenshotRow kind="app" label="App" title={project.title} slides={project.screenshots?.app} />
          </motion.div>
        )}

        <motion.section variants={reduceMotion ? undefined : chapterVariants}>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Problem</h4>
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
    </>
  )
}
