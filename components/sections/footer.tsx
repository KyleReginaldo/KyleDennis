"use client"

import { VisitorBadge } from "@/components/ui/visitor-badge"
import { ArrowUp, Facebook, Github, Linkedin, Mail } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

const EXPLORE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
]

const MORE_LINKS = [
  { label: "Tech Stack", href: "#stack" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "GitHub Activity", href: "#github" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/kylereginaldo.pdf" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/KyleReginaldo", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/kyle.dennis.26", icon: Facebook },
  { label: "Email", href: "mailto:kyledennis099@gmail.com", icon: Mail },
]

export function Footer() {
  const [showTop, setShowTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTop(latest > 800)
  })

  return (
    <footer className="relative border-t border-border bg-card/40 pt-16 pb-32 sm:pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="#home" className="text-[15px] font-semibold tracking-tight">
              Kyle Reginaldo<span className="text-primary">.</span>
            </a>
            <p className="mt-3 max-w-[22ch] text-[13px] leading-relaxed text-muted-foreground">
              Product engineer building complete digital products, end to end.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              More
            </p>
            <ul className="mt-4 space-y-2.5">
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-6 text-center text-[11px] text-muted-foreground/70 sm:flex-row sm:justify-between sm:text-left">
          <span>Copyright © {new Date().getFullYear()} Kyle Reginaldo. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Cavite, Philippines</span>
            <VisitorBadge />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-muted lg:right-6"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
