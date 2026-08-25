"use client"

import { ProjectGridCard } from "@/components/sections/project-grid-card"
import { projectCategories, projects } from "@/lib/data/projects"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useMemo, useState } from "react"

// Each pill borrows its color from the projects it filters to, turning the
// row into a legend for the colorful cards below instead of a plain toggle.
const CATEGORY_ACCENT: Record<string, string> = Object.fromEntries(
  projectCategories.map((c) => [c, projects.find((p) => p.categories.includes(c))?.accent ?? "#0071e3"])
)
const CATEGORY_COUNT: Record<string, number> = Object.fromEntries(
  projectCategories.map((c) => [c, projects.filter((p) => p.categories.includes(c)).length])
)

export function Projects() {
  const [filter, setFilter] = useState<string>("All")
  const reduceMotion = useReducedMotion()

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  )

  return (
    <section id="projects" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-7xl px-6 2xl:max-w-[1300px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">All Projects</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Products shipped end to end.</h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            {projects.length} real apps and platforms built and shipped, from architecture to release, all live in production.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {["All", ...projectCategories].map((c) => {
            const active = filter === c
            const accent = c === "All" ? undefined : CATEGORY_ACCENT[c]
            const count = c === "All" ? projects.length : CATEGORY_COUNT[c]

            return (
              <motion.button
                key={c}
                onClick={() => setFilter(c)}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.93 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className={`relative flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${
                  active ? "border-transparent text-white" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 -z-0 rounded-full"
                    style={{ background: accent ?? "var(--foreground)" }}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {accent && (
                  <span
                    aria-hidden
                    className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: active ? "rgba(255,255,255,0.9)" : accent }}
                  />
                )}
                <span className="relative z-10">{c}</span>
                <span className={`relative z-10 text-[10px] ${active ? "text-white/70" : "text-muted-foreground/60"}`}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectGridCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
