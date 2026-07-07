"use client"

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/KyleReginaldo", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2", icon: Linkedin },
  { label: "Email", href: "mailto:kyledennis099@gmail.com", icon: Mail },
]

export function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 sm:flex-row sm:justify-between">
        <a href="#home" className="text-lg font-bold tracking-tight">
          KR<span className="text-primary">.</span>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 px-6 pt-6 text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Kyle Reginaldo. All rights reserved.
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-muted lg:right-6"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
