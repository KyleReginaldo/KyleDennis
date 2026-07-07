"use client"

import { cn } from "@/lib/utils"
import { Lightbulb, LightbulbOff } from "lucide-react"
import { useEffect, useState, type MouseEvent } from "react"

export function ThemeToggle() {
  // start with undefined so server and client HTML match (prevents hydration mismatch)
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    setTheme(stored === "light" ? "light" : "dark")
  }, [])

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark"
    const { clientX, clientY } = event

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", next === "dark")
      try {
        localStorage.setItem("theme", next)
      } catch {
        // ignore
      }
      setTheme(next)
    }

    if (!document.startViewTransition) {
      applyTheme()
      return
    }

    document.documentElement.style.setProperty("--theme-toggle-x", `${clientX}px`)
    document.documentElement.style.setProperty("--theme-toggle-y", `${clientY}px`)
    document.startViewTransition(applyTheme)
  }

  const isDark = theme !== "light"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      className={cn(
        "relative flex h-9 w-16 shrink-0 items-center rounded-full border p-1 transition-colors duration-500",
        isDark ? "border-border bg-muted" : "border-amber-300 bg-amber-100 shadow-inner"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ease-out",
          isDark
            ? "translate-x-0 bg-background text-muted-foreground"
            : "translate-x-7 bg-amber-400 text-amber-950 shadow-[0_0_14px_2px_rgba(251,191,36,0.7)]"
        )}
      >
        {isDark ? (
          <LightbulbOff className="h-4 w-4" />
        ) : (
          <Lightbulb className="h-4 w-4 fill-current" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
