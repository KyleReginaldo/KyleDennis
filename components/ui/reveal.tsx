"use client"

import { motion, type Transition } from "motion/react"
import type { ReactNode } from "react"

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const DEFAULT_TRANSITION: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] }

export function Reveal({
  children,
  className,
  delay = 0,
  margin = "-80px",
  transition,
}: {
  children: ReactNode
  className?: string
  delay?: number
  margin?: string
  transition?: Transition
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      transition={{ ...DEFAULT_TRANSITION, delay, ...transition }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
