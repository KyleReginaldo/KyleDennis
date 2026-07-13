"use client"

import {
  Boxes,
  Cloud,
  Heart,
  Paintbrush,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

const points: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Sparkles,
    title: "3+ years shipping real products",
    description: "Taking ideas from first commit to a live product people actually use, end-to-end.",
  },
  {
    icon: Boxes,
    title: "Scalable architecture",
    description: "Clean, feature-first architecture across mobile and web that scales with the team.",
  },
  {
    icon: Paintbrush,
    title: "UI/UX implementation",
    description: "Pixel-perfect UI from Figma, with animation and micro-interactions baked in.",
  },
  {
    icon: Cloud,
    title: "Backend integration",
    description: "REST APIs, Firebase, Supabase, and NestJS backends wired into real, working products.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description: "Comfortable working directly with founders, designers, and other engineers to ship fast.",
  },
  {
    icon: Heart,
    title: "Obsessed with polish",
    description: "The difference between a working app and a great one is in the details, and I care about both.",
  },
]


export function About() {
  return (
    <section id="about" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">About</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            I build the whole product, not just the screens.
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            I build for the people who end up using the product, whether it&apos;s mobile, web, or the
            backend behind it, focused on shipping something fast, polished, and built to last.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
