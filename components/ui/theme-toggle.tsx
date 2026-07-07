"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  // start with undefined so server and client HTML match (prevents hydration mismatch)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    // Dark mode first: only go light if the user explicitly chose it before.
    const stored = localStorage.getItem('theme')
    setTheme(stored === 'light' ? 'light' : 'dark')
  }, [])

  useEffect(() => {
    if (!theme) return
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  function toggle() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted/20 transition-colors"
    >
      {/* Render a neutral icon until theme is known to avoid SSR/CSR mismatch */}
      {theme === null ? (
        <Sun className="w-5 h-5 opacity-80" />
      ) : theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
