"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const EMAIL = "kyledennis099@gmail.com"

const links = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  {
    label: "LinkedIn",
    value: "kyle-dennis-reginaldo",
    href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2",
    icon: Linkedin,
  },
  { label: "GitHub", value: "KyleReginaldo", href: "https://github.com/KyleReginaldo", icon: Github },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s build something amazing together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground">
            Open to freelance projects, full-time roles, and collaborations. If you have an idea or
            an opportunity, I would love to hear about it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Say Hello
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

       
      </div>
    </section>
  )
}
