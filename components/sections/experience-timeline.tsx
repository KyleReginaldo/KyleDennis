"use client"

import { TechBadge } from "@/components/sections/project-case-study"
import { experience, type ExperienceEntry } from "@/lib/data/experience"
import { motion, useScroll, useSpring } from "motion/react"
import { useRef } from "react"

function tenureMonths(period: string): number {
  const [startStr, endStr] = period.split(" - ")
  const start = new Date(startStr)
  const end = endStr === "Present" ? new Date() : new Date(endStr)
  return Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()))
}

function formatTenure(months: number): string {
  const years = Math.floor(months / 12)
  const rest = months % 12
  if (years === 0) return `${rest} mo${rest === 1 ? "" : "s"}`
  if (rest === 0) return `${years} yr${years === 1 ? "" : "s"}`
  return `${years}y ${rest}m`
}

function ExperienceCard({ entry, index, maxMonths }: { entry: ExperienceEntry; index: number; maxMonths: number }) {
  const months = tenureMonths(entry.period)
  const accent = entry.accent ?? "var(--primary)"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-start gap-6"
    >
      <div className="relative z-10 h-12 w-12 shrink-0">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card">
          {entry.logo ? (
            <img src={entry.logo} alt={`${entry.company} logo`} className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs font-semibold text-muted-foreground">
              {entry.company.split(" ").map((w) => w[0]).join("")}
            </span>
          )}
        </div>
        <span
          aria-hidden
          className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background"
          style={{ background: accent }}
        />
      </div>

      <div className="flex-1 pt-0.5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold tracking-tight sm:text-lg">{entry.company}</h3>
             
            </div>
            <p className="text-sm text-primary">{entry.role}</p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="font-mono text-xs tabular-nums text-muted-foreground/70">{entry.period}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground/50">
                {formatTenure(months)} · {entry.location}
              </span>
            </div>
            <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: months / maxMonths }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: accent, transformOrigin: "left" }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        </div>

        <ul className="mt-3 space-y-1.5">
          {entry.responsibilities.map((r) => (
            <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full"
                style={{ background: accent, opacity: 0.6 }}
              />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40 })
  const maxMonths = Math.max(...experience.map((e) => tenureMonths(e.period)))

  return (
    <section id="experience" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Experience</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Where I&apos;ve shipped.</h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineProgress }}
            className="absolute left-6 top-2 bottom-2 w-px origin-top bg-primary"
          />

          <div className="flex flex-col gap-10">
            {experience.map((entry, i) => (
              <ExperienceCard key={entry.company} entry={entry} index={i} maxMonths={maxMonths} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
