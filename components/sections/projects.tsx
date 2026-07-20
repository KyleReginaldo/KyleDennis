"use client"

import CaseStudyCard from "@/components/animata/card/case-study-card"
import { projectCategories, projects } from "@/lib/data/projects"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

export function Projects() {
  const [filter, setFilter] = useState<string>("All")
  const reduceMotion = useReducedMotion()
  const router = useRouter()

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

        <motion.div layout className="flex flex-wrap justify-center gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                  e.preventDefault()
                  router.push(`/projects/${project.id}`)
                }}
              >
                <CaseStudyCard
                  type="content"
                  title={project.tagline}
                  category={project.title}
                  accent={project.accent}
                  logo={project.logo}
                  link={`/projects/${project.id}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
