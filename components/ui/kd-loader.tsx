"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect, useState, type CSSProperties } from "react"
import styles from "./kd-loader.module.css"

const STORAGE_KEY = "kd-splash-seen"

const STARS_PHASE_MS = 1900
const CENTER_STAR_DELAY_MS = STARS_PHASE_MS + 250
const CENTER_APPEAR_MS = 450
const REVEAL_START_MS = CENTER_STAR_DELAY_MS + CENTER_APPEAR_MS + 250
const REVEAL_DURATION_S = 0.9

const REDUCED_HOLD_MS = 450
const REDUCED_REVEAL_S = 0.4

type Star = {
  id: number
  x: number
  y: number
  size: number
  baseOpacity: number
  appearDelay: number
  twinkleDuration: number
  twinkleDelay: number
  drift: boolean
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.6 + 0.6,
    baseOpacity: Math.random() * 0.5 + 0.4,
    appearDelay: Math.random() * (STARS_PHASE_MS - 300),
    twinkleDuration: Math.random() * 3 + 2.5,
    twinkleDelay: Math.random() * 4,
    drift: Math.random() < 0.25,
  }))
}

function starStyle(star: Star): CSSProperties {
  return {
    left: `${star.x}%`,
    top: `${star.y}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    "--base-opacity": star.baseOpacity,
    "--appear-delay": `${star.appearDelay}ms`,
    "--twinkle-duration": `${star.twinkleDuration}s`,
    "--twinkle-delay": `${star.twinkleDelay}s`,
  } as CSSProperties
}

export function KDLoader() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [stars] = useState(() => generateStars(80))
  const holeRadius = useMotionValue(0)
  const flashOpacity = useMotionValue(0)
  const maskImage = useTransform(
    holeRadius,
    (r) => `radial-gradient(circle at 50% 50%, transparent 0, transparent ${r}%, black ${r}%)`
  )

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(false)
      return
    }
    sessionStorage.setItem(STORAGE_KEY, "1")
    setMounted(true)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const revealTimer = setTimeout(
      () => {
        const flashControls = animate(flashOpacity, [0, 1, 0], {
          duration: reduceMotion ? REDUCED_REVEAL_S * 0.6 : 0.5,
          times: [0, 0.25, 1],
          ease: "easeOut",
        })
        const holeControls = animate(holeRadius, 150, {
          duration: reduceMotion ? REDUCED_REVEAL_S : REVEAL_DURATION_S,
          ease: [0.65, 0, 0.35, 1],
          onComplete: () => setVisible(false),
        })
        return () => {
          flashControls.stop()
          holeControls.stop()
        }
      },
      reduceMotion ? REDUCED_HOLD_MS : REVEAL_START_MS
    )

    return () => clearTimeout(revealTimer)
  }, [flashOpacity, holeRadius])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ""
      return
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [visible])

  if (!mounted || !visible) return null

  return (
    <motion.div className={styles.stage} style={{ maskImage, WebkitMaskImage: maskImage }}>
      <div className={styles.nightLayer} aria-hidden />

      {stars.map((star) => (
        <div
          key={star.id}
          aria-hidden
          className={star.drift ? `${styles.star} ${styles.starDrift}` : styles.star}
          style={starStyle(star)}
        />
      ))}

      <div
        aria-hidden
        className={styles.centerStar}
        style={
          {
            "--center-delay": `${CENTER_STAR_DELAY_MS}ms`,
            "--center-duration": `${CENTER_APPEAR_MS}ms`,
          } as CSSProperties
        }
      />

      <motion.div
        aria-hidden
        style={{
          opacity: flashOpacity,
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(190,215,255,0.6) 35%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}
