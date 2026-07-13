"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Iphone15Pro } from "@/components/ui/iphone-15-pro"
import { projectCategories, projects, type Project } from "@/lib/data/projects"
import {
  AlertTriangle,
  Blocks,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  ListChecks,
  Smartphone,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"

function useInView<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}

function LivePreview({ url, title }: { url: string; title: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const hostname = url.replace("https://", "").replace(/\/$/, "")

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card px-3 py-1.5">
        <div className="flex shrink-0 gap-1">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="block h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="block h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 truncate text-center text-[10px] text-muted-foreground/70">{hostname}</span>
      </div>
      <div ref={ref} className="relative flex-1 overflow-hidden bg-muted">
        {inView ? (
          <iframe
            src={url}
            title={title}
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
            style={{ width: "300%", height: "300%", transform: "scale(0.3333)" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-muted-foreground/50">
            Loading preview…
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.logo) {
    const accent = project.accent ?? "#0071e3"
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden p-10"
        style={{
          background: `linear-gradient(155deg, ${accent}26 0%, ${accent}0a 55%, transparent 100%)`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ backgroundColor: `${accent}33` }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          className="relative h-auto max-h-20 w-auto max-w-[55%] rounded-2xl object-contain shadow-lg shadow-black/10"
        />
      </div>
    )
  }
  if (project.links.live) {
    return <LivePreview url={project.links.live} title={project.title} />
  }
  if (project.image) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted py-3">
        <Iphone15Pro className="h-auto w-[120px]" src={project.image} />
      </div>
    )
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <span className="text-5xl font-bold text-foreground/10">{project.title.slice(0, 2).toUpperCase()}</span>
    </div>
  )
}

function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  const size = compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
  return (
    <div className="flex flex-wrap gap-2">
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 rounded-full bg-foreground font-medium text-background transition-opacity hover:opacity-85 ${size}`}
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
          className={`inline-flex items-center gap-1.5 rounded-full border border-muted-foreground/25 font-medium transition-colors hover:bg-muted/40 ${size}`}
        >
          <Smartphone className="h-3.5 w-3.5" /> Play Store
        </a>
      )}
      {project.links.appStore && (
        <a
          href={project.links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 rounded-full border border-muted-foreground/25 font-medium transition-colors hover:bg-muted/40 ${size}`}
        >
          <Smartphone className="h-3.5 w-3.5" /> App Store
        </a>
      )}
      {project.links.download && (
        <a
          href={project.links.download}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 rounded-full border border-muted-foreground/25 font-medium transition-colors hover:bg-muted/40 ${size}`}
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
          className={`inline-flex items-center gap-1.5 rounded-full border border-muted-foreground/25 font-medium transition-colors hover:bg-muted/40 ${size}`}
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-black/[0.06]"
    >
      <div className="h-60 w-full overflow-hidden">
        <ProjectMedia project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <Badge key={c} variant="outline" className="text-[10px]">
              {c}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <ProjectLinks project={project} compact />
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <ListChecks className="h-3.5 w-3.5" /> Case Study
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function CaseStudyDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(v: boolean) => !v && onClose()}>
      {project && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.tagline}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 px-6 pb-6">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>

            <section>
              <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Problem
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">{project.problem}</p>
            </section>

            <section>
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
            </section>

            <section>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                <Blocks className="h-3.5 w-3.5" /> Architecture
              </h4>
              <p className="text-sm leading-relaxed text-foreground/90">{project.architecture}</p>
            </section>

            <section>
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
            </section>

            <section>
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
            </section>

            <ProjectLinks project={project} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All")
  const [selected, setSelected] = useState<Project | null>(null)

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
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
