"use client"

import { ProjectCaseStudy } from "@/components/sections/project-case-study"
import { projects } from "@/lib/data/projects"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { use, useState } from "react"

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
                className="h-full w-full overflow-y-auto border-l border-border bg-card [perspective:1800px] [transform-style:preserve-3d]"
                style={{ transformOrigin: "100% 50%" }}
                initial={{ rotateY: -55, x: 40, opacity: 0 }}
                animate={{ rotateY: 0, x: 0, opacity: 1 }}
                exit={{ rotateY: -55, x: 40, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Title className="sr-only">{project.title}</Dialog.Title>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-80 transition-opacity hover:opacity-100 hover:text-foreground"
                >
                  <XIcon className="h-4 w-4" />
                </button>
                <ProjectCaseStudy project={project} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}
