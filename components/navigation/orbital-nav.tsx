"use client"

import { SpaceSoundToggle } from "@/components/ui/space-sound-toggle"
import { Facebook, FileText, Github, Linkedin, Mail, X } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

const NAV_LINKS = [
  { index: "01", label: "About", href: "/" },
  { index: "02", label: "Projects", href: "/projects" },
  { index: "03", label: "Experience", href: "/experience" },
  { index: "04", label: "Tech Stack", href: "/services" },
  { index: "05", label: "Blog", href: "/blog" },
  { index: "06", label: "Contact", href: "/contact" },
  { index: "07", label: "Piano", href: "/piano" },
] as const

const SOCIAL_LINKS = [
  { label: "Resume", href: "/kylereginaldo.pdf", icon: FileText },
  { label: "GitHub", href: "https://github.com/KyleReginaldo", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/kyle.dennis.26", icon: Facebook },
  { label: "Email", href: "mailto:kyledennis099@gmail.com", icon: Mail },
] as const

type NavLink = (typeof NAV_LINKS)[number]

function OrbitDot({ reduced }: { reduced: boolean }) {
  return (
    <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center">
      <span className="absolute h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(0,113,227,0.55)]" />
      {!reduced && (
        <span
          className="animate-orbit absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70"
          style={{ "--duration": 9, "--radius": 6, "--angle": 0 } as CSSProperties}
        />
      )}
    </span>
  )
}

function StatusBadge() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-white/40">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      ONLINE
    </div>
  )
}

function NavItem({ link, active, reduced }: { link: NavLink; active: boolean; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const rel = e.clientX - (rect.left + rect.width / 2)
    setOffset(Math.max(-5, Math.min(5, rel * 0.3)))
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setOffset(0)}
      animate={{ x: offset }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative px-3 py-2"
    >
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`relative flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium tracking-wide transition-colors duration-200 ${
          active ? "text-white" : "text-white/50 group-hover:text-white/85"
        }`}
      >
        <span className="font-mono text-[9px] text-white/30 group-hover:text-primary/80">{link.index}</span>
        {link.label}
        {active && <OrbitDot reduced={reduced} />}
      </Link>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: reduced ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute -bottom-0.5 left-3 right-3 h-px origin-left bg-white/30"
      />
    </motion.div>
  )
}

function SocialIcons({ size = "h-7 w-7" }: { size?: string }) {
  return (
    <>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target={social.href.startsWith("http") ? "_blank" : undefined}
          rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={social.label}
          className={`flex ${size} items-center justify-center rounded-full text-white/50 transition-colors hover:text-white`}
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}
    </>
  )
}

function DesktopNav({ pathname, reduced }: { pathname: string; reduced: boolean }) {
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)

  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 32))

  return (
    <motion.header
      animate={{ paddingTop: compact ? 8 : 14, paddingBottom: compact ? 8 : 14 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`fixed inset-x-0 top-6 z-50 mx-auto hidden w-fit items-center gap-8 rounded-full border px-6 backdrop-blur-xl transition-colors duration-300 md:flex ${
        compact ? "border-white/[0.09] bg-[#0a0a0f]/85" : "border-white/[0.07] bg-[#0a0a0f]/65"
      }`}
    >
      <Link href="/" className="font-logo text-lg tracking-tight text-white" aria-label="Kyle Reginaldo, home">
        KD<span className="text-primary">.</span>
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <NavItem key={link.href} link={link} active={pathname === link.href} reduced={reduced} />
        ))}
      </nav>

      <div className="h-4 w-px bg-white/[0.08]" />

      <SpaceSoundToggle className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white" />


      
    </motion.header>
  )
}

function MobileNav({ pathname, reduced }: { pathname: string; reduced: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0a0a0f]/80 px-4 py-2.5 backdrop-blur-xl md:hidden">
        <Link href="/" className="font-logo text-lg tracking-tight text-white" aria-label="Kyle Reginaldo, home">
          KD<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <SpaceSoundToggle className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] text-white/70"
          >
            <OrbitDot reduced={reduced} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#050507]/97 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-logo text-lg tracking-tight text-white"
                aria-label="Kyle Reginaldo, home"
              >
                KD<span className="text-primary">.</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-white/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
              />
            )}

            <nav aria-label="Primary" className="relative flex flex-1 flex-col items-start justify-center gap-6 px-8">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: reduced ? 0 : 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-3 text-3xl font-medium tracking-tight ${
                        active ? "text-white" : "text-white/50"
                      }`}
                    >
                      <span className="font-mono text-xs text-white/30">{link.index}</span>
                      {link.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(0,113,227,0.55)]" />}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function OrbitalNav() {
  const pathname = usePathname()
  const reduced = useReducedMotion() ?? false

  return (
    <>
      <DesktopNav pathname={pathname} reduced={reduced} />
      <MobileNav pathname={pathname} reduced={reduced} />
    </>
  )
}
