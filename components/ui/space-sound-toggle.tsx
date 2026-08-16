"use client"

import { playClick, startAmbient, stopAmbient } from "@/lib/space-audio"
import { Sound } from "iconsax-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

const STORAGE_KEY = "space-sound-enabled"

export function SpaceSoundToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const on = localStorage.getItem(STORAGE_KEY) === "true"
    setEnabled(on)
    if (on) startAmbient()

    const handleClick = () => {
      if (localStorage.getItem(STORAGE_KEY) === "true") playClick()
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
      stopAmbient()
    }
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem(STORAGE_KEY, String(next))
    if (next) startAmbient()
    else stopAmbient()
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      aria-pressed={enabled}
      className={
        className ??
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/80 text-foreground/70 backdrop-blur transition-colors hover:text-foreground"
      }
    >
      <motion.span
        animate={enabled ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={enabled ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      >
        <Sound size={17} variant="Bold" color={enabled ? "white" : "gray"} />
      </motion.span>
    </motion.button>
  )
}
