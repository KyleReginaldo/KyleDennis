"use client"

import { testimonials } from "@/lib/data/testimonials"
import { motion } from "motion/react"

const OPEN_QUOTE = "“"
const CLOSE_QUOTE = "”"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Kind Words</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 select-none font-serif text-7xl leading-none text-white/[0.06]"
              >
                {OPEN_QUOTE}
              </span>

              <p className="relative text-[15px] leading-relaxed text-foreground/90">
                {OPEN_QUOTE}
                {t.quote}
                {CLOSE_QUOTE}
              </p>

              <div className="relative mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 text-xs font-semibold">
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
