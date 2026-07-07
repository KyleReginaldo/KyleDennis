"use client"

import { Magnetic } from "@/components/ui/magnetic"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
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
    <section id="contact" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something amazing together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Open to freelance projects, full-time roles, and collaborations. If you have an idea or
            an opportunity, I would love to hear about it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
              >
                Say Hello
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="/kyle_reginaldo.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-muted-foreground/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted/40"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-5 transition-colors hover:border-primary/30"
            >
              <l.icon className="h-5 w-5 text-primary" />
              <p className="text-xs font-medium">{l.label}</p>
              <p className="truncate text-[11px] text-muted-foreground">{l.value}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
