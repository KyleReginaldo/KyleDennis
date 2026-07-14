"use client"

import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link href="/#home" className="font-logo text-xl tracking-tight" aria-label="Kyle Reginaldo">
            KD<span className="text-primary">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-85 sm:inline-flex"
            >
              Say Hello
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="mobile-nav-panel"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-0 z-[70] rounded-b-3xl bg-card px-6 pb-10 pt-6 shadow-2xl shadow-black/10 md:hidden"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border py-4 text-2xl font-semibold tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
              >
                Say Hello
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
