"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Tech Stacks", href: "/services" },
  { label: "Contact", href: "/contact" },
]

const underlineVariants = {
  rest: { scaleX: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const } },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
}

const dotVariants = {
  rest: { opacity: 0, scale: 0, transition: { duration: 0.15 } },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.3 } },
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate={active ? "hover" : "rest"}
      className="relative"
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative inline-block text-[13px] font-medium transition-colors hover:text-foreground ${
          active ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
        <motion.span
          aria-hidden
          variants={dotVariants}
          className="absolute -right-2.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-primary"
        />
        <motion.span
          aria-hidden
          variants={underlineVariants}
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground"
        />
      </Link>
    </motion.div>
  )
}

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-logo text-xl tracking-tight" aria-label="Kyle Reginaldo">
          KD<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-85 md:inline-flex"
          >
            Say Hello
          </Link>
        </div>
      </div>
    </header>
  )
}
