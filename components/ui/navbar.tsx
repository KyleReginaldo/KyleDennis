"use client"

import ThemeToggle from "@/components/ui/theme-toggle"
import { useEffect, useState } from "react"
import { AuroraText } from "./aurora-text"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Detect current theme the same way ThemeToggle does
    try {
      const stored = localStorage.getItem("theme")
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
      const currentDark = stored === "dark" || (!stored && prefersDark)
      setIsDark(currentDark)
    } catch (e) {
      // fallback to prefers-color-scheme
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
      setIsDark(!!prefersDark)
    }
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    let idleTimer: number | undefined

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          const delta = currentY - lastY

          // hide when scrolling down, show when scrolling up
          if (delta > 10 && currentY > 80) setHidden(true)
          else if (delta < -10) setHidden(false)

          lastY = currentY
          ticking = false

          // show navbar after scroll stops for 800ms
          if (idleTimer) window.clearTimeout(idleTimer)
          idleTimer = window.setTimeout(() => setHidden(false), 800)
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (idleTimer) window.clearTimeout(idleTimer)
    }
  }, [])

  // Define aurora color sets for light/dark modes
  const auroraColors =
  isDark === null
    ? ["#A78BFA", "#67E8F9"] // neutral: soft violet to light cyan
    : isDark
    ? ["#8B5CF6", "#06B6D4", "#3B82F6"] // dark mode: soft purple, teal, blue
    : ["#F472B6", "#C084FC", "#FBCFE8"]; // light mode: soft pinks and violets

  return (
  <header className={`nav-slide-in w-full bg-muted/20 dark:bg-muted/90 backdrop-blur sticky top-0 z-50 border-b border-border transform transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <a href="#overview" className="flex items-center gap-3">
            {/* <img src="/assets/logo-small.svg" alt="logo" className="w-8 h-8" /> */}
            <AuroraText className="font-bold text-[20px]" colors={auroraColors}>
              Kyle Reginaldo
            </AuroraText>

          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-sm text-muted-foreground hover:text-primary">Home</a>
            <a href="#stacks" className="text-sm text-muted-foreground hover:text-primary">Stacks</a>
            <a href="#showcase" className="text-sm text-muted-foreground hover:text-primary">Showcase</a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-primary">Experience</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-primary">Testimonials</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded focus:outline-none focus:ring"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-muted/10 dark:bg-muted/80 border-t border-border">
          <div className="px-4 py-3 space-y-2">
            <a href="#overview" className="block">Home</a>
            <a href="#stacks" className="block">Stacks</a>
            <a href="#showcase" className="block">Showcase</a>
            <a href="#experience" className="block">Experience</a>
            <a href="#testimonials" className="block">Testimonials</a>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
