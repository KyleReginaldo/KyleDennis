"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, type CSSProperties } from "react"
import styles from "./kd-loader.module.css"

const STORAGE_KEY = "kd-splash-seen"
const HOLD_MS = 2600
const EXIT_MS = 550

type Letter = { char: string; width: string; delay: string }

const K_TRAIL: Letter[] = [
  { char: "y", width: "0.60em", delay: "0ms" },
  { char: "l", width: "0.28em", delay: "40ms" },
  { char: "e", width: "0.58em", delay: "80ms" },
]

const D_TRAIL: Letter[] = [
  { char: "e", width: "0.58em", delay: "0ms" },
  { char: "n", width: "0.64em", delay: "35ms" },
  { char: "n", width: "0.64em", delay: "70ms" },
  { char: "i", width: "0.28em", delay: "105ms" },
  { char: "s", width: "0.55em", delay: "140ms" },
]

function vars(width: string, delay: string): CSSProperties {
  return { "--w": width, "--d": delay } as CSSProperties
}

export function KDLoader() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    sessionStorage.setItem(STORAGE_KEY, "1")
    setVisible(true)

    const exitTimer = setTimeout(() => setExiting(true), HOLD_MS)
    return () => clearTimeout(exitTimer)
  }, [])

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [visible])

  if (!visible) return null

  return (
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {!exiting && (
        <motion.div
          className={styles.stage}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className={styles.glow} aria-hidden />

          <div className={styles.markWrap}>
            <div className={styles.mark} aria-label="Kyle Dennis">
              <span className={styles.sheen} aria-hidden />

              <span className={styles.word}>
                <span className={styles.lead}>K</span>
                {K_TRAIL.map((l, i) => (
                  <span key={i} className={styles.clip} style={vars(l.width, l.delay)}>
                    <span className={styles.glyph} style={vars(l.width, l.delay)}>
                      {l.char}
                    </span>
                  </span>
                ))}
              </span>

              <span className={`${styles.word} ${styles.wordD}`}>
                <span className={styles.lead}>D</span>
                {D_TRAIL.map((l, i) => (
                  <span key={i} className={styles.clip} style={vars(l.width, l.delay)}>
                    <span className={styles.glyph} style={vars(l.width, l.delay)}>
                      {l.char}
                    </span>
                  </span>
                ))}
              </span>
            </div>

            <div className={styles.hairline} aria-hidden />
            <p className={styles.kicker}>Full Stack Developer</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
