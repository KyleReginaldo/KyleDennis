"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

export function FlipWord({
  words,
  interval = 2200,
  className,
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className="inline-block" style={{ perspective: 600 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${className ?? ""}`}
          style={{ transformOrigin: "50% 50%", backfaceVisibility: "hidden" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
