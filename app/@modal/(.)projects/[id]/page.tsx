"use client"

import { shade } from "@/components/animata/card/case-study-card"
import { ProjectCaseStudy } from "@/components/sections/project-case-study"
import type { Project } from "@/lib/data/projects"
import { projects } from "@/lib/data/projects"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { use, useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

// The book's front cover: matches the clicked grid card's colors/logo, then swings
// open on its left-hand spine to reveal the case study underneath.
function BookCover({ project }: { project: Project }) {
  const base = project.accent ?? "#0071e3"
  const dark = shade(base, -60)

  const variants = {
    closed: { rotateY: 0, transition: { duration: 0.3, ease: EASE } },
    open: { rotateY: -110, transition: { duration: 0.6, ease: EASE, delay: 0.15 } },
  }

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 [backface-visibility:hidden]"
      style={{ background: `linear-gradient(155deg, ${base} 0%, ${dark} 100%)`, transformOrigin: "0% 50%" }}
      variants={variants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.28), transparent 55%)" }}
      />
      {project.logo && (
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 p-2.5 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.logo} alt={project.title} className="h-full w-full object-contain" />
        </div>
      )}
      <div className="relative z-10 px-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-white/70">{project.title}</p>
        <p className="mt-1 text-lg font-bold leading-tight text-white">{project.tagline}</p>
      </div>
    </motion.div>
  )
}

export default function ProjectModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id)
  const router = useRouter()
  const [open, setOpen] = useState(true)

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {open && project && (
        <Dialog.Root open modal onOpenChange={(v) => !v && setOpen(false)}>
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onEscapeKeyDown={() => setOpen(false)}
              onPointerDownOutside={(e) => {
                if (e.target instanceof Element && e.target.closest("[data-hero-video-dialog]")) {
                  e.preventDefault()
                  return
                }
                setOpen(false)
              }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl lg:max-w-2xl"
            >
              <motion.div
                className="h-full w-full overflow-y-auto border-l border-border bg-card [perspective:1800px]"
                variants={{
                  closed: { opacity: 0, x: 24, transition: { duration: 0.3, ease: EASE, delay: 0.3 } },
                  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                }}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Dialog.Title className="sr-only">{project.title}</Dialog.Title>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-80 transition-opacity hover:opacity-100 hover:text-foreground"
                >
                  <XIcon className="h-4 w-4" />
                </button>
                <ProjectCaseStudy project={project} />
                <BookCover project={project} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}
