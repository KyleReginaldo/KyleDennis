"use client"

import { cn } from "@/lib/utils"
import { GraduationCap, Shirt, Sparkles, Users } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { useState, type MouseEvent } from "react"

const PHOTOS = [
  { key: "creative", label: "Creative", icon: Sparkles, src: "/kyle/images/creative.JPG" },
  { key: "toga", label: "Toga", icon: GraduationCap, src: "/kyle/images/toga.JPG" },
  { key: "barong", label: "Barong Tagalog", icon: Shirt, src: "/kyle/images/barong.JPG" },
  { key: "duo", label: "Duo", icon: Users, src: "/kyle/images/duo.JPG" },
]

export function AboutPhotoSwitcher({ borderRevealed = false }: { borderRevealed?: boolean }) {
  const [active, setActive] = useState(0)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 16)
    rotateX.set(py * -16)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  const photo = PHOTOS[active]

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-xs [perspective:1200px]"
      >
        <motion.div
          initial={{ borderColor: "rgba(0,113,227,0)" }}
          animate={{ borderColor: borderRevealed ? "rgba(0,113,227,1)" : "rgba(0,113,227,0)" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border-2 shadow-xl shadow-black/10"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={photo.key}
              src={photo.src}
              alt={photo.label}
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PHOTOS.map((p, i) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(i)}
            aria-label={p.label}
            title={p.label}
            className={cn(
              "relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
              active === i
                ? "border-transparent text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {active === i && (
              <motion.span
                layoutId="aboutPhotoPill"
                className="absolute inset-0 -z-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <p.icon className="relative z-10 h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
