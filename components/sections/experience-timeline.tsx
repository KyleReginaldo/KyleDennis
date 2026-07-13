"use client"

import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data/experience"
import { motion } from "motion/react"

export function ExperienceTimeline() {
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

        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-6"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card">
                  {entry.logo ? (
                    <img src={entry.logo} alt={`${entry.company} logo`} className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-xs font-semibold text-muted-foreground">
                      {entry.company.split(" ").map((w) => w[0]).join("")}
                    </span>
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{entry.company}</h3>
                      <p className="text-sm text-primary">{entry.role}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground/70">{entry.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {entry.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
