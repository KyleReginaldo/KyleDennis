"use client"

import {
  ContactIconSelected,
  ContactIconUnselected,
  ExperienceIconSelected,
  ExperienceIconUnselected,
  HomeIconSelected,
  HomeIconUnselected,
  ProjectsIconSelected,
  ProjectsIconUnselected,
  ServicesIconSelected,
  ServicesIconUnselected,
} from "@/components/navigation/bottom-nav-icons"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { label: "About", href: "/", Selected: HomeIconSelected, Unselected: HomeIconUnselected },
  { label: "Projects", href: "/projects", Selected: ProjectsIconSelected, Unselected: ProjectsIconUnselected },
  { label: "Experience", href: "/experience", Selected: ExperienceIconSelected, Unselected: ExperienceIconUnselected },
  { label: "Services", href: "/services", Selected: ServicesIconSelected, Unselected: ServicesIconUnselected },
  { label: "Contact", href: "/contact", Selected: ContactIconSelected, Unselected: ContactIconUnselected },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href
          const Icon = active ? link.Selected : link.Unselected
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-1 items-center justify-center"
            >
              <motion.span whileTap={{ scale: 0.88 }} className="flex items-center justify-center">
                <Icon size={26} className={active ? "text-primary" : "text-muted-foreground"} />
              </motion.span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
