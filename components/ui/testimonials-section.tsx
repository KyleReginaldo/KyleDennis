"use client"

import { testimonials } from "@/lib/data/testimonials"
import { motion } from "motion/react"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-3xl px-6">
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

        <div className="divide-y divide-border border-t border-border">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="py-8"
            >
              <blockquote className="text-lg leading-relaxed text-foreground/90">{t.quote}</blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted-foreground"> · {t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
