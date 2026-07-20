"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export function HalftoneImage({
  src,
  alt = "",
  className,
  cellSize = 6,
  dotColor = "#0a0a0a",
  backgroundColor = "#ffffff",
  threshold = 0.62,
}: {
  src: string
  alt?: string
  className?: string
  cellSize?: number
  dotColor?: string
  backgroundColor?: string
  /** Brightness (0-1) above which a cell is left blank/white instead of getting a dot. */
  threshold?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src

    img.onload = () => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return

      const width = img.naturalWidth
      const height = img.naturalHeight

      const sample = document.createElement("canvas")
      sample.width = width
      sample.height = height
      const sctx = sample.getContext("2d")
      if (!sctx) return
      sctx.drawImage(img, 0, 0, width, height)
      const { data } = sctx.getImageData(0, 0, width, height)

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = dotColor

      const maxRadius = cellSize / 2

      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          let total = 0
          let count = 0
          for (let dy = 0; dy < cellSize && y + dy < height; dy++) {
            for (let dx = 0; dx < cellSize && x + dx < width; dx++) {
              const i = ((y + dy) * width + (x + dx)) * 4
              const r = data[i]
              const g = data[i + 1]
              const b = data[i + 2]
              const a = data[i + 3] / 255
              // HSV "value" (max channel), not luma - luma undervalues red/blue,
              // which makes saturated color backdrops (e.g. a red studio backdrop)
              // read as falsely dark and get covered in dots.
              const value = Math.max(r, g, b) / 255
              total += value * a + (1 - a)
              count++
            }
          }
          const avgValue = count > 0 ? total / count : 1
          if (avgValue >= threshold) continue

          const darkness = (threshold - avgValue) / threshold
          const radius = maxRadius * darkness
          if (radius > 0.4) {
            ctx.beginPath()
            ctx.arc(x + cellSize / 2, y + cellSize / 2, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      setReady(true)
    }

    return () => {
      cancelled = true
    }
  }, [src, cellSize, dotColor, backgroundColor, threshold])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={cn("h-full w-full object-cover", className)}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  )
}
