"use client"

import { process } from "@/lib/data/process"
import { motion } from "motion/react"

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">How I Work</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From idea to production.</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-muted-foreground/20 to-transparent" />

          <div className="flex flex-col gap-10">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative flex items-start gap-6 pl-0"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background">
                  <step.icon className="h-[18px] w-[18px] text-primary" />
                </div>
                <div className="pt-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
