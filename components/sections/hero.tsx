"use client"

import { FlipWord } from "@/components/ui/flip-word"
import { KineticText } from "@/components/ui/kinetic-text"
import { ArrowRight, ArrowUpRight, Download } from "lucide-react"
import { motion } from "motion/react"
import { Fragment } from "react"

const HEADLINE = "Building apps people love."
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
    <section id="home" className="relative flex min-h-[70vh] items-center overflow-hidden pt-24 pb-16">
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
                {w === "love," ? (
                  <FlipWord words={FLIP_WORDS} className="text-primary" />
                ) : (
                  <KineticText as="span" text={w} className="inline-flex w-auto font-semibold" />
                )}
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
          I believe in turning ideas into experiences that make a difference. I'm always curious, always learning, and always looking for new ways to build, create, and grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 pt-2"
        >
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.03] hover:opacity-85 active:scale-[0.97]"
          >
            View My Work
            <span className="relative inline-block h-3.5 w-3.5">
              <ArrowRight className="absolute inset-0 h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-0" />
              <ArrowUpRight className="absolute inset-0 h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </span>
          </a>
          <a
            href="/kylereginaldo.pdf"
            download
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            Download CV
            <Download className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:rotate-[360deg]" />
          </a>
         
        </motion.div>
      </div>
    </section>
  )
}
