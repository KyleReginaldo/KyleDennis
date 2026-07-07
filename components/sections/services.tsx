"use client"

import { services } from "@/lib/data/services"
import { CheckCircle2 } from "lucide-react"
import { motion } from "motion/react"

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">What I Offer</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything it takes to ship a product users love.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-primary/30"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="mt-4 space-y-1.5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
