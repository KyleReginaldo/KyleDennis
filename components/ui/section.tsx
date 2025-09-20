"use client"

import React, { useEffect, useRef, useState } from "react"

export default function Section({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true)
        })
      },
      { threshold: 0.15 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref as any}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </section>
  )
}
