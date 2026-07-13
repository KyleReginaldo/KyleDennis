"use client"

import { FlipWord } from "@/components/ui/flip-word"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { Fragment } from "react"

const HEADLINE = "Building products that users love, from idea to production."
const FLIP_WORDS = ["love,", "trust,", "need,", "enjoy,"]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
}

const word = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05]"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <Fragment key={i}>
              <motion.span variants={word} className="inline-block">
                {w === "love," ? <FlipWord words={FLIP_WORDS} className="text-primary" /> : w}
              </motion.span>{" "}
            </Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-xl leading-relaxed text-muted-foreground"
        >
          I design and build complete digital products, mobile apps, web platforms, and the
          backend systems behind them, with interfaces people genuinely enjoy using.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 pt-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            Contact me
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
