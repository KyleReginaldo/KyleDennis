"use client"

import { testimonials } from "@/lib/data/testimonials"
import { motion } from "motion/react"

const OPEN_QUOTE = "“"
const CLOSE_QUOTE = "”"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Kind Words</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Feedback from people I&apos;ve worked with.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 select-none font-serif text-7xl leading-none text-foreground/[0.06]"
              >
                {OPEN_QUOTE}
              </span>

              <p className="relative text-[15px] leading-relaxed text-foreground/90">
                {OPEN_QUOTE}
                {t.quote}
                {CLOSE_QUOTE}
              </p>

              <div className="relative mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
