"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

const PARTICLE_COUNT = 70

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
}

// Soft dust drifting through the white void — canvas 2D is plenty for a few dozen dots,
// no WebGL needed.
function ParticleCanvas({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -Math.random() * 0.00012 - 0.00003,
      alpha: Math.random() * 0.35 + 0.25,
    }))

    let width = 0
    let height = 0
    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x * width, p.y * height, 25, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 0, 0, 1)`
        ctx.fill()
      }
    }

    if (reduced) {
      draw()
      return () => window.removeEventListener("resize", resize)
    }

    let raf: number
    const tick = () => {
      for (const p of particles) {
        p.x = (p.x + p.vx + 1) % 1
        p.y = (p.y + p.vy + 1) % 1
      }
      draw()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
}

// Pale glow orbs that drift at different scroll speeds, giving the white page a sense
// of parallax depth without ever leaving the light palette.
function GlowOrbs({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll()
  const slow = useTransform(scrollY, [0, 4000], [0, -180])
  const mid = useTransform(scrollY, [0, 4000], [0, 260])
  const fast = useTransform(scrollY, [0, 4000], [0, -340])

  return (
    <>
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: slow }}
        className="absolute -left-24 top-[10%] h-[420px] w-[420px] rounded-full bg-primary/[0.10] blur-[100px]"
      />
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: mid }}
        className="absolute -right-32 top-[45%] h-[520px] w-[520px] rounded-full bg-primary/[0.08] blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: fast }}
        className="absolute left-[20%] top-[80%] h-[360px] w-[360px] rounded-full bg-foreground/[0.05] blur-[90px]"
      />
    </>
  )
}

export function SpaceField() {
  const reduced = useReducedMotion() ?? false

  return (
    // Sticky + negative margin pins this to the viewport for the whole page scroll
    // without adding scroll height — `fixed` can't be used here because framer-motion's
    // page-transition wrapper in app/template.tsx puts a `transform` on an ancestor,
    // which turns `fixed` descendants into ones sized to the whole document instead of the viewport.
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 -z-10 -mb-[100vh] h-screen w-full overflow-hidden bg-white"
    >
      <GlowOrbs reduced={reduced} />
      <div className="absolute inset-0">
        <ParticleCanvas reduced={reduced} />
      </div>
    </div>
  )
}
