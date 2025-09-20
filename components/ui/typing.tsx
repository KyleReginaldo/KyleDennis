"use client"

import { useEffect, useState } from "react"

type TypingProps = {
  items: string[]
  speed?: number // ms per character
  pause?: number // ms between items
}

export default function Typing({ items, speed = 60, pause = 1200 }: TypingProps) {
  const [index, setIndex] = useState(0)
  const [pos, setPos] = useState(0)
  const [forward, setForward] = useState(true)

  useEffect(() => {
    const current = items[index]
    if (forward) {
      if (pos < current.length) {
        const t = setTimeout(() => setPos(p => p + 1), speed)
        return () => clearTimeout(t)
      }
      // pause at end then start deleting
      const t = setTimeout(() => setForward(false), pause)
      return () => clearTimeout(t)
    } else {
      if (pos > 0) {
        const t = setTimeout(() => setPos(p => p - 1), Math.max(30, speed - 10))
        return () => clearTimeout(t)
      }
      // move to next item
      const t = setTimeout(() => {
        setForward(true)
        setIndex(i => (i + 1) % items.length)
      }, 200)
      return () => clearTimeout(t)
    }
  }, [pos, forward, index, items, speed, pause])

  return (
    <span className="typing">
      {items[index].slice(0, pos)}
      <span className="inline-block w-0.5 h-5 align-middle bg-current ml-1 animate-blink" />
    </span>
  )
}
