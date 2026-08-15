"use client"

import { VisitorBadge } from "@/components/ui/visitor-badge"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { useState } from "react"

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Tech Stacks", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Featured Projects", href: "/projects" },
      { label: "Process", href: "/services#process" },
      { label: "Tech Stack", href: "/services#stack" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Resume", href: "/kylereginaldo.pdf" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/KyleReginaldo", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2", external: true },
      { label: "Facebook", href: "https://www.facebook.com/kyle.dennis.26", external: true },
      { label: "Email", href: "mailto:kyledennis099@gmail.com" },
    ],
  },
]

const underlineVariants = {
  rest: { scaleX: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const } },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
}

function FooterLinkContent({ label }: { label: string }) {
  return (
    <>
      {label}
      <motion.span
        aria-hidden
        variants={underlineVariants}
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-foreground"
      />
    </>
  )
}

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <motion.li initial="rest" whileHover="hover">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <FooterLinkContent label={label} />
        </a>
      ) : (
        <Link
          href={href}
          className="relative inline-block text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <FooterLinkContent label={label} />
        </Link>
      )}
    </motion.li>
  )
}

export function Footer() {
  const [showTop, setShowTop] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTop(latest > 800)
  })

  return (
    <footer className="relative border-t border-border bg-muted pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-logo text-xl tracking-tight" aria-label="Kyle Reginaldo">
              KD<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 max-w-[24ch] text-[13px] leading-relaxed text-muted-foreground">
              Software engineer building complete digital products, end to end.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[13px] font-semibold text-foreground">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <FooterLink key={link.label} label={link.label} href={link.href} external={link.external} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-[11px] text-muted-foreground/70 sm:flex-row sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Kyle Reginaldo. All rights reserved.</span>
          <div className="flex items-center gap-3">
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
            whileHover={{ scale: 1.08, y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            whileTap={{ scale: 0.92, transition: { type: "spring", stiffness: 500, damping: 20 } }}
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
