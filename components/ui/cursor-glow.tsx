"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let frame: number
    let wanderInterval: ReturnType<typeof setInterval> | undefined

    const animate = () => {
      const ease = hasFinePointer ? 0.15 : 0.01
      current.x += (target.x - current.x) * ease
      current.y += (target.y - current.y) * ease
      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(animate)
    }

    if (hasFinePointer) {
      const handleMove = (event: MouseEvent) => {
        target = { x: event.clientX, y: event.clientY }
        glow.style.opacity = "1"
      }
      window.addEventListener("mousemove", handleMove)
      frame = requestAnimationFrame(animate)
      return () => {
        window.removeEventListener("mousemove", handleMove)
        cancelAnimationFrame(frame)
      }
    }

    // No cursor on touch devices — let the glow drift on its own, like a fish wandering the sea.
    const pickNewTarget = () => {
      target = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
    }
    pickNewTarget()
    glow.style.opacity = "1"
    wanderInterval = setInterval(pickNewTarget, 4500)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      if (wanderInterval) clearInterval(wanderInterval)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] opacity-0 blur-[120px] transition-opacity duration-300 ease-out"
    />
  )
}
